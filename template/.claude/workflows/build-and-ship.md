# Build & Ship Workflow

Module-aware deployment workflow. Check which modules are active in CLAUDE.md → "Active Modules" and run only the relevant sections.

---

## Section A: Database & Backend (if using Supabase)
**Applies to: mobile, auth, crm, push, ecommerce (with webhooks)**

### Pre-flight
- [ ] All migrations committed to `supabase/migrations/`
- [ ] `seed.sql` has representative test data
- [ ] Row Level Security enabled on all tables
- [ ] Production Supabase project created and configured
- [ ] Edge Functions deployed (if any)

### Deploy
```bash
supabase db reset          # Test clean migration run locally
supabase db push --linked  # Push to production Supabase
supabase functions deploy   # Deploy Edge Functions (if any)
```

### Verify
- [ ] Production database has correct schema
- [ ] RLS policies work (test with anon key)
- [ ] Auth providers configured in production Supabase dashboard

---

## Section B: Mobile App (if `mobile` is active)

### Pre-flight
- [ ] App runs on simulator without crashes
- [ ] All active features verified (see checklist below)
- [ ] Bundle ID set in `app.json`
- [ ] Production environment variables configured in EAS

### B1: Feature Verification
Run the app on iOS simulator and test every active module:

```bash
npx expo run:ios
```

**Core app:**
- [ ] App launches without crash
- [ ] Core functionality works end-to-end
- [ ] All screens render correctly
- [ ] Deep links work (`{{PROJECT_NAME}}://`)

**Auth (if active):**
- [ ] Sign in with Apple works
- [ ] Sign in with Google works
- [ ] Sign out works
- [ ] Auth state persists across app restart

**Push (if active):**
- [ ] Permission prompt appears
- [ ] Push token saved to database
- [ ] Test push received on device

**Payments (if active):**
- [ ] Paywall displays offerings correctly
- [ ] Test purchase completes in sandbox
- [ ] Subscription status updates correctly
- [ ] RevenueCat webhook → Supabase works

**Analytics (if active):**
- [ ] Core events fire: `app_open`, `sign_up`, `sign_in`, `purchase`, `screen_view`
- [ ] Events visible in analytics dashboard

**Ecommerce (if active):**
- [ ] Products load from Shopify
- [ ] Product detail displays correctly
- [ ] Cart works (add, remove, update quantity)
- [ ] Checkout opens Shopify checkout URL

**Test on multiple device sizes:**
```bash
xcrun simctl boot "iPhone 15 Pro Max"
xcrun simctl boot "iPhone 15"
xcrun simctl boot "iPhone SE (3rd generation)"
```

**STOP HERE if anything fails. Fix issues before proceeding.**

### B2: Capture Screenshots
```bash
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

**Pro tip:** Use Remotion to render stylized screenshots — device mockup + feature text + gradient background. See `.claude/workflows/marketing-launch.md`.

### B3: Build .ipa
```bash
# Production build (for App Store / TestFlight)
eas build --profile production --platform ios --local

# If local build fails, fall back to cloud
eas build --profile production --platform ios
```

### B4: Push to TestFlight
```bash
# If built locally
eas submit --platform ios --path ./build-*.ipa

# If built on EAS cloud
eas submit --platform ios
```

**TestFlight verification:**
- [ ] App installs from TestFlight
- [ ] All flows work on physical device
- [ ] No crashes in TestFlight logs

### B5: Submit for App Store Review

**⚠️ ASK DEVELOPER BEFORE PROCEEDING**

Verify review content is ready (all should be in `marketing/`):
- [ ] App icon uploaded (1024x1024)
- [ ] Screenshots uploaded for all required device sizes
- [ ] App preview video uploaded (optional but recommended)
- [ ] Title (max 30 chars) — from `marketing/store-listing/ios-listing.md`
- [ ] Subtitle (max 30 chars)
- [ ] Description
- [ ] Keywords (100 chars max)
- [ ] Category (primary + secondary)
- [ ] Privacy policy URL
- [ ] Support URL
- [ ] App Review notes (login credentials for reviewer if needed)

Submit via App Store Connect or:
```bash
eas submit --platform ios
```

---

## Section C: Landing Page (if `landing` is active)

### Pre-flight
- [ ] `cd landing && npm run build` succeeds with no errors
- [ ] All pages render correctly
- [ ] Meta tags / OG tags configured for SEO
- [ ] Analytics tracking works (if analytics module active)
- [ ] Responsive design verified (mobile, tablet, desktop)

**Auth (if active on landing):**
- [ ] Sign in / sign up works on web
- [ ] Auth redirect URLs configured for production domain

**CRM admin (if `crm` is active):**
- [ ] Admin routes protected (auth required)
- [ ] Contact, deal, interaction CRUD works
- [ ] Dashboard loads with real or seeded data
- [ ] RLS policies restrict admin-only access

**Ecommerce (if active on landing):**
- [ ] Product listing page loads from Shopify
- [ ] Product detail pages work
- [ ] Cart functionality works
- [ ] Checkout redirects to Shopify correctly
- [ ] Post-checkout redirect back to landing works

**Referral redirects (if mobile is also active):**
- [ ] `landing/app/r/[code]/route.ts` redirects to correct app store URL
- [ ] Deep link fallback works

### Deploy
```bash
cd landing
npm run build

# Deploy to Vercel
vercel --prod

# Or Netlify
netlify deploy --prod --dir=.next

# Or any hosting — the output is a standard Next.js build
```

### Post-deploy
- [ ] Production URL loads correctly
- [ ] SSL certificate active
- [ ] Custom domain configured (if applicable)
- [ ] Environment variables set in hosting provider
- [ ] Update App Store / Play Store URLs in landing page (if mobile is active)

---

## Section D: Ecommerce Store (if `ecommerce` is active)

### Pre-flight (Shopify)
- [ ] Products created in Shopify admin
- [ ] Shipping zones and rates configured
- [ ] Payment providers set up (Shopify Payments, Stripe, etc.)
- [ ] Storefront API access token is production-ready
- [ ] Webhook endpoints configured and verified

### Verify
- [ ] Products display correctly in app/landing
- [ ] Checkout flow completes end-to-end
- [ ] Order webhooks fire and sync to Supabase (if configured)
- [ ] Inventory updates reflect in app/landing

---

## Section E: Marketing Assets

Run after deployment (or in parallel with review submission):

1. **Store listing copy** — run marketing agent to generate `marketing/store-listing/`
2. **Demo video** — use Remotion pipeline (`.claude/workflows/marketing-launch.md`)
3. **UGC scripts** — run marketing agent to generate `marketing/ugc/`
4. **Social reels** — render via Remotion

All assets saved to `marketing/` — can be updated independently at any time.

---

## Quick Reference: Which Sections to Run

| Modules selected | Run sections |
|---|---|
| Mobile only | A → B → E |
| Landing only | C → E |
| Mobile + Landing | A → B → C → E |
| Landing + CRM | A → C → E |
| Landing + Ecommerce | C → D → E |
| Landing + CRM + Ecommerce | A → C → D → E |
| Mobile + Landing + CRM + Ecommerce | A → B → C → D → E |
| Mobile + Ecommerce | A → B → D → E |

---

## Post-Ship (all projects)
- [ ] Verify production deployment works end-to-end
- [ ] Monitor analytics dashboard for launch metrics
- [ ] Monitor crash reports (mobile) or error logs (web)
- [ ] Test from a fresh device / incognito browser
- [ ] Plan first update based on user feedback
