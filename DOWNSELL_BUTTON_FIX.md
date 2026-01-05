# Downsell Button Redirect Fix

## Problem Description

The downsell button on the `/oferta1` page was not properly redirecting users to the downsell page (`https://www.mapaxamanicooficial.online/down1`). While the upsell button worked correctly with BuckPay's one-click payment processing, the downsell button failed to trigger the redirect.

### Root Cause

The external BuckPay script (`https://seguropagamentos.com.br/upsell-downsell-script.js`) was not consistently attaching click event handlers to the downsell button element. This is likely because:

1. The downsell button is a `<div>` element (not a `<button>`)
2. The external script may not have been designed to handle downsell redirects
3. Script loading failures or timing issues could prevent proper initialization

## Solution Implemented

### 1. Manual Event Handler in useEffect

Added a manual click event listener to the hidden `buckpay-downsell-button` element:

```typescript
// Add manual click handler for downsell button as fallback
// The external script may not properly handle the downsell button
const setupDownsellHandler = () => {
  const downsellButton = document.getElementById('buckpay-downsell-button');
  if (downsellButton) {
    // Add click event listener for manual redirect
    downsellButton.addEventListener('click', () => {
      window.location.href = BUCKPAY_CONFIG.downsellUrl;
    });
  }
};

// Setup handler after a short delay to ensure DOM is ready
const timeoutId = setTimeout(setupDownsellHandler, 100);
```

**Benefits:**
- ✅ Ensures the downsell button always has a click handler
- ✅ Works even if external script fails to load
- ✅ Maintains compatibility with BuckPay script if it does load
- ✅ Uses a timeout to ensure DOM is ready

### 2. Direct Redirect in handleDecline

Simplified the `handleDecline` function to directly redirect instead of trying to click the hidden button:

```typescript
const handleDecline = () => {
  // Direct redirect to downsell page
  // The hidden buckpay-downsell-button also has a click handler attached
  // but we ensure redirect happens regardless of external script behavior
  window.location.href = BUCKPAY_CONFIG.downsellUrl;
};
```

**Benefits:**
- ✅ Guaranteed redirect when user clicks decline button
- ✅ No dependency on external script behavior
- ✅ Simpler, more reliable code
- ✅ Immediate response to user action

## Configuration

The downsell URL is configured in the `BUCKPAY_CONFIG` constant:

```typescript
const BUCKPAY_CONFIG = {
  offerId: '7c265285-38dc-44e9-8f56-eaa6356e26b1',
  upsellUrl: 'https://www.mapaxamanicooficial.online/oferta1',
  downsellUrl: 'https://www.mapaxamanicooficial.online/down1',
  scriptUrl: 'https://seguropagamentos.com.br/upsell-downsell-script.js'
} as const;
```

## Testing

### Manual Testing Steps

1. Navigate to `/oferta1` page
2. Scroll down to the bottom of the page
3. Click the decline button: "Não, prefiro fazer sozinho e arriscar travar no processo"
4. Verify that the page redirects to `/down1`

### Expected Behavior

- **Before fix**: Button click may not redirect, or redirect inconsistently
- **After fix**: Button click always redirects to `/down1` immediately

### Test Scenarios

1. ✅ **Normal scenario**: External script loads successfully
   - Redirect should work from both event handlers
   
2. ✅ **Script load failure**: External script fails to load or is blocked
   - Redirect still works via manual handler
   
3. ✅ **Slow connection**: External script loads slowly
   - Manual handler ensures immediate functionality

## Files Modified

- `src/Oferta1.tsx` - Added manual event handler and simplified handleDecline

## User Flow

```
Oferta1 Page (/oferta1)
    ↓
User clicks "Não, prefiro fazer sozinho..."
    ↓
handleDecline() triggers
    ↓
Direct redirect to /down1
    ↓
Downsell1 Page (R$19,90 offer)
```

## Compatibility

This fix maintains full compatibility with:
- ✅ BuckPay's external script (if it loads and works)
- ✅ One-click upsell functionality (unchanged)
- ✅ Existing page layout and styling
- ✅ Mobile and desktop browsers

## Notes

- The fix does not interfere with the upsell button, which continues to use BuckPay's one-click payment processing
- The manual event handler is added as a fallback and does not conflict with any external script behavior
- The solution is defensive programming - it works with or without the external script

## Related Documentation

- `BUCKPAY_INTEGRATION.md` - BuckPay one-click upsell documentation
- `DOWNSELL1_GUIDE.md` - Downsell1 page implementation guide

---

**Date**: 2025-01-05  
**Status**: ✅ Implemented and Tested  
**Impact**: High - Ensures downsell functionality always works
