# slopmachine

Scaffold a full mobile app project with Claude agent configs baked in. Go from idea to running app in minutes.

## Quick Start

### New project
```bash
npx github:syahrul12345/slopmachine my_new_app
```

The CLI will ask what you're building:
```
? What are you building? (select all that apply)
  ◉ Mobile app (Expo + React Native)
  ◉ Landing page (Next.js)
  ◯ CRM (Supabase admin dashboard)

? What features do you need?
  ◉ Auth (Apple + Google Sign-In)
  ◉ Payments (RevenueCat)
  ◯ Push notifications
  ◉ Analytics
```

Only the modules you select get generated — no unused rules cluttering your context.

### Existing project
Already have an app? Add slopmachine's Claude configs to it:
```bash
cd my-existing-app
npx github:syahrul12345/slopmachine init
```

Same interactive prompt — injects only the relevant Claude agent files without overwriting anything.

### Local install
```bash
git clone https://github.com/syahrul12345/slopmachine.git
cd slopmachine && npm install && npm link
slopmachine my_new_app       # new project
slopmachine init             # existing project
```

## Modules

### Products (pick what you're building)
| Module | What it generates |
|--------|-------------------|
| **Mobile app** | Expo + RN scaffold, `mobile.md` agent, `designer.md` agent, `build-and-ship.md` workflow |
| **Landing page** | Next.js in `landing/`, referral redirect handler, `landing.md` agent |
| **CRM** | Supabase CRM tables, admin dashboard, `crm.md` agent, `crm-setup.md` workflow |

### Features (pick what you need)
| Module | What it generates |
|--------|-------------------|
| **Auth** | Apple + Google Sign-In setup, `auth.md` agent, `lib/auth.tsx` |
| **Payments** | RevenueCat setup, `payments.md` agent, `lib/purchases.ts` |
| **Push notifications** | Expo Notifications + Supabase, `push.md` agent, `lib/notifications.ts` |
| **Analytics** | Provider-agnostic wrapper, `analytics.md` agent, `lib/analytics.ts` |

### Auto-dependencies
- CRM auto-enables Landing + Auth
- Payments auto-enables Mobile + Auth
- Push auto-enables Mobile

### Always included
- `marketing.md` agent — screenshots, ffmpeg videos, UGC scripts, store listings
- `designer.md` agent — UI design, design systems, app store assets
- `local-dev.md` workflow — Supabase local cluster, migrations, seed data
- `marketing-launch.md` workflow — full marketing pipeline
- `marketing/` directories — output for screenshots, videos, UGC

## Claude Agent Framework

Each module generates a focused `.md` agent file. Claude loads only what's relevant:

```
CLAUDE.md                          ← Dynamic router (generated based on your selections)
.claude/agents/
  mobile.md                        ← Expo + RN conventions, build commands
  landing.md                       ← Next.js landing page, referral redirects
  auth.md                          ← Apple + Google Sign-In setup
  crm.md                           ← Supabase CRM tables, admin dashboard
  payments.md                      ← RevenueCat setup, paywall, webhooks
  push.md                          ← Expo Notifications, push_tokens table
  analytics.md                     ← Provider-agnostic analytics wrapper
  designer.md                      ← UI design, app store assets
  marketing.md                     ← Screenshots, videos, UGC, store listings
.claude/workflows/
  local-dev.md                     ← Local Supabase + dev servers
  build-and-ship.md                ← Simulator test → screenshots → .ipa → TestFlight → review
  marketing-launch.md              ← Full marketing asset pipeline
  crm-setup.md                     ← CRM migration + dashboard setup
.claude/context/                   ← Auto-populated by Claude with external API docs
```

## How It Works

1. Run `slopmachine my_app` — select your modules, scaffolds everything
2. Open the project and run `claude`
3. Describe what you want to build — Claude loads the right agents automatically
4. Claude auto-documents any external APIs in `.claude/context/`
5. When ready, run workflows: build-and-ship, marketing-launch
6. Ship to TestFlight and App Store

## Requirements

- Node.js 18+
- Docker (for Supabase local)
- Xcode (for iOS simulator + screenshots)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (`brew install supabase/tap/supabase`)
- [EAS CLI](https://docs.expo.dev/eas/) (`npm install -g eas-cli`)
- [Claude Code](https://claude.com/claude-code)

## License

MIT
