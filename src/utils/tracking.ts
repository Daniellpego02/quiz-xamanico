/**
 * Centralized Tracking Utilities
 * 
 * This module provides a unified interface for all tracking operations
 * including Meta Pixel (Facebook), UTMFY, and UTM parameters.
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
 * Safe wrapper for Meta Pixel tracking events
 * Includes error handling and logging
 */
function trackMetaPixelEvent(
  eventName: string,
  params?: MetaPixelEventParams,
  isCustom: boolean = false
): void {
  try {
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
     */
    initiateCheckout(params?: { content_name?: string; value?: number }): void {
      trackMetaPixelEvent('InitiateCheckout', params);
    },
  },

  /**
   * Custom Quiz-specific Events
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
     * Track individual quiz answer
     */
    answer(data: {
      questionTitle: string;
      questionStep: number;
      answerValue: string;
      answerLabel: string;
      quizPath: string;
    }): void {
      trackMetaPixelEvent(
        'QuizAnswer',
        {
          content_name: data.questionTitle,
          question_step: data.questionStep,
          answer_value: data.answerValue,
          answer_label: data.answerLabel,
          quiz_path: data.quizPath,
        },
        true
      );
    },

    /**
     * Track quiz progress percentage
     */
    progress(percentage: number, step: number): void {
      trackMetaPixelEvent(
        'QuizProgress',
        {
          percentage,
          step,
        },
        true
      );
    },

    /**
     * Track quiz halfway completion
     */
    halfway(): void {
      trackMetaPixelEvent('QuizHalfway', {}, true);
    },

    /**
     * Track quiz completion
     */
    complete(path: string): void {
      trackMetaPixelEvent(
        'QuizComplete',
        {
          content_name: 'Quiz Completo',
          path,
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
     * Track offer page view
     */
    viewOffer(offerName: string): void {
      trackMetaPixelEvent('ViewContent', { content_name: offerName });
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
