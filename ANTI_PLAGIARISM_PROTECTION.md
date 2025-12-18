# 🛡️ Anti-Plagiarism Protection System

## Overview
Comprehensive content protection system implemented across the entire application to prevent unauthorized copying, distribution, and plagiarism of digital content.

## Features Implemented

### 1. **Right-Click Protection**
- Disables context menu globally
- Prevents easy access to "Save Image As" and "Inspect Element" options
- Active on all pages and components

### 2. **Keyboard Shortcut Blocking**
Blocks the following shortcuts:
- **F12** - DevTools
- **Ctrl+Shift+I** - DevTools Inspector
- **Ctrl+Shift+J** - JavaScript Console
- **Ctrl+Shift+C** - Element Inspector
- **Ctrl+U** - View Page Source
- **Ctrl+S** - Save Page
- **Ctrl+P** - Print Page
- **PrintScreen** - Screenshot capture (with clipboard clearing)
- **Cmd+Option+I/J/C** - Mac DevTools shortcuts

### 3. **Content Selection Protection**
- Prevents text selection on protected content
- Disables copy/cut operations on non-input elements
- Allows normal interaction with input and textarea fields
- Prevents drag-and-drop of images and media

### 4. **DevTools Detection**
- Monitors window dimensions to detect DevTools
- Displays security warnings when DevTools is opened
- Clears console periodically in production
- Disables console methods in production builds

### 5. **Image & Video Protection**
- Sets all images as non-draggable
- Prevents right-click on media elements
- Applies user-select: none to prevent highlighting
- Maintains video controls functionality

### 6. **Visual Watermarking**
- Subtle diagonal pattern overlay (virtually invisible)
- Acts as a deterrent without affecting user experience
- Applied via CSS pseudo-element

### 7. **Production Security**
- Console methods disabled in production
- All debugging tools blocked
- Security warnings for attempted access

## Technical Implementation

### Component: `AntiPlagiarismProtection.tsx`
Location: `/src/components/AntiPlagiarismProtection.tsx`

This component:
- Mounts at the app level
- Runs once on application load
- Adds global event listeners
- Injects protective CSS
- Cleans up on unmount

### Integration
The protection is integrated in `App.tsx` and runs globally across all routes:
```tsx
<AntiPlagiarismProtection />
```

## VSL Video Player Protection

### Current Video ID
**Video ID:** `69435dab1452433694dabfb7`

### Performance Optimizations
1. **Preload Links:**
   - Player script
   - Smartplayer library
   - Video manifest (m3u8)

2. **DNS Prefetch:**
   - cdn.converteai.net
   - scripts.converteai.net
   - images.converteai.net
   - api.vturb.com.br

3. **Performance Timing:**
   - Page load time optimization script
   - Async script loading

### Video Player Features
- Responsive 9:16 aspect ratio
- Auto-centered layout
- Maximum width: 400px
- Play button overlay for visual appeal
- Border and shadow effects

## Important Notes

### What Users Can Still Do
✅ Fill out forms and input fields
✅ Copy their own text from input fields
✅ Use video controls (play, pause, volume)
✅ Navigate the site normally
✅ Complete purchases

### What Is Protected
🛡️ Page source code
🛡️ Images and media files
🛡️ Video content
🛡️ Text content (on protected areas)
🛡️ Layout and design elements
🛡️ JavaScript code

## Testing the Protection

### Manual Testing Checklist
- [ ] Try right-clicking on the page
- [ ] Press F12 to open DevTools
- [ ] Try Ctrl+U to view source
- [ ] Try to select and copy text
- [ ] Try to drag images
- [ ] Try PrintScreen
- [ ] Test video player functionality
- [ ] Test form inputs (should work normally)

### Expected Behavior
- Right-click should do nothing
- DevTools shortcuts should be blocked
- Text selection should be disabled
- Images should not be draggable
- Video should play normally
- Forms should work as expected

## Limitations

### Browser Variations
- Some advanced users may still find workarounds
- Browser extensions can sometimes bypass protections
- Network inspection tools are harder to block

### Balance
The system is designed to:
✅ Deter casual copying and theft
✅ Maintain good user experience
✅ Allow legitimate interactions
✅ Not frustrate genuine users

## Maintenance

### Updating Video ID
To change the video player:
1. Update the video ID in `Offer.tsx` (line ~140)
2. Update the script URL with new player ID (line ~75)
3. Update preload links with new video manifest (line ~30-40)

### Disabling Protection
To temporarily disable protection (for debugging):
1. Comment out `<AntiPlagiarismProtection />` in `App.tsx`
2. Or set an environment variable to skip protection

## Legal Notice

This protection system is designed to:
- Protect intellectual property rights
- Prevent unauthorized distribution
- Comply with copyright laws
- Deter plagiarism and content theft

**Note:** This is a deterrent system. Determined individuals with technical knowledge may still find ways to access content. For maximum protection, combine this with legal measures, watermarking, and terms of service.

## Support

For issues or questions about the anti-plagiarism system:
1. Check browser console for errors
2. Test in multiple browsers
3. Verify script loading in Network tab
4. Contact development team

---

**Version:** 1.0.0  
**Last Updated:** December 2025  
**Status:** ✅ Active and Deployed
