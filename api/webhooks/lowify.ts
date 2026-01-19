/**
 * Lowify Webhook Handler (Robust Implementation)
 * 
 * Vercel Edge Function for handling Lowify payment webhooks.
 * Designed to capture unknown payloads, detect event types heuristically,
 * and track AddPaymentInfo and Purchase events to Meta CAPI.
 * 
 * Endpoint: POST /api/webhooks/lowify
 * 
 * Features:
 * - Flexible payload parsing (JSON, form-urlencoded, text)
 * - Secure logging with PII sanitization
 * - Debug mode with payload inspection (LOWIFY_WEBHOOK_DEBUG=true)
 * - Heuristic event detection (pending vs approved)
 * - Flexible field extraction with multiple fallback paths
 * - Meta CAPI integration (AddPaymentInfo + Purchase)
 * 
 * Environment Variables:
 * - META_ACCESS_TOKEN: Required for CAPI
 * - META_PIXEL_ID: Optional (defaults to 1908080873443730)
 * - LOWIFY_WEBHOOK_DEBUG: Set to "true" to enable debug logging
 */

import { capi } from '../../src/utils/capi';
import { eventIdGenerator } from '../../src/utils/eventIdGenerator';
import type { UserData } from '../../src/utils/advancedMatching';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

type LowifyEventType = 'PIX_GENERATED' | 'APPROVED' | 'UNKNOWN';

interface ExtractedOrderFields {
  orderId?: string;
  value?: number;
  currency: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  productId?: string;
  productName?: string;
  eventTime?: number;
  fbp?: string;
  fbc?: string;
  externalId?: string;
}

interface SanitizedLogData {
  headers: Record<string, string>;
  bodySize: number;
  eventType: LowifyEventType;
  orderId?: string;
  hasEmail: boolean;
  hasPhone: boolean;
  value?: number;
  rawKeys?: string[];
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const DOMAIN = 'https://www.mapaxamanicooficial.online';
const CHECKOUT_URL = `${DOMAIN}/checkout`;
const OBRIGADO_URL = `${DOMAIN}/obrigado`;
const DEFAULT_PRODUCT_ID = 'manflx';
const DEFAULT_PIXEL_ID = '1908080873443730';

function getAccessToken(): string {
  const token = process.env.META_ACCESS_TOKEN;
  if (!token) {
    throw new Error('Meta Access Token not configured. Set META_ACCESS_TOKEN environment variable.');
  }
  return token;
}

function getPixelId(): string {
  return process.env.META_PIXEL_ID || DEFAULT_PIXEL_ID;
}

function isDebugMode(): boolean {
  return process.env.LOWIFY_WEBHOOK_DEBUG === 'true';
}

// ============================================================================
// PAYLOAD PARSING (Multi-format support)
// ============================================================================

/**
 * Parse request body supporting multiple content types
 * Tries: JSON -> form-urlencoded -> raw text
 */
async function parseRequestBody(request: Request): Promise<{ payload: any; rawBody: string; contentType: string }> {
  const contentType = request.headers.get('content-type') || '';
  const rawBody = await request.text();
  
  let payload: any = null;
  
  // Try JSON first
  if (contentType.includes('application/json') || rawBody.trim().startsWith('{') || rawBody.trim().startsWith('[')) {
    try {
      payload = JSON.parse(rawBody);
      return { payload, rawBody, contentType: 'json' };
    } catch {
      // Continue to next parser
    }
  }
  
  // Try form-urlencoded
  if (contentType.includes('application/x-www-form-urlencoded') || rawBody.includes('=')) {
    try {
      const params = new URLSearchParams(rawBody);
      payload = Object.fromEntries(params.entries());
      
      // Check if any value looks like JSON and parse it
      for (const [key, value] of Object.entries(payload)) {
        if (typeof value === 'string' && (value.startsWith('{') || value.startsWith('['))) {
          try {
            payload[key] = JSON.parse(value);
          } catch {
            // Keep as string
          }
        }
      }
      
      if (Object.keys(payload).length > 0) {
        return { payload, rawBody, contentType: 'form-urlencoded' };
      }
    } catch {
      // Continue to next parser
    }
  }
  
  // Fallback: return raw body as text
  return { payload: { _raw: rawBody }, rawBody, contentType: 'text' };
}

// ============================================================================
// CONSTANTS
// ============================================================================

// Sensitive keys to mask in logs (defined outside function for performance)
const SENSITIVE_KEYS = ['email', 'phone', 'telefone', 'cpf', 'documento', 'password', 'senha', 'card', 'cartao'];

// Threshold for cents-to-currency conversion
// Values above this are assumed to be in cents (e.g., 9700 cents = R$97.00)
// Most products are under R$1000, so values > 1000 are likely in centavos
const CENTS_THRESHOLD = 1000;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Safely get a value from nested object paths
 * Example: getAny(obj, ["a.b.c", "a_b_c", "x.y"]) returns first found value
 */
function getAny(obj: any, paths: string[]): any {
  if (!obj || typeof obj !== 'object') return undefined;
  
  for (const path of paths) {
    const value = getNestedValue(obj, path);
    if (value !== undefined && value !== null && value !== '') {
      return value;
    }
  }
  return undefined;
}

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj: any, path: string): any {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === null || current === undefined) return undefined;
    
    // Try exact key
    if (current[key] !== undefined) {
      current = current[key];
      continue;
    }
    
    // Try snake_case to camelCase conversion
    const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    if (current[camelKey] !== undefined) {
      current = current[camelKey];
      continue;
    }
    
    // Try camelCase to snake_case conversion
    const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    if (current[snakeKey] !== undefined) {
      current = current[snakeKey];
      continue;
    }
    
    return undefined;
  }
  
  return current;
}

/**
 * Mask email for safe logging: a***@g***.com
 */
function maskEmail(email: string): string {
  if (!email || typeof email !== 'string') return '***';
  const parts = email.split('@');
  if (parts.length !== 2) return '***';
  const [local, domain] = parts;
  const domainParts = domain.split('.');
  return `${local[0]}***@${domainParts[0][0]}***.${domainParts.slice(1).join('.')}`;
}

/**
 * Mask phone for safe logging: 55*********
 */
function maskPhone(phone: string): string {
  if (!phone || typeof phone !== 'string') return '***';
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 4) return '***';
  return digits.substring(0, 2) + '*'.repeat(digits.length - 2);
}

/**
 * Sanitize payload for safe logging (remove/mask PII)
 */
function sanitizePayload(payload: any): any {
  if (!payload || typeof payload !== 'object') return payload;
  
  const sanitized: any = {};
  
  for (const [key, value] of Object.entries(payload)) {
    const lowerKey = key.toLowerCase();
    
    if (SENSITIVE_KEYS.some(s => lowerKey.includes(s))) {
      if (lowerKey.includes('email')) {
        sanitized[key] = maskEmail(String(value));
      } else if (lowerKey.includes('phone') || lowerKey.includes('telefone')) {
        sanitized[key] = maskPhone(String(value));
      } else {
        sanitized[key] = '[REDACTED]';
      }
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizePayload(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

/**
 * Get all keys from nested object (for debugging)
 */
function getAllKeys(obj: any, prefix = ''): string[] {
  if (!obj || typeof obj !== 'object') return [];
  
  const keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    keys.push(fullKey);
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...getAllKeys(value, fullKey));
    }
  }
  return keys;
}

// ============================================================================
// EVENT DETECTION (Heuristic)
// ============================================================================

/**
 * Detect Lowify event type from payload and headers
 * Since Lowify doesn't document payloads, we use heuristic detection
 */
function detectLowifyEvent(payload: any, headers: Headers): LowifyEventType {
  if (!payload) return 'UNKNOWN';
  
  // Common status/event field paths to check
  const statusPaths = [
    'status', 'event', 'type', 'action', 'situation', 
    'payment_status', 'paymentStatus', 'transaction_status',
    'data.status', 'data.event', 'data.payment_status',
    'order.status', 'transaction.status', 'sale.status'
  ];
  
  const status = getAny(payload, statusPaths);
  const statusLower = String(status || '').toLowerCase();
  
  // Patterns indicating PIX generated / pending payment
  const pendingPatterns = [
    'pending', 'waiting_payment', 'waiting', 'pix_generated', 
    'aguardando', 'pendente', 'generated', 'created', 
    'awaiting', 'processing', 'iniciado', 'aberto'
  ];
  
  // Patterns indicating approved / completed payment
  const approvedPatterns = [
    'approved', 'paid', 'completed', 'aprovada', 'pago', 
    'confirmed', 'success', 'finalizado', 'concluido',
    'captured', 'settled', 'complete'
  ];
  
  // Check for pending patterns
  if (pendingPatterns.some(p => statusLower.includes(p))) {
    return 'PIX_GENERATED';
  }
  
  // Check for approved patterns
  if (approvedPatterns.some(p => statusLower.includes(p))) {
    return 'APPROVED';
  }
  
  // Fallback: check for event field specifically
  const eventField = getAny(payload, ['event', 'type', 'action']);
  if (eventField) {
    const eventLower = String(eventField).toLowerCase();
    if (eventLower.includes('sale.paid') || eventLower.includes('purchase') || eventLower.includes('approved')) {
      return 'APPROVED';
    }
    if (eventLower.includes('created') || eventLower.includes('pending') || eventLower.includes('pix')) {
      return 'PIX_GENERATED';
    }
  }
  
  // Check for amount + email as indicator of a valid payment event
  const hasValue = getAny(payload, ['value', 'amount', 'total', 'price', 'data.value', 'data.amount']) !== undefined;
  const hasEmail = getAny(payload, ['email', 'buyer_email', 'customer.email', 'data.email', 'data.buyer.email']) !== undefined;
  
  // If we have both value and email but no clear status, assume it might be a sale
  // but return UNKNOWN to be safe (don't fire CAPI without confirmation)
  
  return 'UNKNOWN';
}

// ============================================================================
// FIELD EXTRACTION (Flexible mapping)
// ============================================================================

/**
 * Extract order fields from payload using multiple fallback paths
 */
function extractOrderFields(payload: any): ExtractedOrderFields {
  // Order ID
  const orderId = getAny(payload, [
    'order_id', 'orderId', 'transaction_id', 'transactionId',
    'sale_id', 'saleId', 'id', 'code', 'reference',
    'data.order_id', 'data.id', 'data.transaction_id',
    'order.id', 'transaction.id', 'sale.id'
  ]);
  
  // Value (handle cents conversion)
  let value = getAny(payload, [
    'value', 'amount', 'total', 'price', 'total_amount',
    'data.value', 'data.amount', 'data.total', 'data.total_amount',
    'order.value', 'order.amount', 'order.total',
    'transaction.value', 'transaction.amount'
  ]);
  
  if (value !== undefined) {
    value = parseFloat(String(value));
    // Convert from cents to currency if value exceeds threshold
    // Most products are priced under R$1000, so values > CENTS_THRESHOLD
    // are likely in centavos (e.g., 9700 centavos = R$97.00)
    if (value > CENTS_THRESHOLD) {
      value = value / 100;
    }
  }
  
  // Currency
  const currency = getAny(payload, [
    'currency', 'moeda', 'data.currency', 'order.currency'
  ]) || 'BRL';
  
  // Email
  const email = getAny(payload, [
    'email', 'buyer_email', 'customer_email', 'payer_email',
    'customer.email', 'buyer.email', 'payer.email',
    'data.email', 'data.buyer_email', 'data.customer.email', 'data.buyer.email',
    'user.email', 'client.email'
  ]);
  
  // Phone
  const phone = getAny(payload, [
    'phone', 'buyer_phone', 'customer_phone', 'payer_phone', 'telefone',
    'customer.phone', 'buyer.phone', 'payer.phone',
    'data.phone', 'data.buyer_phone', 'data.customer.phone', 'data.buyer.phone',
    'user.phone', 'client.phone'
  ]);
  
  // Name
  const fullName = getAny(payload, [
    'name', 'buyer_name', 'customer_name', 'payer_name', 'nome',
    'customer.name', 'buyer.name', 'payer.name',
    'data.name', 'data.buyer_name', 'data.customer.name', 'data.buyer.name',
    'user.name', 'client.name'
  ]) || '';
  
  const nameParts = String(fullName).split(' ');
  const firstName = nameParts[0] || undefined;
  const lastName = nameParts.slice(1).join(' ') || undefined;
  
  // Product
  const productId = getAny(payload, [
    'product_id', 'productId', 'sku', 'offer_id', 'offerId',
    'data.product_id', 'data.offer_id', 'product.id', 'offer.id'
  ]) || DEFAULT_PRODUCT_ID;
  
  const productName = getAny(payload, [
    'product_name', 'productName', 'offer_name', 'offerName',
    'data.product_name', 'data.offer_name', 'product.name', 'offer.name'
  ]) || 'Mapa Xamânico';
  
  // Timestamps
  let eventTime: number | undefined;
  const timestamp = getAny(payload, [
    'created_at', 'createdAt', 'approved_at', 'approvedAt',
    'timestamp', 'date', 'event_time', 'eventTime',
    'data.created_at', 'data.approved_at', 'data.timestamp'
  ]);
  
  if (timestamp) {
    const parsed = new Date(timestamp);
    if (!isNaN(parsed.getTime())) {
      eventTime = Math.floor(parsed.getTime() / 1000);
    }
  }
  
  // Facebook IDs (from bridge/KV or payload)
  const fbp = getAny(payload, ['fbp', '_fbp', 'fb_browser_id', 'data.fbp']);
  const fbc = getAny(payload, ['fbc', '_fbc', 'fb_click_id', 'fbclid', 'data.fbc']);
  const externalId = getAny(payload, [
    'external_id', 'externalId', 'user_id', 'userId', 'client_id', 'clientId',
    'oid', 'session_id', 'sessionId', 'data.external_id', 'data.user_id'
  ]);
  
  return {
    orderId: orderId ? String(orderId) : undefined,
    value,
    currency: String(currency).toUpperCase(),
    email: email ? String(email) : undefined,
    phone: phone ? String(phone) : undefined,
    firstName,
    lastName,
    productId: String(productId),
    productName: String(productName),
    eventTime,
    fbp: fbp ? String(fbp) : undefined,
    fbc: fbc ? String(fbc) : undefined,
    externalId: externalId ? String(externalId) : undefined,
  };
}

// ============================================================================
// SECURE LOGGING
// ============================================================================

/**
 * Log webhook request with sanitized data
 */
function logWebhookRequest(
  request: Request, 
  payload: any, 
  eventType: LowifyEventType, 
  fields: ExtractedOrderFields,
  rawBodySize: number
): SanitizedLogData {
  const logData: SanitizedLogData = {
    headers: {
      'content-type': request.headers.get('content-type') || 'unknown',
      'user-agent': request.headers.get('user-agent') || 'unknown',
    },
    bodySize: rawBodySize,
    eventType,
    orderId: fields.orderId,
    hasEmail: !!fields.email,
    hasPhone: !!fields.phone,
    value: fields.value,
  };
  
  // In debug mode, include sanitized payload keys
  if (isDebugMode()) {
    logData.rawKeys = getAllKeys(payload);
  }
  
  console.log('[Lowify] Webhook received:', logData);
  
  return logData;
}

/**
 * Store debug payload (would use KV in production, here we log)
 * In production, integrate with Vercel KV: await kv.set(key, payload, { ex: 3600 })
 */
async function storeDebugPayload(payload: any, rawBody: string): Promise<string | null> {
  if (!isDebugMode()) return null;
  
  // Generate unique key: timestamp + hash
  const timestamp = Date.now();
  const hashBuffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(rawBody)
  );
  const hashHex = Array.from(new Uint8Array(hashBuffer))
    .slice(0, 8)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  const key = `lowify_debug_${timestamp}_${hashHex}`;
  
  // Log the debug key and sanitized payload
  // In production with Vercel KV:
  // await kv.set(key, { payload, rawBody, timestamp }, { ex: 3600 });
  console.log('[Lowify DEBUG] Payload stored with key:', key);
  console.log('[Lowify DEBUG] Sanitized payload:', sanitizePayload(payload));
  
  return key;
}

// ============================================================================
// META CAPI TRACKING
// ============================================================================

/**
 * Build user data for CAPI with available fields
 */
function buildUserData(fields: ExtractedOrderFields, request: Request): UserData {
  // Get server-side collected data
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || request.headers.get('cf-connecting-ip')
    || request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()
    || undefined;
  
  const clientUserAgent = request.headers.get('user-agent') || undefined;
  
  return {
    email: fields.email,
    phone: fields.phone,
    firstName: fields.firstName,
    lastName: fields.lastName,
    country: 'BR',
    clientIpAddress: clientIp,
    clientUserAgent: clientUserAgent,
    fbp: fields.fbp,
    fbc: fields.fbc,
    externalId: fields.externalId || fields.email, // Use email as fallback external ID
  };
}

/**
 * Track AddPaymentInfo event (PIX generated, awaiting payment)
 */
async function trackAddPaymentInfo(fields: ExtractedOrderFields, request: Request): Promise<void> {
  if (!fields.email && !fields.phone) {
    console.log('[Lowify] Skipping AddPaymentInfo - no email or phone');
    return;
  }
  
  const userData = buildUserData(fields, request);
  
  // Use the CAPI utility function for consistent custom data structure
  const customData = capi.buildAddPaymentInfoCustomData({
    value: fields.value,
    currency: fields.currency,
    contentIds: fields.productId ? [fields.productId] : undefined,
    contentName: fields.productName,
    contentType: 'product',
    orderId: fields.orderId,
  });
  
  const eventId = `lowify_addpayment_${fields.orderId || Date.now()}`;
  
  // Check for duplicates
  if (eventIdGenerator.isDuplicate(eventId)) {
    console.log('[Lowify] Duplicate AddPaymentInfo skipped:', eventId);
    return;
  }
  
  const capiPayload = await capi.buildEventPayload(
    'AddPaymentInfo',
    userData,
    customData,
    CHECKOUT_URL,
    eventId
  );
  
  const response = await capi.sendEvent(capiPayload, getAccessToken(), getPixelId());
  
  console.log('[Lowify] AddPaymentInfo tracked:', {
    eventId,
    orderId: fields.orderId,
    value: fields.value,
    eventsReceived: response.events_received,
  });
  
  eventIdGenerator.store(eventId, 'AddPaymentInfo');
}

/**
 * Track Purchase event (payment approved)
 */
async function trackPurchase(fields: ExtractedOrderFields, request: Request): Promise<void> {
  if (!fields.email && !fields.phone) {
    console.log('[Lowify] Skipping Purchase - no email or phone');
    return;
  }
  
  const userData = buildUserData(fields, request);
  
  const customData = capi.buildPurchaseCustomData({
    value: fields.value || 0,
    currency: fields.currency,
    contentIds: [fields.productId],
    contentName: fields.productName,
    contentType: 'product',
    orderId: fields.orderId,
    numItems: 1,
  });
  
  const eventId = `lowify_purchase_${fields.orderId || Date.now()}`;
  
  // Check for duplicates
  if (eventIdGenerator.isDuplicate(eventId)) {
    console.log('[Lowify] Duplicate Purchase skipped:', eventId);
    return;
  }
  
  const capiPayload = await capi.buildEventPayload(
    'Purchase',
    userData,
    customData,
    OBRIGADO_URL,
    eventId
  );
  
  const response = await capi.sendEvent(capiPayload, getAccessToken(), getPixelId());
  
  console.log('[Lowify] Purchase tracked:', {
    eventId,
    orderId: fields.orderId,
    email: fields.email ? maskEmail(fields.email) : undefined,
    value: fields.value,
    eventsReceived: response.events_received,
  });
  
  eventIdGenerator.store(eventId, 'Purchase');
}

// ============================================================================
// EDGE FUNCTION HANDLER
// ============================================================================

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  // Only accept POST requests
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }
  
  // Respond quickly to acknowledge receipt
  const responsePromise = (async () => {
    try {
      // Parse request body (supports JSON, form-urlencoded, text)
      const { payload, rawBody, contentType } = await parseRequestBody(request);
      
      // Store debug payload if debug mode is enabled
      const debugKey = await storeDebugPayload(payload, rawBody);
      
      // Detect event type
      const eventType = detectLowifyEvent(payload, request.headers);
      
      // Extract order fields
      const fields = extractOrderFields(payload);
      
      // Log request (sanitized)
      logWebhookRequest(request, payload, eventType, fields, rawBody.length);
      
      // Handle based on event type
      if (eventType === 'UNKNOWN') {
        console.log('[Lowify] Unknown event type - not tracking to CAPI');
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Event received but not tracked (unknown type)',
            eventType,
            debugKey,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      // Check if we have Meta token configured
      if (!process.env.META_ACCESS_TOKEN) {
        console.log('[Lowify] META_ACCESS_TOKEN not configured - skipping CAPI tracking');
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Event received but CAPI not configured',
            eventType,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      // Track appropriate event
      if (eventType === 'PIX_GENERATED') {
        await trackAddPaymentInfo(fields, request);
      } else if (eventType === 'APPROVED') {
        await trackPurchase(fields, request);
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          eventType,
          orderId: fields.orderId,
          debugKey,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
      
    } catch (error) {
      console.error('[Lowify] Webhook error:', error);
      
      // Always return 200 to prevent Lowify from retrying
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: error instanceof Error ? error.message : 'Internal error',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
  })();
  
  return responsePromise;
}
