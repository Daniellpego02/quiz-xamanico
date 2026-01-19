/**
 * Meta Conversions API (CAPI) Integration
 * 
 * Server-side tracking implementation for Meta Pixel events.
 * Enables event deduplication with client-side pixel using event_id.
 * 
 * Requirements:
 * - Event deduplication rate > 95%
 * - Event Match Quality (EMQ) > 8.0
 * - Advanced Matching with 12+ parameters
 * 
 * Reference: https://developers.facebook.com/docs/marketing-api/conversions-api
 */

import { generateEventIdWithMetadata, EventIdMetadata } from './eventIdGenerator';
import { buildAdvancedMatchingData, UserData, NormalizedUserData } from './advancedMatching';
import { META_PIXEL_ID } from '../config/tracking.config';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface CAPICustomData {
  /** Currency code (ISO 4217) */
  currency?: string;
  /** Total value of the event */
  value?: number;
  /** Content name/title */
  content_name?: string;
  /** Content category */
  content_category?: string;
  /** Content IDs (array of product IDs) */
  content_ids?: string[];
  /** Content type (e.g., 'product', 'product_group') */
  content_type?: string;
  /** Order ID / Transaction ID */
  order_id?: string;
  /** Predicted lifetime value */
  predicted_ltv?: number;
  /** Number of items */
  num_items?: number;
  /** Search string */
  search_string?: string;
  /** Status (e.g., 'completed', 'pending') */
  status?: string;
  /** Contents (detailed product information) */
  contents?: Array<{
    id: string;
    quantity: number;
    item_price?: number;
  }>;
  /** Additional custom properties */
  [key: string]: unknown;
}

export interface CAPIEventPayload {
  /** Event name (e.g., 'Purchase', 'Lead', 'ViewContent') */
  event_name: string;
  /** Event time (Unix timestamp in seconds) */
  event_time: number;
  /** Unique event ID for deduplication */
  event_id: string;
  /** Event source URL */
  event_source_url: string;
  /** Action source (always 'website' for web events) */
  action_source: 'website';
  /** User data (normalized and hashed) */
  user_data: NormalizedUserData;
  /** Custom data specific to the event */
  custom_data?: CAPICustomData;
  /** Test event code (for testing in Events Manager) */
  test_event_code?: string;
  /** Opt out flag */
  opt_out?: boolean;
}

export interface CAPIBatchPayload {
  /** Array of event payloads */
  data: CAPIEventPayload[];
  /** Test event code (applies to all events in batch) */
  test_event_code?: string;
}

export interface CAPIResponse {
  /** Number of events received */
  events_received: number;
  /** Number of events processed */
  events_processed?: number;
  /** Messages from the API */
  messages?: string[];
  /** Facebook trace ID for debugging */
  fbtrace_id?: string;
}

export interface CAPIErrorResponse {
  error: {
    message: string;
    type: string;
    code: number;
    error_subcode?: number;
    fbtrace_id?: string;
  };
}

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Get Meta CAPI endpoint URL
 * @param pixelId - Meta Pixel ID
 * @returns CAPI endpoint URL
 */
export function getCAPIEndpoint(pixelId: string = META_PIXEL_ID): string {
  return `https://graph.facebook.com/v18.0/${pixelId}/events`;
}

/**
 * Get test event code from environment
 * Used for testing events in Meta Events Manager
 */
export function getTestEventCode(): string | undefined {
  // Check for test event code in various places
  if (typeof window !== 'undefined' && (window as any).__TEST_EVENT_CODE) {
    return (window as any).__TEST_EVENT_CODE;
  }
  
  if (import.meta.env?.VITE_META_TEST_EVENT_CODE) {
    return import.meta.env.VITE_META_TEST_EVENT_CODE;
  }
  
  // Enable test events in development by default
  if (import.meta.env?.DEV) {
    return 'TEST12345'; // Default test code for dev
  }
  
  return undefined;
}

// ============================================================================
// PAYLOAD BUILDERS
// ============================================================================

/**
 * Build a complete CAPI event payload
 * 
 * @param eventName - Name of the event (e.g., 'Purchase', 'Lead')
 * @param userData - User data for advanced matching
 * @param customData - Event-specific custom data
 * @param eventSourceUrl - URL where the event occurred
 * @param eventId - Optional event ID (will be generated if not provided)
 * @param testEventCode - Optional test event code
 * @returns Complete CAPI event payload
 */
export async function buildCAPIEventPayload(
  eventName: string,
  userData: UserData,
  customData?: CAPICustomData,
  eventSourceUrl?: string,
  eventId?: string,
  testEventCode?: string
): Promise<CAPIEventPayload> {
  // Generate event ID if not provided
  const eventMeta: EventIdMetadata = eventId
    ? {
        eventId,
        timestamp: Math.floor(Date.now() / 1000),
        eventName,
        source: 'server',
      }
    : generateEventIdWithMetadata(eventName, 'server');
  
  // Build advanced matching data
  const normalizedUserData = await buildAdvancedMatchingData(userData);
  
  // Build payload
  const payload: CAPIEventPayload = {
    event_name: eventName,
    event_time: eventMeta.timestamp,
    event_id: eventMeta.eventId,
    event_source_url: eventSourceUrl || (typeof window !== 'undefined' ? window.location.href : ''),
    action_source: 'website',
    user_data: normalizedUserData,
  };
  
  // Add custom data if provided
  if (customData) {
    payload.custom_data = customData;
  }
  
  // Add test event code if provided or in development
  const testCode = testEventCode || getTestEventCode();
  if (testCode) {
    payload.test_event_code = testCode;
  }
  
  return payload;
}

/**
 * Build custom data for Purchase event
 * Includes all required parameters for proper tracking
 * 
 * @param params - Purchase parameters
 * @returns Custom data object for Purchase event
 */
export function buildPurchaseCustomData(params: {
  value: number;
  currency: string;
  contentIds: string[];
  contentName?: string;
  contentType?: string;
  orderId?: string;
  numItems?: number;
  contents?: Array<{ id: string; quantity: number; item_price?: number }>;
}): CAPICustomData {
  return {
    value: params.value,
    currency: params.currency,
    content_ids: params.contentIds,
    content_name: params.contentName,
    content_type: params.contentType || 'product',
    order_id: params.orderId,
    num_items: params.numItems || params.contentIds.length,
    contents: params.contents,
  };
}

/**
 * Build custom data for Lead event
 * 
 * @param params - Lead parameters
 * @returns Custom data object for Lead event
 */
export function buildLeadCustomData(params: {
  contentName?: string;
  value?: number;
  currency?: string;
  status?: string;
  predictedLtv?: number;
}): CAPICustomData {
  return {
    content_name: params.contentName,
    value: params.value,
    currency: params.currency || 'BRL',
    status: params.status || 'completed',
    predicted_ltv: params.predictedLtv,
  };
}

/**
 * Build custom data for InitiateCheckout event
 * 
 * @param params - Checkout parameters
 * @returns Custom data object for InitiateCheckout event
 */
export function buildInitiateCheckoutCustomData(params: {
  value: number;
  currency: string;
  contentIds: string[];
  contentName?: string;
  contentType?: string;
  numItems?: number;
  contents?: Array<{ id: string; quantity: number; item_price?: number }>;
}): CAPICustomData {
  return {
    value: params.value,
    currency: params.currency,
    content_ids: params.contentIds,
    content_name: params.contentName,
    content_type: params.contentType || 'product',
    num_items: params.numItems || params.contentIds.length,
    contents: params.contents,
  };
}

/**
 * Build custom data for ViewContent event
 * 
 * @param params - View content parameters
 * @returns Custom data object for ViewContent event
 */
export function buildViewContentCustomData(params: {
  contentIds: string[];
  contentName?: string;
  contentType?: string;
  contentCategory?: string;
  value?: number;
  currency?: string;
}): CAPICustomData {
  return {
    content_ids: params.contentIds,
    content_name: params.contentName,
    content_type: params.contentType || 'product',
    content_category: params.contentCategory,
    value: params.value,
    currency: params.currency || 'BRL',
  };
}

/**
 * Build custom data for AddPaymentInfo event
 * Used when user initiates payment (e.g., PIX generated)
 * 
 * @param params - AddPaymentInfo parameters
 * @returns Custom data object for AddPaymentInfo event
 */
export function buildAddPaymentInfoCustomData(params: {
  value?: number;
  currency?: string;
  contentIds?: string[];
  contentName?: string;
  contentType?: string;
  orderId?: string;
}): CAPICustomData {
  return {
    value: params.value,
    currency: params.currency || 'BRL',
    content_ids: params.contentIds,
    content_name: params.contentName,
    content_type: params.contentType || 'product',
    order_id: params.orderId,
  };
}

// ============================================================================
// API FUNCTIONS (Server-Side Only)
// ============================================================================

/**
 * Send event to Meta Conversions API
 * 
 * IMPORTANT: This should ONLY be called from server-side code (API routes, Edge Functions)
 * to keep the access token secure.
 * 
 * @param payload - CAPI event payload
 * @param accessToken - Meta API access token
 * @param pixelId - Meta Pixel ID (defaults to config value)
 * @returns API response
 */
export async function sendCAPIEvent(
  payload: CAPIEventPayload,
  accessToken: string,
  pixelId: string = META_PIXEL_ID
): Promise<CAPIResponse> {
  const endpoint = getCAPIEndpoint(pixelId);
  
  // Build batch payload (even for single event)
  const batchPayload: CAPIBatchPayload = {
    data: [payload],
  };
  
  // Add test event code to batch if present
  if (payload.test_event_code) {
    batchPayload.test_event_code = payload.test_event_code;
  }
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...batchPayload,
      access_token: accessToken,
    }),
  });
  
  if (!response.ok) {
    const error = (await response.json()) as CAPIErrorResponse;
    throw new Error(
      `CAPI Error: ${error.error.message} (Code: ${error.error.code}, Type: ${error.error.type})`
    );
  }
  
  return response.json() as Promise<CAPIResponse>;
}

/**
 * Send multiple events to Meta Conversions API in a batch
 * 
 * @param payloads - Array of CAPI event payloads
 * @param accessToken - Meta API access token
 * @param pixelId - Meta Pixel ID (defaults to config value)
 * @returns API response
 */
export async function sendCAPIBatch(
  payloads: CAPIEventPayload[],
  accessToken: string,
  pixelId: string = META_PIXEL_ID
): Promise<CAPIResponse> {
  const endpoint = getCAPIEndpoint(pixelId);
  
  // Get test event code from first payload if present
  const testEventCode = payloads.find((p) => p.test_event_code)?.test_event_code;
  
  const batchPayload: CAPIBatchPayload = {
    data: payloads,
  };
  
  if (testEventCode) {
    batchPayload.test_event_code = testEventCode;
  }
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...batchPayload,
      access_token: accessToken,
    }),
  });
  
  if (!response.ok) {
    const error = (await response.json()) as CAPIErrorResponse;
    throw new Error(
      `CAPI Error: ${error.error.message} (Code: ${error.error.code}, Type: ${error.error.type})`
    );
  }
  
  return response.json() as Promise<CAPIResponse>;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get client IP address from request headers
 * Works with Vercel, Cloudflare, and other platforms
 * 
 * @param request - HTTP request object
 * @returns Client IP address or null
 */
export function getClientIpAddress(request: Request): string | null {
  const headers = request.headers;
  
  // Try various IP headers
  const ipHeaders = [
    'x-forwarded-for',
    'x-real-ip',
    'cf-connecting-ip', // Cloudflare
    'x-vercel-forwarded-for', // Vercel
    'x-client-ip',
  ];
  
  for (const header of ipHeaders) {
    const value = headers.get(header);
    if (value) {
      // x-forwarded-for can contain multiple IPs, take the first one
      return value.split(',')[0].trim();
    }
  }
  
  return null;
}

/**
 * Get client user agent from request headers
 * 
 * @param request - HTTP request object
 * @returns User agent string
 */
export function getClientUserAgent(request: Request): string {
  return request.headers.get('user-agent') || '';
}

/**
 * Validate CAPI payload before sending
 * 
 * @param payload - CAPI event payload
 * @returns Validation result with any errors
 */
export function validateCAPIPayload(payload: CAPIEventPayload): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  // Check required fields
  if (!payload.event_name) {
    errors.push('event_name is required');
  }
  
  if (!payload.event_time) {
    errors.push('event_time is required');
  }
  
  if (!payload.event_id) {
    errors.push('event_id is required');
  }
  
  if (!payload.event_source_url) {
    errors.push('event_source_url is required');
  }
  
  if (!payload.action_source) {
    errors.push('action_source is required');
  }
  
  if (!payload.user_data) {
    errors.push('user_data is required');
  } else {
    // Check for at least email or phone
    if (!payload.user_data.em && !payload.user_data.ph) {
      errors.push('user_data must contain at least email (em) or phone (ph)');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

// ============================================================================
// EXPORT
// ============================================================================

export const capi = {
  // Configuration
  getEndpoint: getCAPIEndpoint,
  getTestEventCode,
  
  // Payload builders
  buildEventPayload: buildCAPIEventPayload,
  buildPurchaseCustomData,
  buildLeadCustomData,
  buildInitiateCheckoutCustomData,
  buildViewContentCustomData,
  buildAddPaymentInfoCustomData,
  
  // API functions (server-side only)
  sendEvent: sendCAPIEvent,
  sendBatch: sendCAPIBatch,
  
  // Helpers
  getClientIpAddress,
  getClientUserAgent,
  validatePayload: validateCAPIPayload,
};

export default capi;
