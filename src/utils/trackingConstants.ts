/**
 * Shared Tracking Constants
 * 
 * This module contains shared constants used by tracking.ts and advancedTracking.ts
 * to ensure consistency across the tracking system.
 * 
 * OPTIMIZED FUNNEL (Clean Event Flow):
 * PageView → Lead → QuizComplete → ViewContent → InitiateCheckout → AddPaymentInfo → Purchase
 */

// Session storage keys for deduplication
export const SESSION_KEYS = {
  INITIATE_CHECKOUT_FIRED: 'ic_fired',
  VIEW_CONTENT_FIRED: 'vc_fired',
  QUIZ_HALFWAY_FIRED: 'qh_fired',
} as const;

// Deprecated events that should NOT be tracked
export const DEPRECATED_EVENTS = [
  'SubscribedButtonClick',
  'button_clicked',
  'vsl_page_view',
  'QuizAnswer',
  'QuizProgress',
] as const;

export type DeprecatedEvent = typeof DEPRECATED_EVENTS[number];

/**
 * Check if an event has already been fired in this session
 */
export function hasEventFiredInSession(key: string): boolean {
  if (typeof sessionStorage === 'undefined') return false;
  return sessionStorage.getItem(key) === 'true';
}

/**
 * Mark an event as fired in this session
 */
export function markEventAsFiredInSession(key: string): void {
  if (typeof sessionStorage === 'undefined') return;
  sessionStorage.setItem(key, 'true');
}

/**
 * Check if an event is deprecated and should be blocked
 */
export function isDeprecatedEvent(eventName: string): boolean {
  return DEPRECATED_EVENTS.includes(eventName as DeprecatedEvent);
}
