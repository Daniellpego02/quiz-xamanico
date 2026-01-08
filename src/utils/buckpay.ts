/**
 * BuckPay Integration Utilities (RealTech API)
 * 
 * This module provides utilities for integrating with BuckPay/RealTech payment gateway
 * and tracking purchase events across all analytics platforms.
 * 
 * API Endpoint: https://api.realtechdev.com.br
 * Payment Method: PIX
 * 
 * IMPORTANT: You need to request the user-agent header from your account manager
 */

import { BUCKPAY_CONFIG, PRODUCT_CONFIG } from '../config/tracking.config';
import {
  trackPurchase,
  trackMetaEvent,
  trackGtagEvent,
  setClarityTag,
  getTrackingState,
  generateEventId,
  TrackingState,
} from './advancedTracking';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Buyer information for BuckPay transaction
 */
export interface BuckPayBuyer {
  /** Nome e Sobrenome separado por espaço */
  name: string;
  /** E-mail tradicional */
  email: string;
  /** CPF sem pontos nem hífens (opcional) */
  document?: string;
  /** Telefone com 55 na frente, sem espaços ou hífens (opcional) */
  phone?: string;
}

/**
 * Product information for BuckPay transaction
 */
export interface BuckPayProduct {
  /** ID do produto (enviado para UTMify) */
  id: string | null;
  /** Nome do produto (enviado para UTMify) */
  name: string | null;
}

/**
 * Offer information for BuckPay transaction
 */
export interface BuckPayOffer {
  /** ID da oferta (enviado para UTMify) */
  id?: string | null;
  /** Nome da oferta (enviado para UTMify) */
  name?: string | null;
  /** Quantidade (enviado para UTMify) */
  quantity?: number | null;
  /** Preço com desconto (retornado no webhook) */
  discount_price?: number;
}

/**
 * Tracking parameters for BuckPay transaction
 */
export interface BuckPayTracking {
  ref?: string | null;
  src?: string | null;
  sck?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_id?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
}

/**
 * Request body for creating a PIX transaction
 */
export interface BuckPayCreateTransactionRequest {
  /** Identificador externo único */
  external_id: string;
  /** Método de pagamento (sempre "pix") */
  payment_method: 'pix';
  /** Valor em centavos */
  amount: number;
  /** Dados do comprador */
  buyer: BuckPayBuyer;
  /** Dados do produto (opcional) */
  product?: BuckPayProduct;
  /** Dados da oferta (opcional) */
  offer?: BuckPayOffer;
  /** Parâmetros de tracking (opcional) */
  tracking?: BuckPayTracking;
}

/**
 * PIX payment details in response
 */
export interface BuckPayPixDetails {
  /** Código PIX copia e cola */
  code: string;
  /** QR Code em base64 */
  qrcode_base64: string;
}

/**
 * Response from creating a transaction
 */
export interface BuckPayTransactionResponse {
  data: {
    /** ID da transação */
    id: string;
    /** Status: pending, paid */
    status: 'pending' | 'paid';
    /** Método de pagamento */
    payment_method: 'pix';
    /** Detalhes do PIX */
    pix?: BuckPayPixDetails;
    /** Valor total em centavos */
    total_amount: number;
    /** Valor líquido em centavos */
    net_amount: number;
    /** Data de criação */
    created_at: string;
  };
}

/**
 * Webhook payload for transaction events
 */
export interface BuckPayWebhookPayload {
  /** Tipo do evento: transaction.created ou transaction.processed */
  event: 'transaction.created' | 'transaction.processed';
  data: {
    id: string;
    status: 'pending' | 'paid';
    payment_method: 'pix';
    total_amount: number;
    net_amount: number;
    offer?: BuckPayOffer;
    buyer: BuckPayBuyer;
    tracking: {
      ref: string | null;
      src: string | null;
      sck: string | null;
      utm: {
        source: string | null;
        medium: string | null;
        campaign: string | null;
        id: string | null;
        term: string | null;
        content: string | null;
      };
    };
    created_at: string;
  };
}

/**
 * Error response from BuckPay API
 */
export interface BuckPayErrorResponse {
  error: {
    message: string;
    detail: string | Record<string, string[]>;
  };
}

// ============================================================================
// TRACKING FUNCTIONS
// ============================================================================

/**
 * Track checkout initiation (when user clicks to pay)
 */
export function trackBuckPayCheckoutStart(
  productKey: keyof typeof PRODUCT_CONFIG,
  customValue?: number
): string {
  const product = PRODUCT_CONFIG[productKey];
  const state = getTrackingState();
  const eventId = generateEventId();
  
  // Track InitiateCheckout on Meta
  trackMetaEvent('InitiateCheckout', {
    content_name: product.name,
    value: customValue || product.value,
    currency: product.currency,
    content_type: 'product',
    lead_score: state.leadScore,
  }, state);
  
  // Track on GA4
  trackGtagEvent('begin_checkout', {
    value: customValue || product.value,
    currency: product.currency,
    items: [{
      item_name: product.name,
      price: customValue || product.value,
      quantity: 1,
    }],
  });
  
  // Set Clarity tag
  setClarityTag('checkout_initiated', 'true');
  setClarityTag('checkout_product', product.name);
  
  return eventId;
}

/**
 * Track PIX generated (transaction.created webhook)
 */
export function trackPixGenerated(
  transactionId: string,
  productName: string,
  amountCents: number
): void {
  const amountBRL = amountCents / 100;
  
  trackGtagEvent('pix_generated', {
    transaction_id: transactionId,
    item_name: productName,
    value: amountBRL,
    currency: 'BRL',
  });
  
  setClarityTag('pix_generated', 'true');
  setClarityTag('pix_transaction_id', transactionId);
}

/**
 * Track successful purchase (transaction.processed webhook with status: paid)
 */
export function trackBuckPayPurchase(
  transactionId: string,
  productName: string,
  amountCents: number,
  buyerEmail?: string
): string {
  const state = getTrackingState();
  const eventId = generateEventId();
  const amountBRL = amountCents / 100;
  
  // Track on Meta Pixel
  trackPurchase({
    content_name: productName,
    value: amountBRL,
    transaction_id: transactionId,
  }, state);
  
  // Track on GA4 with enhanced ecommerce
  trackGtagEvent('purchase', {
    transaction_id: transactionId,
    value: amountBRL,
    currency: 'BRL',
    payment_type: 'pix',
    items: [{
      item_id: transactionId,
      item_name: productName,
      price: amountBRL,
      quantity: 1,
    }],
  });
  
  // Set Clarity tags
  setClarityTag('purchase_completed', 'true');
  setClarityTag('purchase_value', amountBRL.toString());
  setClarityTag('payment_method', 'pix');
  setClarityTag('transaction_id', transactionId);
  
  return eventId;
}

/**
 * Track payment method selection (PIX)
 */
export function trackPaymentMethodSelected(): void {
  trackGtagEvent('add_payment_info', {
    payment_type: 'pix',
  });
  
  setClarityTag('payment_method_selected', 'pix');
}

// ============================================================================
// API FUNCTIONS (For Server-Side Use)
// ============================================================================

/**
 * Build tracking object from current state for API request
 */
export function buildTrackingParams(state: TrackingState): BuckPayTracking {
  return {
    ref: state.utmParams.ref || null,
    src: state.utmParams.src || null,
    sck: state.utmParams.sck || null,
    utm_source: state.utmParams.utm_source || null,
    utm_medium: state.utmParams.utm_medium || null,
    utm_campaign: state.utmParams.utm_campaign || null,
    utm_id: state.utmParams.utm_id || null,
    utm_term: state.utmParams.utm_term || null,
    utm_content: state.utmParams.utm_content || null,
  };
}

/**
 * Generate external_id for a transaction
 * Uses a combination of timestamp and random string for uniqueness
 */
export function generateExternalId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return `order_${timestamp}_${random}`;
}

/**
 * Convert BRL amount to centavos
 */
export function toCentavos(amountBRL: number): number {
  return Math.round(amountBRL * 100);
}

/**
 * Convert centavos to BRL
 */
export function toBRL(amountCentavos: number): number {
  return amountCentavos / 100;
}

/**
 * Build the request body for creating a PIX transaction
 * 
 * @param buyer - Buyer information (name, email, optional document and phone)
 * @param amountBRL - Amount in BRL (will be converted to centavos)
 * @param productKey - Key from PRODUCT_CONFIG
 * @param offerName - Optional offer name for UTMify tracking
 */
export function buildCreateTransactionRequest(
  buyer: BuckPayBuyer,
  amountBRL: number,
  productKey: keyof typeof PRODUCT_CONFIG,
  offerName?: string
): BuckPayCreateTransactionRequest {
  const product = PRODUCT_CONFIG[productKey];
  const state = getTrackingState();
  
  return {
    external_id: generateExternalId(),
    payment_method: 'pix',
    amount: toCentavos(amountBRL),
    buyer: {
      name: buyer.name,
      email: buyer.email,
      document: buyer.document,
      phone: buyer.phone,
    },
    product: {
      id: productKey,
      name: product.name,
    },
    offer: offerName ? {
      id: productKey,
      name: offerName,
      quantity: 1,
    } : undefined,
    tracking: buildTrackingParams(state),
  };
}

/**
 * Create a PIX transaction via BuckPay API
 * 
 * IMPORTANT: This should be called from a server-side function (Edge Function, API Route)
 * to keep the secret key secure. Do NOT call this from client-side code.
 * 
 * @param request - Transaction request built with buildCreateTransactionRequest()
 * @returns Transaction response with PIX code and QR code
 */
export async function createPixTransaction(
  request: BuckPayCreateTransactionRequest
): Promise<BuckPayTransactionResponse> {
  const response = await fetch(`${BUCKPAY_CONFIG.apiUrl}/v1/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${BUCKPAY_CONFIG.secretKey}`,
      'User-Agent': BUCKPAY_CONFIG.userAgent,
    },
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    const error = await response.json() as BuckPayErrorResponse;
    throw new Error(`BuckPay API Error: ${error.error.message}`);
  }
  
  return response.json() as Promise<BuckPayTransactionResponse>;
}

/**
 * Get transaction details by external_id
 * 
 * @param externalId - The external_id used when creating the transaction
 */
export async function getTransactionByExternalId(
  externalId: string
): Promise<BuckPayTransactionResponse> {
  const response = await fetch(
    `${BUCKPAY_CONFIG.apiUrl}/v1/transactions/external_id/${externalId}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${BUCKPAY_CONFIG.secretKey}`,
        'User-Agent': BUCKPAY_CONFIG.userAgent,
      },
    }
  );
  
  if (!response.ok) {
    const error = await response.json() as BuckPayErrorResponse;
    throw new Error(`BuckPay API Error: ${error.error.message}`);
  }
  
  return response.json() as Promise<BuckPayTransactionResponse>;
}

// ============================================================================
// WEBHOOK HANDLERS
// ============================================================================

/**
 * Parse BuckPay webhook payload
 */
export function parseWebhookPayload(payload: string): BuckPayWebhookPayload | null {
  try {
    return JSON.parse(payload) as BuckPayWebhookPayload;
  } catch (error) {
    console.error('[BuckPay] Error parsing webhook payload:', error);
    return null;
  }
}

/**
 * Handle BuckPay webhook event
 * Call this from your webhook endpoint after parsing the payload
 */
export function handleWebhookEvent(event: BuckPayWebhookPayload): void {
  const { data } = event;
  const productName = data.offer?.name || 'Produto';
  
  switch (event.event) {
    case 'transaction.created':
      // PIX generated, waiting for payment
      console.log('[BuckPay] PIX generated:', data.id);
      trackPixGenerated(data.id, productName, data.total_amount);
      break;
      
    case 'transaction.processed':
      if (data.status === 'paid') {
        // Payment confirmed!
        console.log('[BuckPay] Payment confirmed:', data.id);
        trackBuckPayPurchase(
          data.id,
          productName,
          data.total_amount,
          data.buyer.email
        );
      }
      break;
      
    default:
      console.log('[BuckPay] Unknown webhook event:', event.event);
  }
}

// ============================================================================
// EXPORT
// ============================================================================

export const buckpay = {
  // Tracking
  trackCheckoutStart: trackBuckPayCheckoutStart,
  trackPixGenerated,
  trackPurchase: trackBuckPayPurchase,
  trackPaymentMethodSelected,
  
  // Helpers
  generateExternalId,
  toCentavos,
  toBRL,
  buildTrackingParams,
  buildCreateTransactionRequest,
  
  // API (server-side only)
  createPixTransaction,
  getTransactionByExternalId,
  
  // Webhooks
  parseWebhookPayload,
  handleWebhookEvent,
  
  // Config
  config: BUCKPAY_CONFIG,
};

export default buckpay;
