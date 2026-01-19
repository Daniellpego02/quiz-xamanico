import crypto from 'crypto';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { capi } from '../src/utils/capi';
import { eventIdGenerator } from '../src/utils/eventIdGenerator';

/**
 * Lowify Webhook Handler
 * Validates webhook signature (HMAC-SHA256) and processes Lowify events
 * Sends conversion data to Meta CAPI (Conversions API)
 */

interface LowifyWebhookPayload {
  event: 'sale.paid' | 'sale.pending';
  data: {
    order_id: string;
    buyer_email: string;
    buyer_phone?: string;
    buyer_name?: string;
    amount: number;
    currency: string;
    product: {
      id: string;
      name: string;
    };
    timestamp: number;
  };
}

function verifyLowifySignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(hash),
    Buffer.from(signature)
  );
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get signature from headers
    const signature = req.headers['x-lowify-signature'] as string;
    const rawBody = JSON.stringify(req.body);

    // Validate signature
    const webhookSecret = process.env.LOWIFY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('LOWIFY_WEBHOOK_SECRET not configured');
      return res.status(500).json({ error: 'Webhook secret not configured' });
    }

    if (!signature) {
      console.error('Missing webhook signature header');
      return res.status(401).json({ error: 'Missing signature' });
    }

    if (!verifyLowifySignature(rawBody, signature, webhookSecret)) {
      console.error('Invalid webhook signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const payload: LowifyWebhookPayload = req.body;

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
}
