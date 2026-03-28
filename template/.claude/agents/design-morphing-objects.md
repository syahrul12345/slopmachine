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
