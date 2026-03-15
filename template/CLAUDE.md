# {{PROJECT_NAME}}

## Project
<!-- Claude: fill this in as the project takes shape -->
- App name: TBD
- Bundle ID: TBD
- Description: TBD
- Supabase project: TBD

## Stack
- Mobile: Expo + React Native + TypeScript + Expo Router
- Backend: Supabase (Auth, DB, Storage, Edge Functions, Realtime)
- Landing + CRM Admin: Next.js (in `landing/` directory)
- CRM: Supabase tables + Next.js admin dashboard (`landing/app/admin/`)
- Payments: RevenueCat
- Analytics: TBD (PostHog/Mixpanel/etc — implement via `lib/analytics.ts` wrapper)

## Agent Routing
By default, you are the **developer agent**. Load `.claude/agents/developer.md` for full context.

Route to other agents based on the task:
- **Design tasks** (UI review, design specs, app store assets): load `.claude/agents/designer.md`
- **Marketing tasks** (screenshots, videos, UGC, app store listing): load `.claude/agents/marketing.md`
- **CRM tasks** (contacts, deals, admin dashboard, user sync): load `.claude/agents/crm.md`
- **Multi-step workflows**: see `.claude/workflows/`

## External Dependencies
<!-- CRITICAL RULE: When integrating ANY external API, SDK, or vendor service:
1. Add an entry below (name, purpose, auth method)
2. Create a context file at .claude/context/<vendor-name>.md with:
   - Base URL / endpoints used
   - Authentication method and required keys
   - Request/response schemas for endpoints you call
   - Rate limits or usage constraints
3. This ensures all future Claude sessions have full context.
   DO NOT skip this step. -->

| Vendor | Purpose | Auth | Context File |
|--------|---------|------|-------------|
| Supabase | Backend (DB, Auth, Storage) | Anon key + Service role key | built-in |
| RevenueCat | In-app purchases | API key per platform | `.claude/context/revenuecat.md` |

## Auth Setup Checklist
- [ ] Apple Sign-In configured (Apple Developer Console + Supabase + app.json)
- [ ] Google Sign-In configured (Google Cloud Console + Supabase + app)
- [ ] Apple Team ID: TBD
- [ ] Google iOS Client ID: TBD
- [ ] Google Web Client ID: TBD

## Required Credentials (ask developer early!)
- [ ] Apple Team ID
- [ ] Apple Developer account email
- [ ] Google Cloud OAuth Client IDs (iOS + Web)
- [ ] RevenueCat API keys (iOS + Android)
- [ ] Analytics API key
- [ ] Supabase project URL + keys (for production)

## Conventions
<!-- Updated as patterns emerge during development -->
- File-based routing via Expo Router in `app/`
- Shared utilities in `lib/`
- Supabase migrations in `supabase/migrations/` (use `supabase db diff -f <name>`)
- Seed data in `supabase/seed.sql` — keep updated as schema evolves
- Environment variables prefixed with `EXPO_PUBLIC_` for client access
- External API docs stored in `.claude/context/<vendor>.md`
