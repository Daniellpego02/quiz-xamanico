/**
 * Advanced Tracking Architecture for Funnel Optimization
 * 
 * This module implements:
 * - Event deduplication with event_id
 * - SHA-256 hashing for PII (Web Crypto API)
 * - Lead Scoring based on quiz responses
 * - Hybrid tracking (Client-Side + Server-Side ready)
 * - VTurb video tracking integration
 * - Google Analytics (gtag) integration
 * - Microsoft Clarity custom tags
 * - LocalStorage persistence for tracking state
 */

/// <reference types="vite/client" />

import {
  SESSION_KEYS,
  hasEventFiredInSession,
  markEventAsFiredInSession,
  isDeprecatedEvent,
} from './trackingConstants';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface TrackingState {
  sessionId: string;
  userId: string;
  fbp: string | null;
  fbc: string | null;
  utmParams: Record<string, string>;
  leadScore: number;
  quizAnswers: QuizAnswerData[];
  eventHistory: EventRecord[];
}

export interface QuizAnswerData {
  questionId: number;
  questionTitle: string;
  answerValue: string;
  answerLabel: string;
  scoreContribution: number;
  timestamp: number;
}

export interface EventRecord {
  eventId: string;
  eventName: string;
  timestamp: number;
  sent: boolean;
}

export interface LeadScoreConfig {
  [answerValue: string]: number;
}

export interface VideoMilestone {
  percentage: number;
  eventName: string;
  triggered: boolean;
}

// Extend Window interface for tracking integrations
declare global {
  interface Window {
    fbq?: (action: string, eventName: string, params?: Record<string, unknown>, options?: { eventID?: string }) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    clarity?: (action: string, key: string, value: string) => void;
  }
}

// ============================================================================
// CONSTANTS
// ============================================================================

const STORAGE_KEY = 'advanced_tracking_state';
const SESSION_DURATION_MS = 30 * 60 * 1000; // 30 minutes

// Lead Score Configuration based on quiz answers
// Higher scores = Higher intent/value leads
const LEAD_SCORE_CONFIG: LeadScoreConfig = {
  // P1 - O RALO ENERGÉTICO (pain intensity)
  'leak': 30,      // Montanha Russa - high pain
  'tired': 25,     // Bloqueio do Merecimento - medium-high pain
  'fear': 35,      // Teto de Vidro - highest pain (clear financial goal)
  
  // P2 - A HERANÇA FAMILIAR (root cause awareness)
  'heavy': 25,     // Recognized negative beliefs
  'honest': 30,    // Emotional trauma - high engagement
  'conflict': 20,  // Work ethic issue - lower score
  
  // P3 - A AGITAÇÃO (urgency/fear)
  'dependency': 25, // Fear of dependency
  'aging': 30,      // Long-term thinking - higher value
  'family': 35,     // Family responsibility - highest urgency
  
  // P4 - O COMPROMISSO (commitment)
  'ready': 10,      // Base commitment score
};

// Lead segments based on total score
const LEAD_SEGMENTS = {
  DISQUALIFIED: { min: 0, max: 29, value: 0 },
  WARM: { min: 30, max: 69, value: 10 },
  HOT: { min: 70, max: 100, value: 100 },
};

// VTurb video milestones for tracking
const VIDEO_MILESTONES: VideoMilestone[] = [
  { percentage: 25, eventName: 'VideoProgress25', triggered: false },
  { percentage: 50, eventName: 'VideoProgress50', triggered: false },
  { percentage: 75, eventName: 'VideoProgress75', triggered: false },
  { percentage: 95, eventName: 'VideoProgress95', triggered: false },
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate a unique event ID for deduplication
 * Uses crypto.randomUUID() for browser-native UUID generation
 */
export function generateEventId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return 'evt_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 11);
}

/**
 * Generate a session ID for tracking continuity
 */
export function generateSessionId(): string {
  return 'sess_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
}

/**
 * Generate a user ID for cross-session tracking
 */
export function generateUserId(): string {
  return 'user_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 11);
}

/**
 * SHA-256 hashing using Web Crypto API
 * Compatible with Edge Functions and modern browsers
 */
export async function hashData(data: string): Promise<string | null> {
  if (!data) return null;
  
  try {
    // Step 1: Normalize the data
    const normalized = data.trim().toLowerCase();
    
    // Step 2: Encode to buffer
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(normalized);
    
    // Step 3: Hash with SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    
    // Step 4: Convert to hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  } catch (error) {
    console.error('[AdvancedTracking] Error hashing data:', error);
    return null;
  }
}

/**
 * Normalize email for hashing (Meta CAPI requirements)
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Normalize phone for hashing (Meta CAPI requirements)
 * Removes all non-numeric characters and adds country code
 */
export function normalizePhone(phone: string, countryCode: string = '55'): string {
  const digitsOnly = phone.replace(/\D/g, '');
  // Remove leading zeros
  const withoutLeadingZeros = digitsOnly.replace(/^0+/, '');
  // Add country code if not present
  if (!withoutLeadingZeros.startsWith(countryCode)) {
    return countryCode + withoutLeadingZeros;
  }
  return withoutLeadingZeros;
}

/**
 * Get Facebook Browser ID (_fbp cookie)
 */
export function getFbp(): string | null {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === '_fbp') {
      return value;
    }
  }
  return null;
}

/**
 * Get Facebook Click ID (_fbc cookie or from URL)
 */
export function getFbc(): string | null {
  if (typeof window === 'undefined') return null;
  
  // First check URL for fbclid parameter
  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get('fbclid');
  
  if (fbclid) {
    // Format: fb.1.timestamp.fbclid
    const timestamp = Date.now();
    return `fb.1.${timestamp}.${fbclid}`;
  }
  
  // Fallback to cookie
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === '_fbc') {
        return value;
      }
    }
  }
  
  return null;
}

/**
 * Get all UTM parameters from URL
 */
export function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid'];
  
  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });
  
  return utmParams;
}

/**
 * Get user agent string
 */
export function getUserAgent(): string {
  if (typeof navigator === 'undefined') return '';
  return navigator.userAgent;
}

/**
 * Calculate lead score based on quiz answers
 */
export function calculateLeadScore(answers: QuizAnswerData[]): number {
  return answers.reduce((total, answer) => {
    return total + (answer.scoreContribution || 0);
  }, 0);
}

/**
 * Get lead segment based on score
 */
export function getLeadSegment(score: number): { name: string; value: number } {
  if (score >= LEAD_SEGMENTS.HOT.min) {
    return { name: 'hot', value: LEAD_SEGMENTS.HOT.value };
  } else if (score >= LEAD_SEGMENTS.WARM.min) {
    return { name: 'warm', value: LEAD_SEGMENTS.WARM.value };
  }
  return { name: 'disqualified', value: LEAD_SEGMENTS.DISQUALIFIED.value };
}

/**
 * Get score contribution for an answer value
 */
export function getAnswerScore(answerValue: string): number {
  return LEAD_SCORE_CONFIG[answerValue] || 0;
}

// ============================================================================
// TRACKING STATE MANAGEMENT
// ============================================================================

/**
 * Load tracking state from LocalStorage
 */
export function loadTrackingState(): TrackingState | null {
  if (typeof localStorage === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const state = JSON.parse(stored) as TrackingState;
    
    // Check if session is still valid (30 minutes)
    // Only check if there are events in history
    if (state.eventHistory && state.eventHistory.length > 0) {
      const lastEvent = state.eventHistory[state.eventHistory.length - 1];
      if (lastEvent && Date.now() - lastEvent.timestamp > SESSION_DURATION_MS) {
        // Session expired, generate new session ID but keep user ID
        state.sessionId = generateSessionId();
        state.eventHistory = [];
      }
    }
    
    return state;
  } catch (error) {
    console.error('[AdvancedTracking] Error loading state:', error);
    return null;
  }
}

/**
 * Save tracking state to LocalStorage
 */
export function saveTrackingState(state: TrackingState): void {
  if (typeof localStorage === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('[AdvancedTracking] Error saving state:', error);
  }
}

/**
 * Initialize tracking state
 */
export function initializeTrackingState(): TrackingState {
  const existingState = loadTrackingState();
  
  if (existingState) {
    // Update fbp and fbc on each page load
    existingState.fbp = getFbp();
    existingState.fbc = getFbc();
    
    // Merge new UTM params (but don't overwrite existing ones)
    const newUtmParams = getUtmParams();
    existingState.utmParams = { ...existingState.utmParams, ...newUtmParams };
    
    saveTrackingState(existingState);
    return existingState;
  }
  
  const newState: TrackingState = {
    sessionId: generateSessionId(),
    userId: generateUserId(),
    fbp: getFbp(),
    fbc: getFbc(),
    utmParams: getUtmParams(),
    leadScore: 0,
    quizAnswers: [],
    eventHistory: [],
  };
  
  saveTrackingState(newState);
  return newState;
}

// ============================================================================
// EVENT TRACKING FUNCTIONS
// ============================================================================

/**
 * Track Meta Pixel event with deduplication
 * Includes deprecated event blocking
 */
export function trackMetaEvent(
  eventName: string,
  params: Record<string, unknown> = {},
  state: TrackingState
): string {
  // Block deprecated events
  if (isDeprecatedEvent(eventName)) {
    if (import.meta.env?.DEV) {
      console.warn('[AdvancedTracking] Blocked deprecated event:', eventName);
    }
    return '';
  }

  const eventId = generateEventId();
  
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      // Include event_id for deduplication with server-side events
      window.fbq('track', eventName, params, { eventID: eventId });
      
      if (import.meta.env?.DEV) {
        console.log('[AdvancedTracking] Meta Event:', eventName, { ...params, eventID: eventId });
      }
    }
  } catch (error) {
    console.error('[AdvancedTracking] Error tracking Meta event:', error);
  }
  
  // Record event in history
  const eventRecord: EventRecord = {
    eventId,
    eventName,
    timestamp: Date.now(),
    sent: true,
  };
  
  state.eventHistory.push(eventRecord);
  saveTrackingState(state);
  
  return eventId;
}

/**
 * Track Meta Pixel custom event with deduplication
 * Includes deprecated event blocking
 */
export function trackMetaCustomEvent(
  eventName: string,
  params: Record<string, unknown> = {},
  state: TrackingState
): string {
  // Block deprecated events
  if (isDeprecatedEvent(eventName)) {
    if (import.meta.env?.DEV) {
      console.warn('[AdvancedTracking] Blocked deprecated custom event:', eventName);
    }
    return '';
  }

  const eventId = generateEventId();
  
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', eventName, params, { eventID: eventId });
      
      if (import.meta.env?.DEV) {
        console.log('[AdvancedTracking] Meta Custom Event:', eventName, { ...params, eventID: eventId });
      }
    }
  } catch (error) {
    console.error('[AdvancedTracking] Error tracking Meta custom event:', error);
  }
  
  // Record event in history
  const eventRecord: EventRecord = {
    eventId,
    eventName,
    timestamp: Date.now(),
    sent: true,
  };
  
  state.eventHistory.push(eventRecord);
  saveTrackingState(state);
  
  return eventId;
}

/**
 * Track Google Analytics event
 */
export function trackGtagEvent(
  eventName: string,
  params: Record<string, unknown> = {}
): void {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, params);
      
      if (import.meta.env?.DEV) {
        console.log('[AdvancedTracking] GA4 Event:', eventName, params);
      }
    }
  } catch (error) {
    console.error('[AdvancedTracking] Error tracking GA4 event:', error);
  }
}

/**
 * Set Microsoft Clarity custom tag
 */
export function setClarityTag(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('set', key, value);
      
      if (import.meta.env?.DEV) {
        console.log('[AdvancedTracking] Clarity Tag:', key, value);
      }
    }
  } catch (error) {
    console.error('[AdvancedTracking] Error setting Clarity tag:', error);
  }
}

// ============================================================================
// LEAD SCORING EVENTS
// ============================================================================

/**
 * Track quiz answer with lead scoring
 * @deprecated - QuizAnswer event is deprecated. Only updates internal lead score.
 * Answers are now aggregated in QuizComplete event instead.
 */
export function trackQuizAnswerWithScore(
  data: {
    questionId: number;
    questionTitle: string;
    answerValue: string;
    answerLabel: string;
    quizPath: string;
  },
  state: TrackingState
): void {
  const scoreContribution = getAnswerScore(data.answerValue);
  
  // Create answer record (for internal lead scoring)
  const answerData: QuizAnswerData = {
    questionId: data.questionId,
    questionTitle: data.questionTitle,
    answerValue: data.answerValue,
    answerLabel: data.answerLabel,
    scoreContribution,
    timestamp: Date.now(),
  };
  
  // Update state (internal lead scoring still works)
  state.quizAnswers.push(answerData);
  state.leadScore = calculateLeadScore(state.quizAnswers);
  
  // DEPRECATED: QuizAnswer event is no longer sent to Meta
  // trackMetaCustomEvent('QuizAnswer', ...) is blocked by deprecated event filter
  
  // Track in GA4 only (internal analytics, not for Meta optimization)
  trackGtagEvent('quiz_answer', {
    question_title: data.questionTitle,
    question_id: data.questionId,
    answer_value: data.answerValue,
    score_contribution: scoreContribution,
    running_score: state.leadScore,
  });
  
  // Update Clarity tags (internal analytics)
  setClarityTag('quiz_progress', `q${data.questionId}`);
  setClarityTag('lead_score', state.leadScore.toString());
  
  saveTrackingState(state);
}

/**
 * Track lead event with value-based optimization
 */
export function trackLeadWithValue(
  params: { content_name?: string; userName?: string },
  state: TrackingState
): string {
  const segment = getLeadSegment(state.leadScore);
  
  const eventId = trackMetaEvent('Lead', {
    content_name: params.content_name || 'Quiz Lead',
    value: segment.value,
    currency: 'BRL',
    lead_score: state.leadScore,
    lead_segment: segment.name,
    user_name: params.userName,
  }, state);
  
  // Track in GA4
  trackGtagEvent('generate_lead', {
    value: segment.value,
    currency: 'BRL',
    lead_score: state.leadScore,
    lead_segment: segment.name,
  });
  
  // Update Clarity tags
  setClarityTag('lead_qualidade', segment.name);
  setClarityTag('lead_score_final', state.leadScore.toString());
  setClarityTag('lead_value', segment.value.toString());
  
  return eventId;
}

/**
 * Track complete registration with enriched data
 */
export function trackCompleteRegistration(
  params: { content_name?: string; path?: string; userName?: string },
  state: TrackingState
): string {
  const segment = getLeadSegment(state.leadScore);
  
  const eventId = trackMetaEvent('CompleteRegistration', {
    content_name: params.content_name || 'Quiz Completo',
    value: segment.value,
    currency: 'BRL',
    status: segment.name,
    lead_score: state.leadScore,
    path: params.path,
    user_id: state.userId,
  }, state);
  
  // Track in GA4
  trackGtagEvent('sign_up', {
    method: 'quiz',
    value: segment.value,
    currency: 'BRL',
    lead_score: state.leadScore,
    lead_segment: segment.name,
  });
  
  return eventId;
}

// ============================================================================
// VTURB VIDEO TRACKING
// ============================================================================

// Store for video tracking state
let videoMilestones = [...VIDEO_MILESTONES];
let pitchTracked = false;

/**
 * Reset video tracking state (call when video component mounts)
 */
export function resetVideoTracking(): void {
  videoMilestones = VIDEO_MILESTONES.map(m => ({ ...m, triggered: false }));
  pitchTracked = false;
}

/**
 * Track VTurb video progress
 * Call this from the VTurb player's timeupdate event
 */
export function trackVideoProgress(
  currentTime: number,
  duration: number,
  state: TrackingState,
  pitchTimeSeconds?: number
): void {
  if (duration <= 0) return;
  
  const progressPercent = (currentTime / duration) * 100;
  
  // Track milestone events
  for (const milestone of videoMilestones) {
    if (!milestone.triggered && progressPercent >= milestone.percentage) {
      milestone.triggered = true;
      
      trackMetaCustomEvent(milestone.eventName, {
        content_name: 'VSL Principal',
        video_percent: milestone.percentage,
        video_current_time: Math.round(currentTime),
        video_duration: Math.round(duration),
      }, state);
      
      trackGtagEvent('video_progress', {
        video_percent: milestone.percentage,
        video_current_time: Math.round(currentTime),
        video_duration: Math.round(duration),
      });
      
      setClarityTag('video_progress', `${milestone.percentage}%`);
    }
  }
  
  // Track pitch viewed event (if pitch time is configured)
  if (pitchTimeSeconds && !pitchTracked && currentTime >= pitchTimeSeconds) {
    pitchTracked = true;
    
    trackMetaCustomEvent('PitchViewed', {
      content_name: 'VSL Principal',
      time_watched: Math.round(currentTime),
      pitch_time: pitchTimeSeconds,
    }, state);
    
    trackGtagEvent('pitch_viewed', {
      time_watched: Math.round(currentTime),
      pitch_time: pitchTimeSeconds,
    });
    
    setClarityTag('pitch_viewed', 'true');
  }
}

/**
 * Track video play event
 */
export function trackVideoPlay(state: TrackingState): string {
  return trackMetaCustomEvent('VideoPlay', {
    content_name: 'VSL Principal',
  }, state);
}

/**
 * Track video pause event
 */
export function trackVideoPause(currentTime: number, duration: number, state: TrackingState): string {
  return trackMetaCustomEvent('VideoPause', {
    content_name: 'VSL Principal',
    video_current_time: Math.round(currentTime),
    video_percent: Math.round((currentTime / duration) * 100),
  }, state);
}

/**
 * Track video complete event
 */
export function trackVideoComplete(state: TrackingState): string {
  setClarityTag('video_completed', 'true');
  
  return trackMetaCustomEvent('VideoComplete', {
    content_name: 'VSL Principal',
    video_percent: 100,
  }, state);
}

// ============================================================================
// FUNNEL EVENTS
// ============================================================================

/**
 * Track page view with enriched data
 */
export function trackPageView(pageName: string, state: TrackingState): void {
  // Meta PageView is automatically tracked by the pixel
  // Here we track additional custom data
  
  trackGtagEvent('page_view', {
    page_title: pageName,
    page_location: window.location.href,
    user_id: state.userId,
    session_id: state.sessionId,
  });
  
  setClarityTag('page_name', pageName);
  setClarityTag('session_id', state.sessionId);
}

/**
 * Track offer view
 * DEDUPLICATED: Only fires once per session
 */
export function trackOfferView(offerName: string, offerValue: number, state: TrackingState): string {
  // Deduplicate: only fire once per session
  if (hasEventFiredInSession(SESSION_KEYS.VIEW_CONTENT_FIRED)) {
    if (import.meta.env?.DEV) {
      console.log('[AdvancedTracking] ViewContent already fired this session, skipping');
    }
    return '';
  }

  const eventId = trackMetaEvent('ViewContent', {
    content_name: offerName,
    value: offerValue,
    currency: 'BRL',
    content_type: 'product',
  }, state);
  
  markEventAsFiredInSession(SESSION_KEYS.VIEW_CONTENT_FIRED);
  
  trackGtagEvent('view_item', {
    items: [{
      item_name: offerName,
      price: offerValue,
      currency: 'BRL',
    }],
  });
  
  return eventId;
}

/**
 * Track initiate checkout
 * DEDUPLICATED: Only fires once per session
 */
export function trackInitiateCheckout(
  params: { content_name: string; value: number },
  state: TrackingState
): string {
  // Deduplicate: only fire once per session
  if (hasEventFiredInSession(SESSION_KEYS.INITIATE_CHECKOUT_FIRED)) {
    if (import.meta.env?.DEV) {
      console.log('[AdvancedTracking] InitiateCheckout already fired this session, skipping');
    }
    return '';
  }

  const eventId = trackMetaEvent('InitiateCheckout', {
    content_name: params.content_name,
    value: params.value,
    currency: 'BRL',
    content_type: 'product',
    lead_score: state.leadScore,
  }, state);
  
  markEventAsFiredInSession(SESSION_KEYS.INITIATE_CHECKOUT_FIRED);
  
  trackGtagEvent('begin_checkout', {
    value: params.value,
    currency: 'BRL',
    items: [{
      item_name: params.content_name,
      price: params.value,
    }],
  });
  
  setClarityTag('checkout_initiated', 'true');
  
  return eventId;
}

/**
 * Track purchase
 */
export function trackPurchase(
  params: { content_name: string; value: number; transaction_id?: string },
  state: TrackingState
): string {
  const eventId = trackMetaEvent('Purchase', {
    content_name: params.content_name,
    value: params.value,
    currency: 'BRL',
    content_type: 'product',
    transaction_id: params.transaction_id,
    lead_score: state.leadScore,
    user_id: state.userId,
  }, state);
  
  trackGtagEvent('purchase', {
    transaction_id: params.transaction_id || eventId,
    value: params.value,
    currency: 'BRL',
    items: [{
      item_name: params.content_name,
      price: params.value,
    }],
  });
  
  setClarityTag('purchase_completed', 'true');
  setClarityTag('purchase_value', params.value.toString());
  
  return eventId;
}

/**
 * Track CTA click
 */
export function trackCTAClick(ctaName: string, state: TrackingState): string {
  return trackMetaCustomEvent('CTAClick', {
    content_name: ctaName,
    lead_score: state.leadScore,
  }, state);
}

/**
 * Track upsell view
 */
export function trackUpsellView(upsellName: string, state: TrackingState): string {
  return trackMetaCustomEvent('ViewUpsell', {
    content_name: upsellName,
    lead_score: state.leadScore,
  }, state);
}

/**
 * Track downsell view
 */
export function trackDownsellView(downsellName: string, state: TrackingState): string {
  return trackMetaCustomEvent('ViewDownsell', {
    content_name: downsellName,
    lead_score: state.leadScore,
  }, state);
}

// ============================================================================
// CAPI PAYLOAD BUILDER (For Server-Side Implementation)
// ============================================================================

/**
 * Build CAPI-ready payload for server-side tracking
 * This can be sent to a server endpoint that forwards to Meta CAPI
 */
export async function buildCAPIPayload(
  eventName: string,
  eventId: string,
  customData: Record<string, unknown>,
  userData: { email?: string; phone?: string; firstName?: string },
  state: TrackingState
): Promise<Record<string, unknown>> {
  const payload: Record<string, unknown> = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: 'website',
    event_source_url: typeof window !== 'undefined' ? window.location.href : '',
    user_data: {
      client_user_agent: getUserAgent(),
      fbp: state.fbp,
      fbc: state.fbc,
      client_ip_address: null, // To be filled by server
    },
    custom_data: customData,
  };
  
  // Add hashed user data if available
  if (userData.email) {
    (payload.user_data as Record<string, unknown>).em = await hashData(normalizeEmail(userData.email));
  }
  
  if (userData.phone) {
    (payload.user_data as Record<string, unknown>).ph = await hashData(normalizePhone(userData.phone));
  }
  
  if (userData.firstName) {
    (payload.user_data as Record<string, unknown>).fn = await hashData(userData.firstName.trim().toLowerCase());
  }
  
  return payload;
}

// ============================================================================
// EXPORT SINGLETON TRACKING INSTANCE
// ============================================================================

let trackingStateInstance: TrackingState | null = null;

/**
 * Get or initialize the tracking state singleton
 */
export function getTrackingState(): TrackingState {
  if (!trackingStateInstance) {
    trackingStateInstance = initializeTrackingState();
  }
  return trackingStateInstance;
}

/**
 * Advanced Tracking API
 */
export const advancedTracking = {
  // State management
  getState: getTrackingState,
  init: initializeTrackingState,
  
  // Utilities
  generateEventId,
  hashData,
  normalizeEmail,
  normalizePhone,
  getFbp,
  getFbc,
  getUtmParams,
  
  // Lead scoring
  calculateLeadScore,
  getLeadSegment,
  getAnswerScore,
  
  // Quiz events
  trackQuizAnswer: (data: Parameters<typeof trackQuizAnswerWithScore>[0]) => 
    trackQuizAnswerWithScore(data, getTrackingState()),
  
  // Lead events
  trackLead: (params: Parameters<typeof trackLeadWithValue>[0]) => 
    trackLeadWithValue(params, getTrackingState()),
  trackCompleteRegistration: (params: Parameters<typeof trackCompleteRegistration>[0]) => 
    trackCompleteRegistration(params, getTrackingState()),
  
  // Video events
  resetVideoTracking,
  trackVideoProgress: (currentTime: number, duration: number, pitchTimeSeconds?: number) => 
    trackVideoProgress(currentTime, duration, getTrackingState(), pitchTimeSeconds),
  trackVideoPlay: () => trackVideoPlay(getTrackingState()),
  trackVideoPause: (currentTime: number, duration: number) => 
    trackVideoPause(currentTime, duration, getTrackingState()),
  trackVideoComplete: () => trackVideoComplete(getTrackingState()),
  
  // Funnel events
  trackPageView: (pageName: string) => trackPageView(pageName, getTrackingState()),
  trackOfferView: (offerName: string, offerValue: number) => 
    trackOfferView(offerName, offerValue, getTrackingState()),
  trackInitiateCheckout: (params: Parameters<typeof trackInitiateCheckout>[0]) => 
    trackInitiateCheckout(params, getTrackingState()),
  trackPurchase: (params: Parameters<typeof trackPurchase>[0]) => 
    trackPurchase(params, getTrackingState()),
  trackCTAClick: (ctaName: string) => trackCTAClick(ctaName, getTrackingState()),
  trackUpsellView: (upsellName: string) => trackUpsellView(upsellName, getTrackingState()),
  trackDownsellView: (downsellName: string) => trackDownsellView(downsellName, getTrackingState()),
  
  // Meta events
  trackMetaEvent: (eventName: string, params?: Record<string, unknown>) => 
    trackMetaEvent(eventName, params, getTrackingState()),
  trackMetaCustomEvent: (eventName: string, params?: Record<string, unknown>) => 
    trackMetaCustomEvent(eventName, params, getTrackingState()),
  
  // GA4 events
  trackGtagEvent,
  
  // Clarity
  setClarityTag,
  
  // CAPI
  buildCAPIPayload: (
    eventName: string,
    eventId: string,
    customData: Record<string, unknown>,
    userData: { email?: string; phone?: string; firstName?: string }
  ) => buildCAPIPayload(eventName, eventId, customData, userData, getTrackingState()),
};
