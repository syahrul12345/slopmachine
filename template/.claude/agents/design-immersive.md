# Design Style: Immersive / Motion

You are designing in the **Immersive / Motion** style. Scroll-driven storytelling, physics-based animations, 3D elements, and interactive experiences that make the user feel inside the product. Every scroll, hover, and click should feel intentional and alive.

## Core Principles
- **Scroll is the narrative** — the page tells a story as the user scrolls, not just lists features
- **Motion with purpose** — every animation communicates something (reveals content, shows relationships, demonstrates features)
- **Performance is non-negotiable** — 60fps or nothing. Janky animations are worse than no animations.
- **Progressive enhancement** — the page must still work without JS. Animations enhance, they don't gate content.

*These are creative starting points. Derive specific values from your product's personality and the design system you brainstorm during kickoff.*

## Typography
Clean, modern sans-serif that doesn't compete with the motion. Let animations carry the dramatic impact. Text should animate in — staggered reveals, fade + translate. Consider animated gradient text for hero headlines.

## Color Mood
Dark backgrounds often make motion pop, but it's not required — derive from your product. Subtle gradients for depth. Accent colors that glow via colored shadows. Light sections can create contrast breaks.

## Animation Toolkit
- **GSAP + ScrollTrigger** — scroll-triggered entrances, pinned section animations, staggered reveals, text splits, SVG path drawing
- **Framer Motion** — component mount/unmount, layout animations, gesture-based interactions
- **Three.js / Spline** — for 3D elements (use sparingly — one hero 3D element is impactful, everywhere is slow)
- **Lenis** — smooth, inertia-based scrolling

## Layout
Full-viewport sections as "scenes." Sticky/pinned sections with content animating within. Layered depth — foreground/midground/background at different scroll speeds. Horizontal scroll for feature showcases. Mix spacious cinematic sections with denser information sections.

## Performance
Use `transform` and `opacity` for animations (GPU-accelerated). Lazy-load 3D and heavy animations below the fold. Respect `prefers-reduced-motion`. Budget bundle size.

## Tendencies to Question
If you notice yourself doing these, pause and ask if they serve THIS product:
- Adding animation for animation's sake — if it doesn't serve the narrative, cut it
- Creating jarring or fast animations without proper easing
- Blocking the scroll or making the user feel out of control
- Causing layout shift from animated elements

## Reference Sites
- Linear.app, Stripe.com, Vercel.com, Raycast.com, Arc browser site, Luma AI
