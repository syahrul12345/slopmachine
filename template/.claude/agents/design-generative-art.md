# Design Style: Generative Art

You are designing in the **Generative Art** style. Algorithmic patterns, cellular automata, rule-based systems creating form through logic. Less about a single image, more about a living system. The design itself demonstrates emergence and complexity.

## Core Principles
- **Rules create beauty** — define algorithms and let patterns emerge
- **Living systems** — the design responds, grows, and evolves
- **Emergence over design** — simple rules create complex, unexpected visual outcomes
- **Code IS the aesthetic** — the generative process is part of the brand story

*These are creative starting points. Derive specific values from your product's personality and the design system you brainstorm during kickoff.*

## Typography
Monospace as primary (JetBrains Mono, IBM Plex Mono, Fira Code). Clean sans-serif for readability. Headlines should be clean and not compete with generative visuals. Consider showing code snippets that generate the art as part of the design. Labels as coordinates or data points.

## Color Mood
Algorithmic palettes — generated from a seed color using HSL rotation or golden ratio distribution. Classic generative: dark background with single accent color trails. Data viz inspired: sequential palettes. Or nature-derived: forest, ocean, fire tones. Usually dark backgrounds to make patterns pop.

## Implementation
- **p5.js** — easiest for creative coding
- **Canvas API** — lightweight, performant, no dependencies
- **Three.js** — for 3D generative geometry
- **GLSL shaders** — GPU-accelerated patterns (noise, fractals)
- **SVG generation** — crisp, scalable generative graphics
- **Web Workers** — offload complex computation

## Pattern Types
Flow fields, cellular automata, L-systems (fractals), Voronoi diagrams, Perlin/Simplex noise, particle systems (swarms, flocks, attraction/repulsion).

## Layout
Full-viewport generative canvas as hero background. Content layered on generative visuals with semi-transparent backgrounds. Interactive canvases between text sections. Optional live parameter displays showing the system. Minimal chrome — let the generative art fill the space. Display a "seed" or version number to signal it's generated.

## Interactions
Mouse position influences generative parameters. Click to regenerate (new seed, new pattern). Scroll-driven pattern evolution. Real-time parameter display. Touch/drag to paint or influence the field. Auto-evolving patterns when idle.

## Tendencies to Question
If you notice yourself doing these, pause and ask if they serve THIS product:
- Using static generative imagery (it should move or respond)
- Blocking the main thread with heavy computation (use requestAnimationFrame)
- Making random-looking chaos (the beauty is in the rules, not randomness)
- Overwhelming the content — generative art should support, not dominate

## Reference Sites
- [Sakana AI](https://sakana.ai/)
- [Fal AI About](https://fal.ai/about)
- [General Intelligence Company](https://www.generalintelligencecompany.com/)
- [Retool Blog](https://retool.com/blog/holiday-shipping-spree)
