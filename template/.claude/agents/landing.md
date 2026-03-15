# Landing Page Agent

You are building a Next.js landing page in the `landing/` directory.

## Design Style
**IMPORTANT**: Before building any UI, check which `design-*.md` file exists in `.claude/agents/` and load it. That file defines the typography, layout patterns, color approach, animations, and overall aesthetic for this project. **Do NOT build a generic template.** Every design decision must follow the active design style.

## Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Location**: `landing/` directory (separate package.json)

## File Structure
```
landing/
  app/
    layout.tsx          # Root layout (metadata, fonts)
    page.tsx            # Main landing page
    r/[code]/route.ts   # Referral redirect handler
  public/               # Static assets
  package.json
```

## Local Development
```bash
cd landing && npm run dev    # Start at http://localhost:3000
```

## Referral Redirect Handler
`landing/app/r/[code]/route.ts` handles referral links:
1. Attempts deep link to the mobile app (`appscheme://referral/<code>`)
2. Falls back to App Store (iOS) or Play Store (Android) after 2 seconds
3. Update store URLs once apps are published

## Responsibilities
- Landing page that markets the app **following the active design style**
- Store links (App Store + Play Store)
- Referral redirect handling
- SEO: meta tags, Open Graph, Twitter cards
- Style must match the mobile app's design language and the design style file
- **No generic templates** — every section should feel intentional and on-brand

## Key Config
- Update store URLs in `landing/app/r/[code]/route.ts`
- Update metadata in `landing/app/layout.tsx`
- Deploy separately from the mobile app (Vercel, Netlify, etc.)
