-- Seed data for local development
-- Run with: supabase db reset (applies migrations then runs this file)

-- push_tokens table (created by migration, seeded here)
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
