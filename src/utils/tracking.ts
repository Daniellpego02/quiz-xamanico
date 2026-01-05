/**
 * Centralized Tracking Utilities
 * 
 * This module provides a unified interface for all tracking operations
 * including GA4, Meta Pixel (Facebook), TikTok Pixel, Google Ads, UTMFY, and UTM parameters.
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

// TypeScript definitions for TikTok Pixel
interface TikTokPixel {
  track: (eventName: string, params?: Record<string, any>) => void;
  page: () => void;
  identify: (params?: Record<string, any>) => void;
  instances?: any[];
  load?: (pixelId: string) => void;
}

// TypeScript definitions for Google Analytics (gtag)
interface GtagFunction {
  (command: 'event', eventName: string, params?: Record<string, any>): void;
  (command: 'config', targetId: string, params?: Record<string, any>): void;
  (command: 'js', date: Date): void;
}

declare global {
  interface Window {
    fbq?: FacebookPixel;
    _fbq?: FacebookPixel;
    pixelId?: string;
    ttq?: TikTokPixel;
    gtag?: GtagFunction;
    dataLayer?: any[];
    sessionId?: string;
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
 * Generate a unique session ID for tracking user journey
 */
function generateSessionId(): string {
  if (typeof window !== 'undefined') {
    if (!window.sessionId) {
      window.sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    return window.sessionId;
  }
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Get UTM parameters from URL or sessionStorage
 */
function getUTMParams(): Record<string, string> {
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

  // If no UTMs in URL, try to get from sessionStorage
  if (Object.keys(utmParams).length === 0) {
    const stored = sessionStorage.getItem('utm_params');
    if (stored) {
      return JSON.parse(stored);
    }
  }

  // Set defaults if still empty
  return {
    utm_source: utmParams.utm_source || 'direct',
    utm_medium: utmParams.utm_medium || 'direct',
    utm_campaign: utmParams.utm_campaign || 'direct'
  };
}

/**
 * Safely checks if Meta Pixel is loaded and available
 */
function isMetaPixelLoaded(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

/**
 * Safely checks if TikTok Pixel is loaded and available
 */
function isTikTokPixelLoaded(): boolean {
  return typeof window !== 'undefined' && typeof window.ttq !== 'undefined' && typeof window.ttq.track === 'function';
}

/**
 * Safely checks if Google Analytics (gtag) is loaded and available
 */
function isGtagLoaded(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
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
// CENTRAL TRACKING FUNCTION (GA4 + ALL PIXELS)
// ============================================================================

/**
 * Central tracking function that sends events to all platforms:
 * - Google Analytics 4 (GA4)
 * - Facebook Pixel
 * - TikTok Pixel
 * - Google Ads
 */
function trackEvent(eventName: string, eventData: Record<string, any> = {}): void {
  // Add timestamp, session ID and UTM params to all events
  const enrichedData = {
    ...eventData,
    timestamp: new Date().toISOString(),
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    page_title: typeof document !== 'undefined' ? document.title : '',
    session_id: generateSessionId(),
    ...getUTMParams()
  };

  // ─────────────────────────────────────────────
  // 1️⃣ SEND TO GA4 (Google Analytics)
  // ─────────────────────────────────────────────
  if (isGtagLoaded()) {
    try {
      window.gtag!('event', eventName, enrichedData);
      console.log(`✅ GA4 Event sent: ${eventName}`, enrichedData);
    } catch (error) {
      console.error('[Tracking] Error sending GA4 event:', error);
    }
  }

  // ─────────────────────────────────────────────
  // 2️⃣ SEND TO FACEBOOK PIXEL
  // ─────────────────────────────────────────────
  if (isMetaPixelLoaded()) {
    try {
      // Mapping GA4 events to Facebook events
      const facebookEventMap: Record<string, string> = {
        'quiz_started': 'ViewContent',
        'quiz_question': 'CustomEvent',
        'quiz_completed': 'Lead',
        'resultado_view': 'ViewContent',
        'email_captured': 'Lead',
        'add_to_cart': 'AddToCart',
        'purchase': 'Purchase'
      };

      const fbEventName = facebookEventMap[eventName] || 'CustomEvent';
      
      if (fbEventName === 'CustomEvent') {
        window.fbq!('trackCustom', eventName, enrichedData);
      } else {
        window.fbq!('track', fbEventName, enrichedData);
      }
      
      console.log(`✅ FB Pixel Event: ${fbEventName}`, enrichedData);
    } catch (error) {
      console.error('[Tracking] Error sending Facebook Pixel event:', error);
    }
  }

  // ─────────────────────────────────────────────
  // 3️⃣ SEND TO TIKTOK PIXEL
  // ─────────────────────────────────────────────
  if (isTikTokPixelLoaded()) {
    try {
      const tiktokEventMap: Record<string, string> = {
        'quiz_started': 'ViewContent',
        'quiz_completed': 'Contact',
        'email_captured': 'Contact',
        'add_to_cart': 'AddToCart',
        'purchase': 'CompletePayment'
      };

      const ttEventName = tiktokEventMap[eventName] || eventName;
      window.ttq!.track(ttEventName, enrichedData);
      console.log(`✅ TikTok Event: ${ttEventName}`, enrichedData);
    } catch (error) {
      console.error('[Tracking] Error sending TikTok Pixel event:', error);
    }
  }

  // ─────────────────────────────────────────────
  // 4️⃣ SEND TO GOOGLE ADS
  // ─────────────────────────────────────────────
  if (isGtagLoaded()) {
    try {
      const googleAdsEventMap: Record<string, string> = {
        'quiz_started': 'view_item',
        'quiz_completed': 'generate_lead',
        'email_captured': 'generate_lead',
        'add_to_cart': 'add_to_cart',
        'purchase': 'purchase'
      };

      const adsEventName = googleAdsEventMap[eventName];
      if (adsEventName) {
        window.gtag!('event', adsEventName, enrichedData);
        console.log(`✅ Google Ads Event: ${adsEventName}`, enrichedData);
      }
    } catch (error) {
      console.error('[Tracking] Error sending Google Ads event:', error);
    }
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
   * Standard Meta Pixel Events (Legacy - maintained for backward compatibility)
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
   * Enhanced Quiz Events using central tracking function
   */
  quiz: {
    /**
     * Track quiz start - fires when user clicks "Start Quiz"
     */
    started(userName?: string): void {
      trackEvent('quiz_started', {
        quiz_name: 'Mapa Xamânico',
        user_name: userName || 'Unknown',
        name_provided: !!userName
      });
      
      // Also fire legacy tracking for backward compatibility
      if (userName) {
        trackMetaPixelEvent(
          'QuizStarted',
          {
            name_provided: true,
            user_name: userName,
          },
          true
        );
      }
    },

    /**
     * Track individual quiz question answer
     */
    answer(data: {
      questionTitle: string;
      questionStep: number;
      answerValue: string;
      answerLabel: string;
      quizPath: string;
    }): void {
      trackEvent('quiz_question', {
        quiz_name: 'Mapa Xamânico',
        question_number: data.questionStep,
        question_title: data.questionTitle,
        answer_selected: data.answerValue,
        answer_label: data.answerLabel,
        quiz_path: data.quizPath
      });

      // Legacy tracking
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
     * Track quiz completion - fires when all questions are answered
     */
    complete(path: string, userName?: string, totalQuestions?: number, answers?: any[]): void {
      trackEvent('quiz_completed', {
        quiz_name: 'Mapa Xamânico',
        quiz_path: path,
        user_name: userName || 'Unknown',
        total_questions: totalQuestions || 0,
        answers_data: answers ? JSON.stringify(answers) : undefined
      });

      // Legacy tracking
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
   * Result and Offer Page Events
   */
  result: {
    /**
     * Track result page view - fires when user sees their quiz result
     */
    view(resultType?: string, resultScore?: number): void {
      trackEvent('resultado_view', {
        quiz_name: 'Mapa Xamânico',
        result_type: resultType || 'Unknown',
        result_score: resultScore || 0
      });
    },
  },

  /**
   * Email Capture Events
   */
  email: {
    /**
     * Track email capture - fires when user submits email
     * Validates email format before tracking
     */
    captured(email: string, name?: string, value?: number): void {
      // Validate email format before tracking
      if (!isValidEmail(email)) {
        console.error('[Tracking] Invalid email format, not tracking:', email);
        return;
      }

      trackEvent('email_captured', {
        quiz_name: 'Mapa Xamânico',
        email: email,
        name: name || 'Unknown',
        value: value || 27,
        currency: 'BRL'
      });
    },
  },

  /**
   * Purchase Funnel Events
   */
  purchase: {
    /**
     * Track add to cart - fires when user clicks "Buy Now" button
     */
    addToCart(params: {
      productName: string;
      productPrice: number;
      productId: string;
      email?: string;
    }): void {
      trackEvent('add_to_cart', {
        quiz_name: 'Mapa Xamânico',
        product_name: params.productName,
        product_price: params.productPrice,
        product_id: params.productId,
        currency: 'BRL',
        email: params.email || 'unknown@email.com'
      });
    },

    /**
     * Track completed purchase - fires on thank you page
     */
    complete(params: {
      transactionId: string;
      email?: string;
      productId: string;
      productName: string;
      value: number;
    }): void {
      trackEvent('purchase', {
        transaction_id: params.transactionId,
        email: params.email || 'unknown@email.com',
        product_id: params.productId,
        product_name: params.productName,
        value: params.value,
        currency: 'BRL',
        quiz_name: 'Mapa Xamânico'
      });
    },
  },

  /**
   * Offer and Sales Funnel Events (Legacy - maintained for backward compatibility)
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
   * Direct access to central tracking function
   * Use this for custom events not covered by the standard API
   */
  trackEvent: trackEvent,

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
