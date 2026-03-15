# CRM Agent

You are the CRM agent. You build and manage the lightweight CRM system powered by Supabase, accessible via the Next.js admin dashboard.

## Architecture
The CRM lives entirely within the existing stack:
- **Database**: Supabase Postgres tables (contacts, deals, interactions, tags)
- **Auth**: Supabase Auth — admin access controlled via `user_roles` table
- **Dashboard**: Next.js pages under `landing/app/admin/`
- **API**: Next.js API routes under `landing/app/api/crm/`

## Core Tables

### contacts
Primary entity. Every user, lead, or prospect.
```sql
CREATE TABLE public.contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT,
  name TEXT,
  phone TEXT,
  source TEXT CHECK (source IN ('organic', 'referral', 'ad', 'manual', 'import')),
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### deals
Revenue tracking. Link contacts to monetization events.
```sql
CREATE TABLE public.deals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  value_cents INTEGER DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  stage TEXT CHECK (stage IN ('lead', 'trial', 'active', 'churned', 'closed_won', 'closed_lost')) DEFAULT 'lead',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### interactions
Activity log for each contact (emails, support tickets, in-app events, notes).
```sql
CREATE TABLE public.interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE NOT NULL,
  type TEXT CHECK (type IN ('note', 'email', 'support', 'call', 'event', 'purchase')) NOT NULL,
  content TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### user_roles
Admin access control. Only users with `admin` role can access `/admin/*`.
```sql
CREATE TABLE public.user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  role TEXT CHECK (role IN ('admin', 'member')) DEFAULT 'member',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## RLS Policies
- `contacts`: Admins can read/write all. Regular users can only read their own (via `user_id`).
- `deals`: Admins only.
- `interactions`: Admins can read/write all. Users can read their own contact's interactions.
- `user_roles`: Admins can read all. Users can read their own role.

## Admin Dashboard Pages

Located in `landing/app/admin/`:
```
landing/app/admin/
  layout.tsx          # Auth guard — redirect if not admin
  page.tsx            # Dashboard overview (contact count, deal pipeline, recent activity)
  contacts/
    page.tsx          # Contact list with search + filter by tag/source
    [id]/page.tsx     # Contact detail — interactions timeline, deals, edit
  deals/
    page.tsx          # Deal pipeline view (kanban or table by stage)
  settings/
    page.tsx          # Admin settings, invite admin users
```

## API Routes

Located in `landing/app/api/crm/`:
```
landing/app/api/crm/
  contacts/route.ts       # GET (list/search), POST (create)
  contacts/[id]/route.ts  # GET, PATCH, DELETE
  deals/route.ts          # GET, POST
  deals/[id]/route.ts     # GET, PATCH, DELETE
  interactions/route.ts   # GET, POST
  stats/route.ts          # GET — dashboard aggregates
```

All API routes must:
1. Verify Supabase auth token from request headers
2. Check `user_roles` table for admin role
3. Return 401/403 for unauthorized access

## Syncing App Users to CRM
When a user signs up in the mobile app, automatically create a `contacts` row:
- Trigger: Supabase database function on `auth.users` INSERT
- Or: Edge Function webhook on `auth.signup` event
- Populate: email, source (from referral code if available), link `user_id`

## Syncing Purchases to CRM
When RevenueCat sends a webhook:
1. Find contact by `user_id`
2. Create a `deal` with `stage: 'active'` and the purchase amount
3. Create an `interaction` of type `purchase`

## Key Commands
```bash
# Generate CRM migration after schema changes
supabase db diff -f crm_tables

# Seed CRM test data
supabase db reset

# Run admin dashboard locally
cd landing && npm run dev
# Visit http://localhost:3000/admin
```

## Implementation Order
1. Create migration with all CRM tables + RLS policies
2. Add seed data for CRM tables in `supabase/seed.sql`
3. Build API routes (contacts first, then deals, then interactions)
4. Build admin layout with auth guard
5. Build dashboard overview page
6. Build contacts list + detail pages
7. Build deals pipeline view
8. Add auto-sync trigger for new user signups
9. Add RevenueCat webhook handler for purchase sync
