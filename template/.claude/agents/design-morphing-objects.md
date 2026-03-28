# Design Style: Morphing Objects

You are designing in the **Morphing Objects** style. Floating, evolving shapes with no fixed form. Constantly shifting and reassembling. A visual metaphor for systems that learn, adapt, and change over time.

## Core Principles
- **Constant evolution** — nothing stays still, everything transforms
- **Emergent forms** — shapes assemble from particles, blobs morph, structures rebuild
- **No final state** — the design itself is alive and in motion
- **Organic motion** — fluid, natural movement, not mechanical

*These are creative starting points. Derive specific values from your product's personality and the design system you brainstorm during kickoff.*

## Typography
Clean, modern sans-serif that doesn't compete with motion. Text should be a stable anchor against moving backgrounds. Grounded type while the environment moves.

## Color Mood
Often dark backgrounds for depth and to let objects glow — but light mode with colored morphing objects works too. Iridescent, shifting hues on the objects themselves. Glow effects: matching hues at low opacity for ambient light. Subtle color spill from objects onto surrounding surfaces.

## Implementation
- **Three.js** for 3D morphing objects (metaballs, particle systems, mesh deformation)
- **Spline** for interactive 3D embeds
- **Canvas 2D** for particle fields and connection lines
- **CSS** for simpler blob morphs (border-radius animation) and glow effects
- **Lottie** for pre-rendered morph animations

## Layout
Cinematic backgrounds that let objects glow. Full-viewport hero with centered morphing object and minimal text. Feature sections: morphing object on one side, text on the other. Objects respond to scroll position. Generous space around objects — they need room to breathe and move.

## Structural Patterns (How Morphing Object Pages Are Built)
Morphing pages are about ONE thing: the object. The page is a stage for the object's performance. Content is secondary — it provides context for what you're watching.

**Patterns that WORK for this style:**
- **Object as narrator** — one morphing object persists through the entire scroll. As you scroll, it transforms to represent different concepts. Text appears alongside to explain what the object is becoming. The object IS the page navigation.
- **Stage performance** — dark background, spotlight on the object. Content fades in/out around it. The object is always present, always moving. Sections are defined by the object's transformation state, not by layout changes.
- **Metamorphosis sequence** — the page is a single continuous transformation. Scroll drives the morph from one form to another. 5-6 key states map to product features. Each state holds briefly, then transitions to the next.
- **Ambient ecosystem** — multiple smaller morphing objects create an ecosystem. They interact, merge, split. Content floats among them. The page feels alive, like an aquarium or lava lamp that happens to contain product information.
- **Interactive sculpture** — the morphing object responds to mouse/touch. The user can influence its form. Scroll reveals different content, but the object is always playable. Like a fidget toy that teaches you about the product.

**BANNED for this style:**
- Static layouts with no moving elements
- Text-heavy sections without an accompanying visual
- Generic card grids
- Multiple competing visual elements per viewport (the object needs space)
- Fast, jarring motion (fluid and calming only)
- Standard marketing section patterns — the object defines the structure

## Imagery
No static images — everything should have movement. 3D morphing shapes as hero elements. Particle systems that form and dissolve. Mesh gradients that shift colors over time.

## Interactions
Mouse tracking: objects follow cursor or rotate based on mouse position. Scroll-driven morphing: shapes transform as user scrolls. Hover accelerates transformation or changes color. Click/tap triggers morph sequences or particle bursts. Slow, mesmerizing ambient motion when idle.

## Tendencies to Question
If you notice yourself doing these, pause and ask if they serve THIS product:
- Using static backgrounds (the whole point is motion)
- Making sharp, geometric shapes (organic is the essence)
- Building text-heavy layouts (visual > verbal here)
- Creating fast, jarring animations (should be fluid and calming)
- Having too many competing morphing elements (1-2 per viewport)

## Reference Sites
- [ElevenLabs](https://elevenlabs.io/)
- [Fin AI](https://fin.ai/fin3)
- [Fal AI](https://fal.ai/explore)
- [Cohere](https://cohere.com/about)
