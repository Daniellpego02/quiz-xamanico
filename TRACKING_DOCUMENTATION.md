# Tracking Implementation Documentation

## Overview

This document describes the comprehensive tracking implementation for the Quiz Xamânico application. The tracking setup includes multiple analytics and conversion tracking platforms to provide complete visibility into user behavior and marketing campaign performance.

## Tracking Platforms

### 1. UTM Parameter Tracking
**Provider:** UTMFY  
**Script Location:** `index.html`, `public/obrigado.html`  
**Purpose:** Captures and preserves UTM parameters from marketing campaigns

```html
<script
  src="https://cdn.utmify.com.br/scripts/utms/latest.js"
  data-utmify-prevent-xcod-sck
  data-utmify-prevent-subids
  async
  defer
></script>
```

**Features:**
- Automatic UTM parameter capture
- Session persistence via sessionStorage
- Prevents xcod-sck and subids tracking
- Async loading for performance

### 2. UTMFY Pixel
**Pixel ID:** `69346cfb70f1cd636eb5e31c`  
**Script Location:** `index.html`, `public/obrigado.html`  
**Purpose:** Conversion tracking and attribution

```html
<script>
  window.pixelId = "69346cfb70f1cd636eb5e31c";
  var a = document.createElement("script");
  a.setAttribute("async", "");
  a.setAttribute("defer", "");
  a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
  document.head.appendChild(a);
</script>
```

### 3. Meta Pixel (Facebook Ads)
**Pixel ID:** `1908080873443730`  
**Script Location:** `index.html`, `public/obrigado.html`  
**Purpose:** Facebook Ads conversion tracking and audience building

**Standard Events Tracked:**
- `PageView` - Automatic on all pages
- `Lead` - When quiz is initiated
- `CompleteRegistration` - When quiz is completed
- `ViewContent` - When viewing offers
- `InitiateCheckout` - When starting checkout process
- `Purchase` - When purchase is completed

**Custom Events Tracked:**
- `QuizStarted` - User enters name and starts quiz
- `QuizAnswer` - Each quiz answer with detailed metadata
- `QuizProgress` - Progress percentage updates
- `QuizHalfway` - 50% completion milestone
- `CTAClick` - Call-to-action button clicks
- `ViewUpsell` - Upsell page views
- `ViewDownsell` - Downsell page views

### 4. Microsoft Clarity
**Project ID:** `uq1qfi7fwi`  
**Script Location:** `index.html`, `public/obrigado.html`  
**Purpose:** Session recordings and heatmaps

```html
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "uq1qfi7fwi");
</script>
```

## Centralized Tracking Utility

### Location
`src/utils/tracking.ts`

### Purpose
Provides a type-safe, centralized API for all tracking operations with:
- Error handling and fallback mechanisms
- Type safety with TypeScript
- Development logging
- Consistent tracking patterns

### API Usage

#### Importing
```typescript
import { tracking } from '../utils/tracking';
```

#### Standard Meta Pixel Events

```typescript
// Track page view
tracking.meta.pageView();

// Track lead (quiz start)
tracking.meta.lead({ content_name: 'Quiz Iniciado' });

// Track complete registration
tracking.meta.completeRegistration({ 
  content_name: 'Quiz Completo', 
  path: 'finance' 
});

// Track purchase
tracking.meta.purchase({
  value: 97.00,
  currency: 'BRL',
  content_name: 'Mapa Xamânico'
});

// Track checkout initiation
tracking.meta.initiateCheckout({
  content_name: 'Offer Page',
  value: 97.00
});
```

#### Quiz-Specific Events

```typescript
// Track quiz start with user name
tracking.quiz.started('João Silva');

// Track individual answer
tracking.quiz.answer({
  questionTitle: 'CALIBRAGEM DE INTENSIDADE',
  questionStep: 2,
  answerValue: 'years_1_3',
  answerLabel: 'Entre 1 e 3 anos',
  quizPath: 'finance'
});

// Track progress
tracking.quiz.progress(50, 3); // 50% complete, step 3

// Track halfway point
tracking.quiz.halfway();

// Track completion
tracking.quiz.complete('finance');
```

#### Funnel Events

```typescript
// Track offer view
tracking.funnel.viewOffer('Oferta Principal');

// Track CTA click
tracking.funnel.clickCTA('Comprar Agora - Oferta Principal');

// Track upsell view
tracking.funnel.viewUpsell('Upsell 1 - Ritual Completo');

// Track downsell view
tracking.funnel.viewDownsell('Downsell 1 - Oferta Especial');
```

#### UTM Parameter Management

```typescript
// Get current UTM parameters from URL
const utmParams = tracking.utm.getParams();
// Returns: { utm_source: 'facebook', utm_campaign: 'quiz_launch', ... }

// Store UTM parameters in session
tracking.utm.storeParams();

// Retrieve stored UTM parameters
const storedParams = tracking.utm.getStoredParams();
```

## Implementation in Components

### Hero Component
**File:** `src/components/Hero.tsx`

```typescript
import { tracking } from '../utils/tracking';

const handleStartClick = () => {
  tracking.meta.lead({ content_name: 'Quiz Iniciado' });
  onStart();
};
```

### Quiz Component
**File:** `src/components/Quiz.tsx`

```typescript
import { tracking } from '../utils/tracking';

// Track quiz start
tracking.quiz.started(userName);

// Track answer and progress
tracking.quiz.answer({
  questionTitle: currentQuestion.title,
  questionStep: currentIndex + 1,
  answerValue: option.value,
  answerLabel: option.label,
  quizPath: QUIZ_PATH
});

tracking.quiz.progress(percentage, step);

// Track completion
tracking.meta.completeRegistration({ 
  content_name: 'Quiz Completo', 
  path: QUIZ_PATH 
});
```

## Best Practices

### 1. Always Use the Tracking Utility
Instead of calling `window.fbq` directly, use the tracking utility:

❌ **Bad:**
```typescript
if (typeof window.fbq === 'function') {
  window.fbq('track', 'Lead');
}
```

✅ **Good:**
```typescript
tracking.meta.lead();
```

### 2. Provide Context in Events
Always include relevant metadata:

```typescript
tracking.quiz.answer({
  questionTitle: 'Current Question',
  questionStep: 1,
  answerValue: 'answer_key',
  answerLabel: 'User-visible answer',
  quizPath: 'finance'
});
```

### 3. Error Handling
The tracking utility handles errors automatically, but you can add additional logging:

```typescript
try {
  tracking.meta.purchase({
    value: amount,
    currency: 'BRL',
    content_name: productName
  });
} catch (error) {
  console.error('Purchase tracking failed:', error);
}
```

### 4. Development Mode
In development, tracking events are logged to the console. Check browser console to verify tracking calls.

## Testing

### Manual Testing

1. **Open Browser Console** during development
2. **Navigate through the quiz** and observe tracking logs
3. **Check Meta Pixel Helper** (Chrome extension) to verify pixel events
4. **Verify UTM Parameters** are captured in sessionStorage
5. **Check Clarity Dashboard** for session recordings

### Verification Checklist

- [ ] UTM parameters captured from URL
- [ ] UTMFY pixel loaded successfully
- [ ] Meta Pixel fires PageView on load
- [ ] Lead event fires when quiz starts
- [ ] Quiz events track with correct metadata
- [ ] CompleteRegistration fires on quiz completion
- [ ] Clarity session recording active
- [ ] No JavaScript errors in console

## Troubleshooting

### Pixel Not Firing

1. Check browser console for errors
2. Verify ad blockers are disabled
3. Check Meta Pixel Helper extension
4. Verify script loaded in Network tab

### UTM Parameters Not Captured

1. Verify URL contains UTM parameters
2. Check sessionStorage in DevTools
3. Verify UTMFY script loaded successfully

### Type Errors

The tracking utility provides full TypeScript support. If you see type errors:

1. Ensure you're importing from the correct path
2. Check that required parameters are provided
3. Verify TypeScript version is compatible

## Security Considerations

1. **No PII in Tracking:** Never send personal identifiable information in tracking events
2. **Async Loading:** All scripts load asynchronously to prevent blocking
3. **Error Handling:** All tracking calls are wrapped in try-catch to prevent failures
4. **Type Safety:** TypeScript ensures correct usage and prevents runtime errors

## Performance Impact

All tracking scripts are loaded with `async` and `defer` attributes to minimize performance impact:

- **UTM Tracking:** ~5KB, async
- **UTMFY Pixel:** ~8KB, async
- **Meta Pixel:** ~30KB, async
- **Clarity:** ~25KB, async

**Total:** ~68KB loaded asynchronously, minimal impact on page load time.

## Maintenance

### Adding New Events

1. Add the event to the tracking utility (`src/utils/tracking.ts`)
2. Document the event in this file
3. Test the event in development
4. Verify in production using Meta Pixel Helper or dashboard

### Updating Pixel IDs

Pixel IDs are configured in HTML files:
- `index.html` (main quiz page)
- `public/obrigado.html` (thank you page)

Update both files when changing pixel IDs.

## Support

For issues or questions about tracking implementation:
1. Check browser console for errors
2. Review this documentation
3. Check tracking platform dashboards (Meta Events Manager, Clarity)
4. Contact development team for code-related issues
