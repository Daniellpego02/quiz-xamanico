import { describe, it, expect } from 'vitest';
import {
  normalizeEmail,
  normalizePhone,
  normalizeName,
  normalizeCity,
  normalizeState,
  normalizeZipCode,
  normalizeCountry,
  normalizeDateOfBirth,
  hashSHA256,
  buildAdvancedMatchingData,
  countAdvancedMatchingParameters,
  validateAdvancedMatching,
} from '../src/utils/advancedMatching';

describe('advancedMatching - Normalization', () => {
  describe('normalizeEmail', () => {
    it('should convert to lowercase', () => {
      expect(normalizeEmail('TEST@EXAMPLE.COM')).toBe('test@example.com');
    });

    it('should trim whitespace', () => {
      expect(normalizeEmail('  test@example.com  ')).toBe('test@example.com');
    });

    it('should handle empty string', () => {
      expect(normalizeEmail('')).toBe('');
    });
  });

  describe('normalizePhone', () => {
    it('should remove non-numeric characters', () => {
      expect(normalizePhone('(11) 99999-9999')).toBe('5511999999999');
    });

    it('should add default country code', () => {
      expect(normalizePhone('11999999999')).toBe('5511999999999');
    });

    it('should not add country code if present', () => {
      expect(normalizePhone('5511999999999')).toBe('5511999999999');
    });

    it('should remove leading zeros', () => {
      expect(normalizePhone('0011999999999')).toBe('5511999999999');
    });
  });

  describe('normalizeName', () => {
    it('should convert to lowercase', () => {
      expect(normalizeName('JOHN DOE')).toBe('john doe');
    });

    it('should remove special characters', () => {
      expect(normalizeName('John-Doe!')).toBe('johndoe');
    });

    it('should keep spaces', () => {
      expect(normalizeName('John Doe')).toBe('john doe');
    });
  });

  describe('normalizeState', () => {
    it('should convert full state name to code', () => {
      expect(normalizeState('São Paulo')).toBe('sp');
      expect(normalizeState('Rio de Janeiro')).toBe('rj');
    });

    it('should keep 2-letter codes', () => {
      expect(normalizeState('SP')).toBe('sp');
    });
  });

  describe('normalizeZipCode', () => {
    it('should remove non-alphanumeric characters', () => {
      expect(normalizeZipCode('01310-100')).toBe('01310100');
    });

    it('should convert to lowercase', () => {
      expect(normalizeZipCode('ABC123')).toBe('abc123');
    });
  });

  describe('normalizeCountry', () => {
    it('should convert country name to code', () => {
      expect(normalizeCountry('Brasil')).toBe('br');
      expect(normalizeCountry('United States')).toBe('us');
    });

    it('should keep 2-letter codes', () => {
      expect(normalizeCountry('BR')).toBe('br');
    });
  });

  describe('normalizeDateOfBirth', () => {
    it('should convert to YYYYMMDD format', () => {
      expect(normalizeDateOfBirth('1990-01-15')).toBe('19900115');
    });

    it('should handle already formatted dates', () => {
      expect(normalizeDateOfBirth('19900115')).toBe('19900115');
    });
  });
});

describe('advancedMatching - Hashing', () => {
  describe('hashSHA256', () => {
    it('should generate SHA-256 hash', async () => {
      const hash = await hashSHA256('test@example.com');
      expect(hash).toBeTruthy();
      expect(hash).toHaveLength(64); // SHA-256 produces 64 hex characters
    });

    it('should produce consistent hashes', async () => {
      const hash1 = await hashSHA256('test@example.com');
      const hash2 = await hashSHA256('test@example.com');
      expect(hash1).toBe(hash2);
    });

    it('should produce different hashes for different inputs', async () => {
      const hash1 = await hashSHA256('test1@example.com');
      const hash2 = await hashSHA256('test2@example.com');
      expect(hash1).not.toBe(hash2);
    });

    it('should handle empty string', async () => {
      const hash = await hashSHA256('');
      expect(hash).toBe('');
    });
  });
});

describe('advancedMatching - Builder', () => {
  describe('buildAdvancedMatchingData', () => {
    it('should build complete user data object', async () => {
      const userData = {
        email: 'test@example.com',
        phone: '11999999999',
        firstName: 'John',
        lastName: 'Doe',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01310-100',
        country: 'BR',
      };

      const result = await buildAdvancedMatchingData(userData);

      expect(result.em).toBeTruthy();
      expect(result.ph).toBeTruthy();
      expect(result.fn).toBeTruthy();
      expect(result.ln).toBeTruthy();
      expect(result.ct).toBeTruthy();
      expect(result.st).toBeTruthy();
      expect(result.zp).toBeTruthy();
      expect(result.country).toBeTruthy();
    });

    it('should handle partial user data', async () => {
      const userData = {
        email: 'test@example.com',
      };

      const result = await buildAdvancedMatchingData(userData);

      expect(result.em).toBeTruthy();
      expect(result.ph).toBeUndefined();
      expect(result.fn).toBeUndefined();
    });

    it('should preserve non-hashed fields', async () => {
      const userData = {
        email: 'test@example.com',
        gender: 'm' as const,
        dateOfBirth: '1990-01-15',
        fbp: 'fb.1.123456.abcdef',
        fbc: 'fb.1.123456.ghijkl',
      };

      const result = await buildAdvancedMatchingData(userData);

      expect(result.ge).toBe('m');
      expect(result.db).toBe('19900115');
      expect(result.fbp).toBe('fb.1.123456.abcdef');
      expect(result.fbc).toBe('fb.1.123456.ghijkl');
    });
  });

  describe('countAdvancedMatchingParameters', () => {
    it('should count all provided parameters', () => {
      const userData = {
        em: 'hash',
        ph: 'hash',
        fn: 'hash',
        ln: 'hash',
        ge: 'm' as const,
        db: '19900115',
        ct: 'hash',
        st: 'hash',
        zp: 'hash',
        country: 'hash',
        fbp: 'fb.1.123',
        fbc: 'fb.1.456',
      };

      expect(countAdvancedMatchingParameters(userData)).toBe(12);
    });

    it('should count only provided parameters', () => {
      const userData = {
        em: 'hash',
        ph: 'hash',
      };

      expect(countAdvancedMatchingParameters(userData)).toBe(2);
    });
  });

  describe('validateAdvancedMatching', () => {
    it('should validate with email', () => {
      const userData = {
        em: 'hash',
        ph: 'hash',
        fn: 'hash',
      };

      const result = validateAdvancedMatching(userData);
      expect(result.valid).toBe(true);
      expect(result.parameterCount).toBe(3);
    });

    it('should fail without email or phone', () => {
      const userData = {
        fn: 'hash',
        ln: 'hash',
      };

      const result = validateAdvancedMatching(userData);
      expect(result.valid).toBe(false);
      expect(result.message).toContain('email or phone is required');
    });

    it('should recommend 12+ parameters', () => {
      const userData = {
        em: 'hash',
        ph: 'hash',
        fn: 'hash',
      };

      const result = validateAdvancedMatching(userData);
      expect(result.valid).toBe(true);
      expect(result.message).toContain('Recommend 12+');
    });
  });
});
