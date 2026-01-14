/**
 * Advanced Matching for Meta CAPI
 * 
 * Implements Meta's Advanced Matching requirements to maximize Event Match Quality (EMQ).
 * Target: EMQ > 8.0 with 12+ customer information parameters.
 * 
 * Reference: https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface UserData {
  /** Email address (will be normalized and hashed) */
  email?: string;
  /** Phone number with country code (will be normalized and hashed) */
  phone?: string;
  /** First name (will be normalized and hashed) */
  firstName?: string;
  /** Last name (will be normalized and hashed) */
  lastName?: string;
  /** Gender: 'm' for male, 'f' for female */
  gender?: 'm' | 'f';
  /** Date of birth in YYYYMMDD format */
  dateOfBirth?: string;
  /** City name (will be normalized and hashed) */
  city?: string;
  /** State/province code (2-letter code, will be normalized and hashed) */
  state?: string;
  /** Zip/postal code (will be normalized and hashed) */
  zipCode?: string;
  /** Country code (2-letter ISO code, will be normalized and hashed) */
  country?: string;
  /** External ID (your own user identifier) */
  externalId?: string;
  /** Client IP address (collected server-side) */
  clientIpAddress?: string;
  /** Client User Agent (collected server-side or client-side) */
  clientUserAgent?: string;
  /** Facebook Click ID (fbc cookie or fbclid parameter) */
  fbc?: string;
  /** Facebook Browser ID (fbp cookie) */
  fbp?: string;
  /** Subscription ID (if applicable) */
  subscriptionId?: string;
  /** Facebook Login ID (if user logged in with Facebook) */
  fbLoginId?: string;
  /** Lead ID (if from lead generation) */
  leadId?: string;
}

export interface NormalizedUserData {
  /** Hashed email (SHA-256) */
  em?: string;
  /** Hashed phone (SHA-256) */
  ph?: string;
  /** Hashed first name (SHA-256) */
  fn?: string;
  /** Hashed last name (SHA-256) */
  ln?: string;
  /** Gender: 'm' or 'f' (not hashed) */
  ge?: 'm' | 'f';
  /** Date of birth YYYYMMDD (not hashed) */
  db?: string;
  /** Hashed city (SHA-256) */
  ct?: string;
  /** Hashed state (SHA-256) */
  st?: string;
  /** Hashed zip code (SHA-256) */
  zp?: string;
  /** Hashed country (SHA-256) */
  country?: string;
  /** External ID (not hashed) */
  external_id?: string;
  /** Client IP address (not hashed, collected server-side) */
  client_ip_address?: string;
  /** Client User Agent (not hashed) */
  client_user_agent?: string;
  /** Facebook Click ID (not hashed) */
  fbc?: string;
  /** Facebook Browser ID (not hashed) */
  fbp?: string;
  /** Subscription ID (not hashed) */
  subscription_id?: string;
  /** Facebook Login ID (not hashed) */
  fb_login_id?: string;
  /** Lead ID (not hashed) */
  lead_id?: string;
}

// ============================================================================
// NORMALIZATION FUNCTIONS
// ============================================================================

/**
 * Normalize email address per Meta requirements
 * 1. Remove leading/trailing whitespace
 * 2. Convert to lowercase
 * 
 * @param email - Raw email address
 * @returns Normalized email
 */
export function normalizeEmail(email: string): string {
  if (!email) return '';
  return email.trim().toLowerCase();
}

/**
 * Normalize phone number per Meta requirements
 * 1. Remove all non-numeric characters
 * 2. Remove leading zeros
 * 3. Add country code if missing (default: 55 for Brazil)
 * 
 * Format: [country_code][area_code][number]
 * Example: 5511999999999
 * 
 * @param phone - Raw phone number
 * @param defaultCountryCode - Default country code (default: '55' for Brazil)
 * @returns Normalized phone
 */
export function normalizePhone(phone: string, defaultCountryCode: string = '55'): string {
  if (!phone) return '';
  
  // Remove all non-numeric characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Remove leading zeros
  const withoutLeadingZeros = digitsOnly.replace(/^0+/, '');
  
  // Add country code if not present
  if (!withoutLeadingZeros.startsWith(defaultCountryCode)) {
    return defaultCountryCode + withoutLeadingZeros;
  }
  
  return withoutLeadingZeros;
}

/**
 * Normalize name (first or last) per Meta requirements
 * 1. Remove leading/trailing whitespace
 * 2. Convert to lowercase
 * 3. Remove all non-alphabetic characters except spaces
 * 
 * @param name - Raw name
 * @returns Normalized name
 */
export function normalizeName(name: string): string {
  if (!name) return '';
  
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z\s]/gi, '');
}

/**
 * Normalize city name per Meta requirements
 * 1. Remove leading/trailing whitespace
 * 2. Convert to lowercase
 * 3. Remove all non-alphabetic characters except spaces
 * 
 * @param city - Raw city name
 * @returns Normalized city
 */
export function normalizeCity(city: string): string {
  if (!city) return '';
  
  return city
    .trim()
    .toLowerCase()
    .replace(/[^a-z\s]/gi, '');
}

/**
 * Normalize state code per Meta requirements
 * 1. Remove leading/trailing whitespace
 * 2. Convert to lowercase
 * 3. Use 2-letter state code
 * 
 * @param state - Raw state code or name
 * @returns Normalized 2-letter state code
 */
export function normalizeState(state: string): string {
  if (!state) return '';
  
  const normalized = state.trim().toLowerCase();
  
  // If already 2 letters, return as is
  if (normalized.length === 2) {
    return normalized;
  }
  
  // Map common Brazilian state names to codes
  const stateMap: Record<string, string> = {
    'acre': 'ac',
    'alagoas': 'al',
    'amapá': 'ap',
    'amapa': 'ap',
    'amazonas': 'am',
    'bahia': 'ba',
    'ceará': 'ce',
    'ceara': 'ce',
    'distrito federal': 'df',
    'espírito santo': 'es',
    'espirito santo': 'es',
    'goiás': 'go',
    'goias': 'go',
    'maranhão': 'ma',
    'maranhao': 'ma',
    'mato grosso': 'mt',
    'mato grosso do sul': 'ms',
    'minas gerais': 'mg',
    'pará': 'pa',
    'para': 'pa',
    'paraíba': 'pb',
    'paraiba': 'pb',
    'paraná': 'pr',
    'parana': 'pr',
    'pernambuco': 'pe',
    'piauí': 'pi',
    'piaui': 'pi',
    'rio de janeiro': 'rj',
    'rio grande do norte': 'rn',
    'rio grande do sul': 'rs',
    'rondônia': 'ro',
    'rondonia': 'ro',
    'roraima': 'rr',
    'santa catarina': 'sc',
    'são paulo': 'sp',
    'sao paulo': 'sp',
    'sergipe': 'se',
    'tocantins': 'to',
  };
  
  return stateMap[normalized] || normalized.substring(0, 2);
}

/**
 * Normalize zip/postal code per Meta requirements
 * 1. Remove all non-alphanumeric characters
 * 2. Convert to lowercase
 * 
 * @param zipCode - Raw zip code
 * @returns Normalized zip code
 */
export function normalizeZipCode(zipCode: string): string {
  if (!zipCode) return '';
  
  return zipCode
    .replace(/[^a-z0-9]/gi, '')
    .toLowerCase();
}

/**
 * Normalize country code per Meta requirements
 * 1. Convert to lowercase
 * 2. Use 2-letter ISO country code
 * 
 * @param country - Raw country code or name
 * @returns Normalized 2-letter country code
 */
export function normalizeCountry(country: string): string {
  if (!country) return '';
  
  const normalized = country.trim().toLowerCase();
  
  // If already 2 letters, return as is
  if (normalized.length === 2) {
    return normalized;
  }
  
  // Map common country names to ISO codes
  const countryMap: Record<string, string> = {
    'brasil': 'br',
    'brazil': 'br',
    'united states': 'us',
    'usa': 'us',
    'portugal': 'pt',
    'argentina': 'ar',
    'chile': 'cl',
    'mexico': 'mx',
    'méxico': 'mx',
  };
  
  return countryMap[normalized] || normalized.substring(0, 2);
}

/**
 * Normalize date of birth per Meta requirements
 * Format: YYYYMMDD
 * 
 * @param dateOfBirth - Raw date of birth (various formats)
 * @returns Normalized date in YYYYMMDD format
 */
export function normalizeDateOfBirth(dateOfBirth: string): string {
  if (!dateOfBirth) return '';
  
  // Remove all non-numeric characters
  const digitsOnly = dateOfBirth.replace(/\D/g, '');
  
  // If already in YYYYMMDD format
  if (digitsOnly.length === 8) {
    return digitsOnly;
  }
  
  // Try to parse as date
  const date = new Date(dateOfBirth);
  if (!isNaN(date.getTime())) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }
  
  return '';
}

// ============================================================================
// HASHING FUNCTION
// ============================================================================

/**
 * Hash data using SHA-256
 * Uses Web Crypto API for browser compatibility
 * 
 * @param data - Data to hash
 * @returns SHA-256 hash in hexadecimal format
 */
export async function hashSHA256(data: string): Promise<string> {
  if (!data) return '';
  
  try {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  } catch (error) {
    console.error('[AdvancedMatching] Error hashing data:', error);
    return '';
  }
}

// ============================================================================
// ADVANCED MATCHING BUILDER
// ============================================================================

/**
 * Build normalized and hashed user data for CAPI
 * Implements Meta's Advanced Matching requirements
 * 
 * @param userData - Raw user data
 * @returns Normalized and hashed user data ready for CAPI
 */
export async function buildAdvancedMatchingData(
  userData: UserData
): Promise<NormalizedUserData> {
  const normalizedData: NormalizedUserData = {};
  
  // Email (normalized and hashed)
  if (userData.email) {
    const normalized = normalizeEmail(userData.email);
    normalizedData.em = await hashSHA256(normalized);
  }
  
  // Phone (normalized and hashed)
  if (userData.phone) {
    const normalized = normalizePhone(userData.phone);
    normalizedData.ph = await hashSHA256(normalized);
  }
  
  // First name (normalized and hashed)
  if (userData.firstName) {
    const normalized = normalizeName(userData.firstName);
    normalizedData.fn = await hashSHA256(normalized);
  }
  
  // Last name (normalized and hashed)
  if (userData.lastName) {
    const normalized = normalizeName(userData.lastName);
    normalizedData.ln = await hashSHA256(normalized);
  }
  
  // Gender (not hashed)
  if (userData.gender) {
    normalizedData.ge = userData.gender;
  }
  
  // Date of birth (normalized, not hashed)
  if (userData.dateOfBirth) {
    normalizedData.db = normalizeDateOfBirth(userData.dateOfBirth);
  }
  
  // City (normalized and hashed)
  if (userData.city) {
    const normalized = normalizeCity(userData.city);
    normalizedData.ct = await hashSHA256(normalized);
  }
  
  // State (normalized and hashed)
  if (userData.state) {
    const normalized = normalizeState(userData.state);
    normalizedData.st = await hashSHA256(normalized);
  }
  
  // Zip code (normalized and hashed)
  if (userData.zipCode) {
    const normalized = normalizeZipCode(userData.zipCode);
    normalizedData.zp = await hashSHA256(normalized);
  }
  
  // Country (normalized and hashed)
  if (userData.country) {
    const normalized = normalizeCountry(userData.country);
    normalizedData.country = await hashSHA256(normalized);
  }
  
  // External ID (not hashed)
  if (userData.externalId) {
    normalizedData.external_id = userData.externalId;
  }
  
  // Client IP address (not hashed, server-side only)
  if (userData.clientIpAddress) {
    normalizedData.client_ip_address = userData.clientIpAddress;
  }
  
  // Client User Agent (not hashed)
  if (userData.clientUserAgent) {
    normalizedData.client_user_agent = userData.clientUserAgent;
  }
  
  // Facebook Click ID (not hashed)
  if (userData.fbc) {
    normalizedData.fbc = userData.fbc;
  }
  
  // Facebook Browser ID (not hashed)
  if (userData.fbp) {
    normalizedData.fbp = userData.fbp;
  }
  
  // Subscription ID (not hashed)
  if (userData.subscriptionId) {
    normalizedData.subscription_id = userData.subscriptionId;
  }
  
  // Facebook Login ID (not hashed)
  if (userData.fbLoginId) {
    normalizedData.fb_login_id = userData.fbLoginId;
  }
  
  // Lead ID (not hashed)
  if (userData.leadId) {
    normalizedData.lead_id = userData.leadId;
  }
  
  return normalizedData;
}

/**
 * Count the number of customer information parameters provided
 * Used to calculate Advanced Matching quality
 * 
 * @param userData - Normalized user data
 * @returns Number of parameters provided
 */
export function countAdvancedMatchingParameters(userData: NormalizedUserData): number {
  let count = 0;
  
  // Count all provided fields
  if (userData.em) count++;
  if (userData.ph) count++;
  if (userData.fn) count++;
  if (userData.ln) count++;
  if (userData.ge) count++;
  if (userData.db) count++;
  if (userData.ct) count++;
  if (userData.st) count++;
  if (userData.zp) count++;
  if (userData.country) count++;
  if (userData.external_id) count++;
  if (userData.client_ip_address) count++;
  if (userData.client_user_agent) count++;
  if (userData.fbc) count++;
  if (userData.fbp) count++;
  if (userData.subscription_id) count++;
  if (userData.fb_login_id) count++;
  if (userData.lead_id) count++;
  
  return count;
}

/**
 * Validate that minimum required fields are present
 * For high EMQ, we need at least email or phone + additional fields
 * 
 * @param userData - Normalized user data
 * @returns Object with validation result and message
 */
export function validateAdvancedMatching(userData: NormalizedUserData): {
  valid: boolean;
  message: string;
  parameterCount: number;
} {
  const count = countAdvancedMatchingParameters(userData);
  
  // Check for at least email or phone
  if (!userData.em && !userData.ph) {
    return {
      valid: false,
      message: 'At least email or phone is required for Advanced Matching',
      parameterCount: count,
    };
  }
  
  // Recommend 12+ parameters for best EMQ
  if (count < 12) {
    return {
      valid: true,
      message: `Only ${count} parameters provided. Recommend 12+ for best EMQ (Event Match Quality > 8.0)`,
      parameterCount: count,
    };
  }
  
  return {
    valid: true,
    message: `Advanced Matching configured with ${count} parameters (target: 12+)`,
    parameterCount: count,
  };
}

// ============================================================================
// EXPORT
// ============================================================================

export const advancedMatching = {
  // Normalization
  normalizeEmail,
  normalizePhone,
  normalizeName,
  normalizeCity,
  normalizeState,
  normalizeZipCode,
  normalizeCountry,
  normalizeDateOfBirth,
  
  // Hashing
  hash: hashSHA256,
  
  // Builder
  build: buildAdvancedMatchingData,
  count: countAdvancedMatchingParameters,
  validate: validateAdvancedMatching,
};

export default advancedMatching;
