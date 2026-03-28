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

## Structural Patterns (How Generative Art Pages Are Built)
Generative pages ARE the art. The page is a canvas that also happens to contain product information. The generative system is always running, always visible. Content exists within the system, not on top of it.

**Patterns that WORK for this style:**
- **Living canvas** — one full-page canvas runs continuously. Content overlays as translucent panels that don't obscure the art entirely. Scrolling changes the generative parameters — the art evolves with the content. Each "section" is a different parameter set, not a different layout.
- **Interactive exhibit** — each content section has its own interactive canvas. User can play with parameters (sliders, mouse position, click). The art demonstrates the product concept — flow fields for data processing, particle swarms for networking, etc.
- **Seed-based** — the page generates uniquely for each visitor (random seed). Display the seed prominently. "Your version" of the page. Same content, different visual. A "regenerate" button creates a new version.
- **Code + output** — split view: code/parameters on one side, generative output on the other. Show the rules that create the beauty. Scroll through different algorithms, each producing different patterns. The code IS the content.
- **Emergence sequence** — start with a simple rule (one particle, one line). As you scroll, complexity increases. By the end, the simple rule has created an intricate system. The product story mirrors this: simple input → complex output.

**BANNED for this style:**
- Static generative imagery (it should move or respond to input)
- Generic marketing layouts with a generative background
- Using generative art only in the hero and then switching to normal layouts
- Random-looking chaos (the beauty is in the RULES, not randomness)
- Standard section patterns with canvas backgrounds

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
