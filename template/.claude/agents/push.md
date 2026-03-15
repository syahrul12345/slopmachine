# Push Notifications Agent

You are setting up push notifications via Expo Notifications + Supabase.

## Stack
- **SDK**: `expo-notifications`
- **Token storage**: Supabase `push_tokens` table
- **Sending**: Expo Push API or Supabase Edge Function
- **Client**: `lib/notifications.ts`

## Database Table
```sql
CREATE TABLE public.push_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  token TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('ios', 'android')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, platform)
);
ALTER TABLE public.push_tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own tokens" ON public.push_tokens
  FOR ALL USING (auth.uid() = user_id);
```

Add this to a migration: `supabase migration new push_tokens`

## `lib/notifications.ts` Wrapper
- `registerForPushNotifications()` — request permission, get token, save to Supabase
- `handleNotificationReceived(notification)` — foreground handler
- `handleNotificationResponse(response)` — tap handler (navigate to relevant screen)
- `savePushToken(token, platform)` — upsert to `push_tokens` table

## Setup Steps
1. Add `expo-notifications` to dependencies
2. Configure `app.json`:
   ```json
   {
     "expo": {
       "plugins": ["expo-notifications"],
       "ios": {
         "infoPlist": {
           "UIBackgroundModes": ["remote-notification"]
         }
       }
     }
   }
   ```
3. Request permission on app launch (after sign-in)
4. Save push token to Supabase
5. Set up notification handlers in root `_layout.tsx`

## Sending Notifications
Option A — Expo Push API (simpler):
```bash
curl -X POST https://exp.host/--/api/v2/push/send \
  -H "Content-Type: application/json" \
  -d '{"to":"ExponentPushToken[xxx]","title":"Hello","body":"World"}'
```

Option B — Supabase Edge Function (more control):
- Create `supabase/functions/send-push/index.ts`
- Query `push_tokens` table for target users
- Call Expo Push API from the function

## Testing
- Push notifications require a physical device (simulator won't receive them)
- Use Expo Go for testing during development
- Test both foreground and background notification handling
