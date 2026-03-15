# Design Style: Immersive / Motion

You are designing in the **Immersive / Motion** style. This is the premium tier — scroll-driven storytelling, physics-based animations, 3D elements, and interactive experiences that make the user feel like they're inside the product. Every scroll, hover, and click should feel intentional and alive.

## Core Principles
- **Scroll is the narrative** — the page tells a story as the user scrolls, not just lists features
- **Motion with purpose** — every animation communicates something (reveals content, shows relationships, demonstrates features)
- **Performance is non-negotiable** — 60fps or nothing. Janky animations are worse than no animations.
- **Progressive enhancement** — the page must still work without JS. Animations enhance, they don't gate content.

## Typography Rules
- Clean, modern sans-serif (Inter, Geist, SF Pro Display)
- Headlines: 48-80px, medium to bold weight (not ultra-bold — let motion carry the impact)
- Body: 16-18px with generous line-height
- Text should animate in — staggered word/line reveals, fade + translateY
- Consider animated gradient text for hero headlines (CSS `background-clip: text`)

## Layout
- **Full-viewport sections** — each section is a "scene" in the scroll narrative
- **Sticky/pinned sections** — content pins while elements animate within it
- **Layered depth** — foreground/midground/background elements moving at different speeds
- **Horizontal scroll sections** — for feature showcases or timelines
- Mix between spacious cinematic sections and denser information sections

## Animation Toolkit

### Required: GSAP + ScrollTrigger
```bash
npm install gsap @gsap/react  # React/Next.js
```
GSAP is the industry standard for scroll-driven animation. Use it for:
- Scroll-triggered element entrances (fade, slide, scale)
- Pinned section animations (scrub through animation as user scrolls)
- Staggered list/grid reveals
- Text split animations (by word or character)
- SVG path drawing

### Optional: Framer Motion (if React)
Good for:
- Component mount/unmount animations
- Layout animations
- Gesture-based interactions
- Simpler scroll animations (via `useScroll`)

### Optional: Spline / Three.js (for 3D)
- Spline (spline.design) for no-code 3D scenes embedded via `@splinetool/react-spline`
- Three.js + React Three Fiber for custom 3D (product viewers, particle effects)
- Use sparingly — one hero 3D element is impactful, 3D everywhere is slow

### Optional: Lenis (smooth scroll)
```bash
npm install lenis
```
Smooth, inertia-based scrolling that makes GSAP ScrollTrigger feel buttery.

## Color
- Dark mode default (dark backgrounds make motion pop)
- Subtle gradients for depth (not rainbow — think dark-to-darker with accent glow)
- Accent colors that glow: use `box-shadow` with colored shadows for neon-like effects
- Light sections for contrast breaks

## Key Animation Patterns

### Hero Section
- Large headline with staggered word reveal
- Background: subtle gradient shift or particle field
- CTA button with hover glow/pulse
- Optional: 3D product model or Spline scene

### Feature Sections (pinned scroll)
```
[Section pins to viewport]
  → Scroll 0-25%: Feature 1 text fades in, illustration animates
  → Scroll 25-50%: Feature 1 fades out, Feature 2 enters
  → Scroll 50-75%: Feature 2 → Feature 3
  → Scroll 75-100%: Final state, section unpins
```

### Metrics / Numbers
- Count-up animation triggered on scroll (GSAP `TextPlugin` or custom)
- Staggered entrance for each stat

### Testimonials
- Card carousel with physics-based drag (Framer Motion `drag`)
- Or: scroll-triggered parallax cards at different depths

### Footer CTA
- Large, bold CTA section with background animation
- Button with magnetic hover effect (cursor attraction)

## Performance Rules
- **Measure FPS** — use Chrome DevTools Performance tab
- **will-change** — apply to animated elements, remove after animation
- **GPU layers** — use `transform` and `opacity` for animations (not `top`/`left`/`width`)
- **Lazy load** — defer 3D scenes and heavy animations below the fold
- **Reduce motion** — respect `prefers-reduced-motion` media query
- **Bundle size** — GSAP is ~30KB gzipped. Three.js is ~150KB. Budget accordingly.

## What NOT to Do
- No animation for animation's sake — if it doesn't serve the narrative, cut it
- No jarring or fast animations — ease everything (GSAP `power2.out` or `power3.out`)
- No layout shift — animated elements must have reserved space
- No blocking the scroll — user should always feel in control
- No autoplaying video with sound

## Reference Sites
- Linear.app, Stripe.com, Vercel.com, Raycast.com, Arc browser site, Luma AI
