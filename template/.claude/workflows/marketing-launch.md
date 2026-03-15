# Marketing Launch Workflow

Code-first marketing pipeline using Remotion. Every video is a React component. $0 production costs.

## Prerequisites
- Node.js 18+
- App is feature-complete (or has enough features to demo)
- Design style file loaded (`.claude/agents/design-*.md`)

## Phase 1: Setup Remotion

```bash
mkdir -p marketing/video && cd marketing/video
npm init -y
npm install remotion @remotion/cli @remotion/transitions react react-dom typescript @types/react
```

Create the project structure:
```
marketing/video/src/
  Root.tsx
  compositions/
  scenes/
  components/
  styles/
```

Register compositions in `Root.tsx`:
```tsx
import { Composition } from 'remotion';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="ProductDemo" component={ProductDemo}
        durationInFrames={900} fps={30} width={1920} height={1080} />
      <Composition id="SocialReel" component={SocialReel}
        durationInFrames={450} fps={30} width={1080} height={1920} />
      <Composition id="AppStorePreview" component={AppStorePreview}
        durationInFrames={900} fps={30} width={1290} height={2796} />
    </>
  );
};
```

## Phase 2: Build Feature Illustrations (SVG)

This is the **highest-ROI step** — illustrations get reused across landing page, videos, and app store assets.

1. Read the app's core features from the codebase
2. Create SVG React components for each feature
3. Use the project's design style colors and typography
4. Save to `marketing/video/src/components/illustrations/`
5. **Also export static versions to `landing/public/illustrations/`** for the landing page

Each illustration should:
- Be a self-contained React component
- Accept a `frame` prop for Remotion animation (or work statically without it)
- Use brand colors from `styles/colors.ts`
- Be vector-based (SVG) for any resolution

## Phase 3: Build Reusable Scenes

Create scene components that combine illustrations, text, and app mockups:

### Core Scenes
1. **HeroScene** — Logo animation + tagline reveal
2. **ProblemScene** — Pain point with visual metaphor
3. **SolutionScene** — "Meet [App Name]" + app intro
4. **FeatureScene** — Device mockup + feature illustration + text overlay (parameterized, reuse per feature)
5. **CTAScene** — Download CTA + app store badges + optional QR code
6. **TestimonialScene** — Social proof (reviews, metrics, quotes)

### Shared Components
1. **PhoneMockup** — iPhone frame that displays app screenshots
2. **TextReveal** — Animated text with configurable timing
3. **Badge** — App Store / Play Store download badges

## Phase 4: Compose Videos

### Product Demo (30-60s, 1920x1080)
```
HeroScene (3s) → ProblemScene (5s) → SolutionScene (3s) →
FeatureScene x3 (5s each) → TestimonialScene (5s) → CTAScene (5s)
```

Use `@remotion/transitions` for scene cuts (slide, fade, wipe).

### Social Reels (15-30s each, 1080x1920)
Create at least 3 reels, each with a different hook:
1. **Hook reel** — Attention-grabbing opening → quick demo → CTA
2. **Problem-solution reel** — "Ever had this happen?" → app solves it → CTA
3. **Tutorial reel** — "How to [achieve X] in 10 seconds" → app walkthrough → CTA

### App Store Preview (15-30s, device-specific dimensions)
- iPhone 6.7": 1290x2796
- Show app in use with smooth transitions
- Text overlays explaining features
- No external audio/voiceover (Apple rules)

## Phase 5: Render All Videos

```bash
cd marketing/video

# Preview first
npx remotion preview

# Render all
npx remotion render src/Root.tsx ProductDemo ../videos/product-demo.mp4
npx remotion render src/Root.tsx SocialReel ../videos/social-reel-1.mp4
npx remotion render src/Root.tsx AppStorePreview ../videos/appstore-preview.mp4
```

## Phase 6: Update Landing Page

Replace placeholder content with actual illustrations and branded sections:

1. Copy SVG illustrations to landing page assets
2. Update hero section with product illustration + animated elements
3. Update feature sections with per-feature illustrations
4. Add demo video embed (product demo rendered in Phase 5)
5. Ensure everything matches the active design style

## Phase 7: Capture App Screenshots

For static App Store screenshots:
```bash
xcrun simctl boot "iPhone 15 Pro Max"
npx expo run:ios --device "iPhone 15 Pro Max"
xcrun simctl io "iPhone 15 Pro Max" screenshot marketing/screenshots/iphone-6.7/screen-1.png
```

**Better approach**: Render stylized screenshots with Remotion — device mockup + feature text + gradient background. More professional than raw simulator captures.

## Phase 8: Write Store Listing Copy

Create `marketing/store-listing/ios-listing.md`:
- Title (max 30 chars)
- Subtitle (max 30 chars)
- Description (first 3 lines are critical — visible without tap)
- Keywords (100 chars max, comma-separated)
- Category

Create `marketing/store-listing/android-listing.md`:
- Title (max 30 chars)
- Short description (max 80 chars)
- Full description (max 4000 chars)

## Phase 9: Write UGC Scripts

Create 3+ scripts in `marketing/ugc/`:

Each script maps to a Remotion composition:
```
HOOK (3s): [pattern interrupt]
PROBLEM (5s): [relatable pain point]
SOLUTION (10-15s): [app demo using FeatureScene components]
CTA (3-5s): [download + social links]
CAPTION: [platform-specific caption with hashtags]
REMOTION COMP: [SocialReel variant to use]
```

## Output Verification

```
marketing/
├── video/                    # Remotion source project
│   └── src/
│       ├── compositions/     # ProductDemo, SocialReel, AppStorePreview
│       ├── scenes/           # HeroScene, FeatureScene, CTAScene, etc.
│       └── components/       # PhoneMockup, illustrations, TextReveal
├── screenshots/              # Static app screenshots
│   ├── iphone-6.7/   (5+)
│   ├── iphone-6.5/   (5+)
│   └── iphone-5.5/   (5+)
├── videos/                   # Rendered output
│   ├── product-demo.mp4
│   ├── social-reel-1.mp4
│   ├── social-reel-2.mp4
│   ├── social-reel-3.mp4
│   └── appstore-preview.mp4
├── ugc/                      # 3+ scripts
└── store-listing/            # iOS + Android listing copy
```

## Speed After First Run

| What | Time |
|------|------|
| New reel (recycled scenes) | ~10 min |
| New illustration | ~10 min |
| Update copy + re-render | ~5 min |
| Full new demo video | ~30 min |

The Remotion project becomes a **marketing factory** — every new reel is just rearranging existing scenes with new copy.
