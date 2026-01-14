/**
 * LGPD/GDPR Consent Banner
 * 
 * Cookie consent banner that blocks tracking until user consent is given.
 * Complies with Brazilian LGPD and European GDPR requirements.
 * 
 * Features:
 * - Blocks all tracking cookies until consent
 * - Allows opt-out at any time
 * - Stores user preference
 * - Provides clear information about data collection
 */

import { useState, useEffect } from 'react';
import { X, Shield, Cookie } from 'lucide-react';

// ============================================================================
// CONSENT MANAGEMENT
// ============================================================================

const CONSENT_STORAGE_KEY = 'tracking_consent';
const CONSENT_VERSION = '1.0'; // Increment when privacy policy changes

export interface ConsentPreferences {
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
  version: string;
}

/**
 * Get user's consent preferences from storage
 */
export function getConsentPreferences(): ConsentPreferences | null {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;

    const preferences = JSON.parse(stored) as ConsentPreferences;

    // Check if consent is for current version
    if (preferences.version !== CONSENT_VERSION) {
      return null; // Require new consent if policy changed
    }

    return preferences;
  } catch {
    return null;
  }
}

/**
 * Save user's consent preferences
 */
export function saveConsentPreferences(preferences: Omit<ConsentPreferences, 'timestamp' | 'version'>): void {
  if (typeof localStorage === 'undefined') return;

  const fullPreferences: ConsentPreferences = {
    ...preferences,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  };

  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(fullPreferences));
}

/**
 * Clear user's consent preferences (opt-out)
 */
export function clearConsentPreferences(): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(CONSENT_STORAGE_KEY);
}

/**
 * Check if user has given consent for tracking
 */
export function hasTrackingConsent(): boolean {
  const preferences = getConsentPreferences();
  return preferences?.analytics === true || preferences?.marketing === true;
}

/**
 * Check if user has given consent for analytics
 */
export function hasAnalyticsConsent(): boolean {
  const preferences = getConsentPreferences();
  return preferences?.analytics === true;
}

/**
 * Check if user has given consent for marketing
 */
export function hasMarketingConsent(): boolean {
  const preferences = getConsentPreferences();
  return preferences?.marketing === true;
}

// ============================================================================
// TRACKING BLOCKER
// ============================================================================

/**
 * Block tracking scripts until consent is given
 * Call this before any tracking initialization
 */
export function blockTrackingUntilConsent(): void {
  if (typeof window === 'undefined') return;

  const preferences = getConsentPreferences();

  // If no consent, disable tracking functions
  if (!preferences || (!preferences.analytics && !preferences.marketing)) {
    // Disable Meta Pixel
    if (window.fbq) {
      window.fbq = function() {
        console.log('[Consent] Tracking blocked: Meta Pixel');
      };
    }

    // Disable Google Analytics
    if (window.gtag) {
      window.gtag = function() {
        console.log('[Consent] Tracking blocked: Google Analytics');
      };
    }

    // Disable Microsoft Clarity
    if (window.clarity) {
      window.clarity = function() {
        console.log('[Consent] Tracking blocked: Microsoft Clarity');
      };
    }
  }
}

// ============================================================================
// CONSENT BANNER COMPONENT
// ============================================================================

interface ConsentBannerProps {
  /** Callback when consent is given */
  onConsentGiven?: (preferences: ConsentPreferences) => void;
  /** Callback when consent is declined */
  onConsentDeclined?: () => void;
}

export function ConsentBanner({ onConsentGiven, onConsentDeclined }: ConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already given/declined consent
    const preferences = getConsentPreferences();
    
    if (!preferences) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const preferences: Omit<ConsentPreferences, 'timestamp' | 'version'> = {
      analytics: true,
      marketing: true,
    };

    saveConsentPreferences(preferences);
    setIsVisible(false);

    if (onConsentGiven) {
      onConsentGiven({
        ...preferences,
        timestamp: Date.now(),
        version: CONSENT_VERSION,
      });
    }

    // Reload page to initialize tracking
    window.location.reload();
  };

  const handleAcceptEssential = () => {
    const preferences: Omit<ConsentPreferences, 'timestamp' | 'version'> = {
      analytics: false,
      marketing: false,
    };

    saveConsentPreferences(preferences);
    setIsVisible(false);

    if (onConsentDeclined) {
      onConsentDeclined();
    }
  };

  const handleCustomize = () => {
    setShowDetails(!showDetails);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center p-4 sm:items-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Banner */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-2xl border border-slate-700">
        {/* Icon */}
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-full bg-orange-500/20 p-3">
            <Cookie className="h-6 w-6 text-orange-500" />
          </div>
          <h2 className="text-xl font-bold text-white">
            Privacidade e Cookies
          </h2>
        </div>

        {/* Main content */}
        <div className="mb-6 space-y-3 text-slate-300">
          <p className="leading-relaxed">
            Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência, 
            personalizar conteúdo, analisar o tráfego e otimizar nossos anúncios.
          </p>

          {showDetails && (
            <div className="space-y-4 rounded-lg bg-slate-800/50 p-4 border border-slate-700">
              <div>
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-white">
                  <Shield className="h-4 w-4 text-green-500" />
                  Cookies Essenciais
                </h3>
                <p className="text-sm text-slate-400">
                  Necessários para o funcionamento básico do site. Sempre ativos.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-white">
                  📊 Cookies Analíticos
                </h3>
                <p className="text-sm text-slate-400">
                  Nos ajudam a entender como você usa nosso site para melhorá-lo.
                  Inclui: Google Analytics, Microsoft Clarity.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-white">
                  🎯 Cookies de Marketing
                </h3>
                <p className="text-sm text-slate-400">
                  Utilizados para exibir anúncios relevantes e medir a eficácia de campanhas.
                  Inclui: Meta Pixel (Facebook), Google Ads.
                </p>
              </div>

              <p className="text-xs text-slate-500">
                Você pode alterar suas preferências a qualquer momento através das configurações 
                de cookies no rodapé do site.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleAcceptAll}
            className="flex-1 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white transition-all hover:from-orange-600 hover:to-orange-700 hover:shadow-lg"
          >
            Aceitar Todos
          </button>

          <button
            onClick={handleCustomize}
            className="flex-1 rounded-lg border border-slate-600 px-6 py-3 font-semibold text-white transition-all hover:bg-slate-800"
          >
            {showDetails ? 'Ocultar Detalhes' : 'Personalizar'}
          </button>

          <button
            onClick={handleAcceptEssential}
            className="flex-1 rounded-lg border border-slate-600 px-6 py-3 font-semibold text-slate-400 transition-all hover:bg-slate-800 hover:text-white"
          >
            Apenas Essenciais
          </button>
        </div>

        {/* Privacy policy link */}
        <p className="mt-4 text-center text-xs text-slate-500">
          Ao continuar, você concorda com nossa{' '}
          <a href="/politica-privacidade" className="text-orange-500 hover:underline">
            Política de Privacidade
          </a>
          {' '}e{' '}
          <a href="/termos-uso" className="text-orange-500 hover:underline">
            Termos de Uso
          </a>
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// COOKIE SETTINGS COMPONENT (for footer/settings page)
// ============================================================================

export function CookieSettings() {
  const [preferences, setPreferences] = useState(getConsentPreferences());
  const [analytics, setAnalytics] = useState(preferences?.analytics ?? false);
  const [marketing, setMarketing] = useState(preferences?.marketing ?? false);

  const handleSave = () => {
    saveConsentPreferences({ analytics, marketing });
    window.location.reload();
  };

  const handleClearAll = () => {
    clearConsentPreferences();
    setAnalytics(false);
    setMarketing(false);
    window.location.reload();
  };

  return (
    <div className="rounded-xl bg-slate-800 p-6 border border-slate-700">
      <h3 className="mb-4 text-lg font-bold text-white">
        Configurações de Cookies
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-white">Cookies Essenciais</p>
            <p className="text-sm text-slate-400">Sempre ativos</p>
          </div>
          <div className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-500">
            Ativo
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-white">Cookies Analíticos</p>
            <p className="text-sm text-slate-400">Google Analytics, Clarity</p>
          </div>
          <button
            onClick={() => setAnalytics(!analytics)}
            className={`relative h-8 w-14 rounded-full transition-colors ${
              analytics ? 'bg-orange-500' : 'bg-slate-600'
            }`}
          >
            <span
              className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white transition-transform ${
                analytics ? 'translate-x-6' : ''
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-white">Cookies de Marketing</p>
            <p className="text-sm text-slate-400">Meta Pixel, Google Ads</p>
          </div>
          <button
            onClick={() => setMarketing(!marketing)}
            className={`relative h-8 w-14 rounded-full transition-colors ${
              marketing ? 'bg-orange-500' : 'bg-slate-600'
            }`}
          >
            <span
              className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white transition-transform ${
                marketing ? 'translate-x-6' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={handleSave}
          className="flex-1 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white transition-all hover:from-orange-600 hover:to-orange-700"
        >
          Salvar Preferências
        </button>
        <button
          onClick={handleClearAll}
          className="rounded-lg border border-red-500/50 px-6 py-3 font-semibold text-red-500 transition-all hover:bg-red-500/10"
        >
          Limpar Tudo
        </button>
      </div>
    </div>
  );
}

export default ConsentBanner;
