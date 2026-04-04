# Auth Agent

You are setting up authentication via Supabase Auth. **All mobile apps MUST support three auth methods: Apple Sign-In, Google Sign-In, and Email/Password.**

## Stack
- **Provider**: Supabase Auth
- **Methods**: Apple Sign-In, Google Sign-In, Email/Password (all three mandatory for mobile)
- **Client**: `lib/auth.tsx` (Auth context + provider)
- **Supabase client**: `lib/supabase.ts`

## Auth Methods — ALL THREE REQUIRED
Every mobile app ships with:
1. **Apple Sign-In** — required by App Store for apps with third-party login
2. **Google Sign-In** — covers Android + users who prefer Google
3. **Email/Password** — required for App Store review (reviewer uses test account)

**Do NOT skip email/password.** Apple reviewers need a test login that works without an Apple ID or Google account.

## Test User (seeded automatically)
A test user is seeded in local dev via `supabase/seed.sql`:
- **Email**: `appletester@flintblocks.io`
- **Password**: `appletester`

This user is created on `supabase db reset`. For **production**, you must manually create this user in the Supabase dashboard (Authentication → Users → Add User) before App Store review submission.

**App Store Review notes must include:**
```
Test Account:
Email: appletester@flintblocks.io
Password: appletester
```

## Auth Context (`lib/auth.tsx`)
- Provides `AuthProvider` wrapping the app
- Exposes: `user`, `session`, `signInWithApple()`, `signInWithGoogle()`, `signInWithEmail()`, `signUpWithEmail()`, `signOut()`
- Listens to `onAuthStateChange` for session updates
- Handles token refresh automatically

## Installation
```bash
# Use expo install for SDK-compatible versions — NEVER use npm install
npx expo install expo-apple-authentication expo-auth-session expo-web-browser expo-crypto
```

## Apple Sign-In Setup
1. Enable in Apple Developer Console → App ID → Sign In with Apple
2. Create Service ID for web (landing page) login if landing is active
3. Configure Supabase → Auth → Providers → Apple
4. Add to `app.json` plugins: `"expo-apple-authentication"`
5. `app.json` → `ios.usesAppleSignIn: true`

## Google Sign-In Setup
1. Create OAuth 2.0 credentials in Google Cloud Console (iOS + Web client IDs)
2. Configure Supabase → Auth → Providers → Google
3. Already installed above: `expo-auth-session` + `expo-web-browser`
4. Set redirect URLs in both Google Console and Supabase

## Email/Password Setup
Email/password is enabled by default in Supabase Auth — no external provider config needed.

For local dev:
- `config.toml` already has `enable_signup = true`
- Email confirmation is disabled locally (auto-confirms)
- Test user is seeded automatically on `supabase db reset`

For production:
- Enable email provider in Supabase Dashboard → Auth → Providers → Email
- Configure email templates (confirm signup, reset password, magic link)
- Create the test user manually: Dashboard → Authentication → Users → Add User

## Supabase Auth Config
- Enable Apple, Google, and Email providers in `supabase/config.toml` for local dev
- Redirect URLs: `exp://localhost:8081` (local), `{{PROJECT_NAME}}://` (production)
- Email confirmation disabled locally for faster iteration

## Login Screen Requirements
The login screen MUST have all three options visible:
1. "Sign in with Apple" button (native Apple button style)
2. "Sign in with Google" button
3. Email + password form with "Sign In" and "Sign Up" toggle
4. "Forgot Password?" link (sends reset email via Supabase)

Layout recommendation:
```
┌─────────────────────────┐
│                         │
│    [App Logo / Name]    │
│                         │
│  ┌───────────────────┐  │
│  │  Sign in with Apple  │
│  └───────────────────┘  │
│  ┌───────────────────┐  │
│  │ Sign in with Google  │
│  └───────────────────┘  │
│                         │
│  ─── or continue with ──│
│                         │
│  Email: [____________]  │
│  Password: [_________]  │
│  [Sign In]              │
│  Forgot password?       │
│  Don't have an account? │
│  Sign Up                │
│                         │
└─────────────────────────┘
```

## Credentials Required (ask developer early!)
> Run `.claude/workflows/provision-services.md` to auto-provision Google Cloud and guide Apple setup.

- [ ] Apple Team ID
- [ ] Apple Developer account email
- [ ] Google iOS Client ID
- [ ] Google Web Client ID

## Auth Setup Checklist
- [ ] Apple Sign-In configured (Apple Developer Console + Supabase + app.json)
- [ ] Google Sign-In configured (Google Cloud Console + Supabase + app)
- [ ] Email/Password enabled (default in Supabase — verify in dashboard)
- [ ] Test user created in production Supabase (appletester@flintblocks.io / appletester)
- [ ] `lib/auth.tsx` provider wraps the app in `_layout.tsx`
- [ ] Login screen has all three auth methods
- [ ] Sign-out working
- [ ] Session persistence across app restarts
- [ ] Forgot password flow works
- [ ] App Store Review notes include test credentials
