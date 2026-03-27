# Design Style: Organic Gradients

You are designing in the **Organic Gradients** style. Dimensional gradient transitions with grain, texture, and organic variation. Not the flat, sterile gradients of Web 2.0 — these feel alive and tactile.

## Core Principles
- **Gradients with depth** — multi-stop, non-linear, with grain/noise overlays for texture
- **Organic transitions** — colors flow like watercolor, not hard geometric bands
- **Dimensional feel** — gradients suggest light, atmosphere, depth
- **Distinctiveness through variation** — no two gradient sections should feel identical

## Typography Rules
- Clean sans-serif that doesn't compete with gradient backgrounds: Inter, Geist, SF Pro
- White or very light text on gradient backgrounds — ensure WCAG AA contrast
- Hero: 56-80px, semibold to bold
- Body on light sections: 16-18px, dark text
- Text on gradients should have subtle text-shadow for readability

## Color Palette
- **Primary gradient**: 3-5 color stops with soft transitions
- Popular palettes:
  - Warm sunset: peach (#FFB088) → rose (#FF6B8A) → violet (#8B5CF6)
  - Ocean depth: teal (#06B6D4) → indigo (#6366F1) → purple (#A855F7)
  - Aurora: green (#34D399) → cyan (#22D3EE) → blue (#3B82F6)
  - Dusk: amber (#F59E0B) → pink (#EC4899) → purple (#8B5CF6)
- **Grain overlay**: Add CSS noise/grain texture at 3-8% opacity over gradients
- Light sections between gradient sections for contrast and breathing room

## Gradient Techniques
```css
/* Organic gradient with noise */
.gradient-section {
  background: linear-gradient(135deg, #FFB088 0%, #FF6B8A 40%, #8B5CF6 100%);
  position: relative;
}
.gradient-section::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* noise SVG */
  opacity: 0.05;
  mix-blend-mode: overlay;
}
```
- Use `radial-gradient` for spotlight/glow effects
- Animated gradient shifts on hover (background-position transition)
- Mesh gradients for hero sections (CSS or SVG)

## Layout
- Full-bleed gradient hero sections
- Alternate: gradient section → clean white section → gradient section
- Cards with frosted glass effect (`backdrop-filter: blur`) on gradient backgrounds
- Generous padding inside gradient sections (120-160px vertical)

## Imagery
- Glassmorphism cards over gradient backgrounds
- Product mockups floating on gradient fields
- Abstract 3D shapes with matching gradient materials
- Avoid photography on gradient sections (clashes)

## Interactions
- Gradient hue shift on scroll (subtle, using CSS custom properties)
- Button hover: gradient intensity increase + subtle glow
- Cards: frosted glass reveal on hover
- Smooth color transitions (500ms+)

## What NOT to Do
- No flat, 2-color linear gradients (too generic)
- No gradients without grain/texture (looks like PowerPoint)
- No clashing gradient + photography combos
- No gradient text unless on a solid background with proper fallback
- No dark sections without gradient — stay committed to the palette

## Reference Sites
- [OpenAI / ChatGPT](https://chatgpt.com/overview)
- [ElevenLabs](https://elevenlabs.io/blog/introducing-elevenlabs-image-and-video)
- [Perplexity Comet](https://www.perplexity.ai/comet)
- [Intercom](https://www.intercom.com/)
