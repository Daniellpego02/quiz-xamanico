/**
 * Meta Conversions API (CAPI) Endpoint
 * 
 * Vercel Edge Function for server-side event tracking.
 * Handles event deduplication with client-side pixel using event_id.
 * 
 * Endpoint: POST /api/track-event
 * 
 * Body:
 * {
 *   eventName: string;
 *   eventId?: string;  // Optional, will be generated if not provided
 *   userData: {
 *     email?: string;
 *     phone?: string;
 *     firstName?: string;
 *     lastName?: string;
 *     city?: string;
 *     state?: string;
 *     zipCode?: string;
 *     country?: string;
 *     // ... other user data fields
 *   };
 *   customData?: {
 *     value?: number;
 *     currency?: string;
 *     content_ids?: string[];
 *     content_name?: string;
 *     content_type?: string;
 *     order_id?: string;
 *     num_items?: number;
 *     // ... other custom data fields
 *   };
 *   eventSourceUrl?: string;
 * }
 * 
 * Response:
 * {
 *   success: boolean;
 *   eventId: string;
 *   message: string;
 *   eventsReceived?: number;
 *   fbTraceId?: string;
 * }
 */

import { capi } from '../../src/utils/capi';
import type { UserData } from '../../src/utils/advancedMatching';
import type { CAPICustomData } from '../../src/utils/capi';

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Get Meta API Access Token from environment
 * IMPORTANT: Set VITE_META_ACCESS_TOKEN in your environment variables
 */
function getAccessToken(): string {
  const token = process.env.VITE_META_ACCESS_TOKEN || process.env.META_ACCESS_TOKEN;
  
  if (!token) {
    throw new Error(
      'Meta Access Token not configured. Set VITE_META_ACCESS_TOKEN or META_ACCESS_TOKEN environment variable.'
    );
  }
  
  return token;
}

/**
 * Get Meta Pixel ID from environment
 */
function getPixelId(): string {
  return process.env.VITE_META_PIXEL_ID || process.env.META_PIXEL_ID || '1908080873443730';
}

// ============================================================================
// REQUEST VALIDATION
// ============================================================================

interface TrackEventRequest {
  eventName: string;
  eventId?: string;
  userData: UserData;
  customData?: CAPICustomData;
  eventSourceUrl?: string;
  testEventCode?: string;
}

function validateRequest(body: any): { valid: boolean; error?: string; data?: TrackEventRequest } {
  if (!body) {
    return { valid: false, error: 'Request body is required' };
  }

  if (!body.eventName || typeof body.eventName !== 'string') {
    return { valid: false, error: 'eventName is required and must be a string' };
  }

  if (!body.userData || typeof body.userData !== 'object') {
    return { valid: false, error: 'userData is required and must be an object' };
  }

  // Check for at least email or phone
  if (!body.userData.email && !body.userData.phone) {
    return {
      valid: false,
      error: 'userData must contain at least email or phone for Advanced Matching',
    };
  }

  return {
    valid: true,
    data: body as TrackEventRequest,
  };
}

// ============================================================================
// EDGE FUNCTION HANDLER
// ============================================================================

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Method not allowed. Use POST.',
      }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    // Parse request body
    const body = await request.json();

    // Validate request
    const validation = validateRequest(body);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({
          success: false,
          error: validation.error,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const requestData = validation.data!;

    // Get client IP and user agent from request headers
    const clientIpAddress = capi.getClientIpAddress(request);
    const clientUserAgent = capi.getClientUserAgent(request);

    // Enhance user data with server-side information
    const enhancedUserData: UserData = {
      ...requestData.userData,
      clientIpAddress: clientIpAddress || undefined,
      clientUserAgent: clientUserAgent || undefined,
    };

    // Build CAPI payload
    const payload = await capi.buildEventPayload(
      requestData.eventName,
      enhancedUserData,
      requestData.customData,
      requestData.eventSourceUrl,
      requestData.eventId, // Use provided event_id for deduplication
      requestData.testEventCode
    );

    // Validate payload
    const payloadValidation = capi.validatePayload(payload);
    if (!payloadValidation.valid) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid payload',
          errors: payloadValidation.errors,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Get access token and pixel ID
    const accessToken = getAccessToken();
    const pixelId = getPixelId();

    // Send event to CAPI
    const response = await capi.sendEvent(payload, accessToken, pixelId);

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        eventId: payload.event_id,
        message: 'Event tracked successfully',
        eventsReceived: response.events_received,
        fbTraceId: response.fbtrace_id,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('[CAPI] Error tracking event:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
