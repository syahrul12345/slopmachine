# Auth Agent

You are setting up authentication via Supabase Auth with Apple + Google Sign-In.

## Stack
- **Provider**: Supabase Auth
- **Methods**: Apple Sign-In, Google Sign-In
- **Client**: `lib/auth.tsx` (Auth context + provider)
- **Supabase client**: `lib/supabase.ts`

## Auth Context (`lib/auth.tsx`)
- Provides `AuthProvider` wrapping the app
- Exposes: `user`, `session`, `signInWithApple()`, `signInWithGoogle()`, `signOut()`
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

## Supabase Auth Config
- Enable Apple and Google providers in `supabase/config.toml` for local dev
- Redirect URLs: `exp://localhost:8081` (local), `{{PROJECT_NAME}}://` (production)

## Credentials Required (ask developer early!)
- [ ] Apple Team ID
- [ ] Apple Developer account email
- [ ] Google iOS Client ID
- [ ] Google Web Client ID

## Auth Setup Checklist
- [ ] Apple Sign-In configured (Apple Developer Console + Supabase + app.json)
- [ ] Google Sign-In configured (Google Cloud Console + Supabase + app)
- [ ] `lib/auth.tsx` provider wraps the app in `_layout.tsx`
- [ ] Login screen built with both sign-in buttons
- [ ] Sign-out working
- [ ] Session persistence across app restarts
