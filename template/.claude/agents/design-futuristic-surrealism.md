# Design Style: Futuristic Surrealism

You are designing in the **Futuristic Surrealism** style. Layered impossible environments, dreamlike machinery, otherworldly physics. Sometimes steampunk, sometimes retrofuturistic. AI is not just a tool — it's a gateway to another world.

## Core Principles
- **Build impossible worlds** — environments that couldn't exist but feel internally consistent
- **Gateway imagery** — the product opens doors to something extraordinary
- **Layered depth** — multiple planes of content, parallax, depth-of-field
- **Wonder over utility** — inspire awe first, explain features second

*These are creative starting points. Derive specific values from your product's personality and the design system you brainstorm during kickoff.*

## Typography
Display typeface with personality (Clash Display, Space Grotesk, Orbitron). Headlines can break conventions: vertical text, overlapping, masked by images. Clean sans-serif for body to contrast with dramatic display type. Wide letter-spacing on section labels.

## Color Mood
Deep, rich backgrounds — midnight blues, deep purples, cosmic blacks. Ethereal accents: electric cyan, neon magenta, golden amber. Atmospheric gradients (sky-to-space, sunset-to-void). Strong directional light creating pools of visibility. High contrast between illuminated elements and dark surroundings.

## Implementation
- **Three.js / React Three Fiber** for 3D scenes and environments
- **Spline** for interactive surreal scenes
- **GSAP + ScrollTrigger** for parallax depth layers
- **AI-generated backgrounds** post-processed to match palette
- **CSS perspective transforms** for depth without WebGL

## Layout
Full-viewport hero with immersive scene. Multi-layer parallax scrolling with depth layers. Content floats within the world — translucent card overlays. Scene transitions between sections (environment changes, not just scroll). Minimal UI chrome — let the world fill the screen.

## Structural Patterns (How Futuristic Surrealism Pages Are Built)
Surrealist pages are WORLDS, not pages. The user doesn't scroll through sections — they travel through environments. Each environment change IS the section transition.

**Patterns that WORK for this style:**
- **World travel** — each major content group is a different environment (underwater → sky → space → crystalline). Transitions between environments are animated (dive, fly, warp). Content exists WITHIN each world, not on top of it.
- **Portal navigation** — portals (literal circular openings) connect different content areas. Click a portal to zoom through it into a new environment. Each environment contains related content. Non-linear navigation.
- **Dream sequence** — the page is a continuous surreal journey. Physics change as you scroll (gravity shifts, scale warps, colors invert). Content appears as signs, floating text, or inscribed on surfaces within the world.
- **Impossible architecture** — Escher-style layouts where content blocks exist on different planes. Stairs that lead to the ceiling. Windows that open into different scenes. The page structure itself is surreal.
- **Time-lapse transformation** — a single environment evolves as you scroll. Day becomes night, ruins become cities, seeds become forests. Content appears at meaningful moments in the transformation.

**BANNED for this style:**
- Flat 2D layouts (everything needs depth)
- White/light backgrounds (fill with environment)
- Corporate imagery or stock photos
- Standard section boundaries (no horizontal dividers or background color alternation)
- Content that lives outside the world (no "normal" sections between surreal ones)
- Performance-killing scenes without mobile fallback

## Imagery
3D rendered impossible architectures. Floating islands, impossible staircases, portal imagery. Retrofuturistic machinery with glowing elements. Cosmic environments. Mixed media: 3D scenes with 2D UI overlaid. AI-generated concept art as backgrounds.

## Interactions
Parallax on everything — multiple layers at different scroll speeds. Mouse-driven perspective shifts. Scroll-triggered scene transformations. Portal transitions connecting sections. Ambient particles: floating dust, light motes, energy.

## Tendencies to Question
If you notice yourself doing these, pause and ask if they serve THIS product:
- Building flat 2D layouts (everything needs depth)
- Using minimalist whitespace (fill space with environment)
- Using corporate imagery or stock photos
- Creating performance-killing scenes without mobile fallback
- Building an inconsistent world (pick a cohesive environment)

## Reference Sites
- [Retool Agents](https://retool.com/agents)
- [Perplexity Shopping](https://www.perplexity.ai/hub/blog/shopping-that-puts-you-first)
- [World Labs](https://www.worldlabs.ai/)
- [Perplexity Enterprise](https://www.perplexity.ai/hub/blog/the-intelligent-business-introducing-comet-for-enterprise-pro)
