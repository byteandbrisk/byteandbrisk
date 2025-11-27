# HeroTypedWaterline Component

## Overview

The `HeroTypedWaterline` is the hero section for the Byte&Brisk homepage featuring sophisticated motion choreography that tells a brand story through animation:

- **Line 1** ("Building fast.") reveals word-by-word with a quick, decisive tempo
- **Line 2** ("Thinking deep.") reveals with a more deliberate, contemplative tempo
- **Subhead** rises through a visual "waterline" with subtle refraction effects
- **CTAs** pulse into view once the story completes

The component maintains the glassmorphic aesthetic with frosted surfaces, soft edges, and calm gradients while delivering a premium, performant animation experience.

---

## Purpose & Motion Story

This hero section communicates Byte&Brisk's operating philosophy through motion:
1. **Decisiveness first**: "Building fast." appears quickly, signaling momentum
2. **Depth and craftsmanship**: "Thinking deep." reveals more deliberately, suggesting contemplation
3. **Ideas surfacing**: The subhead rises through a "waterline," representing clarity emerging

Total animation duration: ~1.2s from start to completion.

---

## Installation & Usage

### Basic Usage

```tsx
import { HeroTypedWaterline } from "@components/sections/HeroTypedWaterline";

export function HomePage() {
  return (
    <HeroTypedWaterline />
  );
}
```

### With Custom Props

```tsx
<HeroTypedWaterline
  titleTop="Ship faster."
  titleBottom="Scale smarter."
  subhead="Custom messaging for your landing page."
  primaryCta={{ label: "Get Started", href: "/start" }}
  secondaryCta={{ label: "Learn More", href: "/learn" }}
  enableAmbientChips={true}
  enableWaterline={true}
  motionVariant="full"
/>
```

---

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `titleTop` | `string` | `"Building fast."` | First line of headline (faster tempo) |
| `titleBottom` | `string` | `"Thinking deep."` | Second line of headline (slower tempo) |
| `subhead` | `string` | `"We craft modern software..."` | Subheading text that rises through waterline |
| `primaryCta` | `{ label: string; href: string }` | `{ label: "Explore Our Work", href: "#work" }` | Primary call-to-action button |
| `secondaryCta` | `{ label: string; href: string }` | `{ label: "Talk to Us", href: "#contact" }` | Secondary call-to-action button |
| `enableAmbientChips` | `boolean` | `true` | Show/hide floating glass chips in background |
| `enableWaterline` | `boolean` | `true` | Enable/disable waterline refraction effect |
| `motionVariant` | `"full" \| "reduced" \| "off"` | `"full"` | Animation mode (auto-detects `prefers-reduced-motion`) |
| `timingOverrides` | `Partial<MotionTimings>` | `undefined` | Override default animation timings for A/B tests |
| `className` | `string` | `""` | Additional CSS classes |
| `data-testid` | `string` | `"hero-typed-waterline"` | Test ID for integration testing |

---

## Motion Choreography

### Timeline Breakdown

**T+0ms:**
- Glass hero panel enters with soft fade
- Ambient chips begin idle drift

**T+120ms:**
- Line 1 begins word-by-word reveal
- Caret tracks the active word
- Each word micro-settles (scale 0.98→1.00)

**T+460ms:**
- Line 2 begins with slower tempo
- Line 1 caret fades out

**T+520ms:**
- Subhead starts below waterline (low opacity, blurred)
- Rises to final position over 420ms
- Brief refraction as it crosses the waterline band

**T+900-1100ms:**
- Waterline sheen sweeps horizontally
- CTAs pulse once (scale 1→1.02→1)
- Subhead enters perpetual float (±1px over 7s)

---

## Motion Design Tokens

All animation parameters are driven by CSS custom properties for consistency and reusability.

### Hero Motion Tokens (in `globals.css`)

```css
/* Headline Timing */
--motion-hero-headline-word-delay-fast: 300ms;
--motion-hero-headline-word-delay-deep: 390ms;
--motion-hero-headline-letter-stagger-fast: 60ms;
--motion-hero-headline-letter-stagger-deep: 40ms;
--motion-hero-headline-scale-settle: 0.98;
--motion-hero-pause-line: 180ms;

/* Subhead Timing */
--motion-hero-subhead-rise-duration: 420ms;
--motion-hero-subhead-rise-easing: cubic-bezier(0.22, 1, 0.36, 1);
--motion-hero-subhead-refraction-duration: 280ms;
--motion-hero-subhead-float-amplitude: 1px;
--motion-hero-subhead-float-period: 7s;

/* CTA Timing */
--motion-hero-cta-pulse-duration-in: 120ms;
--motion-hero-cta-pulse-duration-out: 160ms;

/* Reduced Motion */
--motion-reduced-duration: 120ms;
```

### Glass Tokens

```css
--glass-hero-panel-blur-desktop: 16px;
--glass-hero-panel-blur-mobile: 10px;
--glass-hero-waterline-sheen-opacity: 0.06;
--glass-hero-waterline-band-height: 28px;
--glass-hero-chip-shadow: 0 0 20px rgba(45, 106, 227, 0.12);
```

### Caret Tokens

```css
--caret-width: 2px;
--caret-opacity: 0.6;
```

---

## Accessibility

### Reduced Motion Support

The component automatically respects `prefers-reduced-motion`:
- Headline appears instantly (no typing animation)
- Subhead fades in without rise/refraction
- CTAs appear without pulse
- Ambient chip drift is disabled
- All transitions reduced to 120ms

You can also manually control this via the `motionVariant` prop:
- `"full"`: All animations enabled
- `"reduced"`: Simplified animations (respects OS setting automatically)
- `"off"`: All motion disabled (for performance testing)

### Keyboard Navigation

- Focus order flows logically: headline → subhead → primary CTA → secondary CTA
- All interactive elements are keyboard accessible
- Enter/Space activates CTAs

### Screen Reader Support

- Section has `role="region"` with `aria-label="Hero section"`
- Caret element has `aria-hidden="true"` (purely decorative)
- All text maintains 4.5:1 contrast ratio throughout animation
- Motion effects never obscure text legibility

---

## Performance

### Optimization Strategies

1. **Transform-only animations**: All motion uses `transform`, `opacity`, or `filter` — no layout thrashing
2. **Will-change hints**: Applied only during active animations
3. **Minimal JS payload**: Core animation logic <10KB gzipped (excluding Framer Motion)
4. **No CLS**: Fixed heights and pre-allocated layouts prevent layout shifts
5. **GPU acceleration**: Hardware-accelerated transforms for smooth 60fps

### Performance Budget

- Total animation time: ~1.2s
- Frame rate: Consistent 60fps even with 4× CPU throttling
- No long tasks >50ms during animation window
- Zero cumulative layout shift (CLS) attributable to hero

---

## Responsive Behavior

### Mobile (≤640px)
- Blur and shadow tokens reduced by ~30-40%
- Tighter line-height for headline
- Waterline band compresses to 24px
- Refraction simplified (opacity + translate only if fps drops <60)
- Reduced padding: `px-8 py-16`

### Tablet (641-1024px)
- Standard tokens applied
- Refraction enabled with lower amplitude
- Padding: `px-12 py-20`

### Desktop (≥1025px)
- Full animation treatment
- Ambient chips have larger idle radius (still subtle)
- Padding: `px-16 py-24`

---

## Waterline Implementation Details

The waterline is a **layered visual construct** within the hero panel:

1. **Band pseudo-element**: Horizontal zone positioned at 50% height
   - Height: `28px` (from token)
   - Subtle gradient: `rgba(45, 106, 227, 0.03)`
   - Contains the sheen sweep effect

2. **Subhead refraction**: Applied as text crosses the band
   - SVG-inspired blur transition: `blur(4px) → blur(2px) → blur(0px)`
   - Gradient overlay with wave motion
   - Duration: 280ms
   - Blend mode ensures text remains legible

3. **Sheen sweep**: Diagonal gradient animates across band
   - Width: 50% of band
   - Movement: -100% → 200%
   - Duration: 600ms
   - Max opacity: 12%

The subhead remains **DOM text** throughout (no rasterization) for SEO and accessibility.

---

## Testing

### Unit Tests (Jest + RTL)

```tsx
import { render, screen } from '@testing-library/react';
import { HeroTypedWaterline } from './HeroTypedWaterline';

test('renders with default props', () => {
  render(<HeroTypedWaterline />);
  expect(screen.getByText(/Building fast/i)).toBeInTheDocument();
});

test('respects motionVariant="off"', () => {
  render(<HeroTypedWaterline motionVariant="off" />);
  // All content should be visible immediately
});

test('applies custom CTAs', () => {
  render(
    <HeroTypedWaterline
      primaryCta={{ label: "Custom CTA", href: "/custom" }}
    />
  );
  expect(screen.getByText("Custom CTA")).toBeInTheDocument();
});
```

### Visual Regression (Playwright)

Capture snapshots at key animation states:
1. Start (T+0)
2. Line 1 mid-reveal (T+300)
3. Line 2 start (T+460)
4. Subhead crossing waterline (T+700)
5. Fully settled (T+1200)

```ts
test('hero animation snapshots', async ({ page }) => {
  await page.goto('/');
  
  // Snapshot at start
  await expect(page.locator('[data-testid="hero-typed-waterline"]'))
    .toHaveScreenshot('hero-start.png');
  
  // Wait and snapshot at key points
  await page.waitForTimeout(300);
  await expect(page.locator('[data-testid="hero-typed-waterline"]'))
    .toHaveScreenshot('hero-line1-mid.png');
  
  // ... additional snapshots
});
```

---

## Known Limitations

1. **Older browsers**: SVG mask effects may not render identically across all browsers
   - Automatic fallback to opacity + translate on incompatible browsers
   
2. **Low-end mobile**: Refraction effect auto-disables if frame rate drops below 60fps

3. **Content length**: Designed for concise headlines (2-3 words per line)
   - Longer text may wrap awkwardly during animation

---

## Customization & Extensions

### Override Animation Timings

For A/B testing or campaign variants:

```tsx
<HeroTypedWaterline
  timingOverrides={{
    wordDelayFast: 200,
    wordDelayDeep: 500,
    subheadRiseDuration: 600,
  }}
/>
```

### Disable Specific Features

```tsx
<HeroTypedWaterline
  enableAmbientChips={false}  // Remove background decoration
  enableWaterline={false}     // Simple fade-in for subhead
/>
```

### Future Extension Hooks

The component includes slots for future enhancements:
- **Micro-stats**: Add count-up animations above CTAs
- **Campaign variants**: Reuse motion scaffold with different copy
- **A/B testing**: Use `timingOverrides` for experimentation

---

## Design Philosophy

### Guiding Principles

1. **Motion serves narrative**: Every animation communicates brand values
2. **Restraint over spectacle**: Subtle, premium, not flashy
3. **Performance is non-negotiable**: Smooth on all devices
4. **Accessibility first**: Motion enhances, never hinders
5. **System coherence**: Reuses existing glass tokens and patterns

### When in Doubt

- **Simplify**: Remove effects that don't serve the story
- **Let it breathe**: Prefer empty space over added decoration
- **Test on real devices**: Emulators miss performance issues
- **Respect user preferences**: Reduced motion is mandatory, not optional

---

## Maintenance Notes

### Token Updates

If you modify motion tokens in `globals.css`, the component will automatically reflect changes. No code updates needed.

### Motion Coordination

The component uses a single animation timeline managed via React state. Avoid:
- Parallel competing animations
- Uncoordinated timers
- CSS animations that fight with Framer Motion

### Performance Monitoring

Monitor these metrics in production:
- First Contentful Paint (FCP): Should remain <1.5s
- Cumulative Layout Shift (CLS): Should be 0
- Time to Interactive (TTI): Hero animation shouldn't block interaction

---

## Support & Troubleshooting

### Common Issues

**Issue**: Animations feel janky on mobile
- **Solution**: Check if `will-change` is applied correctly; consider disabling refraction on low-end devices

**Issue**: Headline wraps mid-word
- **Solution**: Use shorter words or adjust font size via responsive tokens

**Issue**: Caret doesn't align with text
- **Solution**: Verify `vertical-align: text-bottom` is applied

**Issue**: Waterline band not visible
- **Solution**: Check z-index layering and opacity values; may be too subtle on some screens

---

## Credits & Inspiration

Built to spec from the **Byte&Brisk Glass 2.0 Design System**. Motion choreography inspired by premium software brands that use animation to communicate craft and care.

---

**Last Updated**: November 2025  
**Component Version**: 1.0.0  
**Design System**: Glass 2.0 (Frosted Radiance)



