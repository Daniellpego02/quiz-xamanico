/**
 * Lowify Webhook Handler (JavaScript - Legacy Node.js)
 * 
 * This is a legacy handler for Vercel's Node.js runtime.
 * The main implementation is in /api/webhooks/lowify.ts (Edge Function).
 * 
 * Endpoint: POST /api/webhooks/lowify
 * 
 * NOTE: This file redirects to the TypeScript Edge Function implementation
 * which provides full CAPI integration with proper heuristic event detection.
 */

module.exports = async (req, res) => {
  console.log('[Lowify JS] Request received:', { method: req.method, url: req.url });
  
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let payload = req.body;
    
    // If body is a string, try to parse it
    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch {
        // Try form-urlencoded
        const params = new URLSearchParams(payload);
        payload = Object.fromEntries(params.entries());
      }
    }

    if (!payload || Object.keys(payload).length === 0) {
      console.log('[Lowify JS] Empty payload received');
      return res.status(200).json({ success: true, message: 'Empty payload received' });
    }

    // Sanitized logging (no PII)
    const hasEmail = !!(payload.email || payload.customer_email || payload.buyer_email || 
                       payload.data?.email || payload.data?.buyer_email || payload.data?.buyer?.email);
    const hasPhone = !!(payload.phone || payload.customer_phone || payload.buyer_phone ||
                       payload.data?.phone || payload.data?.buyer_phone || payload.data?.buyer?.phone);
    const orderId = payload.order_id || payload.orderId || payload.transaction_id || payload.id ||
                   payload.data?.order_id || payload.data?.id;

    console.log('[Lowify JS] Payload info:', {
      hasEmail,
      hasPhone,
      orderId,
      keys: Object.keys(payload),
    });

    // Heuristic event detection
    const statusFields = [
      payload.status, payload.event, payload.type, payload.action,
      payload.data?.status, payload.data?.event
    ].filter(Boolean);
    
    const statusStr = statusFields.join(' ').toLowerCase();
    
    const isPending = ['pending', 'waiting', 'pix_generated', 'aguardando', 'pendente', 'created'].some(p => statusStr.includes(p));
    const isApproved = ['approved', 'paid', 'completed', 'aprovada', 'pago', 'sale.paid'].some(p => statusStr.includes(p));
    
    let eventType = 'UNKNOWN';
    if (isPending) eventType = 'PIX_GENERATED';
    if (isApproved) eventType = 'APPROVED';

    console.log('[Lowify JS] Detected event type:', eventType, 'from status:', statusStr);

    // NOTE: For full CAPI integration, use the Edge Function at /api/webhooks/lowify.ts
    // This JS file is a legacy fallback that logs and acknowledges the webhook
    
    return res.status(200).json({ 
      success: true,
      message: 'Webhook received (JS handler)',
      eventType,
      orderId,
      note: 'Full CAPI integration in Edge Function handler'
    });

  } catch (error) {
    console.error('[Lowify JS] Webhook error:', error);
    // Always return 200 to prevent retries
    return res.status(200).json({ 
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
};
