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

Then ensure the project can build cleanly before writing any feature code.

## Project Bootstrap — MUST DO FIRST
Before writing any feature code, verify the bare Expo project compiles:

```bash
# 1. Install required peer dependencies (commonly missing in SDK 52)
npx expo install expo-asset expo-font expo-constants expo-file-system

# 2. Verify the project builds on iOS simulator
npx expo run:ios

# 3. If using native modules (RevenueCat, push, etc.), you NEED a dev client
npx expo install expo-dev-client
```

**STOP and fix if this fails.** Do NOT pile on features if the base build is broken.

## Config Plugins — CRITICAL RULES
The `plugins` array in `app.json` / `app.config.js` only accepts packages that **export a valid Expo config plugin**. Not every React Native package has one.

**Rules:**
1. **NEVER** add a package to `plugins` unless you have verified it exports a config plugin
2. If a package needs native config (e.g., entitlements, Info.plist keys), check if it has a **separate** Expo plugin package (e.g., `@revenuecat/purchases-expo-plugin` for `react-native-purchases`)
3. When in doubt, check the package's README or Expo docs for config plugin instructions
4. Common packages that do NOT have their own config plugin: `react-native-purchases` (use `@revenuecat/purchases-expo-plugin` instead)
5. Common packages that DO have a config plugin: `expo-notifications`, `expo-camera`, `expo-location`, `expo-apple-authentication`

## Package Installation
**Always use `npx expo install` instead of `npm install` for React Native packages.** This ensures version compatibility with the current Expo SDK.

```bash
# CORRECT
npx expo install react-native-purchases expo-notifications

# WRONG — may install incompatible versions
npm install react-native-purchases expo-notifications
```

## Local Development
```bash
supabase start          # Start local Supabase
npx expo start          # Start Expo dev server (Expo Go)
npx expo start --dev-client  # Start with dev client (for native modules)
npx expo run:ios        # Build and run on iOS simulator
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

## Common Build Errors & Fixes

### "Package X does not contain a valid config plugin"
Remove the package from `plugins` in `app.json`. Check if a separate Expo plugin package exists.

### "Unexpected token 'typeof'" / ESM syntax errors
Version mismatch. Fix: `npx expo install <package>` to get the SDK-compatible version.

### Missing `expo-asset` / `expo-font`
```bash
npx expo install expo-asset expo-font
```
These are implicit dependencies in SDK 52 that sometimes aren't auto-installed.

### Xcode build fails with signing errors
```bash
# Clean Xcode build cache
cd ios && rm -rf build Pods && pod install && cd ..
# Or clean full rebuild
npx expo prebuild --clean
npx expo run:ios
```

## Design — Use Google Stitch MCP
Mobile UI is hard to design without visual feedback. Before building screens, check if the **Google Stitch MCP** is available (try calling `get_screen_image`). If it's not installed, tell the developer:
> "Install Google Stitch MCP for visual design references: `claude mcp add stitch -- npx google-stitch-mcp proxy`"

Use Stitch to generate screen mockups as HTML/CSS, then translate to React Native. See `designer.md` for the full workflow.

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
