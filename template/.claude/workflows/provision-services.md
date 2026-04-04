# Provision Services Workflow

Auto-provision external services for this project. Module-aware — check CLAUDE.md → "Active Modules" and run only the relevant sections.

**Prerequisites**: CLIs must be installed and authenticated on this machine (one-time setup). See Pre-flight below.

**State tracking**: This workflow is idempotent. Progress is saved to `.claude/context/provision-state.json`. Re-running skips completed services.

---

## Pre-flight: Verify Tools & Auth

Check which CLIs are available and authenticated. Only require CLIs for active modules.

```bash
# Always needed
which supabase && supabase projects list 2>&1 | head -3

# If landing is active
which vercel && vercel whoami

# If auth is active (Google OAuth)
which gcloud && gcloud auth list --filter=status:ACTIVE --format="value(account)" 2>&1 | head -1

# If mobile is active
which eas && eas whoami
```

**If a required CLI is missing**, tell the developer:
- `supabase`: `brew install supabase/tap/supabase && supabase login`
- `vercel`: `npm i -g vercel && vercel login`
- `gcloud`: Install from https://cloud.google.com/sdk/docs/install then `gcloud auth login`
- `eas`: `npm i -g eas-cli && eas login`

**If a CLI is installed but not authenticated**, run the login command. This opens a browser — the developer must complete it manually. After login, all subsequent commands are non-interactive.

**Initialize state file** if it doesn't exist:
Create `.claude/context/provision-state.json`:
```json
{
  "version": 1,
  "services": {}
}
```

Before running each section, check the state file. Skip services with `"status": "provisioned"` or `"status": "manual_complete"`. Offer to retry services with `"status": "failed"`.

---

## Section D: Apple Developer (MANUAL — run first, blocks EAS)
**Applies to: `mobile` or `auth` active**

Apple Developer has no CLI. Open the portal and guide the developer through setup.

### D1: Create App ID
```bash
open "https://developer.apple.com/account/resources/identifiers/list"
```

Guide the developer:
1. Click **"+" → Register a new identifier → App IDs → App**
2. Description: use the project name
3. Bundle ID: use **Explicit** and enter the bundle ID from `app.json` → `ios.bundleIdentifier`
4. Under Capabilities, enable **Sign In with Apple**
5. Click **Continue → Register**

### D2: Create Service ID (if `landing` is also active — for web Apple Sign-In)
1. Click **"+" → Register a new identifier → Services IDs**
2. Description: `<project-name> Web Login`
3. Identifier: `com.yourcompany.<project-name>.web`
4. Enable **Sign In with Apple** → Configure:
   - Primary App ID: select the App ID from D1
   - Website URLs → Domains: your production domain
   - Return URLs: `https://<supabase-project>.supabase.co/auth/v1/callback`
5. Click **Continue → Register**

### D3: Capture credentials
Ask the developer for:
- **Apple Team ID** (visible at top right of developer portal)
- **Bundle ID** (should match `app.json`)

Write Team ID to state file:
```json
{ "apple_developer": { "status": "manual_complete", "teamId": "<id>" } }
```

---

## Section C: Google Cloud (SEMI-AUTO)
**Applies to: `auth` active**

### C1: Create GCP project (auto)
```bash
# Generate a unique project ID
PROJECT_ID="<project-name>-$(date +%s | tail -c 7)"

gcloud projects create "$PROJECT_ID" --name="<project-name>"
gcloud config set project "$PROJECT_ID"
```

If project creation fails (ID taken), retry with a different suffix.

### C2: Enable APIs (auto)
```bash
gcloud services enable people.googleapis.com
gcloud services enable iamcredentials.googleapis.com
```

### C3: OAuth consent screen (manual)
```bash
open "https://console.cloud.google.com/apis/credentials/consent?project=$PROJECT_ID"
```

Guide the developer:
1. Select **External** user type → Create
2. App name: project name
3. User support email: developer's email
4. Authorized domains: add your production domain (if known)
5. Developer contact email: developer's email
6. Click **Save and Continue** through remaining steps

### C4: Create OAuth Client IDs (manual)
```bash
open "https://console.cloud.google.com/apis/credentials?project=$PROJECT_ID"
```

Guide the developer to create **two** OAuth Client IDs:

**iOS Client ID:**
1. Click **"+ CREATE CREDENTIALS" → OAuth Client ID**
2. Application type: **iOS**
3. Bundle ID: enter bundle ID from `app.json`
4. Click **Create** → copy the **Client ID**

**Web Client ID:**
1. Click **"+ CREATE CREDENTIALS" → OAuth Client ID**
2. Application type: **Web application**
3. Name: `<project-name> Web`
4. Authorized redirect URIs: `https://<supabase-project>.supabase.co/auth/v1/callback`
5. Click **Create** → copy the **Client ID** and **Client Secret**

### C5: Capture credentials
Ask the developer to paste:
- iOS Client ID
- Web Client ID
- Web Client Secret

Write to `.env.local`:
```
GOOGLE_IOS_CLIENT_ID=<ios-client-id>
GOOGLE_WEB_CLIENT_ID=<web-client-id>
GOOGLE_WEB_CLIENT_SECRET=<web-client-secret>
```

Update state file:
```json
{ "google_cloud": { "status": "provisioned", "projectId": "<PROJECT_ID>" } }
```

---

## Section A: Supabase (FULLY AUTO)
**Applies to: `mobile`, `auth`, `crm`, or `push` active**

### A1: Get organization
```bash
supabase orgs list
```
If multiple orgs, ask the developer which one to use. Capture the org ID.

### A2: Create project
```bash
supabase projects create "<project-name>" --org-id "<org-id>" --region us-east-1
```

The output contains the project ref. Capture it. The project takes ~60 seconds to provision.

**Ask the developer for a database password**, or generate one:
```bash
openssl rand -base64 24
```

### A3: Wait and link
Wait for the project to be ready, then link:
```bash
supabase link --project-ref "<project-ref>"
```
If link fails with "project not ready", wait 15 seconds and retry (up to 4 times).

### A4: Push migrations
```bash
supabase db push
```
This pushes all files in `supabase/migrations/` to the remote project.

### A5: Deploy edge functions (if any exist)
```bash
# Check if functions directory has files
ls supabase/functions/*/index.ts 2>/dev/null && supabase functions deploy
```

### A6: Configure auth providers (if Section C completed)
If Google Client IDs were captured in Section C, configure them in Supabase.
Open the Supabase dashboard auth provider settings:
```bash
open "https://supabase.com/dashboard/project/<project-ref>/auth/providers"
```
Guide: Enable Google provider → paste Web Client ID and Web Client Secret.

If Apple credentials were captured in Section D, also enable Apple provider.

### A7: Capture keys
```bash
supabase status
```
Parse the output for:
- `API URL` → `EXPO_PUBLIC_SUPABASE_URL`
- `anon key` → `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- `service_role key` → `SUPABASE_SERVICE_ROLE_KEY`

Write to `.env.local` (do NOT echo the actual key values in terminal output).

Update state file:
```json
{ "supabase": { "status": "provisioned", "projectRef": "<ref>", "region": "us-east-1", "url": "<url>" } }
```

---

## Section E: RevenueCat (MANUAL + AUTO verification)
**Applies to: `payments` active**

### E1: Open dashboard
```bash
open "https://app.revenuecat.com"
```

Guide the developer through these steps (must be done in the RevenueCat web dashboard):

1. **Create a new project** matching the app name
2. **Platform setup → iOS:**
   - Connect App Store Connect (requires App Store Connect API Key)
   - Guide: `open "https://appstoreconnect.apple.com/access/integrations/api"` → Generate API Key with "App Manager" role → Download `.p8` file → Upload to RevenueCat
   - Enter the Bundle ID from `app.json` → `ios.bundleIdentifier`
3. **Platform setup → Android** (if applicable):
   - Connect Google Play Console with service account JSON
4. **Entitlements:** Create at least one (e.g., `premium`)
   - Ask the developer what entitlement IDs to use
5. **Offerings:** Create a default offering with at least one package
   - The package must reference an App Store / Play Store product ID
   - If products don't exist yet in App Store Connect, note this for later
6. **API Keys:** Go to Project Settings → API Keys → Copy the **public** API keys

### E2: Capture and validate credentials
Ask the developer to paste the API keys.

**Validate format before writing:**
```bash
# iOS key must start with appl_
if [[ "$IOS_KEY" != appl_* ]]; then
  echo "ERROR: iOS API key must start with 'appl_'. Got: $IOS_KEY"
  echo "Go to RevenueCat → Project Settings → API Keys → copy the PUBLIC iOS key"
  exit 1
fi

# Android key must start with goog_ (if provided)
if [[ -n "$ANDROID_KEY" && "$ANDROID_KEY" != goog_* ]]; then
  echo "ERROR: Android API key must start with 'goog_'. Got: $ANDROID_KEY"
  exit 1
fi
```

Write validated keys to `.env.local` (do NOT echo key values in terminal):
```bash
# Write keys to .env.local (replace existing if present)
sed -i '' "s|^EXPO_PUBLIC_REVENUECAT_IOS_KEY=.*|EXPO_PUBLIC_REVENUECAT_IOS_KEY=$IOS_KEY|" .env.local
sed -i '' "s|^EXPO_PUBLIC_REVENUECAT_ANDROID_KEY=.*|EXPO_PUBLIC_REVENUECAT_ANDROID_KEY=$ANDROID_KEY|" .env.local
```

### E3: Deploy webhook and set secrets (AUTO)
**Requires Section A (Supabase) to be completed first.**

```bash
# Push the subscription_status migration
supabase db push

# Deploy the webhook Edge Function
supabase functions deploy revenuecat-webhook

# Generate and set webhook auth secret
WEBHOOK_SECRET=$(openssl rand -hex 32)
supabase secrets set REVENUECAT_WEBHOOK_AUTH_KEY="$WEBHOOK_SECRET"
```

Tell the developer to configure the webhook in RevenueCat:
```bash
open "https://app.revenuecat.com"
```
1. Go to Project Settings → Webhooks
2. URL: `https://<supabase-project-ref>.supabase.co/functions/v1/revenuecat-webhook`
3. Authorization header: `Bearer <the WEBHOOK_SECRET generated above>`

### E4: Capture entitlement IDs and write context file
Ask the developer what entitlement IDs they created (e.g., `premium`, `pro`).

Create `.claude/context/revenuecat.md`:
```markdown
# RevenueCat Configuration

## Entitlements
- `premium` — full access to all features

## Offerings
- Default offering with monthly/yearly packages

## Webhook
- Endpoint: `https://<project-ref>.supabase.co/functions/v1/revenuecat-webhook`
- Auth: Bearer token (stored as REVENUECAT_WEBHOOK_AUTH_KEY secret)

## App Store Products
- TBD (developer must create in App Store Connect)
```

### E5: Add keys to EAS secrets (if Section F will run)
```bash
eas secret:create --name EXPO_PUBLIC_REVENUECAT_IOS_KEY --value "$IOS_KEY" --scope project --force
if [[ -n "$ANDROID_KEY" ]]; then
  eas secret:create --name EXPO_PUBLIC_REVENUECAT_ANDROID_KEY --value "$ANDROID_KEY" --scope project --force
fi
```

### E6: Update state
```json
{
  "revenuecat": {
    "status": "manual_complete",
    "entitlements": ["premium"],
    "webhookDeployed": true,
    "easSecretsSet": true
  }
}
```

---

## Section B: Vercel (FULLY AUTO)
**Applies to: `landing` active**

### B1: Link project
```bash
cd landing && vercel link --yes
```
If the project doesn't exist on Vercel yet, this creates it.

### B2: Set environment variables
For each production env var the landing page needs:
```bash
echo "<supabase-url>" | vercel env add NEXT_PUBLIC_SUPABASE_URL production
echo "<supabase-anon-key>" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
```

If auth is active and Google Client IDs are available:
```bash
echo "<google-web-client-id>" | vercel env add NEXT_PUBLIC_GOOGLE_CLIENT_ID production
```

### B3: Deploy
```bash
cd landing && vercel --prod --yes
```

Capture the production URL from the output.

### B4: Update state
```json
{ "vercel": { "status": "provisioned", "url": "<production-url>" } }
```

---

## Section F: EAS / Expo (FULLY AUTO)
**Applies to: `mobile` active**

### F1: Initialize EAS
```bash
eas init
```
This links the project to an EAS project and writes the project ID to `app.json` → `extra.eas.projectId`.

### F2: Update eas.json with Apple credentials
If Apple Team ID was captured in Section D, update `eas.json`:
- Set `submit.production.ios.appleTeamId` to the Team ID

### F3: Set EAS secrets
```bash
eas secret:create --name EXPO_PUBLIC_SUPABASE_URL --value "<supabase-url>" --scope project --force
eas secret:create --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "<supabase-anon-key>" --scope project --force
```

Add any other captured env vars as EAS secrets.

### F4: Update state
```json
{ "eas": { "status": "provisioned" } }
```

---

## Section G: Env Assembly (ALWAYS)

Final consolidation step.

### G1: Generate .env.production
Create `.env.production` with all production values captured during provisioning. This file is for reference — actual deployment env vars are set in Vercel (landing) and EAS (mobile).

### G2: Update CLAUDE.md
Replace TBD fields in CLAUDE.md with real values:
- `Supabase project: TBD` → `Supabase project: <project-ref> (<region>)`
- `Bundle ID: TBD` → actual bundle ID
- Add any new entries to the External Dependencies table

### G3: Update .claude/context/ docs
Create or update vendor context files with provisioned details:
- `.claude/context/supabase.md` — project URL, ref, region
- `.claude/context/revenuecat.md` — entitlement IDs, offering structure (if payments active)
- `.claude/context/shopify.md` — store domain (if ecommerce active)

### G4: Print summary
Output a table showing the status of each service:

```
Service          Status              Details
─────────────────────────────────────────────────
Supabase         ✅ Provisioned      <project-ref> (us-east-1)
Vercel           ✅ Provisioned      <url>
Google Cloud     ✅ Provisioned      <project-id>
Apple Developer  ✅ Manual complete  Team ID: <id>
RevenueCat       ⏳ Not started      Run this workflow again after setup
EAS              ✅ Provisioned      <project-id>
```

---

## Quick Reference: Which Sections to Run

| Modules selected | Run sections |
|---|---|
| Landing only | Pre-flight → B → G |
| Mobile only | Pre-flight → D → A → F → G |
| Mobile + Landing | Pre-flight → D → A → B → F → G |
| Mobile + Auth | Pre-flight → D → C → A → F → G |
| Mobile + Landing + Auth | Pre-flight → D → C → A → B → F → G |
| Mobile + Landing + Auth + Payments | Pre-flight → D → C → A → E → B → F → G |
| Landing + CRM | Pre-flight → A → B → G |
| Landing + Auth | Pre-flight → C → A → B → G |

**Section order matters**: Manual sections (D, E) first → semi-auto (C) → auto sections that consume their outputs (A, B, F) → assembly (G).

---

## Re-running This Workflow

- **Skip completed**: Services with `"provisioned"` or `"manual_complete"` status are skipped
- **Retry failed**: Services with `"failed"` status are offered for retry
- **Force re-provision**: Delete the relevant entry from `provision-state.json` to re-run a section
- **New modules added**: If new modules are activated after initial provisioning, re-run — only the new sections will execute
