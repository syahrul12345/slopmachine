# Build & Ship Workflow

Sequential workflow for building and shipping the app to TestFlight / App Store.

## Pre-flight Checklist

### Auth
- [ ] Apple Sign-In configured (Apple Developer + Supabase + app.json)
- [ ] Google Sign-In configured (Google Cloud + Supabase + app)
- [ ] Auth tested on physical device

### Push Notifications
- [ ] `expo-notifications` configured
- [ ] `push_tokens` table exists in database
- [ ] Push sending mechanism (Edge Function or Expo Push API) implemented
- [ ] Tested on physical device

### Payments
- [ ] RevenueCat API keys configured
- [ ] Products/offerings created in RevenueCat dashboard
- [ ] Paywall screen implemented
- [ ] Subscription webhook → Supabase Edge Function set up
- [ ] Test purchases verified in sandbox

### Analytics
- [ ] Analytics provider configured in `lib/analytics.ts`
- [ ] Core events tracked: `app_open`, `sign_up`, `sign_in`, `purchase`, `screen_view`
- [ ] Events verified in analytics dashboard

### Database
- [ ] All migrations committed to `supabase/migrations/`
- [ ] `seed.sql` has representative test data
- [ ] Row Level Security enabled on all tables
- [ ] Production Supabase project created and configured

## Build Steps

### 1. Verify Migrations
```bash
supabase db reset          # Test clean migration run
supabase db push --linked  # Push to production Supabase
```

### 2. Update Production Environment
- Set production env vars in EAS secrets or `eas.json`
- Verify Supabase production URL and keys
- Verify RevenueCat production API keys
- Verify analytics production API key

### 3. Build for TestFlight
```bash
eas build --profile preview --platform ios
```

### 4. Submit to TestFlight
```bash
eas submit --platform ios
```

### 5. Capture Screenshots
After the build is on TestFlight and verified:
- Run the marketing agent's screenshot workflow
- Capture on all required device sizes
- See `.claude/agents/marketing.md` for dimensions

### 6. Prepare App Store Submission
- Run the marketing agent for store listing copy
- Upload screenshots to App Store Connect
- Fill in app metadata (description, keywords, category)
- Submit for review

### 7. Landing Page Deployment
```bash
cd landing
npm run build
# Deploy to Vercel, Netlify, or your hosting
```
- Update store URLs in referral redirect handler
- Verify referral deep links work

## Post-Ship
- [ ] Verify app installs from TestFlight
- [ ] Verify auth flows on physical device
- [ ] Verify push notifications received
- [ ] Verify in-app purchases work in sandbox
- [ ] Verify analytics events appearing in dashboard
- [ ] Verify referral links redirect correctly
