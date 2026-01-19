/**
 * Lowify Webhook Handler (Legacy Node.js API Route)
 * 
 * This is a fallback handler for Vercel's Node.js runtime.
 * The main implementation is in /api/webhooks/lowify.ts (Edge Function).
 * 
 * Endpoint: POST /api/lowify
 */

export default async (req, res) => {
  console.log('[Lowify Legacy] Request received:', { method: req.method, url: req.url });
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let payload = req.body;
    
    // If body is a string, try to parse as JSON
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
      console.log('[Lowify Legacy] Payload is empty');
      return res.status(200).json({ success: true, message: 'Empty payload received' });
    }
    
    // Log sanitized payload info (not full PII)
    const hasEmail = !!(payload.email || payload.customer_email || payload.buyer_email);
    const hasPhone = !!(payload.phone || payload.customer_phone || payload.buyer_phone);
    const orderId = payload.order_id || payload.orderId || payload.transaction_id || payload.id;
    
    console.log('[Lowify Legacy] Payload info:', {
      hasEmail,
      hasPhone,
      orderId,
      keys: Object.keys(payload),
    });
    
    // Detect event type heuristically
    const status = String(payload.status || payload.event || payload.type || '').toLowerCase();
    const isPending = ['pending', 'waiting', 'pix_generated', 'aguardando', 'pendente', 'created'].some(p => status.includes(p));
    const isApproved = ['approved', 'paid', 'completed', 'aprovada', 'pago', 'sale.paid'].some(p => status.includes(p));
    
    let eventType = 'UNKNOWN';
    if (isPending) eventType = 'PIX_GENERATED';
    if (isApproved) eventType = 'APPROVED';
    
    console.log('[Lowify Legacy] Detected event type:', eventType);
    
    // For now, just acknowledge - main tracking happens in Edge function
    return res.status(200).json({ 
      success: true,
      message: 'Event received (legacy handler)',
      eventType,
      orderId,
      note: 'Use /api/webhooks/lowify for full CAPI integration'
    });
    
  } catch (error) {
    console.error('[Lowify Legacy] Webhook error:', error);
    // Always return 200 to prevent retries
    return res.status(200).json({ 
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
};
