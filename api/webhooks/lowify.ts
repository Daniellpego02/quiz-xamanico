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
 * }
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
 * Track Purchase event to Meta CAPI
 */
async function trackPurchaseEvent(payload: LowifyWebhookPayload): Promise<void> {
  // Parse customer name into first and last name
  const nameParts = (payload.customer_name || '').split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // Build user data for advanced matching
  const userData: UserData = {
    email: payload.customer_email,
    phone: payload.customer_phone,
    firstName: firstName,
    lastName: lastName,
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
    return new Response('OK', { status: 200 });
  }

  try {
    // Parse webhook payload
    const payload: LowifyWebhookPayload = await request.json();

    console.log('[Lowify] Venda recebida:', {
      pedido: payload.order_id,
      email: payload.customer_email,
      valor: payload.total_amount,
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
      await trackPurchaseEvent(payload);
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
