/**
 * Anti-Plagiarism Protection Utility
 * Minified inline protection against site cloning
 */

/// <reference types="vite/client" />

// Configuration - UPDATE THIS WITH YOUR PRODUCTION DOMAIN
const ALLOWED_DOMAINS = [
  'mapaxamanicooficial.online',
  'www.mapaxamanicooficial.online',
  'localhost', // Allow localhost for development
];

/**
 * Initialize anti-plagiarism protection
 * This runs immediately when the script loads
 */
(function a013() {
  'use strict';

  // Generate unique session token
  if (typeof window !== 'undefined') {
    window.__tkn = crypto.randomUUID();
  }

  // Domain verification (disabled in development)
  function b024() {
    if (typeof window === 'undefined') return;
    
    const hostname = window.location.hostname;
    const isDev = import.meta.env?.DEV || hostname === 'localhost' || hostname === '127.0.0.1';
    
    // Skip domain check in development
    if (isDev) {
      console.log('[Anti-Clone] Development mode - domain check bypassed');
      return;
    }

    // Check if current domain is allowed
    const isAllowed = ALLOWED_DOMAINS.some(domain => 
      hostname === domain || hostname.endsWith('.' + domain)
    );

    if (!isAllowed) {
      console.error('[Anti-Clone] Unauthorized domain detected');
      document.documentElement.innerHTML = '';
      throw new Error('Unauthorized access');
    }
  }

  // Disable DevTools shortcuts (F12, Ctrl+Shift+I, etc.)
  function c035() {
    if (typeof window === 'undefined') return;

    const events = ['contextmenu', 'keydown', 'keyup'];
    
    events.forEach(eventName => {
      window.addEventListener(eventName, (evt) => {
        // Disable right-click
        if (eventName === 'contextmenu') {
          evt.preventDefault();
          return false;
        }

        // Disable DevTools shortcuts
        // F12 = 123, Ctrl+Shift+I = 73, Ctrl+Shift+J = 74, Ctrl+U = 85
        if (evt.ctrlKey && (
          evt.keyCode === 73 || // I
          evt.keyCode === 74 || // J
          evt.keyCode === 85 || // U
          evt.keyCode === 83 || // S
          evt.keyCode === 67 || // C (when Shift is also pressed)
          evt.keyCode === 123   // F12
        )) {
          evt.preventDefault();
          return false;
        }

        // F12 alone
        if (evt.keyCode === 123) {
          evt.preventDefault();
          return false;
        }
      }, false);
    });
  }

  // Add dynamic watermark
  function d046() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const style = document.createElement('style');
    style.textContent = `
      body::after {
        content: 'ID:' attr(data-tkn);
        position: fixed;
        bottom: 2px;
        right: 2px;
        opacity: 0.2;
        font-size: 10px;
        color: #888;
        pointer-events: none;
        z-index: 999999;
      }
    `;
    document.head.appendChild(style);

    // Set token on body
    if (window.__tkn) {
      document.body.setAttribute('data-tkn', window.__tkn.substring(0, 8));
    }
  }

  // Detect DevTools
  function e057() {
    if (typeof window === 'undefined') return;

    let devtoolsOpen = false;
    const threshold = 160;

    setInterval(() => {
      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        if (!devtoolsOpen) {
          devtoolsOpen = true;
          console.log('[Anti-Clone] DevTools detected');
        }
      } else {
        devtoolsOpen = false;
      }
    }, 1000);
  }

  // Initialize all protections
  try {
    b024(); // Domain check
    c035(); // Disable shortcuts
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        d046(); // Watermark
        e057(); // DevTools detection
      });
    } else {
      d046();
      e057();
    }
  } catch (error) {
    console.error('[Anti-Clone] Protection initialization failed:', error);
  }
})();

// Type declarations
declare global {
  interface Window {
    __tkn: string;
  }
}

export {};
