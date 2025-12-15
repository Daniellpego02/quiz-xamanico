// Pricing constants for Upsell and Downsell pages
export const PRICING = {
  upsell1: {
    original: '497,00',
    offer: '49,90',
    exitPopupDiscount: '37,00',
    savings: '12,90'
  },
  downsell1: {
    original: '67,00',
    offer: '19,90',
    exitPopupDiscount: '14,90',
    savings: '5,00'
  }
} as const;

// Checkout URLs
export const CHECKOUT_URLS = {
  upsell1: 'https://checkout.mapaxamanicooficial.online/cerimonia-quebra',
  downsell1: 'https://checkout.mapaxamanicooficial.online/codigos-grabovoi'
} as const;

// Timer durations in seconds
export const TIMER_DURATIONS = {
  upsell1: 600,  // 10 minutes
  downsell1: 300 // 5 minutes
} as const;
