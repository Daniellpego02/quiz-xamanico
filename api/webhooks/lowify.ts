/**
 * Lowify Webhook Handler (Production-Ready Implementation)
 * 
 * Vercel Edge Function for handling Lowify payment webhooks.
 * Designed for scale with idempotency, proper deduplication, and Meta CAPI compliance.
 * 
 * Endpoint: POST /api/webhooks/lowify
 * 
 * Features:
 * - Idempotency via in-memory cache (KV-ready) with 30-day TTL concept
 * - Flexible payload parsing (JSON, form-urlencoded, text)
 * - Secure logging with PII sanitization (email/phone masking)
 * - Debug mode with payload inspection (LOWIFY_WEBHOOK_DEBUG=true)
 * - Heuristic event detection (PIX_GENERATED vs APPROVED)
 * - Flexible field extraction with multiple fallback paths
 * - Meta CAPI integration with proper normalization and hashing
 * - Robust event_id generation (stable per order, unique per event type)
 * - Rate limiting by IP (60s window)
 * 
 * Environment Variables:
 * - META_ACCESS_TOKEN: Required for CAPI
 * - META_PIXEL_ID: Optional (defaults to 1908080873443730)
 * - LOWIFY_WEBHOOK_DEBUG: Set to "true" to enable debug logging
 * 
 * Webhook URL: https://www.mapaxamanicooficial.online/api/webhooks/lowify
 */

import { capi } from '../../src/utils/capi';
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

interface DebugSummary {
  detectedEventType: LowifyEventType;
  extracted: {
    order_id?: string;
    value?: number;
    currency: string;
    email_present: boolean;
    phone_present: boolean;
  };
  idempotencyKey?: string;
  wasAlreadyProcessed: boolean;
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

// Idempotency TTL: 30 days in seconds (for KV)
const IDEMPOTENCY_TTL_SECONDS = 30 * 24 * 60 * 60;

// Rate limit: max 30 requests per IP in a 60-second (1 minute) window
const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW_SECONDS = 60;

// ============================================================================
// IN-MEMORY STORES (KV-ready - replace with Vercel KV in production)
// ============================================================================

// Idempotency store: tracks processed events to prevent duplicates
// Key: lowify:${eventType}:${orderId}, Value: timestamp
// In production, use Vercel KV with TTL
const idempotencyStore = new Map<string, number>();

// Rate limit store: tracks request counts per IP
// Key: ratelimit:${ip}, Value: { count, resetAt }
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

// Debug payload store: stores raw payloads for inspection
// Key: lowify_debug:${timestamp}:${hash}, Value: payload
const debugPayloadStore = new Map<string, { payload: any; rawBody: string; timestamp: number }>();

// ============================================================================
// IDEMPOTENCY (Critical for preventing duplicate events)
// ============================================================================

/**
 * Generate idempotency key for an event
 * Format: lowify:${eventType}:${orderId|hash}
 */
async function generateIdempotencyKey(eventType: LowifyEventType, orderId: string | undefined, rawBody: string): Promise<string> {
  if (orderId) {
    return `lowify:${eventType}:${orderId}`;
  }
  
  // Fallback: use hash of raw body for events without order_id
  const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(rawBody));
  const hashHex = Array.from(new Uint8Array(hashBuffer))
    .slice(0, 16)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return `lowify:${eventType}:hash_${hashHex}`;
}

/**
 * Check if event was already processed (idempotency check)
 * Returns true if already processed, false if new
 */
function isEventAlreadyProcessed(key: string): boolean {
  // In production with Vercel KV:
  // const exists = await kv.get(key);
  // return exists !== null;
  
  const processed = idempotencyStore.get(key);
  if (processed) {
    // Check if within TTL (30 days)
    const now = Date.now();
    const ttlMs = IDEMPOTENCY_TTL_SECONDS * 1000;
    if (now - processed < ttlMs) {
      return true;
    }
    // Expired, remove from store
    idempotencyStore.delete(key);
  }
  return false;
}

/**
 * Mark event as processed (store in idempotency cache)
 */
function markEventAsProcessed(key: string): void {
  // In production with Vercel KV:
  // await kv.set(key, Date.now(), { ex: IDEMPOTENCY_TTL_SECONDS });
  
  idempotencyStore.set(key, Date.now());
  
  // Cleanup old entries (keep store manageable in memory)
  if (idempotencyStore.size > 10000) {
    const now = Date.now();
    const ttlMs = IDEMPOTENCY_TTL_SECONDS * 1000;
    for (const [k, v] of idempotencyStore.entries()) {
      if (now - v > ttlMs) {
        idempotencyStore.delete(k);
      }
    }
  }
}

// ============================================================================
// RATE LIMITING (Simple IP-based protection)
// ============================================================================

/**
 * Check rate limit for an IP address
 * Returns true if allowed, false if rate limited
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const key = `ratelimit:${ip}`;
  
  const entry = rateLimitStore.get(key);
  
  if (!entry || now > entry.resetAt) {
    // First request or window expired
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + (RATE_LIMIT_WINDOW_SECONDS * 1000),
    });
    return true;
  }
  
  if (entry.count >= RATE_LIMIT_MAX) {
    return false; // Rate limited
  }
  
  entry.count++;
  return true;
}

/**
 * Get client IP from request headers
 */
function getClientIP(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || request.headers.get('cf-connecting-ip')
    || request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()
    || 'unknown';
}

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
// META CAPI NORMALIZATION & HASHING (Compliance)
// ============================================================================

/**
 * Normalize email for Meta CAPI (trim + lowercase)
 */
function normalizeEmail(email: string): string {
  if (!email) return '';
  return email.trim().toLowerCase();
}

/**
 * Normalize phone for Meta CAPI (E.164 format for Brazil)
 * Keeps only digits, adds 55 country code if missing
 */
function normalizePhone(phone: string): string {
  if (!phone) return '';
  
  // Keep only digits
  let digits = phone.replace(/\D/g, '');
  
  // Remove leading zeros
  digits = digits.replace(/^0+/, '');
  
  // If already has country code (starts with 55 and proper length), return as is
  if (digits.startsWith('55') && digits.length >= 12) {
    return digits;
  }
  
  // Brazilian numbers: add country code 55 if not present
  // Valid formats: 11 digits (mobile with area code) or 10 digits (landline)
  if (digits.length === 11 || digits.length === 10) {
    return '55' + digits;
  }
  
  // Short numbers (8-9 digits): assume São Paulo area code 11
  if (digits.length === 9 || digits.length === 8) {
    return '5511' + digits;
  }
  
  // Return as is for other lengths (may already have country code or invalid)
  return digits;
}

/**
 * SHA256 hash utility for Meta CAPI (returns lowercase hex)
 * Note: This utility is available for external_id hashing or custom needs.
 * The advancedMatching module handles email/phone hashing automatically.
 */
async function sha256Hash(data: string): Promise<string> {
  if (!data) return '';
  
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate robust event_id that's stable per order but unique per event type
 * - If order_id exists: lowify_${eventType}_${orderId}
 * - If no order_id: lowify_${eventType}_${sha256(rawBody).slice(0,16)}
 */
async function generateEventId(eventType: LowifyEventType, orderId: string | undefined, rawBody: string): Promise<string> {
  const eventPrefix = eventType === 'PIX_GENERATED' ? 'addpayment' : 'purchase';
  
  if (orderId) {
    return `lowify_${eventPrefix}_${orderId}`;
  }
  
  // Fallback: use hash of raw body
  const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(rawBody));
  const hashHex = Array.from(new Uint8Array(hashBuffer))
    .slice(0, 16)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return `lowify_${eventPrefix}_hash_${hashHex}`;
}

/**
 * Parse and validate event_time (epoch seconds UTC)
 * Returns current time if invalid or missing
 */
function parseEventTime(timestamp: any): number {
  if (!timestamp) {
    return Math.floor(Date.now() / 1000);
  }
  
  // If already a number, check if it's seconds or milliseconds
  if (typeof timestamp === 'number') {
    // If > 10 billion, it's likely milliseconds
    if (timestamp > 10000000000) {
      return Math.floor(timestamp / 1000);
    }
    return Math.floor(timestamp);
  }
  
  // Try to parse as date string
  const parsed = new Date(timestamp);
  if (!isNaN(parsed.getTime())) {
    return Math.floor(parsed.getTime() / 1000);
  }
  
  // Fallback to current time
  return Math.floor(Date.now() / 1000);
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
 * Store debug payload (uses in-memory store, KV-ready for production)
 * Key format: lowify_debug:${timestamp}:${hash}
 * TTL: 1 hour
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
  
  const key = `lowify_debug:${timestamp}:${hashHex}`;
  
  // Store in memory (in production, use Vercel KV with ex: 3600)
  debugPayloadStore.set(key, { payload, rawBody, timestamp });
  
  // Cleanup old entries (older than 1 hour)
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  for (const [k, v] of debugPayloadStore.entries()) {
    if (v.timestamp < oneHourAgo) {
      debugPayloadStore.delete(k);
    }
  }
  
  // Log the debug key and sanitized payload
  console.log('[Lowify DEBUG] Payload stored with key:', key);
  console.log('[Lowify DEBUG] Sanitized payload:', sanitizePayload(payload));
  
  return key;
}

/**
 * Build debug summary for response (only in debug mode)
 */
function buildDebugSummary(
  eventType: LowifyEventType,
  fields: ExtractedOrderFields,
  idempotencyKey: string | undefined,
  wasAlreadyProcessed: boolean
): DebugSummary {
  return {
    detectedEventType: eventType,
    extracted: {
      order_id: fields.orderId,
      value: fields.value,
      currency: fields.currency,
      email_present: !!fields.email,
      phone_present: !!fields.phone,
    },
    idempotencyKey,
    wasAlreadyProcessed,
  };
}

// ============================================================================
// META CAPI TRACKING
// ============================================================================

/**
 * Build user data for CAPI with normalized fields
 * Uses proper Meta CAPI normalization (trim, lowercase, E.164)
 */
function buildUserData(fields: ExtractedOrderFields, request: Request): UserData {
  // Get server-side collected data
  const clientIp = getClientIP(request);
  const clientUserAgent = request.headers.get('user-agent') || undefined;
  
  // Normalize email and phone for Meta CAPI compliance
  const normalizedEmail = fields.email ? normalizeEmail(fields.email) : undefined;
  const normalizedPhone = fields.phone ? normalizePhone(fields.phone) : undefined;
  
  return {
    email: normalizedEmail,
    phone: normalizedPhone,
    firstName: fields.firstName,
    lastName: fields.lastName,
    country: 'BR',
    clientIpAddress: clientIp !== 'unknown' ? clientIp : undefined,
    clientUserAgent: clientUserAgent,
    fbp: fields.fbp,
    fbc: fields.fbc,
    // Use normalized email as external_id fallback, or phone if no email
    externalId: fields.externalId || normalizedEmail || normalizedPhone,
  };
}

/**
 * Track AddPaymentInfo event (PIX generated, awaiting payment)
 * Uses robust event_id generation and proper event_time
 */
async function trackAddPaymentInfo(
  fields: ExtractedOrderFields, 
  request: Request, 
  rawBody: string
): Promise<string> {
  if (!fields.email && !fields.phone) {
    console.log('[Lowify] Skipping AddPaymentInfo - no email or phone');
    return '';
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
  
  // Generate robust event_id (stable per order, unique for AddPaymentInfo)
  const eventId = await generateEventId('PIX_GENERATED', fields.orderId, rawBody);
  
  // Get proper event_time (epoch seconds UTC)
  const eventTime = parseEventTime(fields.eventTime);
  
  const capiPayload = await capi.buildEventPayload(
    'AddPaymentInfo',
    userData,
    customData,
    CHECKOUT_URL, // Absolute URL with domain
    eventId
  );
  
  // Override event_time with properly parsed value
  capiPayload.event_time = eventTime;
  
  const response = await capi.sendEvent(capiPayload, getAccessToken(), getPixelId());
  
  console.log('[Lowify] AddPaymentInfo tracked:', {
    eventId,
    orderId: fields.orderId,
    value: fields.value,
    eventTime,
    eventsReceived: response.events_received,
  });
  
  return eventId;
}

/**
 * Track Purchase event (payment approved)
 * Uses robust event_id generation and proper event_time
 */
async function trackPurchase(
  fields: ExtractedOrderFields, 
  request: Request,
  rawBody: string
): Promise<string> {
  if (!fields.email && !fields.phone) {
    console.log('[Lowify] Skipping Purchase - no email or phone');
    return '';
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
  
  // Generate robust event_id (stable per order, unique for Purchase)
  const eventId = await generateEventId('APPROVED', fields.orderId, rawBody);
  
  // Get proper event_time (epoch seconds UTC)
  const eventTime = parseEventTime(fields.eventTime);
  
  const capiPayload = await capi.buildEventPayload(
    'Purchase',
    userData,
    customData,
    OBRIGADO_URL, // Absolute URL with domain
    eventId
  );
  
  // Override event_time with properly parsed value
  capiPayload.event_time = eventTime;
  
  const response = await capi.sendEvent(capiPayload, getAccessToken(), getPixelId());
  
  console.log('[Lowify] Purchase tracked:', {
    eventId,
    orderId: fields.orderId,
    email: fields.email ? maskEmail(fields.email) : undefined,
    value: fields.value,
    eventTime,
    eventsReceived: response.events_received,
  });
  
  return eventId;
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
  
  // Rate limiting by IP
  const clientIP = getClientIP(request);
  if (!checkRateLimit(clientIP)) {
    console.log('[Lowify] Rate limited:', clientIP);
    return new Response(
      JSON.stringify({ success: false, error: 'Rate limited' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }
  
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
    
    // Handle UNKNOWN event type
    if (eventType === 'UNKNOWN') {
      console.log('[Lowify] Unknown event type - not tracking to CAPI');
      
      const response: any = { 
        success: true, 
        message: 'Event received but not tracked (unknown type)',
        eventType,
      };
      
      // Include debug summary only in debug mode
      if (isDebugMode()) {
        response.debug = buildDebugSummary(eventType, fields, undefined, false);
        response.debugKey = debugKey;
      }
      
      return new Response(
        JSON.stringify(response),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Generate idempotency key
    const idempotencyKey = await generateIdempotencyKey(eventType, fields.orderId, rawBody);
    
    // CRITICAL: Check idempotency to prevent duplicate events
    if (isEventAlreadyProcessed(idempotencyKey)) {
      console.log('[Lowify] Idempotent skip - event already processed:', idempotencyKey);
      
      const response: any = { 
        success: true, 
        message: 'Event already processed (idempotent)',
        eventType,
        orderId: fields.orderId,
      };
      
      // Include debug summary only in debug mode
      if (isDebugMode()) {
        response.debug = buildDebugSummary(eventType, fields, idempotencyKey, true);
      }
      
      return new Response(
        JSON.stringify(response),
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
    let eventId = '';
    if (eventType === 'PIX_GENERATED') {
      eventId = await trackAddPaymentInfo(fields, request, rawBody);
    } else if (eventType === 'APPROVED') {
      eventId = await trackPurchase(fields, request, rawBody);
    }
    
    // Mark event as processed (idempotency)
    if (eventId) {
      markEventAsProcessed(idempotencyKey);
    }
    
    // Build response
    const response: any = { 
      success: true, 
      eventType,
      orderId: fields.orderId,
      eventId,
    };
    
    // Include debug summary only in debug mode
    if (isDebugMode()) {
      response.debug = buildDebugSummary(eventType, fields, idempotencyKey, false);
      response.debugKey = debugKey;
    }
    
    return new Response(
      JSON.stringify(response),
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
}
