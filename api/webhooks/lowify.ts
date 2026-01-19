/**
 * Lowify Webhook Handler
 * 
 * Vercel Edge Function for handling Lowify payment webhooks.
 * Receives notification when a sale is approved and tracks Purchase events to Meta CAPI.
 * 
 * Endpoint: POST /api/webhooks/lowify
 * 
 * Expected payload from Lowify:
 * {
 *   order_id: string;
 *   customer_email: string;
 *   customer_name?: string;
 *   customer_phone?: string;
 *   total_amount: string | number; // Amount in cents (e.g., "9700" for R$97.00)
 *   product_name?: string;
 *   status?: string;
 *   fbp?: string;  // Facebook Browser ID (if available)
 *   fbc?: string;  // Facebook Click ID (if available)
 * }
 * 
 * Security: Validates webhook signature using HMAC-SHA256 if LOWIFY_WEBHOOK_SECRET is configured
 */

import { capi } from '../../src/utils/capi';
import { eventIdGenerator } from '../../src/utils/eventIdGenerator';
import type { UserData } from '../../src/utils/advancedMatching';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface LowifyWebhookPayload {
  order_id: string;
  customer_email: string;
  customer_name?: string;
  customer_phone?: string;
  total_amount: string | number;
  product_name?: string;
  status?: string;
  fbp?: string;  // Facebook Browser ID
  fbc?: string;  // Facebook Click ID
}

// ============================================================================
// WEBHOOK SIGNATURE VALIDATION
// ============================================================================

/**
 * Validate Lowify webhook signature using HMAC-SHA256
 * @param request - The incoming request
 * @param rawBody - The raw request body as string
 * @returns True if signature is valid or validation is disabled
 */
async function validateLowifySignature(request: Request, rawBody: string): Promise<boolean> {
  const secret = process.env.LOWIFY_WEBHOOK_SECRET;
  
  // If no secret configured, skip validation (with warning)
  if (!secret) {
    console.warn('[Lowify] LOWIFY_WEBHOOK_SECRET not configured - signature validation skipped');
    return true;
  }
  
  // Get signature from header (common header names for webhooks)
  const signature = request.headers.get('x-lowify-signature') 
    || request.headers.get('x-webhook-signature')
    || request.headers.get('x-signature');
  
  if (!signature) {
    console.error('[Lowify] No signature header found in request');
    return false;
  }
  
  try {
    // Compute HMAC-SHA256 signature using Web Crypto API (Edge compatible)
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const messageData = encoder.encode(rawBody);
    
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
    const computedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    // Constant-time comparison to prevent timing attacks
    if (computedSignature.length !== signature.length) {
      return false;
    }
    
    let result = 0;
    for (let i = 0; i < computedSignature.length; i++) {
      result |= computedSignature.charCodeAt(i) ^ signature.charCodeAt(i);
    }
    
    return result === 0;
  } catch (error) {
    console.error('[Lowify] Error validating signature:', error);
    return false;
  }
}

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Get Meta API Access Token from environment
 */
function getAccessToken(): string {
  const token = process.env.META_ACCESS_TOKEN;
  if (!token) {
    throw new Error('Meta Access Token not configured. Set META_ACCESS_TOKEN environment variable.');
  }
  return token;
}

/**
 * Get Meta Pixel ID from environment
 */
function getPixelId(): string {
  return process.env.META_PIXEL_ID || '1908080873443730';
}

// ============================================================================
// PURCHASE TRACKING
// ============================================================================

/**
 * Track Purchase event to Meta CAPI with enhanced Advanced Matching
 * @param payload - Lowify webhook payload
 * @param request - Original request for extracting IP and User Agent
 */
async function trackPurchaseEvent(payload: LowifyWebhookPayload, request: Request): Promise<void> {
  // Parse customer name into first and last name
  const nameParts = (payload.customer_name || '').split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // Get client IP from various headers (Vercel, Cloudflare, etc.)
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || request.headers.get('cf-connecting-ip')
    || request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()
    || undefined;

  // Get client User Agent
  const clientUserAgent = request.headers.get('user-agent') || undefined;

  // Build user data for advanced matching with ALL available parameters
  // This maximizes Event Match Quality (EMQ) score - target: 8.5-9.0+
  const userData: UserData = {
    email: payload.customer_email,
    phone: payload.customer_phone,
    firstName: firstName,
    lastName: lastName,
    // Include server-side collected data for higher EMQ
    clientIpAddress: clientIp,
    clientUserAgent: clientUserAgent,
    // Include Facebook IDs if available from payload
    fbp: payload.fbp,
    fbc: payload.fbc,
    // Default country for Brazilian customers
    country: 'BR',
  };

  // Parse amount (convert from cents to currency)
  const amountInCents = typeof payload.total_amount === 'string' 
    ? parseFloat(payload.total_amount) 
    : payload.total_amount;
  const value = amountInCents / 100;

  // Build custom data for Purchase event
  const customData = capi.buildPurchaseCustomData({
    value: value,
    currency: 'BRL',
    contentIds: [payload.order_id],
    contentName: payload.product_name || 'Mapa Xamânico',
    contentType: 'product',
    orderId: payload.order_id,
    numItems: 1,
  });

  // Generate event ID for deduplication
  const eventId = `lowify_${payload.order_id}`;
  
  // Check for duplicate events
  if (eventIdGenerator.isDuplicate(eventId)) {
    console.log('[Lowify] Duplicate event skipped:', { eventId, orderId: payload.order_id });
    return;
  }

  // Build CAPI payload
  const capiPayload = await capi.buildEventPayload(
    'Purchase',
    userData,
    customData,
    undefined,
    eventId
  );

  // Send event to Meta CAPI
  const response = await capi.sendEvent(capiPayload, getAccessToken(), getPixelId());

  console.log('[Lowify] Purchase tracked:', {
    eventId,
    orderId: payload.order_id,
    email: payload.customer_email,
    value: value,
    eventsReceived: response.events_received,
    hasIp: !!clientIp,
    hasUserAgent: !!clientUserAgent,
    hasFbp: !!payload.fbp,
    hasFbc: !!payload.fbc,
  });

  // Store event ID for deduplication
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
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    // Read raw body for signature validation
    const rawBody = await request.text();
    
    // Validate webhook signature (if LOWIFY_WEBHOOK_SECRET is configured)
    const isValidSignature = await validateLowifySignature(request, rawBody);
    if (!isValidSignature) {
      console.error('[Lowify] Invalid webhook signature - request rejected');
      return new Response('Unauthorized', { status: 401 });
    }
    
    // Parse webhook payload
    const payload: LowifyWebhookPayload = JSON.parse(rawBody);

    console.log('[Lowify] Sale received:', {
      order: payload.order_id,
      email: payload.customer_email,
      amount: payload.total_amount,
    });

    // Validate required fields
    if (!payload.order_id || !payload.customer_email) {
      console.error('[Lowify] Missing required fields:', { 
        hasOrderId: !!payload.order_id, 
        hasEmail: !!payload.customer_email 
      });
      // Return 200 to prevent Lowify from retrying
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Track Purchase event if Meta token is configured
    if (process.env.META_ACCESS_TOKEN) {
      await trackPurchaseEvent(payload, request);
    } else {
      console.log('[Lowify] META_ACCESS_TOKEN not configured, skipping CAPI tracking');
    }

    return new Response(
      JSON.stringify({ success: true, order: payload.order_id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[Lowify] Erro:', error);
    // Always return 200 to prevent Lowify from retrying
    return new Response(
      JSON.stringify({ success: false }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
