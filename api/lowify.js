export default async (req, res) => {
  console.log('[Lowify] Request received:', { method: req.method, url: req.url });
  console.log('[Lowify] Request body:', req.body);
  
  if (req.method !== 'POST') {
    console.log('[Lowify] Method not POST:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let payload = req.body;
    
    // If body is a string, parse it
    if (typeof payload === 'string') {
      payload = JSON.parse(payload);
    }
    
    if (!payload) {
      console.log('[Lowify] Payload is empty');
      return res.status(400).json({ error: 'Empty payload' });
    }
    
    console.log('[Lowify] Payload:', payload);
    
    // Check if it's a sale.paid event
    if (payload.event !== 'sale.paid') {
      console.log('[Lowify] Ignoring event:', payload.event);
      return res.status(200).json({ success: true, skipped: true, reason: `Event ${payload.event} not tracked` });
    }
    
    console.log('[Lowify] Processing sale.paid event');
    const eventData = payload.data;
    
    // Return success without calling capi yet (to test basic webhook)
    console.log('[Lowify] Sale processed:', eventData?.order_id);
    return res.status(200).json({ 
      success: true,
      message: 'Sale event received and processed',
      orderId: eventData?.order_id
    });
    
  } catch (error) {
    console.error('[Lowify] Webhook error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message
    });
  }
};
