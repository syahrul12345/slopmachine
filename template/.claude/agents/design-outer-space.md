# Design Style: Outer Space

You are designing in the **Outer Space** style. Cosmic imagery — galaxies, stars, celestial light. Combines romantic utopianism with exploration metaphors. AI as the final frontier.

## Core Principles
- **Exploration metaphor** — the product represents venturing into the unknown
- **Cosmic scale** — design communicates vastness and possibility
- **Romantic utopianism** — optimistic, aspirational, full of wonder
- **Celestial beauty** — stars, nebulae, and cosmic light as primary design elements

## Typography Rules
- Modern geometric sans-serif: Geist, Inter, Space Grotesk, Outfit
- Hero: 56-80px, semibold to bold, with generous letter-spacing (+0.02em)
- Body: 16-18px, regular weight, high line-height (1.7) — light text on dark
- All-caps for navigation and labels
- Text color: white (#FFFFFF) or soft blue-white (#E0E8FF) on dark backgrounds

## Color Palette
- **Deep space**: pure black (#000000), void black (#050508), deep navy (#0A0A2E)
- **Stars**: white (#FFFFFF), blue-white (#C8D8FF)
- **Nebula accents**: cosmic purple (#7C3AED), nebula pink (#EC4899), star blue (#3B82F6)
- **Warm stars**: gold (#FFD700), amber (#FFB800), orange (#FF8C00)
- **Atmospheric glow**: soft halos of color around light sources

## Visual Techniques
```css
/* Star field background */
.starfield {
  background: #050508;
  background-image:
    radial-gradient(1px 1px at 20px 30px, #fff, transparent),
    radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.6), transparent),
    radial-gradient(2px 2px at 160px 120px, #fff, transparent);
  background-size: 200px 200px;
  animation: twinkle 4s ease-in-out infinite alternate;
}

/* Nebula glow */
.nebula {
  background: radial-gradient(
    ellipse at 50% 50%,
    rgba(124, 58, 237, 0.15) 0%,
    rgba(236, 72, 153, 0.08) 40%,
    transparent 70%
  );
}

/* Planet/object with atmosphere */
.celestial-object {
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #6366F1, #312E81);
  box-shadow:
    0 0 40px rgba(99, 102, 241, 0.4),
    0 0 80px rgba(99, 102, 241, 0.2),
    inset -10px -10px 30px rgba(0, 0, 0, 0.5);
}

/* Lens flare */
.lens-flare {
  background: radial-gradient(circle, rgba(255,255,255,0.6), transparent 60%);
  mix-blend-mode: screen;
}
```

## Layout
- Full-dark backgrounds — never break to white sections
- Hero: expansive, full-viewport with cosmic backdrop + centered text
- Content sections float in space — translucent dark cards or no containers
- Vertical scrolling = traveling through space
- Generous spacing between sections (200px+ vertical)
- Wide layouts — use the full viewport width for the cosmic canvas

## Imagery
- Star fields (CSS generated or canvas-based)
- Nebula gradients and cosmic dust
- Planet/sphere renders with atmospheric glow
- Orbital paths and trajectory lines
- Constellation-style dot-and-line patterns
- Abstract cosmic photography (NASA/Hubble style)
- No earthbound imagery — stay cosmic

## Interactions
- **Star parallax**: multiple layers of stars at different scroll speeds
- **Twinkle**: random star brightness animation
- **Gravitational pull**: elements subtly attract toward mouse cursor
- **Warp speed**: scroll-triggered star streak effect on section transitions
- **Orbit animations**: elements circling focal points
- **Shooting stars**: occasional diagonal streak across viewport

## What NOT to Do
- No white or light backgrounds (breaks the space illusion)
- No warm/earthy colors dominating (cool tones only)
- No flat 2D illustrations (everything needs depth and glow)
- No cramped, dense layouts (space needs space)
- No earthbound photography or mundane imagery
- Watch for cliché — don't just make a "space background" and call it design

## Reference Sites
- [X AI (Grok)](https://x.ai/)
- [Perplexity Comet](https://www.perplexity.ai/hub/blog/comet-is-now-available-to-everyone-worldwide)
- [Modular](https://www.modular.com/)
- [Fin AI](https://fin.ai/)
