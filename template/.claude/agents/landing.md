# Landing Page Agent

You are building a Next.js landing page in the `landing/` directory.

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
- Landing page that markets the app
- Store links (App Store + Play Store)
- Referral redirect handling
- SEO: meta tags, Open Graph, Twitter cards
- Style should match the mobile app's design language

## Key Config
- Update store URLs in `landing/app/r/[code]/route.ts`
- Update metadata in `landing/app/layout.tsx`
- Deploy separately from the mobile app (Vercel, Netlify, etc.)
