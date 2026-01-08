# Advanced Tracking Architecture Documentation

## Overview

This document describes the **Advanced Tracking Architecture** implemented for the Quiz Xamânico application. The system is designed to optimize ROAS (Return on Ad Spend) through:

- **Hybrid Tracking** (Client-Side + Server-Side Ready)
- **Event Deduplication** with unique `event_id`
- **Lead Scoring** based on quiz responses
- **Value-Based Optimization** for Meta campaigns
- **Video Engagement Tracking** (VTurb)
- **Cross-platform Analytics** (Meta Pixel, GA4, Clarity)

---

## Tracking Platforms

### 1. Meta Pixel (Facebook Ads)
| Property | Value |
|----------|-------|
| **Pixel ID** | `1908080873443730` |
| **Location** | `index.html`, `public/obrigado.html` |
| **Purpose** | Conversion tracking, audience building, CAPI-ready |

**Standard Events:**
- `PageView` - Automatic on all pages
- `Lead` - Quiz completion with lead value
- `CompleteRegistration` - Quiz completion with enriched data
- `ViewContent` - Offer page views
- `InitiateCheckout` - Checkout initiation
- `Purchase` - Purchase completion

**Custom Events (with deduplication):**
- `QuizStarted` - User enters name
- `QuizAnswer` - Each answer with score contribution
- `QuizProgress` - Progress milestones
- `QuizHalfway` - 50% completion
- `CTAClick` - CTA interactions
- `ViewUpsell` / `ViewDownsell` - Funnel stage views
- `VideoPlay` / `VideoPause` / `VideoComplete` - Video engagement
- `VideoProgress25/50/75/95` - Video milestones
- `PitchViewed` - When user reaches the offer pitch in video

### 2. Google Analytics (GA4)
| Property | Value |
|----------|-------|
| **Measurement ID** | `G-M78M3RH56H` |
| **Location** | `index.html`, `public/obrigado.html` |
| **Purpose** | Behavior analytics, funnel visualization |

**Events tracked:**
- `page_view` - Page views with session data
- `quiz_answer` - Quiz interactions
- `generate_lead` - Lead generation
- `sign_up` - Registration completion
- `video_progress` - Video engagement
- `pitch_viewed` - Pitch moment tracking
- `view_item` - Offer views
- `begin_checkout` - Checkout initiation
- `purchase` - Conversions

### 3. Microsoft Clarity
| Property | Value |
|----------|-------|
| **Project ID** | `uq1qfi7fwi` |
| **Location** | `index.html`, `public/obrigado.html` |
| **Purpose** | Session recordings, heatmaps, UX analysis |

**Custom Tags:**
- `lead_qualidade` - Lead quality segment (hot/warm/disqualified)
- `lead_score` - Running lead score
- `lead_score_final` - Final lead score
- `lead_value` - Monetary value assigned to lead
- `quiz_progress` - Current quiz question
- `video_progress` - Video watch percentage
- `pitch_viewed` - Whether pitch was seen
- `checkout_initiated` - Checkout started
- `purchase_completed` - Purchase made
- `purchase_value` - Purchase amount

### 4. VTurb Video Player
| Property | Value |
|----------|-------|
| **API Token** | `3032350019e84cd96c6e18de4a3f7cc45ea9952635eb0965e836022905ddc2a4` |
| **Purpose** | Video engagement tracking |

### 5. UTMFY
| Property | Value |
|----------|-------|
| **Pixel ID** | `69346cfb70f1cd636eb5e31c` |
| **Purpose** | UTM parameter capture and attribution |

---

## Architecture Components

### File Structure
```
src/
├── config/
│   └── tracking.config.ts      # Centralized configuration
├── hooks/
│   └── useTrackingState.ts     # React hook for tracking
├── utils/
│   ├── tracking.ts             # Legacy tracking (basic)
│   └── advancedTracking.ts     # Advanced tracking system
└── components/
    └── VTurbTracker.tsx        # VTurb video component
```

### 1. Configuration (`src/config/tracking.config.ts`)

Centralized configuration for all tracking services:

```typescript
import { 
  META_PIXEL_ID,
  GA4_MEASUREMENT_ID,
  CLARITY_PROJECT_ID,
  VTURB_API_TOKEN,
  PRODUCT_CONFIG,
  LEAD_SCORE_THRESHOLDS,
  VIDEO_CONFIG
} from '../config/tracking.config';
```

### 2. Advanced Tracking (`src/utils/advancedTracking.ts`)

Main features:
- **Event Deduplication**: Unique `event_id` for each event
- **SHA-256 Hashing**: For PII protection (CAPI-ready)
- **Lead Scoring**: Score calculation based on quiz answers
- **State Persistence**: LocalStorage for cross-page tracking
- **Multi-platform Events**: Meta, GA4, Clarity in one call

```typescript
import { advancedTracking } from '../utils/advancedTracking';

// Track quiz answer with scoring
advancedTracking.trackQuizAnswer({
  questionId: 1,
  questionTitle: 'P1 — O RALO ENERGÉTICO',
  answerValue: 'leak',
  answerLabel: 'Montanha Russa...',
  quizPath: 'finance'
});

// Track lead with value-based optimization
advancedTracking.trackLead({
  content_name: 'Quiz Completo',
  userName: 'João'
});
```

### 3. React Hook (`src/hooks/useTrackingState.ts`)

Reactive tracking state for React components:

```typescript
import { useTrackingState } from '../hooks/useTrackingState';

function MyComponent() {
  const {
    leadScore,
    leadSegment,
    trackQuizAnswer,
    trackLead,
    trackCTAClick
  } = useTrackingState();
  
  // Use tracking functions...
}
```

### 4. VTurb Component (`src/components/VTurbTracker.tsx`)

Video tracking with automatic milestone detection:

```tsx
import { VTurbTracker } from '../components/VTurbTracker';

<VTurbTracker
  videoId="your-video-id"
  pitchTimeSeconds={930}  // 15m30s
  onPitchViewed={() => console.log('User saw the pitch!')}
/>
```

---

## Lead Scoring System

### Score Configuration

| Answer Value | Score | Description |
|--------------|-------|-------------|
| `leak` | 30 | Montanha Russa - high pain |
| `tired` | 25 | Bloqueio do Merecimento |
| `fear` | 35 | Teto de Vidro - highest pain |
| `heavy` | 25 | Negative beliefs recognized |
| `honest` | 30 | Emotional trauma |
| `conflict` | 20 | Work ethic issue |
| `dependency` | 25 | Fear of dependency |
| `aging` | 30 | Long-term thinking |
| `family` | 35 | Family responsibility |
| `ready` | 10 | Commitment confirmation |

### Lead Segments

| Segment | Score Range | Value (BRL) | Meta Optimization |
|---------|-------------|-------------|-------------------|
| **Disqualified** | 0-29 | R$ 0,00 | Excluded from value optimization |
| **Warm** | 30-69 | R$ 10,00 | Base value for optimization |
| **Hot** | 70-100 | R$ 100,00 | Premium value for optimization |

### How It Works

1. User answers quiz questions
2. Each answer adds to the running score
3. Final score determines lead segment
4. Lead event includes `value` parameter
5. Meta optimizes for high-value leads

---

## Event Deduplication

Every event includes a unique `event_id` for deduplication:

```typescript
// Client-side event
fbq('track', 'Lead', { value: 100 }, { eventID: 'evt_abc123' });

// Server-side event (CAPI)
{
  "event_name": "Lead",
  "event_id": "evt_abc123",  // Same ID!
  "event_time": 1704729600,
  ...
}
```

Meta uses `event_id` to deduplicate events from both sources.

---

## State Persistence

Tracking state is persisted in LocalStorage:

```typescript
interface TrackingState {
  sessionId: string;        // Session identifier
  userId: string;           // Cross-session user ID
  fbp: string | null;       // Facebook Browser ID (_fbp)
  fbc: string | null;       // Facebook Click ID (_fbc/fbclid)
  utmParams: Record<string, string>;
  leadScore: number;
  quizAnswers: QuizAnswerData[];
  eventHistory: EventRecord[];
}
```

State persists across:
- Page refreshes
- SPA navigation
- Multiple browser tabs (sync via storage event)

---

## Video Tracking

### Milestone Events

| Percentage | Event Name |
|------------|------------|
| 25% | `VideoProgress25` |
| 50% | `VideoProgress50` |
| 75% | `VideoProgress75` |
| 95% | `VideoProgress95` |

### Pitch Tracking

Configure the pitch moment in seconds:

```tsx
<VTurbTracker
  videoId="abc123"
  pitchTimeSeconds={930}  // 15 minutes 30 seconds
/>
```

When user reaches this timestamp, `PitchViewed` event fires.

---

## CAPI (Server-Side) Ready

The system generates CAPI-compatible payloads:

```typescript
const payload = await advancedTracking.buildCAPIPayload(
  'Lead',                    // Event name
  'evt_abc123',             // Event ID (for deduplication)
  { value: 100, currency: 'BRL' },  // Custom data
  { email: 'user@example.com', phone: '11999999999' }  // User data
);

// Payload ready to send to your server endpoint
// Server then forwards to Meta CAPI
```

### Required for CAPI Implementation

To enable server-side tracking, you need:

1. **Meta Access Token** - Generate in Events Manager
2. **Server Endpoint** - Edge Function to forward events
3. **IP Address** - Captured on server side

---

## Usage Examples

### Track Quiz Start

```typescript
import { advancedTracking } from '../utils/advancedTracking';

// When user enters name and starts quiz
advancedTracking.trackLead({
  content_name: 'Quiz Iniciado',
  userName: userName
});
```

### Track Quiz Answer with Scoring

```typescript
const handleAnswer = (option) => {
  advancedTracking.trackQuizAnswer({
    questionId: currentQuestion.id,
    questionTitle: currentQuestion.title,
    answerValue: option.value,
    answerLabel: option.label,
    quizPath: 'finance'
  });
};
```

### Track Offer View

```typescript
useEffect(() => {
  advancedTracking.trackOfferView('Mapa Xamânico', 97.00);
}, []);
```

### Track CTA Click

```typescript
const handleCTAClick = () => {
  advancedTracking.trackCTAClick('Comprar Agora - Oferta Principal');
  // Navigate to checkout...
};
```

### Track Purchase

```typescript
advancedTracking.trackPurchase({
  content_name: 'Mapa Xamânico',
  value: 97.00,
  transaction_id: 'order_123456'
});
```

---

## Debugging

### Development Mode

In development, all events are logged to console:

```
[AdvancedTracking] Meta Event: Lead { value: 100, currency: "BRL", lead_score: 85 }
[AdvancedTracking] GA4 Event: generate_lead { value: 100, lead_segment: "hot" }
[AdvancedTracking] Clarity Tag: lead_qualidade hot
```

### Browser Tools

1. **Meta Pixel Helper** - Chrome extension to verify pixel events
2. **GA4 DebugView** - Real-time event verification
3. **Clarity Dashboard** - View custom tags in session recordings

---

## Best Practices

1. **Always use the tracking utility** - Don't call `fbq()` directly
2. **Include relevant metadata** - More data = better optimization
3. **Test in development** - Check console logs before deploying
4. **Monitor EMQ** - Event Match Quality in Meta Events Manager
5. **Segment by lead score** - Create Custom Audiences by score range

---

## Maintenance

### Updating Pixel IDs

Update in:
1. `src/config/tracking.config.ts`
2. `index.html`
3. `public/obrigado.html`

### Adding New Events

1. Add to `advancedTracking.ts`
2. Include GA4 and Clarity tracking
3. Update documentation

### Changing Lead Scores

Edit `LEAD_SCORE_CONFIG` in `advancedTracking.ts`:

```typescript
const LEAD_SCORE_CONFIG: LeadScoreConfig = {
  'your_answer_value': 35,  // Adjust score
  // ...
};
```
