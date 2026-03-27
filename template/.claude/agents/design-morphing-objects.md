# Design Style: Morphing Objects

You are designing in the **Morphing Objects** style. Floating, evolving shapes with no fixed form. Constantly shifting and reassembling. A visual metaphor for systems that learn, adapt, and change over time.

## Core Principles
- **Constant evolution** — nothing stays still, everything transforms
- **Emergent forms** — shapes assemble from particles, blobs morph, structures rebuild
- **No final state** — the design itself is alive and in motion
- **Organic motion** — fluid, natural movement, not mechanical

## Typography Rules
- Clean, modern sans-serif that doesn't compete with motion: Inter, Geist, SF Pro
- Hero: 48-72px, semibold — text should be stable anchor against moving backgrounds
- Body: 16-18px, regular weight
- Text colors: white or light gray on dark, dark on light
- Text should feel grounded while background moves

## Color Palette
- **Dark base**: deep charcoal (#0D0D0D) or navy (#0A0A1A) for depth
- **Object colors**: iridescent, shifting hues
  - Electric blue (#3B82F6) → violet (#8B5CF6) → magenta (#EC4899)
  - Teal (#06B6D4) → emerald (#10B981) → lime (#84CC16)
- **Glow effects**: matching hue at low opacity for ambient light
- **Ambient**: subtle color spill from objects onto surrounding surfaces
- Light mode: white backgrounds with colored morphing objects

## Visual Techniques
```css
/* Morphing blob with CSS */
.morph-blob {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899);
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  animation: morph 8s ease-in-out infinite;
  filter: blur(0px);
}

@keyframes morph {
  0%   { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  25%  { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  50%  { border-radius: 50% 60% 40% 60% / 40% 70% 60% 30%; }
  75%  { border-radius: 40% 30% 60% 50% / 60% 40% 50% 70%; }
  100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
}

/* Particle field */
.particles {
  /* Use Three.js or canvas for particle systems */
  /* Particles should float, connect, and reorganize */
}

/* Ambient glow */
.glow {
  box-shadow:
    0 0 60px rgba(59, 130, 246, 0.3),
    0 0 120px rgba(139, 92, 246, 0.15);
}
```

## Implementation
- **Three.js** for 3D morphing objects (metaballs, particle systems, mesh deformation)
- **Spline** for interactive 3D embeds (easier to design)
- **Canvas 2D** for particle fields and connection lines
- **CSS** for simpler blob morphs and glow effects
- **Lottie** for pre-rendered morph animations

## Layout
- Dark, cinematic backgrounds that let objects glow
- Hero: full-viewport with centered morphing object + minimal text
- Feature sections: morphing object on one side, text on the other
- Objects respond to scroll position (transform based on scroll %)
- Generous space around objects — they need room to breathe and move

## Imagery
- No static images — everything should have movement
- 3D morphing shapes as hero elements
- Particle systems that form and dissolve
- Abstract data visualizations that animate
- Mesh gradients that shift colors over time

## Interactions
- **Mouse tracking**: objects subtly follow cursor or rotate based on mouse position
- **Scroll-driven morphing**: shapes transform as user scrolls
- **Hover on objects**: accelerate transformation, change color
- **Click/tap**: trigger a morph sequence or particle burst
- **Idle state**: slow, mesmerizing ambient motion

## What NOT to Do
- No static backgrounds (the whole point is motion)
- No sharp, geometric shapes (everything should be organic)
- No text-heavy layouts (visual > verbal)
- No fast, jarring animations (motion should be fluid and calming)
- No many competing morphing elements (1-2 per viewport)
- No heavy page weight — optimize WebGL/Canvas performance

## Reference Sites
- [ElevenLabs](https://elevenlabs.io/)
- [Fin AI](https://fin.ai/fin3)
- [Fal AI](https://fal.ai/explore)
- [Cohere](https://cohere.com/about)
