# slopmachine

Scaffold a full mobile app project with Claude agent configs baked in. Go from idea to running app in minutes.

## Quick Start

```bash
# From the repo
npx github:syahrul12345/slopmachine my_new_app

# Or clone and run locally
git clone https://github.com/syahrul12345/slopmachine.git
node slopmachine/bin/cli.js my_new_app

# Or link globally
cd slopmachine && npm link
slopmachine my_new_app
```

Then:
```bash
cd my_new_app
supabase start    # Start local Supabase (requires Docker)
npx expo start    # Start the app
claude            # Open Claude and start building
```

## What You Get

### App Scaffold
- **Mobile**: Expo + React Native + TypeScript + Expo Router
- **Backend**: Supabase (Postgres, Auth, Storage, Realtime, Edge Functions)
- **Landing page**: Next.js with referral redirect handler (`/r/:code`)
- **Payments**: RevenueCat (`react-native-purchases`) pre-wired
- **Push notifications**: `expo-notifications` + Supabase `push_tokens` table
- **Analytics**: Provider-agnostic wrapper in `lib/analytics.ts`
- **Auth**: Google + Apple sign-in via Supabase Auth

### Claude Agent Framework
- **`CLAUDE.md`** — Living router that evolves as your project grows. Auto-documents external APIs.
- **`developer.md`** — Primary agent. Knows the full stack, auth, payments, push, analytics, migrations.
- **`designer.md`** — UI design, design systems, app store asset specs and dimensions.
- **`marketing.md`** — Screenshots via simulator, ffmpeg demo videos, UGC scripts, store listings.

### Workflows
- **`local-dev.md`** — Supabase local cluster, migrations, seed data, dev servers.
- **`build-and-ship.md`** — Pre-flight checklist → EAS build → TestFlight → App Store.
- **`marketing-launch.md`** — Screenshots → demo video → UGC content → store listing.

## Project Structure

```
my_new_app/
├── app/                       # Expo Router screens
│   ├── _layout.tsx
│   └── index.tsx
├── lib/                       # Shared utilities
│   ├── supabase.ts            # Supabase client
│   ├── auth.tsx               # Auth context + provider
│   ├── analytics.ts           # Analytics wrapper
│   ├── purchases.ts           # RevenueCat wrapper
│   └── notifications.ts      # Push notification handler
├── supabase/
│   ├── config.toml            # Local Supabase config
│   ├── migrations/            # SQL migrations (supabase db diff)
│   └── seed.sql               # Local dev seed data
├── landing/                   # Next.js landing page
│   └── app/r/[code]/route.ts  # Referral redirect handler
├── marketing/                 # Generated marketing assets
├── CLAUDE.md                  # Claude agent router
└── .claude/
    ├── agents/                # developer.md, designer.md, marketing.md
    ├── workflows/             # local-dev.md, build-and-ship.md, marketing-launch.md
    └── context/               # Auto-populated API/vendor docs
```

## How It Works

1. Run `slopmachine my_app` — scaffolds everything, installs deps, inits git
2. Open the project and run `claude`
3. Describe what you want to build — the developer agent takes over
4. Claude auto-documents any external APIs in `.claude/context/`
5. When the app is ready, run the build-and-ship workflow
6. Run the marketing workflow for screenshots, videos, and store listings

## Requirements

- Node.js 18+
- Docker (for Supabase local)
- Xcode (for iOS simulator + screenshots)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (`brew install supabase/tap/supabase`)
- [EAS CLI](https://docs.expo.dev/eas/) (`npm install -g eas-cli`)
- [Claude Code](https://claude.com/claude-code)

## License

MIT
