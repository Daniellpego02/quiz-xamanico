/**
 * Unified Event ID Generator
 * 
 * Generates consistent event IDs for both client-side (Meta Pixel) and server-side (CAPI)
 * to enable proper event deduplication.
 * 
 * Requirements:
 * - Must be unique per event
 * - Must be consistent between client and server
 * - Must support validation in webhooks
 * - Must enable >95% deduplication rate
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface EventIdMetadata {
  /** Unique event identifier */
  eventId: string;
  /** Timestamp when event was generated (Unix timestamp in seconds) */
  timestamp: number;
  /** Event name for tracking */
  eventName: string;
  /** Source of the event (client or server) */
  source: 'client' | 'server';
}

// ============================================================================
// EVENT ID GENERATION
// ============================================================================

/**
 * Generate a unique event ID using crypto.randomUUID()
 * Falls back to timestamp-based generation for older browsers
 * 
 * Format: evt_<uuid> or evt_<timestamp>_<random>
 * 
 * @returns Unique event ID string
 */
export function generateEventId(): string {
  // Use crypto.randomUUID() if available (modern browsers)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    const uuid = crypto.randomUUID();
    return `evt_${uuid}`;
  }
  
  // Fallback for older browsers
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 11);
  return `evt_${timestamp}_${random}`;
}

/**
 * Generate event ID with metadata for tracking
 * 
 * @param eventName - Name of the event being tracked
 * @param source - Source of the event (client or server)
 * @returns Event ID metadata object
 */
export function generateEventIdWithMetadata(
  eventName: string,
  source: 'client' | 'server' = 'client'
): EventIdMetadata {
  return {
    eventId: generateEventId(),
    timestamp: Math.floor(Date.now() / 1000),
    eventName,
    source,
  };
}

/**
 * Validate event ID format
 * 
 * @param eventId - Event ID to validate
 * @returns True if valid, false otherwise
 */
export function isValidEventId(eventId: string): boolean {
  if (!eventId || typeof eventId !== 'string') {
    return false;
  }
  
  // Check format: evt_<uuid> or evt_<timestamp>_<random>
  return /^evt_[a-f0-9-]+$|^evt_[a-z0-9]+_[a-z0-9]+$/i.test(eventId);
}

/**
 * Extract timestamp from event ID (if available)
 * 
 * @param eventId - Event ID to extract timestamp from
 * @returns Unix timestamp in seconds, or null if not extractable
 */
export function extractTimestampFromEventId(eventId: string): number | null {
  if (!isValidEventId(eventId)) {
    return null;
  }
  
  // Check if it's the fallback format with timestamp
  const match = eventId.match(/^evt_([a-z0-9]+)_[a-z0-9]+$/);
  if (match && match[1]) {
    try {
      const timestamp = parseInt(match[1], 36);
      return Math.floor(timestamp / 1000);
    } catch {
      return null;
    }
  }
  
  return null;
}

// ============================================================================
// EVENT ID STORAGE (for deduplication validation)
// ============================================================================

const EVENT_ID_STORAGE_KEY = 'event_ids_sent';
const MAX_STORED_EVENT_IDS = 100; // Keep last 100 event IDs

/**
 * Store event ID in local storage for deduplication validation
 * 
 * @param eventId - Event ID to store
 * @param eventName - Name of the event
 */
export function storeEventId(eventId: string, eventName: string): void {
  if (typeof localStorage === 'undefined') {
    return;
  }
  
  try {
    const stored = localStorage.getItem(EVENT_ID_STORAGE_KEY);
    const eventIds: Array<{ id: string; name: string; timestamp: number }> = stored
      ? JSON.parse(stored)
      : [];
    
    // Add new event ID
    eventIds.push({
      id: eventId,
      name: eventName,
      timestamp: Date.now(),
    });
    
    // Keep only last MAX_STORED_EVENT_IDS
    const trimmed = eventIds.slice(-MAX_STORED_EVENT_IDS);
    
    localStorage.setItem(EVENT_ID_STORAGE_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('[EventId] Error storing event ID:', error);
  }
}

/**
 * Check if event ID was already sent (deduplication check)
 * 
 * @param eventId - Event ID to check
 * @returns True if already sent, false otherwise
 */
export function isEventIdDuplicate(eventId: string): boolean {
  if (typeof localStorage === 'undefined') {
    return false;
  }
  
  try {
    const stored = localStorage.getItem(EVENT_ID_STORAGE_KEY);
    if (!stored) {
      return false;
    }
    
    const eventIds: Array<{ id: string; name: string; timestamp: number }> =
      JSON.parse(stored);
    
    return eventIds.some((item) => item.id === eventId);
  } catch (error) {
    console.error('[EventId] Error checking duplicate event ID:', error);
    return false;
  }
}

/**
 * Get all stored event IDs
 * 
 * @returns Array of stored event IDs with metadata
 */
export function getStoredEventIds(): Array<{ id: string; name: string; timestamp: number }> {
  if (typeof localStorage === 'undefined') {
    return [];
  }
  
  try {
    const stored = localStorage.getItem(EVENT_ID_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('[EventId] Error getting stored event IDs:', error);
    return [];
  }
}

/**
 * Clear all stored event IDs (useful for testing)
 */
export function clearStoredEventIds(): void {
  if (typeof localStorage === 'undefined') {
    return;
  }
  
  try {
    localStorage.removeItem(EVENT_ID_STORAGE_KEY);
  } catch (error) {
    console.error('[EventId] Error clearing stored event IDs:', error);
  }
}

// ============================================================================
// EXPORT
// ============================================================================

export const eventIdGenerator = {
  generate: generateEventId,
  generateWithMetadata: generateEventIdWithMetadata,
  validate: isValidEventId,
  extractTimestamp: extractTimestampFromEventId,
  store: storeEventId,
  isDuplicate: isEventIdDuplicate,
  getStored: getStoredEventIds,
  clearStored: clearStoredEventIds,
};

export default eventIdGenerator;
