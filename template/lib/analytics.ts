// Analytics wrapper — swap provider per project (PostHog, Mixpanel, etc.)
// Configure EXPO_PUBLIC_ANALYTICS_KEY in .env.local

type EventProperties = Record<string, string | number | boolean>;

let initialized = false;

export function initAnalytics() {
  if (initialized) return;
  // TODO: Initialize your analytics provider here
  // Example: posthog.init(process.env.EXPO_PUBLIC_ANALYTICS_KEY!)
  initialized = true;
}

export function track(event: string, properties?: EventProperties) {
  if (!initialized) return;
  // TODO: Send to your analytics provider
  console.log(`[analytics] ${event}`, properties);
}

export function identify(userId: string, traits?: EventProperties) {
  if (!initialized) return;
  // TODO: Identify user in your analytics provider
  console.log(`[analytics] identify ${userId}`, traits);
}

export function screen(name: string, properties?: EventProperties) {
  if (!initialized) return;
  // TODO: Track screen view
  console.log(`[analytics] screen ${name}`, properties);
}

// Core events to track from day one:
// - app_open
// - sign_up
// - sign_in
// - sign_out
// - purchase
// - screen_view
