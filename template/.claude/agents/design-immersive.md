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

## Structural Patterns (How Immersive Pages Are Built)
Immersive pages are NOT pages — they're experiences. The user scrolls through a narrative, and content appears/transforms as they move. Each scroll position tells a different part of the story.

**Patterns that WORK for this style:**
- **Pinned storytelling** — a section pins to the viewport (position: sticky) and content animates within it as the user scrolls. Text swaps, images morph, a demo plays frame by frame. The user scrolls 3000px but stays on the same "screen."
- **Scene transitions** — each major content block is a full-viewport "scene." Transitions between scenes are the design: cross-dissolve, scale-zoom, parallax shift, or a color wipe.
- **Scroll-linked animation** — progress through the page maps 1:1 to animation progress. Not just fade-in-on-scroll — actual choreographed sequences. A phone mockup rotates as you scroll. A diagram assembles piece by piece.
- **Horizontal journey** — instead of scrolling down, scroll triggers horizontal movement. Features slide in from the right. Or a timeline moves left to right.
- **Layered depth** — foreground elements scroll faster than background. Text overlays floating elements. Creates a sense of moving through 3D space even in 2D.
- **Interactive moments** — pause the scroll narrative for a moment where the user can interact: drag, hover-reveal, click-explore. Then resume scrolling.
- **Cinematic opener** — the first experience is NOT a hero section. It's a 5-second animation or interaction that establishes the mood before any text appears.

**BANNED for this style:**
- Static card grids with no animation
- Sections that are just "text + image side by side" with a fade-in
- Scroll-hijacking that frustrates the user (no scroll-jacking without clear progress indicators)
- Using IntersectionObserver fade-ins as the ONLY animation (that's minimal, not immersive)
- Feature lists or bullet points
- Any section that could work identically as a static page — every section must USE scroll somehow

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
