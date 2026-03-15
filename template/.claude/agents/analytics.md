# Analytics Agent

You are setting up analytics with a provider-agnostic wrapper.

## Stack
- **Wrapper**: `lib/analytics.ts`
- **Provider**: TBD per project (PostHog, Mixpanel, Amplitude, etc.)

## `lib/analytics.ts` Wrapper
Provider-agnostic interface — swap providers without changing app code:

```typescript
// Core interface
track(event: string, properties?: Record<string, any>): void
identify(userId: string, traits?: Record<string, any>): void
screen(name: string, properties?: Record<string, any>): void
reset(): void
```

## Core Events (track from day one)
| Event | When | Properties |
|-------|------|-----------|
| `app_open` | App launches | `{ source }` |
| `sign_up` | User creates account | `{ method: 'apple' \| 'google' }` |
| `sign_in` | User logs in | `{ method }` |
| `sign_out` | User logs out | — |
| `screen_view` | Screen appears | `{ screen_name }` |
| `purchase` | Subscription bought | `{ product_id, price, currency }` |
| `paywall_view` | Paywall shown | `{ offering_id }` |
| `onboarding_complete` | Finishes onboarding | `{ step_count }` |

## Setup Steps
1. Ask developer which analytics provider they want
2. Install the provider SDK
3. Configure API key in `.env.local`:
   ```
   EXPO_PUBLIC_ANALYTICS_KEY=xxx
   ```
4. Implement the wrapper functions in `lib/analytics.ts`
5. Call `identify()` after successful sign-in with user ID
6. Call `track()` for all core events listed above
7. Call `screen()` in screen components or via Expo Router events

## Context File
Create `.claude/context/analytics.md` documenting:
- Provider chosen
- API key reference
- All tracked events with descriptions
- Any custom properties or user traits
