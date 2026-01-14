/**
 * BuckPay Webhook Handler
 * 
 * Vercel Edge Function for handling BuckPay payment webhooks.
 * Validates event_id and tracks Purchase events to Meta CAPI.
 */

import { capi } from '../../src/utils/capi';
import { eventIdGenerator } from '../../src/utils/eventIdGenerator';
import type { UserData } from '../../src/utils/advancedMatching';

interface BuckPayWebhookData {
  id: string;
  status: 'pending' | 'paid';
  total_amount: number;
  buyer: { name: string; email: string; phone?: string };
  offer?: { id?: string; name?: string; quantity?: number; discount_price?: number };
}

interface BuckPayWebhookPayload {
  event: 'transaction.created' | 'transaction.processed';
  data: BuckPayWebhookData;
}

function getAccessToken(): string {
  const token = process.env.META_ACCESS_TOKEN;
  if (!token) throw new Error('Meta Access Token not configured');
  return token;
}

function getPixelId(): string {
  return process.env.META_PIXEL_ID || '1908080873443730';
}

async function trackPurchaseEvent(payload: BuckPayWebhookPayload): Promise<void> {
  const { data } = payload;
  if (data.status !== 'paid') return;

  const userData: UserData = {
    email: data.buyer.email,
    phone: data.buyer.phone,
    firstName: data.buyer.name.split(' ')[0],
    lastName: data.buyer.name.split(' ').slice(1).join(' '),
  };

  const customData = capi.buildPurchaseCustomData({
    value: data.total_amount / 100,
    currency: 'BRL',
    contentIds: [data.offer?.id || 'product'],
    contentName: data.offer?.name || 'Produto',
    contentType: 'product',
    orderId: data.id,
    numItems: data.offer?.quantity || 1,
  });

  const eventId = `purchase_${data.id}`;
  if (eventIdGenerator.isDuplicate(eventId)) return;

  const capiPayload = await capi.buildEventPayload('Purchase', userData, customData, undefined, eventId);
  const response = await capi.sendEvent(capiPayload, getAccessToken(), getPixelId());
  
  console.log('[BuckPay] Purchase tracked:', { eventId, transactionId: data.id });
  eventIdGenerator.store(eventId, 'Purchase');
}

export const config = { runtime: 'edge' };

export default async function handler(request: Request) {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  try {
    const payload: BuckPayWebhookPayload = await request.json();
    
    if (payload.event === 'transaction.processed') {
      await trackPurchaseEvent(payload);
    }

    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('[BuckPay Webhook] Error:', error);
    return new Response('OK', { status: 200 });
  }
}
