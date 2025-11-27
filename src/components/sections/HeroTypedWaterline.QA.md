# QA Runbook: HeroTypedWaterline

## Functional QA Checklist

### Animation Timeline
- [ ] Hero panel fades in smoothly on page load
- [ ] Line 1 ("Building fast.") reveals word-by-word starting at T+120ms
- [ ] Caret appears at the end of the currently revealing word in Line 1
- [ ] Caret disappears after Line 1 completes
- [ ] Line 2 ("Thinking deep.") begins ~180ms after Line 1 completes
- [ ] Line 2 reveals with noticeably slower tempo than Line 1
- [ ] Subhead starts below baseline (blurred, low opacity)
- [ ] Subhead rises smoothly to final position
- [ ] Waterline sheen sweeps horizontally during subhead rise
- [ ] CTAs pulse once (scale animation) after subhead settles
- [ ] All animations complete within ~1.2s total

### State Management
- [ ] Timeline ordering is consistent across page refreshes
- [ ] Timeline ordering is consistent when navigating away and back
- [ ] No animations restart on window resize
- [ ] Caret properly hides at the end of each line
- [ ] Subhead float animation continues indefinitely after settling
- [ ] Float animation is imperceptible (very subtle ±1px movement)

### Reduced Motion Mode
- [ ] Headline appears instantly (no word-by-word reveal)
- [ ] No caret animation
- [ ] Subhead fades in without rise effect
- [ ] No refraction or blur effects
- [ ] CTAs appear without pulse animation
- [ ] Ambient chips are static or extremely slowed
- [ ] All transitions use 120ms duration max

---

## Visual QA Checklist

### Typography & Layout
- [ ] Headline maintains two distinct lines throughout animation
- [ ] No word wrapping mid-word during animation
- [ ] Text remains sharp and readable at all animation stages
- [ ] Subhead never becomes illegible during refraction
- [ ] Spacing between sections follows design tokens (24/32/40/48)
- [ ] Brand mark (logo + name) appears above headline
- [ ] CTAs are properly aligned and spaced

### Glass Effects
- [ ] Hero panel has proper frosted glass appearance
- [ ] Blur intensity matches existing components
- [ ] Inner stroke (border) is subtle and consistent
- [ ] Shadow depth matches design tokens
- [ ] Ambient chips have appropriate halo glow
- [ ] Waterline band is barely visible (very subtle)
- [ ] Sheen sweep is noticeable but not distracting

### Color & Contrast
- [ ] Headline text: #0F172A (--color-ink)
- [ ] Subhead text: #475569 (--color-slate-600)
- [ ] Caret: #2D6AE3 (--color-azure)
- [ ] Text maintains 4.5:1 contrast during all animation phases
- [ ] Refraction effect doesn't reduce contrast below threshold
- [ ] Sheen is visible but doesn't obscure text

### Snapshot Validation
Capture and compare snapshots at these timeline points:

1. **T+0ms** (Start): Panel visible, no text revealed
2. **T+300ms** (Line 1 mid): First word or two visible with caret
3. **T+460ms** (Line 2 start): Line 1 complete, Line 2 beginning
4. **T+700ms** (Subhead crossing): Subhead mid-rise through waterline
5. **T+1200ms** (Settled): All animations complete

---

## Performance QA Checklist

### DevTools Performance Profile

**Desktop (Chrome DevTools)**
- [ ] Open DevTools → Performance tab
- [ ] Start recording
- [ ] Reload page and wait 2 seconds
- [ ] Stop recording
- [ ] Verify: No long tasks >50ms during hero animation window
- [ ] Verify: No forced reflows/layout thrashing
- [ ] Verify: Animation frames maintain ~60fps

**Mobile Emulation (4× CPU Slowdown)**
- [ ] Enable 4× CPU throttling in DevTools
- [ ] Repeat performance recording
- [ ] Verify: Animation still smooth (no visible stutters)
- [ ] Verify: Frame rate doesn't drop below 50fps

### FPS Overlay Validation
- [ ] Enable FPS meter in Chrome (Rendering tab)
- [ ] Reload page and observe during animation
- [ ] FPS should remain stable at 60 throughout
- [ ] Green bars in FPS graph (no red spikes)

### Bundle Size
- [ ] Check JS bundle size for hero component
- [ ] Additional JS payload <10KB gzipped
- [ ] No unexpected dependencies pulled in
- [ ] Tree-shaking working correctly (no unused code)

### Layout Stability
- [ ] Open DevTools → Rendering → Layout Shift Regions
- [ ] Reload page
- [ ] Verify: No layout shifts during or after hero animation
- [ ] Cumulative Layout Shift (CLS) score = 0 for hero section

---

## Accessibility QA Checklist

### Keyboard Navigation
- [ ] Tab order: Brand → Headline → Subhead → Primary CTA → Secondary CTA
- [ ] Focus indicators visible and properly styled
- [ ] Enter key activates focused CTA
- [ ] Space key activates focused CTA
- [ ] No keyboard traps
- [ ] Focus doesn't skip over interactive elements

### Screen Reader Testing (VoiceOver/NVDA)
- [ ] Section announces as "Hero section" or similar
- [ ] Headline text is read in correct order
- [ ] Subhead text is read after headline
- [ ] CTAs are announced as links/buttons with correct labels
- [ ] Caret is not announced (aria-hidden working)
- [ ] No announcement interruptions during animations

### Reduced Motion Preference
- [ ] macOS: System Preferences → Accessibility → Display → Reduce Motion
  - [ ] Toggle ON: Verify reduced animation mode activates
  - [ ] Toggle OFF: Verify full animation mode restores
- [ ] Windows: Settings → Ease of Access → Display → Show animations
  - [ ] Toggle OFF: Verify reduced animation mode activates
  - [ ] Toggle ON: Verify full animation mode restores

### Color Contrast (axe DevTools)
- [ ] Run axe accessibility checker
- [ ] No contrast violations in hero section
- [ ] Contrast ratio ≥4.5:1 for all text
- [ ] Test during animation (capture at various points)

### Motion Preferences Override
- [ ] `motionVariant="reduced"` prop works correctly
- [ ] `motionVariant="off"` prop disables all motion
- [ ] Props override OS preference when specified

---

## Cross-Browser QA Checklist

### Chrome/Edge (Chromium)
- [ ] All animations smooth
- [ ] Blur effects render correctly
- [ ] Waterline sheen visible
- [ ] Refraction effect works as expected
- [ ] No console errors or warnings

### Safari (WebKit)
- [ ] Backdrop-filter blur works correctly
- [ ] SVG mask effects render properly
- [ ] Animation timing matches Chromium
- [ ] Hardware acceleration functioning
- [ ] No webkit-specific issues

### Firefox (Gecko)
- [ ] Backdrop-filter supported (or graceful fallback)
- [ ] Animation performance comparable to Chromium
- [ ] Blur effects render correctly
- [ ] No gecko-specific rendering issues

### Fallback Behavior
If SVG masks don't work on a browser:
- [ ] Component automatically falls back to opacity + translate
- [ ] Fallback animation still looks polished
- [ ] Timing remains consistent
- [ ] No visual glitches or broken layouts

---

## Responsive QA Checklist

### Mobile (320px - 640px)
- [ ] Headline font size scales appropriately
- [ ] No horizontal scrolling
- [ ] Padding: 32px horizontal, 64px vertical
- [ ] Glass blur reduced (~10px instead of 16px)
- [ ] Waterline band height: 24-28px
- [ ] Ambient chips scaled down or disabled
- [ ] Touch targets ≥44×44px for CTAs
- [ ] No text overflow or wrapping issues

### Tablet (641px - 1024px)
- [ ] Padding: 48px horizontal, 80px vertical
- [ ] Standard blur values (16px)
- [ ] Refraction enabled with lower amplitude
- [ ] Layout balanced and centered
- [ ] CTAs display side-by-side (if space allows)

### Desktop (≥1025px)
- [ ] Full animation treatment active
- [ ] Padding: 64px horizontal, 96px vertical
- [ ] Ambient chips have full movement range
- [ ] Waterline sheen visible and smooth
- [ ] No excessive whitespace
- [ ] Max-width constraint prevents over-stretching

### Ultrawide (≥1920px)
- [ ] Content stays centered
- [ ] Hero panel doesn't become uncomfortably wide
- [ ] Aspect ratios remain balanced
- [ ] Ambient chips don't drift too far

### Breakpoint Transitions
- [ ] Smooth resize behavior (no jumps or flashes)
- [ ] Animations don't restart on resize
- [ ] Layout reflows gracefully
- [ ] Text remains readable during resize

---

## Integration QA Checklist

### Page Context
- [ ] Hero section is first major element on page
- [ ] Smooth scroll from hero to next section
- [ ] No conflicts with global styles
- [ ] Z-index layering correct (chips behind, CTAs in front)
- [ ] Background gradient (if any) doesn't clash

### Navigation
- [ ] CTA links navigate to correct destinations
- [ ] Back button returns correctly
- [ ] Deep linking doesn't break animation state
- [ ] No route transition conflicts

### State Persistence
- [ ] Animation plays on first visit
- [ ] Animation plays on subsequent visits
- [ ] No localStorage/sessionStorage leaks
- [ ] Performance consistent across multiple page loads

---

## Edge Cases & Stress Tests

### Content Variations
- [ ] Very short headlines (1 word per line)
- [ ] Very long headlines (5+ words per line)
- [ ] Special characters in text (em dashes, quotes)
- [ ] Non-English characters (accents, etc.)
- [ ] Empty CTA labels (should handle gracefully)

### Network Conditions
- [ ] Slow 3G: Component still functional
- [ ] Offline: No broken dependencies
- [ ] Delayed font loading: No FOUT/FOIT issues

### Extreme Viewports
- [ ] 320px width (smallest mobile)
- [ ] 2560px width (large desktop)
- [ ] Very tall viewport (no wasted space)
- [ ] Very short viewport (no content cut off)

### User Interactions
- [ ] Clicking during animation doesn't break state
- [ ] Scrolling during animation doesn't interrupt
- [ ] Tabbing rapidly doesn't cause focus issues
- [ ] Rapid window resizing doesn't crash

---

## Automated Test Commands

```bash
# Unit tests
npm run test HeroTypedWaterline

# Visual regression (Playwright)
npm run test:e2e:hero

# Accessibility audit
npm run test:a11y

# Performance budget
npm run test:perf

# Bundle size check
npm run analyze
```

---

## Pass/Fail Criteria

### Critical (Must Pass)
- All functional animations work as specified
- Reduced motion mode fully functional
- Text contrast ≥4.5:1 throughout animation
- No layout shifts (CLS = 0)
- No console errors
- Keyboard navigation works
- Mobile responsive at all breakpoints

### Important (Should Pass)
- Performance: 60fps on desktop, 50fps on mobile
- Cross-browser compatibility (Chrome, Safari, Firefox)
- Waterline refraction visible and smooth
- Caret animation synchronized
- Ambient chips drift smoothly

### Nice-to-Have (Can Fail)
- Perfect synchronization on extremely low-end devices
- Waterline sheen visible on all screen brightness levels
- Micro-animations visible to all users

---

## Issue Reporting Template

```
**Issue Title**: [Brief description]

**Severity**: Critical / Major / Minor

**Environment**:
- Browser: [Chrome 120 / Safari 17 / Firefox 121]
- OS: [macOS 14 / Windows 11 / iOS 17]
- Viewport: [1920×1080 / 375×667 / etc.]
- Motion Preference: [None / Reduced Motion]

**Steps to Reproduce**:
1. Navigate to homepage
2. [Specific actions]
3. [Expected vs Actual behavior]

**Expected Behavior**: [What should happen]

**Actual Behavior**: [What actually happens]

**Screenshots/Video**: [Attach if possible]

**Console Errors**: [Copy/paste any errors]

**Additional Context**: [Any other relevant info]
```

---

## Sign-Off Checklist

Before marking the component as production-ready:

- [ ] All Critical tests pass
- [ ] At least 90% of Important tests pass
- [ ] Documentation complete and accurate
- [ ] Code reviewed by at least one other developer
- [ ] Accessibility audit passed (axe + manual testing)
- [ ] Performance budget met
- [ ] Cross-browser testing complete
- [ ] Mobile testing on real devices complete
- [ ] Stakeholder approval obtained

**Tester Name**: ___________________  
**Date**: ___________________  
**Status**: Pass / Fail / Conditional Pass  
**Notes**: ___________________

---

**Last Updated**: November 2025  
**Component Version**: 1.0.0



