# Design Style: Generative Art

You are designing in the **Generative Art** style. Algorithmic patterns, cellular automata, rule-based systems creating form through logic. Less about a single image, more about a living system. The design itself demonstrates emergence and complexity.

## Core Principles
- **Rules create beauty** — define algorithms and let patterns emerge
- **Living systems** — the design responds, grows, and evolves
- **Emergence over design** — simple rules → complex, unexpected visual outcomes
- **Code IS the aesthetic** — the generative process is part of the brand story

## Typography Rules
- Monospace as primary: JetBrains Mono, IBM Plex Mono, Fira Code
- Sans-serif for readability: Inter, Geist, IBM Plex Sans
- Hero: 48-64px, medium weight — clean to not compete with generative visuals
- Body: 16-18px, clean and readable
- Consider showing code snippets that generate the art as part of the design
- Labels as coordinates or data points (x: 0.42, y: 0.78)

## Color Palette
- **Algorithmic palettes** — generate from a seed color using HSL rotation:
  - Rotate hue 30° intervals for complementary sets
  - Or use golden ratio (137.5°) for natural-feeling distributions
- **Classic generative**: black background, single accent color trails
- **Data viz inspired**: sequential palette (light → dark of single hue)
- **Nature algorithms**: forest (#2D5016), ocean (#0E4D64), fire (#8B2500)
- Background: usually dark (#0A0A0A) to make patterns pop

## Visual Techniques
```javascript
// Canvas-based generative patterns
// Flow fields
for (let x = 0; x < cols; x++) {
  for (let y = 0; y < rows; y++) {
    const angle = noise(x * 0.01, y * 0.01) * TWO_PI;
    // Draw line segment following the flow
  }
}

// Particle systems that leave trails
particles.forEach(p => {
  p.x += Math.cos(p.angle) * p.speed;
  p.y += Math.sin(p.angle) * p.speed;
  ctx.fillRect(p.x, p.y, 1, 1);
});
```

```css
/* CSS grid pattern (simple generative) */
.grid-pattern {
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  gap: 2px;
}
.grid-cell {
  aspect-ratio: 1;
  background: var(--cell-color);
  transition: background 0.3s;
}
```

## Implementation
- **p5.js** — easiest for creative coding, great community
- **Canvas API** — lightweight, performant, no dependencies
- **Three.js** — for 3D generative geometry
- **GLSL shaders** — for GPU-accelerated patterns (noise, fractals)
- **SVG generation** — for crisp, scalable generative graphics
- **Web Workers** — offload computation for complex simulations

## Pattern Types
- **Flow fields**: vector fields creating organic line patterns
- **Cellular automata**: Conway's Game of Life, rule-based grid evolution
- **L-systems**: fractal plant/tree generation
- **Voronoi diagrams**: organic cell-like tessellation
- **Perlin/Simplex noise**: terrain, clouds, organic textures
- **Particle systems**: swarms, flocks, attraction/repulsion

## Layout
- Hero: full-viewport generative canvas as background
- Content layered on top of generative visuals with semi-transparent backgrounds
- Interactive canvases between text sections
- Sidebar or corner: live parameters/controls (optional, shows the system)
- Minimal chrome — let the generative art fill the space
- Consider a "seed" or version number displayed (signals it's generated)

## Interactions
- **Generative responds to user**: mouse position influences parameters
- **Click to regenerate**: new seed, new pattern
- **Scroll-driven evolution**: pattern changes based on scroll position
- **Real-time parameter display**: show the underlying values
- **Touch/drag**: paint or influence the generative field
- **Ambient mode**: auto-evolving patterns when user is idle

## What NOT to Do
- No static generative imagery (it should move or respond)
- No heavy computation blocking the main thread (use requestAnimationFrame)
- No random-looking chaos (the beauty is in the rules, not randomness)
- No stealing others' generative art — write your own algorithms
- No pre-rendered video of generative art (use live computation)
- No overwhelming the content — generative art supports, not dominates

## Reference Sites
- [Sakana AI](https://sakana.ai/)
- [Fal AI About](https://fal.ai/about)
- [General Intelligence Company](https://www.generalintelligencecompany.com/)
- [Retool Blog](https://retool.com/blog/holiday-shipping-spree)
