-- Subscription status table — synced by RevenueCat webhook
create table if not exists subscription_status (
  user_id uuid primary key references auth.users(id) on delete cascade,
  status text not null default 'inactive' check (status in ('active', 'inactive')),
  product_id text,
  entitlement_id text,
  event_type text,
  expires_at timestamptz,
  updated_at timestamptz not null default now(),
  raw_event jsonb
);

-- RLS: users can only read their own subscription status
alter table subscription_status enable row level security;

create policy "Users can read own subscription"
  on subscription_status for select
  using (auth.uid() = user_id);

-- Service role (webhook) can upsert — no policy needed (bypasses RLS)

-- Index for quick lookups
create index if not exists idx_subscription_status_expires
  on subscription_status(expires_at)
  where status = 'active';
