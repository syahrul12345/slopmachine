# Payments Agent

You are setting up in-app purchases and subscriptions via RevenueCat.

## Stack
- **Provider**: RevenueCat
- **SDK**: `react-native-purchases`
- **Client**: `lib/purchases.ts`

## RevenueCat Setup
1. Create RevenueCat project at app.revenuecat.com
2. Connect App Store Connect (iOS) and Google Play Console (Android)
3. Create entitlements (e.g., "premium", "pro")
4. Create offerings with products/packages
5. Add API keys to `.env.local`:
   ```
   EXPO_PUBLIC_REVENUECAT_IOS_KEY=appl_xxx
   EXPO_PUBLIC_REVENUECAT_ANDROID_KEY=goog_xxx
   ```

## `lib/purchases.ts` Wrapper
- `initPurchases()` — configure SDK with platform-specific key
- `getOfferings()` — fetch available products/packages
- `purchasePackage(pkg)` — trigger purchase flow
- `restorePurchases()` — restore previous purchases
- `checkEntitlement(id)` — check if user has active entitlement

## Paywall Implementation
- Create a paywall screen that displays offerings
- Show product name, price, description
- Handle purchase flow with loading/error states
- Check entitlements to gate premium features

## Webhook: RevenueCat → Supabase
Set up RevenueCat webhook to call a Supabase Edge Function:
1. Create Edge Function: `supabase/functions/revenuecat-webhook/index.ts`
2. Verify webhook signature
3. Update user's subscription status in database
4. RevenueCat webhook URL: `https://<project>.supabase.co/functions/v1/revenuecat-webhook`

## Credentials Required (ask developer early!)
- [ ] RevenueCat iOS API key
- [ ] RevenueCat Android API key
- [ ] App Store Connect setup (app, in-app purchases)

## Context File
Document RevenueCat config in `.claude/context/revenuecat.md`:
- API keys (reference, not values)
- Entitlement IDs
- Offering structure
- Webhook endpoint
