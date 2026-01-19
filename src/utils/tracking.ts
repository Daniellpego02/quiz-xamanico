/**
 * Centralized Tracking Utilities
 * 
 * This module provides a unified interface for all tracking operations
 * including Meta Pixel (Facebook), UTMFY, and UTM parameters.
 * 
 * OPTIMIZED FUNNEL (Clean Event Flow):
 * PageView → Lead → QuizComplete → ViewContent → InitiateCheckout → AddPaymentInfo → Purchase
 * 
 * DEPRECATED EVENTS (DO NOT USE):
 * - SubscribedButtonClick (redundant)
 * - button_clicked (redundant)
 * - vsl_page_view (replaced by ViewContent)
 * - QuizAnswer (aggregated into QuizComplete)
 * - QuizProgress (aggregated into QuizComplete)
 */

/// <reference types="vite/client" />

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface MetaPixelEventParams {
  [key: string]: string | number | boolean;
}

// Enhanced TypeScript definitions for Facebook Pixel
interface FacebookPixel {
  (action: 'track', eventName: string, params?: MetaPixelEventParams): void;
  (action: 'trackCustom', eventName: string, params?: MetaPixelEventParams): void;
  (action: 'init', pixelId: string): void;
  queue?: any[];
  loaded?: boolean;
  version?: string;
}

declare global {
  interface Window {
    fbq?: FacebookPixel;
    _fbq?: FacebookPixel;
    pixelId?: string;
  }
}

// ============================================================================
// CONSTANTS
// ============================================================================

// Note: Pixel IDs are configured directly in HTML files (index.html, public/obrigado.html)
// This ensures they load before the application code and are available immediately

// Session storage keys for deduplication
const SESSION_KEYS = {
  INITIATE_CHECKOUT_FIRED: 'ic_fired',
  VIEW_CONTENT_FIRED: 'vc_fired',
  QUIZ_HALFWAY_FIRED: 'qh_fired',
} as const;

// Deprecated events that should NOT be tracked
const DEPRECATED_EVENTS = [
  'SubscribedButtonClick',
  'button_clicked',
  'vsl_page_view',
  'QuizAnswer',
  'QuizProgress',
] as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Safely checks if Meta Pixel is loaded and available
 */
function isMetaPixelLoaded(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

/**
 * Check if an event has already been fired in this session
 */
function hasEventFiredInSession(key: string): boolean {
  if (typeof sessionStorage === 'undefined') return false;
  return sessionStorage.getItem(key) === 'true';
}

/**
 * Mark an event as fired in this session
 */
function markEventAsFiredInSession(key: string): void {
  if (typeof sessionStorage === 'undefined') return;
  sessionStorage.setItem(key, 'true');
}

/**
 * Check if an event is deprecated and should be blocked
 */
function isDeprecatedEvent(eventName: string): boolean {
  return DEPRECATED_EVENTS.includes(eventName as typeof DEPRECATED_EVENTS[number]);
}

/**
 * Safe wrapper for Meta Pixel tracking events
 * Includes error handling, logging, and deprecated event blocking
 */
function trackMetaPixelEvent(
  eventName: string,
  params?: MetaPixelEventParams,
  isCustom: boolean = false
): void {
  try {
    // Block deprecated events
    if (isDeprecatedEvent(eventName)) {
      if (import.meta.env?.DEV) {
        console.warn('[Tracking] Blocked deprecated event:', eventName);
      }
      return;
    }

    if (!isMetaPixelLoaded()) {
      console.warn('[Tracking] Meta Pixel not loaded, skipping event:', eventName);
      return;
    }

    if (isCustom) {
      window.fbq!('trackCustom', eventName, params);
    } else {
      window.fbq!('track', eventName, params);
    }

    // Development logging
    if (import.meta.env?.DEV) {
      console.log('[Tracking] Meta Pixel Event:', eventName, params);
    }
  } catch (error) {
    console.error('[Tracking] Error tracking Meta Pixel event:', error);
  }
}

// ============================================================================
// PUBLIC TRACKING API
// ============================================================================

/**
 * Tracking API for Quiz Application
 */
const tracking = {
  /**
   * Standard Meta Pixel Events
   */
  meta: {
    /**
     * Track page view
     */
    pageView(): void {
      trackMetaPixelEvent('PageView');
    },

    /**
     * Track lead generation (Quiz started)
     */
    lead(params?: { content_name?: string }): void {
      trackMetaPixelEvent('Lead', params);
    },

    /**
     * Track completed registration (Quiz completed)
     */
    completeRegistration(params?: { content_name?: string; path?: string }): void {
      trackMetaPixelEvent('CompleteRegistration', params);
    },

    /**
     * Track purchase event
     */
    purchase(params: { value: number; currency: string; content_name?: string }): void {
      trackMetaPixelEvent('Purchase', params);
    },

    /**
     * Track "Add to Cart" equivalent event
     * DEDUPLICATED: Only fires once per session
     */
    initiateCheckout(params?: { content_name?: string; value?: number; currency?: string }): void {
      // Deduplicate: only fire once per session
      if (hasEventFiredInSession(SESSION_KEYS.INITIATE_CHECKOUT_FIRED)) {
        if (import.meta.env?.DEV) {
          console.log('[Tracking] InitiateCheckout already fired this session, skipping');
        }
        return;
      }
      
      trackMetaPixelEvent('InitiateCheckout', params);
      markEventAsFiredInSession(SESSION_KEYS.INITIATE_CHECKOUT_FIRED);
    },

    /**
     * Track custom event with any name and params
     */
    trackEvent(eventName: string, params?: MetaPixelEventParams): void {
      trackMetaPixelEvent(eventName, params, true);
    },
  },

  /**
   * Custom Quiz-specific Events
   * 
   * OPTIMIZED: QuizAnswer and QuizProgress are now DEPRECATED
   * Only Lead, QuizStarted, QuizHalfway (optional), and QuizComplete are tracked
   */
  quiz: {
    /**
     * Track quiz start with user name
     */
    started(userName: string): void {
      trackMetaPixelEvent(
        'QuizStarted',
        {
          name_provided: true,
          user_name: userName,
        },
        true
      );
    },

    /**
     * @deprecated - No longer tracked to reduce algorithmic noise
     * Quiz answers are now aggregated in QuizComplete event
     */
    answer(_data: {
      questionTitle: string;
      questionStep: number;
      answerValue: string;
      answerLabel: string;
      quizPath: string;
    }): void {
      // DEPRECATED: Do not track individual quiz answers
      // Answers are aggregated in QuizComplete event
      if (import.meta.env?.DEV) {
        console.log('[Tracking] QuizAnswer is deprecated and not tracked');
      }
    },

    /**
     * @deprecated - No longer tracked to reduce algorithmic noise
     * Progress is now implied by QuizComplete event
     */
    progress(_percentage: number, _step: number): void {
      // DEPRECATED: Do not track quiz progress
      if (import.meta.env?.DEV) {
        console.log('[Tracking] QuizProgress is deprecated and not tracked');
      }
    },

    /**
     * Track quiz halfway completion
     * DEDUPLICATED: Only fires once per session (optional event)
     */
    halfway(): void {
      // Deduplicate: only fire once per session
      if (hasEventFiredInSession(SESSION_KEYS.QUIZ_HALFWAY_FIRED)) {
        if (import.meta.env?.DEV) {
          console.log('[Tracking] QuizHalfway already fired this session, skipping');
        }
        return;
      }
      
      trackMetaPixelEvent('QuizHalfway', {}, true);
      markEventAsFiredInSession(SESSION_KEYS.QUIZ_HALFWAY_FIRED);
    },

    /**
     * Track quiz completion with aggregated data
     * This is the main quiz funnel event to send to Meta
     */
    complete(path: string, aggregatedData?: {
      quiz_score?: number;
      quiz_segment?: string;
      time_to_complete?: number;
    }): void {
      trackMetaPixelEvent(
        'QuizComplete',
        {
          content_name: 'Quiz Completo',
          path,
          ...(aggregatedData || {}),
        },
        true
      );
    },
  },

  /**
   * Offer and Sales Funnel Events
   */
  funnel: {
    /**
     * Track offer page view (ViewContent)
     * DEDUPLICATED: Only fires once per session
     */
    viewOffer(offerName: string): void {
      // Deduplicate: only fire once per session
      if (hasEventFiredInSession(SESSION_KEYS.VIEW_CONTENT_FIRED)) {
        if (import.meta.env?.DEV) {
          console.log('[Tracking] ViewContent already fired this session, skipping');
        }
        return;
      }
      
      trackMetaPixelEvent('ViewContent', { content_name: offerName });
      markEventAsFiredInSession(SESSION_KEYS.VIEW_CONTENT_FIRED);
    },

    /**
     * Track CTA button click
     */
    clickCTA(ctaName: string): void {
      trackMetaPixelEvent(
        'CTAClick',
        {
          content_name: ctaName,
        },
        true
      );
    },

    /**
     * Track upsell view
     */
    viewUpsell(upsellName: string): void {
      trackMetaPixelEvent(
        'ViewUpsell',
        {
          content_name: upsellName,
        },
        true
      );
    },

    /**
     * Track downsell view
     */
    viewDownsell(downsellName: string): void {
      trackMetaPixelEvent(
        'ViewDownsell',
        {
          content_name: downsellName,
        },
        true
      );
    },
  },

  /**
   * UTM Parameter Management
   */
  utm: {
    /**
     * Get all UTM parameters from URL
     */
    getParams(): Record<string, string> {
      if (typeof window === 'undefined') return {};

      const params = new URLSearchParams(window.location.search);
      const utmParams: Record<string, string> = {};

      const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

      utmKeys.forEach((key) => {
        const value = params.get(key);
        if (value) {
          utmParams[key] = value;
        }
      });

      return utmParams;
    },

    /**
     * Store UTM parameters in sessionStorage for persistence
     */
    storeParams(): void {
      if (typeof window === 'undefined') return;

      const utmParams = tracking.utm.getParams();
      if (Object.keys(utmParams).length > 0) {
        sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
      }
    },

    /**
     * Retrieve stored UTM parameters
     */
    getStoredParams(): Record<string, string> {
      if (typeof window === 'undefined') return {};

      const stored = sessionStorage.getItem('utm_params');
      return stored ? JSON.parse(stored) : {};
    },
  },

  /**
   * Initialize all tracking systems
   * Call this once when the app loads
   */
  init(): void {
    // Store UTM parameters on page load
    tracking.utm.storeParams();

    // Log initialization in development
    if (import.meta.env?.DEV) {
      console.log('[Tracking] Tracking systems initialized');
      console.log('[Tracking] UTM Parameters:', tracking.utm.getParams());
    }
  },
};

// ============================================================================
// AUTO-INITIALIZATION
// ============================================================================

// Auto-initialize tracking when module loads
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => tracking.init());
  } else {
    tracking.init();
  }
}

export { tracking };
