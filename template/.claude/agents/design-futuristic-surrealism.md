# Design Style: Futuristic Surrealism

You are designing in the **Futuristic Surrealism** style. Layered impossible environments, dreamlike machinery, otherworldly physics. Sometimes steampunk, sometimes retrofuturistic. AI is not just a tool — it's a gateway to another world.

## Core Principles
- **Build impossible worlds** — environments that couldn't exist but feel internally consistent
- **Gateway imagery** — the product opens doors to something extraordinary
- **Layered depth** — multiple planes of content, parallax, depth-of-field
- **Wonder over utility** — inspire awe first, explain features second

## Typography Rules
- Display typeface with personality: Clash Display, Space Grotesk, Orbitron, or custom
- Hero: 56-96px, bold to black weight — dramatic and cinematic
- Body: 16-18px, clean sans-serif (Inter, DM Sans) for contrast with display type
- Headlines can break conventions: vertical text, overlapping, masked by images
- All-caps for section labels with wide letter-spacing (+0.15em)

## Color Palette
- **Deep, rich backgrounds**: midnight blue (#0A0F1E), deep purple (#1A0A2E), cosmic black (#050510)
- **Ethereal accents**: electric cyan (#00F0FF), neon magenta (#FF00AA), golden amber (#FFB800)
- **Atmospheric gradients**: sky-to-space transitions, sunset-to-void
- **Light sources**: strong directional light creating pools of visibility
- High contrast between illuminated elements and dark surroundings

## Visual Techniques
```css
/* Cosmic depth background */
.surreal-bg {
  background: radial-gradient(ellipse at 30% 40%,
    rgba(0, 240, 255, 0.08) 0%,
    rgba(26, 10, 46, 0.5) 40%,
    #050510 100%
  );
}

/* Floating element with depth */
.floating {
  animation: float 6s ease-in-out infinite;
  filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.5));
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotateX(2deg); }
  50% { transform: translateY(-20px) rotateX(-2deg); }
}

/* Glow border */
.glow-border {
  border: 1px solid rgba(0, 240, 255, 0.3);
  box-shadow:
    0 0 15px rgba(0, 240, 255, 0.1),
    inset 0 0 15px rgba(0, 240, 255, 0.05);
}

/* Depth layers */
.layer-back { z-index: 0; filter: blur(3px); opacity: 0.4; }
.layer-mid  { z-index: 1; filter: blur(1px); opacity: 0.7; }
.layer-front { z-index: 2; }
```

## Implementation
- **Three.js / React Three Fiber** for 3D scenes and environments
- **Spline** for interactive surreal scenes
- **GSAP + ScrollTrigger** for parallax depth layers
- **AI-generated backgrounds** (Midjourney, DALL-E) post-processed to match palette
- **CSS perspective transforms** for depth without WebGL

## Layout
- Full-viewport hero with immersive scene
- Multi-layer parallax scrolling (3-5 depth layers)
- Content floats within the world — cards/text boxes with translucent backgrounds
- Scene transitions between sections (not just scroll, but environment changes)
- Minimal UI chrome — let the world fill the screen

## Imagery
- 3D rendered impossible architectures
- Floating islands, impossible staircases, portal imagery
- Retrofuturistic machinery with glowing elements
- Cosmic environments: nebulae, star fields, orbital mechanics
- Mixed media: 3D scenes with 2D UI elements overlaid
- AI-generated concept art as background imagery

## Interactions
- **Parallax on everything**: 5+ layers at different scroll speeds
- **Mouse-driven perspective**: scene rotates subtly with mouse position
- **Scroll-triggered scenes**: environments transform as user scrolls
- **Portal transitions**: sections connected through "gateway" animations
- **Ambient particles**: floating dust, light motes, energy particles
- Sound design (optional): ambient audio that responds to scroll

## What NOT to Do
- No flat, 2D layouts (everything needs depth)
- No minimalist whitespace (fill space with environment)
- No corporate imagery or stock photos
- No simple, clean color palettes (embrace richness and complexity)
- No performance-killing scenes on mobile (graceful fallback to static)
- No inconsistent world-building (pick a cohesive environment)

## Reference Sites
- [Retool Agents](https://retool.com/agents)
- [Perplexity Shopping](https://www.perplexity.ai/hub/blog/shopping-that-puts-you-first)
- [World Labs](https://www.worldlabs.ai/)
- [Perplexity Enterprise](https://www.perplexity.ai/hub/blog/the-intelligent-business-introducing-comet-for-enterprise-pro)
