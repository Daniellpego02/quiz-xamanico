/**
 * Tracking Configuration
 * 
 * Centralized configuration for all tracking services.
 * These values can be overridden by environment variables in production.
 * 
 * SECURITY NOTE: In production, sensitive tokens should be stored in
 * environment variables (VITE_* prefix for Vite apps).
 */

// ============================================================================
// META PIXEL (FACEBOOK ADS)
// ============================================================================
export const META_PIXEL_ID = '1908080873443730';

/**
 * Meta Conversions API (CAPI) Access Token
 * IMPORTANT: Set META_ACCESS_TOKEN in your environment variables
 * WARNING: Do NOT use VITE_ prefix as it would expose the token to client-side
 * Generate token at: https://developers.facebook.com/tools/accesstoken/
 */
export const META_ACCESS_TOKEN = import.meta.env?.META_ACCESS_TOKEN || '';

/**
 * Meta Test Event Code
 * Used for testing events in Meta Events Manager
 * Set VITE_META_TEST_EVENT_CODE in environment variables
 * Or use default in development mode
 */
export const META_TEST_EVENT_CODE = import.meta.env?.VITE_META_TEST_EVENT_CODE || 
  (import.meta.env?.DEV ? 'TEST12345' : undefined);

// ============================================================================
// GOOGLE ANALYTICS (GA4)
// ============================================================================
export const GA4_MEASUREMENT_ID = 'G-M78M3RH56H';

// ============================================================================
// MICROSOFT CLARITY
// ============================================================================
export const CLARITY_PROJECT_ID = 'uq1qfi7fwi';

// ============================================================================
// UTMFY
// ============================================================================
export const UTMFY_PIXEL_ID = '69346cfb70f1cd636eb5e31c';

// ============================================================================
// VTURB VIDEO PLAYER
// ============================================================================
// IMPORTANT: Set VITE_VTURB_API_TOKEN in your environment variables
export const VTURB_API_TOKEN = import.meta.env?.VITE_VTURB_API_TOKEN || '';

// VTurb embed base URL
export const VTURB_EMBED_BASE_URL = 'https://scripts.converteai.net';

// ============================================================================
// BUCKPAY PAYMENT GATEWAY (RealTech API)
// ============================================================================
export const BUCKPAY_CONFIG = {
  // Secret key for server-side operations
  // IMPORTANT: Set VITE_BUCKPAY_SECRET_KEY in your environment variables
  secretKey: import.meta.env?.VITE_BUCKPAY_SECRET_KEY || '',
  // API base URL (RealTech)
  apiUrl: 'https://api.realtechdev.com.br',
  // User-Agent header (IMPORTANT: Get this from your account manager)
  // IMPORTANT: Set VITE_BUCKPAY_USER_AGENT in your environment variables
  userAgent: import.meta.env?.VITE_BUCKPAY_USER_AGENT || '',
  // Webhook endpoint (configure in BuckPay dashboard)
  webhookPath: '/api/webhooks/buckpay',
};

// ============================================================================
// PRODUCT CONFIGURATION
// ============================================================================
export const PRODUCT_CONFIG = {
  // Main product
  main: {
    name: 'Mapa Xamânico',
    value: 97.00,
    currency: 'BRL',
  },
  // Upsell 1
  upsell1: {
    name: 'Ritual Completo',
    value: 197.00,
    currency: 'BRL',
  },
  // Downsell 1
  downsell1: {
    name: 'Oferta Especial',
    value: 47.00,
    currency: 'BRL',
  },
};

// ============================================================================
// LEAD SCORING THRESHOLDS
// ============================================================================
export const LEAD_SCORE_THRESHOLDS = {
  // Score below this is disqualified (value: 0)
  disqualified: 30,
  // Score between disqualified and hot is warm (value: 10)
  warm: 70,
  // Score above warm threshold is hot (value: 100)
  hot: 100,
};

// ============================================================================
// VIDEO TRACKING CONFIGURATION
// ============================================================================
export const VIDEO_CONFIG = {
  // Milestone percentages to track
  milestones: [25, 50, 75, 95],
  // Pitch time in seconds (set this to your actual pitch moment)
  // Example: 15 minutes 30 seconds = 930 seconds
  pitchTimeSeconds: undefined as number | undefined,
};

// ============================================================================
// TRACKING FEATURE FLAGS
// ============================================================================
export const TRACKING_FEATURES = {
  // Enable/disable lead scoring
  leadScoring: true,
  // Enable/disable video tracking
  videoTracking: true,
  // Enable/disable enhanced event deduplication
  eventDeduplication: true,
  // Enable/disable Clarity custom tags
  clarityTags: true,
  // Enable/disable GA4 enhanced events
  ga4EnhancedEvents: true,
  // Enable/disable console logging in development
  devLogging: true,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
  return import.meta.env?.DEV === true;
}

/**
 * Check if tracking feature is enabled
 */
export function isFeatureEnabled(feature: keyof typeof TRACKING_FEATURES): boolean {
  return TRACKING_FEATURES[feature] === true;
}

/**
 * Get product config by key
 */
export function getProductConfig(key: keyof typeof PRODUCT_CONFIG) {
  return PRODUCT_CONFIG[key];
}
