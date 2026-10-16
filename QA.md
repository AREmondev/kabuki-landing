# QA checklist

## Content integrity

- [ ] No invented student names, quotes, stats, awards, or partner logos
- [ ] Success stories remain placeholders until real consented assets arrive
- [ ] Results section is hidden while `lib/data/results.ts` is empty
- [ ] Dhaka address is “Contact for details”
- [ ] No “BUY NOW”, “LIMITED OFFER”, “100% GUARANTEED”, or “number one”
- [ ] FAQ unknowns point to “Contact us for current details”

## Visual

- [ ] Warm paper background, navy type, kabuki red used only for CTAs, eyebrows, labels, active states
- [ ] No blobs, glassmorphism, neon, cartoons, particles, or floating sakura
- [ ] Gradients only on the hero overlay and the navy contact panel
- [ ] Blur only on sticky navbar and mobile contact bar
- [ ] Cards 12px radius, buttons 8px radius, no pills
- [ ] Content grid max-width 1280px with 12-column layout
- [ ] Section padding 120px desktop / 72px mobile

## Motion

- [ ] Hero slideshow crossfades 1.2s, autoplays 7s, pauses on hover and hidden tab
- [ ] Ken Burns disabled when `prefers-reduced-motion`
- [ ] Reduced motion: opacity only, no stagger, no autoplay
- [ ] RevealOnScroll is not used on the hero
- [ ] Max two animated properties per element

## Keyboard and a11y

- [ ] Skip link reaches `#main`
- [ ] Mobile menu traps focus, closes on Escape, restores focus
- [ ] Success carousel responds to arrow keys and exposes `aria-roledescription="carousel"`
- [ ] Form labels use `htmlFor`; errors use `aria-invalid`
- [ ] Focus-visible rings present
- [ ] Contrast of body and navy text on paper is ≥ 4.5:1

## Performance

- [ ] Hero first image uses `priority`
- [ ] Target LCP < 2.0s, CLS < 0.05
- [ ] `next/font` for Inter and Noto Sans Bengali
