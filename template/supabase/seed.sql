-- Seed data for local development
-- Run with: supabase db reset (applies migrations then runs this file)

-- ============================================================
-- TEST USER — REQUIRED for App Store review
-- Apple reviewers sign in with this account.
-- Also created in production Supabase before review submission.
-- ============================================================
-- Email: appletester@flintblocks.io
-- Password: appletester
--
-- Supabase local dev auto-confirms email, so this user is
-- immediately usable after `supabase db reset`.
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data,
  aud, role
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'appletester@flintblocks.io',
  crypt('appletester', gen_salt('bf')),
  now(), now(), now(),
  '{"provider":"email","providers":["email"]}',
  '{"display_name":"Apple Tester"}',
  'authenticated', 'authenticated'
);

INSERT INTO auth.identities (
  id, user_id, provider_id, provider,
  identity_data, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'appletester@flintblocks.io', 'email',
  '{"sub":"00000000-0000-0000-0000-000000000001","email":"appletester@flintblocks.io"}',
  now(), now()
);

-- Add test data as your schema evolves

-- Example:
-- INSERT INTO public.profiles (id, username, display_name) VALUES
--   ('00000000-0000-0000-0000-000000000001', 'testuser', 'Test User');

-- CRM seed data (uncomment after running CRM migration)
-- INSERT INTO public.contacts (id, email, name, source, tags) VALUES
--   ('00000000-0000-0000-0000-000000000010', 'alice@example.com', 'Alice Test', 'organic', '{"early-adopter"}'),
--   ('00000000-0000-0000-0000-000000000011', 'bob@example.com', 'Bob Lead', 'referral', '{"beta"}'),
--   ('00000000-0000-0000-0000-000000000012', 'carol@example.com', 'Carol Paid', 'ad', '{"premium"}');

-- INSERT INTO public.deals (contact_id, title, value_cents, stage) VALUES
--   ('00000000-0000-0000-0000-000000000010', 'Free trial', 0, 'trial'),
--   ('00000000-0000-0000-0000-000000000012', 'Pro subscription', 999, 'active');

-- INSERT INTO public.interactions (contact_id, type, content) VALUES
--   ('00000000-0000-0000-0000-000000000010', 'event', 'Signed up via organic search'),
--   ('00000000-0000-0000-0000-000000000011', 'note', 'Referred by Alice, joined beta'),
--   ('00000000-0000-0000-0000-000000000012', 'purchase', 'Subscribed to Pro plan');
