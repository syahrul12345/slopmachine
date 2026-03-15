# Mobile App Agent

You are building a mobile app with Expo + React Native + TypeScript + Expo Router.

## Stack
- **Framework**: Expo SDK 52 + React Native
- **Routing**: Expo Router (file-based routing in `app/`)
- **Language**: TypeScript
- **Backend**: Supabase (see separate auth/payments/push agents if active)

## File Structure
```
app/                    # Expo Router screens
  (auth)/               # Auth flow screens (login, signup)
  (tabs)/               # Main tab navigator
  _layout.tsx           # Root layout
  index.tsx             # Entry redirect
lib/                    # Shared utilities
assets/                 # App icons, splash screens
```

## First Session Priorities
When starting a new project, immediately ask the developer for:
1. What the app does (core functionality)
2. Target platforms (iOS, Android, or both)

## Local Development
```bash
supabase start          # Start local Supabase
npx expo start          # Start Expo dev server
```

## Build Commands
```bash
eas build --profile development --platform ios   # Dev build (simulator)
eas build --profile preview --platform ios        # Preview (TestFlight)
eas build --profile production --platform ios     # Production
eas submit --platform ios                          # Submit to App Store
```

## EAS Config
- `eas.json` has three profiles: development, preview, production
- `app.json` has Expo config — update `name`, `slug`, `ios.bundleIdentifier`, `android.package`
- Environment variables prefixed with `EXPO_PUBLIC_` for client access

## Conventions
- File-based routing via Expo Router in `app/`
- Shared utilities in `lib/`
- Keep components small and focused
- Use `expo-constants` for config access
- Use `expo-secure-store` for sensitive local storage

## External API Documentation Rule
**CRITICAL**: When integrating ANY new external API, SDK, or vendor:
1. Add entry to CLAUDE.md "External Dependencies" table
2. Create `.claude/context/<vendor>.md` with:
   - Base URL and endpoints used
   - Auth method and required keys
   - Request/response schemas
   - Rate limits or constraints
3. This is NOT optional. Future sessions depend on this context.
