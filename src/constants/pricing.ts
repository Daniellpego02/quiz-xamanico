// Pricing constants for Upsell and Downsell pages
export const PRICING = {
  oferta1: {
    original: '79,00',
    offer: '29,00',
    exitPopupDiscount: '29,00',
    savings: '50,00' // R$79 - R$29 = R$50
  },
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
  upsell1: {
    main: 'https://go.perfectpay.com.br/PPU38CQ4OE0?upsell=true',
    exitPopup: 'https://go.perfectpay.com.br/PPU38CQ4OE9?upsell=true'
  },
  downsell1: {
    main: 'https://go.perfectpay.com.br/PPU38CQ4OE5?upsell=true',
    exitPopup: 'https://go.perfectpay.com.br/PPU38CQ4OE8?upsell=true'
  }
} as const;

// Timer durations in seconds
export const TIMER_DURATIONS = {
  upsell1: 600,  // 10 minutes
  downsell1: 300 // 5 minutes
} as const;
