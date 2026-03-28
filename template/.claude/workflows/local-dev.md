# Local Development Workflow

Run this workflow to set up and start local development.

> **First time?** Run `.claude/workflows/provision-services.md` first to create your Supabase project, deploy to Vercel, and populate `.env.local` with real keys. This workflow is for local development after provisioning.

## Prerequisites
- Node.js 18+
- Supabase CLI (`brew install supabase/tap/supabase`)
- Expo CLI (`npm install -g expo-cli` or use `npx expo`)
- Docker (required by Supabase local)
- Xcode (for iOS simulator)

## Steps

### 1. Start Supabase Local Cluster
```bash
supabase start
```
This starts: Postgres (54322), API (54321), Studio (54323), Auth, Storage, Realtime, Edge Functions.

Copy the output env vars into `.env.local`:
```
EXPO_PUBLIC_SUPABASE_URL=http://localhost:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=<output-anon-key>
```

### 2. Run Migrations
```bash
supabase db push
```

### 3. Seed Test Data
```bash
supabase db reset
```
This runs all migrations + `supabase/seed.sql`.

### 4. Configure Auth Providers (First Time Only)
Open Supabase Studio at http://localhost:54323:
1. Auth → Providers → Enable Apple (add client ID, secret)
2. Auth → Providers → Enable Google (add client ID, secret)
Or configure in `supabase/config.toml` and restart.

### 5. Start Expo Dev Server
```bash
npx expo start
```

### 6. Start Landing Page (Optional)
```bash
cd landing && npm run dev
```

## During Development

### Schema Changes
1. Make changes via Supabase Studio (localhost:54323)
2. Generate migration: `supabase db diff -f <descriptive_name>`
3. Update `supabase/seed.sql` if needed
4. Test with reset: `supabase db reset`

### Adding External APIs
When integrating a new API/SDK:
1. Add to CLAUDE.md "External Dependencies" table
2. Create `.claude/context/<vendor>.md` with full API docs
3. Add env vars to `.env.template` and `.env.local`

### Stopping
```bash
supabase stop     # Stop Supabase
# Ctrl+C to stop Expo
```
