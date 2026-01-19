const crypto = require('crypto');
const { capi } = require('../src/utils/capi');
const { eventIdGenerator } = require('../src/utils/eventIdGenerator');

/**
 * Lowify Webhook Handler (JavaScript)
 * Processes Lowify sale.paid events and sends to Meta CAPI
 */

module.exports = async (req, res) => {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = req.body;

    // Only process paid sales
    if (payload.event !== 'sale.paid') {
      console.log(`Ignoring event: ${payload.event}`);
      return res.status(200).json({ success: true, skipped: true });
    }

    const eventData = payload.data;

    // Prepare Meta CAPI event
    const capiEvent = {
      eventName: 'Purchase',
      eventId: eventIdGenerator(),
      eventTime: Math.floor(Date.now() / 1000),
      userData: {
        em: eventData.buyer_email ? crypto
          .createHash('sha256')
          .update(eventData.buyer_email.toLowerCase())
          .digest('hex')
          : undefined,
        ph: eventData.buyer_phone ? crypto
          .createHash('sha256')
          .update(eventData.buyer_phone.replace(/\D/g, ''))
          .digest('hex')
          : undefined,
        fn: eventData.buyer_name ? crypto
          .createHash('sha256')
          .update(eventData.buyer_name.toLowerCase())
          .digest('hex')
          : undefined,
      },
      customData: {
        value: eventData.amount / 100, // Convert cents to real
        currency: eventData.currency || 'BRL',
        contentName: eventData.product.name,
        contentId: eventData.product.id,
      },
      externalId: eventData.order_id,
    };

    // Send to Meta CAPI
    await capi({
      data: [capiEvent],
    });

    console.log(`Lowify webhook processed: ${eventData.order_id}`);
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Lowify webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
