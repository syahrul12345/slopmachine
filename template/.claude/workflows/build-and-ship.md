# Build & Ship Workflow

Sequential workflow from dev complete → App Store review.

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

---

## Step 1: Verify Migrations
```bash
supabase db reset          # Test clean migration run locally
supabase db push --linked  # Push to production Supabase
```

## Step 2: Update Production Environment
- Set production env vars in EAS secrets or `eas.json`
- Verify Supabase production URL and keys
- Verify RevenueCat production API keys
- Verify analytics production API key

## Step 3: Test on Simulator
Run the app on iOS simulator and walk through every flow:

```bash
npx expo run:ios
```

### Test checklist
- [ ] App launches without crash
- [ ] Sign in with Apple works
- [ ] Sign in with Google works
- [ ] Core app functionality works end-to-end
- [ ] Push notification permission prompt appears
- [ ] Paywall displays offerings correctly
- [ ] Test purchase completes in sandbox
- [ ] Analytics events fire (check console logs or dashboard)
- [ ] Deep links work (`{{PROJECT_NAME}}://`)
- [ ] All screens render correctly on different device sizes

Boot multiple simulators to test on different screens:
```bash
xcrun simctl boot "iPhone 15 Pro Max"
xcrun simctl boot "iPhone 15"
xcrun simctl boot "iPhone SE (3rd generation)"
```

**STOP HERE if anything fails. Fix issues before proceeding.**

## Step 4: Capture Screenshots & Marketing Content
Once the app is verified on simulator, capture everything needed for App Store review and marketing.

### Screenshots for App Store
```bash
# Capture on all required device sizes
xcrun simctl io "iPhone 15 Pro Max" screenshot marketing/screenshots/iphone-6.7/screen-1.png
xcrun simctl io "iPhone 15" screenshot marketing/screenshots/iphone-6.1/screen-1.png
xcrun simctl io "iPhone SE (3rd generation)" screenshot marketing/screenshots/iphone-5.5/screen-1.png
```

Capture these screens (navigate to each in the simulator first):
1. **Hero shot** — main screen showing core value
2. **Key feature #1** — most compelling feature
3. **Key feature #2** — second most compelling feature
4. **Key feature #3** — third feature or social proof
5. **Paywall/premium** — if applicable

See `.claude/agents/marketing.md` for exact dimensions.

### Demo video
```bash
xcrun simctl io booted recordVideo marketing/videos/raw/demo-raw.mp4
# Walk through key flows, Ctrl+C to stop
```

Process with ffmpeg — see `.claude/workflows/marketing-launch.md` for full commands.

### UGC scripts
Run the marketing agent to generate UGC scripts in `marketing/ugc/`.

### App Store listing copy
Run the marketing agent to generate:
- `marketing/store-listing/ios-listing.md` (title, subtitle, description, keywords)
- `marketing/store-listing/android-listing.md`

**All review content is saved in `marketing/` — you can resume submission anytime.**

## Step 5: Build .ipa Locally
```bash
# Development build (for testing on device)
eas build --profile development --platform ios --local

# Production build (for App Store / TestFlight)
eas build --profile production --platform ios --local
```

The `--local` flag builds on your machine instead of EAS servers. Output is an `.ipa` file.

If local build fails, fall back to cloud build:
```bash
eas build --profile production --platform ios
```

## Step 6: Push to TestFlight
```bash
# If built locally, submit the .ipa
eas submit --platform ios --path ./build-*.ipa

# If built on EAS cloud, just submit
eas submit --platform ios
```

### TestFlight verification
- [ ] App installs from TestFlight
- [ ] All flows work on physical device
- [ ] Auth works (Apple + Google)
- [ ] Push notifications received
- [ ] In-app purchases work in sandbox
- [ ] No crashes in TestFlight logs

## Step 7: Submit for App Store Review

**⚠️ ASK DEVELOPER BEFORE PROCEEDING** — Confirm ready to submit. All review content should already be saved from Step 4 in `marketing/store-listing/`. This step can be run independently at any time.

### App Store Review Content Checklist
Verify these are ready (all should be in `marketing/`):
- [ ] App icon uploaded (1024x1024)
- [ ] Screenshots uploaded for all required device sizes
- [ ] App preview video uploaded (optional but recommended)
- [ ] Title (max 30 chars) — from `marketing/store-listing/ios-listing.md`
- [ ] Subtitle (max 30 chars) — from `marketing/store-listing/ios-listing.md`
- [ ] Description — from `marketing/store-listing/ios-listing.md`
- [ ] Keywords (100 chars max) — from `marketing/store-listing/ios-listing.md`
- [ ] Category (primary + secondary)
- [ ] Privacy policy URL
- [ ] Support URL
- [ ] App Review notes (login credentials for reviewer if needed)

### Submit
1. Go to App Store Connect
2. Select your app → prepare new version
3. Upload screenshots and metadata from `marketing/store-listing/ios-listing.md`
4. Fill in review information
5. Submit for review

Or via CLI:
```bash
eas submit --platform ios
```

**Note:** Steps 4-7 can be re-run independently. Marketing content persists in `marketing/` and can be updated without rebuilding.

## Step 8: Landing Page Deployment
```bash
cd landing
npm run build
# Deploy to Vercel, Netlify, or your hosting
```
- Update store URLs in `landing/app/r/[code]/route.ts` with real App Store / Play Store links
- Verify referral deep links work

## Post-Ship
- [ ] Verify app installs from App Store (once approved)
- [ ] Verify referral links redirect correctly
- [ ] Monitor analytics dashboard for launch metrics
- [ ] Monitor crash reports
- [ ] Plan first update based on user feedback
