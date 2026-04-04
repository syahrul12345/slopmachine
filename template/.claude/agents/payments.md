# Payments Agent

You are setting up in-app purchases and subscriptions via RevenueCat.

## Stack
- **Provider**: RevenueCat
- **SDK**: `react-native-purchases` (v9+) — uses React Native autolinking, NO Expo config plugin needed
- **Dev Client**: `expo-dev-client` (already in `package.json` — required for native modules)
- **Client Wrapper**: `lib/purchases.ts`
- **Paywall Screen**: `app/paywall.tsx`
- **Webhook**: `supabase/functions/revenuecat-webhook/index.ts`
- **Database**: `supabase/migrations/00000000000001_subscription_status.sql`

## What's Already Scaffolded (DO NOT recreate)
These files exist and are ready to use:
1. `lib/purchases.ts` — `initPurchases()`, `getOfferings()`, `purchasePackage()`, `restorePurchases()`, `checkEntitlement()`, `getCustomerInfo()`
2. `app/paywall.tsx` — complete paywall screen with offerings display, purchase flow, restore, loading/error states
3. `supabase/functions/revenuecat-webhook/index.ts` — webhook handler that upserts to `subscription_status` table
4. `supabase/migrations/00000000000001_subscription_status.sql` — subscription status table with RLS
5. `react-native-purchases` + `expo-dev-client` in `package.json`
6. `EXPO_PUBLIC_REVENUECAT_IOS_KEY` and `EXPO_PUBLIC_REVENUECAT_ANDROID_KEY` in `.env.local`

## Native Module Rules — CRITICAL
- `react-native-purchases` uses **React Native autolinking** — it does NOT have an Expo config plugin.
- **NEVER** add `react-native-purchases` to the `plugins` array in `app.json`. It will crash `expo prebuild`.
- No `@revenuecat/purchases-expo-plugin` exists on npm — this package is a phantom from old docs.
- The SDK links automatically via `.podspec` (iOS) and `build.gradle` (Android) during `expo prebuild`.
- **Always** use `npx expo install` (not `npm install`) for any additional React Native packages.
- **Always** use `expo-dev-client` — RevenueCat native modules cannot run in Expo Go.

## Post-Scaffold Setup (AI-automatable steps)

### Step 1: Verify native build works
```bash
# After npm install, rebuild with native modules
npx expo prebuild --clean
npx expo run:ios
```
If this fails, check that `@revenuecat/purchases-expo-plugin` is in `app.json` plugins and `expo-dev-client` is installed.

### Step 2: Deploy webhook
```bash
# After Supabase is linked (via provision-services workflow)
supabase db push                    # Push subscription_status migration
supabase functions deploy revenuecat-webhook  # Deploy webhook function
```

### Step 3: Set webhook auth secret (optional but recommended)
```bash
# Generate a secret for webhook auth
WEBHOOK_SECRET=$(openssl rand -hex 32)
supabase secrets set REVENUECAT_WEBHOOK_AUTH_KEY="$WEBHOOK_SECRET"
echo "Set this as Authorization header in RevenueCat webhook config: Bearer $WEBHOOK_SECRET"
```

### Step 4: Wire up entitlement gating in the app
```typescript
// Example: gate a premium feature
import { checkEntitlement } from '../lib/purchases';

const isPremium = await checkEntitlement('premium');
if (!isPremium) {
  router.push('/paywall');
}
```

## Manual Steps (REQUIRE DEVELOPER — cannot be automated)

These are tracked by the provision-services workflow (Section E):

1. **Create RevenueCat project** at app.revenuecat.com
2. **Connect App Store Connect** (requires App Store Connect API Key)
   - Developer creates at: https://appstoreconnect.apple.com/access/integrations/api
3. **Create entitlements** (e.g., `premium`, `pro`)
4. **Create offerings** with products/packages mapped to App Store products
5. **Copy API keys** to `.env.local`:
   - iOS key format: `appl_xxxxxxxxxxxxx`
   - Android key format: `goog_xxxxxxxxxxxxx`
6. **Configure webhook URL** in RevenueCat dashboard:
   - URL: `https://<project-ref>.supabase.co/functions/v1/revenuecat-webhook`
   - Authorization: `Bearer <REVENUECAT_WEBHOOK_AUTH_KEY>` (from Step 3 above)

## Verification Checklist
After setup, verify end-to-end:
```bash
# 1. Verify offerings load (run app, navigate to paywall)
# 2. Test sandbox purchase (use Apple sandbox tester account)
# 3. Verify webhook fires (check Supabase function logs)
supabase functions logs revenuecat-webhook --project-ref <ref>
# 4. Verify subscription_status table updated
# 5. Verify checkEntitlement() returns true after purchase
```

## Env Vars Required
| Variable | Format | Set By |
|----------|--------|--------|
| `EXPO_PUBLIC_REVENUECAT_IOS_KEY` | `appl_xxx` | Developer (from RevenueCat dashboard) |
| `EXPO_PUBLIC_REVENUECAT_ANDROID_KEY` | `goog_xxx` | Developer (from RevenueCat dashboard) |
| `REVENUECAT_WEBHOOK_AUTH_KEY` | hex string | Auto-generated (Step 3) |

## Context File
After setup, document RevenueCat config in `.claude/context/revenuecat.md`:
- Entitlement IDs (e.g., `premium`)
- Offering structure (e.g., monthly, yearly packages)
- Webhook endpoint URL
- App Store product IDs mapped to RevenueCat
