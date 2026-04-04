import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const REVENUECAT_WEBHOOK_AUTH_KEY = Deno.env.get("REVENUECAT_WEBHOOK_AUTH_KEY");

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Verify authorization header from RevenueCat
  const authHeader = req.headers.get("authorization");
  if (REVENUECAT_WEBHOOK_AUTH_KEY && authHeader !== `Bearer ${REVENUECAT_WEBHOOK_AUTH_KEY}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    const body = await req.json();
    const event = body.event;

    // RevenueCat sends app_user_id as the Supabase user ID
    const appUserId = event.app_user_id;
    const eventType = event.type;

    // Map RevenueCat event types to subscription status
    // See: https://www.revenuecat.com/docs/integrations/webhooks/event-types-and-fields
    const activeEvents = [
      "INITIAL_PURCHASE",
      "RENEWAL",
      "PRODUCT_CHANGE",
      "UNCANCELLATION",
    ];
    const inactiveEvents = [
      "CANCELLATION",
      "EXPIRATION",
      "BILLING_ISSUE",
      "SUBSCRIPTION_PAUSED",
    ];

    let status: string;
    if (activeEvents.includes(eventType)) {
      status = "active";
    } else if (inactiveEvents.includes(eventType)) {
      status = "inactive";
    } else {
      // Non-subscription events (e.g., NON_RENEWING_PURCHASE, TRANSFER)
      // Log but don't update status
      console.log(`[revenuecat-webhook] Unhandled event type: ${eventType} for user ${appUserId}`);
      return new Response(JSON.stringify({ received: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Upsert subscription status
    const { error } = await supabase
      .from("subscription_status")
      .upsert(
        {
          user_id: appUserId,
          status,
          product_id: event.product_id,
          entitlement_id: event.entitlement_ids?.[0] ?? null,
          event_type: eventType,
          expires_at: event.expiration_at_ms
            ? new Date(event.expiration_at_ms).toISOString()
            : null,
          updated_at: new Date().toISOString(),
          raw_event: event,
        },
        { onConflict: "user_id" },
      );

    if (error) {
      console.error("[revenuecat-webhook] DB error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log(`[revenuecat-webhook] ${eventType} → ${status} for user ${appUserId}`);
    return new Response(JSON.stringify({ received: true, status }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[revenuecat-webhook] Error:", e);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
