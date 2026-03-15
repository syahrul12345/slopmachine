# CRM Setup Workflow

Set up the Supabase-powered CRM with admin dashboard.

## Prerequisites
- Supabase local cluster running (`supabase start`)
- Landing page dependencies installed (`cd landing && npm install`)

## Steps

### 1. Create CRM Migration
Generate the migration for CRM tables:
```bash
# Create migration file manually or via diff after using Studio
supabase migration new crm_tables
```

Add the following tables to the migration:
- `contacts` (with RLS)
- `deals` (with RLS)
- `interactions` (with RLS)
- `user_roles` (with RLS)
- Auto-sync trigger: function + trigger on `auth.users` INSERT → creates contact row

See `.claude/agents/crm.md` for full schemas.

### 2. Update Seed Data
Add CRM test data to `supabase/seed.sql`:
- Sample contacts (various sources)
- Sample deals (across pipeline stages)
- Sample interactions
- At least one admin user role

### 3. Apply & Verify
```bash
supabase db reset   # Apply migrations + seed
```
Check tables in Studio at http://localhost:54323.

### 4. Install Admin Dashboard Dependencies
```bash
cd landing && npm install @supabase/supabase-js @supabase/ssr
```

### 5. Build API Routes
Create API routes in order:
1. `landing/app/api/crm/contacts/route.ts` — list + create
2. `landing/app/api/crm/contacts/[id]/route.ts` — get + update + delete
3. `landing/app/api/crm/deals/route.ts`
4. `landing/app/api/crm/deals/[id]/route.ts`
5. `landing/app/api/crm/interactions/route.ts`
6. `landing/app/api/crm/stats/route.ts`

### 6. Build Admin Dashboard
1. `landing/app/admin/layout.tsx` — auth guard (check admin role)
2. `landing/app/admin/page.tsx` — overview dashboard
3. `landing/app/admin/contacts/page.tsx` — contact list
4. `landing/app/admin/contacts/[id]/page.tsx` — contact detail
5. `landing/app/admin/deals/page.tsx` — deal pipeline

### 7. Wire Up Syncs
1. Verify the auto-sync trigger creates contacts on signup
2. Add RevenueCat webhook endpoint if purchases are set up

### 8. Test
1. Sign up a new user in the mobile app → verify contact appears in CRM
2. Check admin dashboard at http://localhost:3000/admin
3. Create/edit/delete contacts via dashboard
4. Verify RLS: non-admin users cannot access admin routes

## Done When
- [ ] CRM tables created with RLS
- [ ] Seed data includes CRM test data
- [ ] API routes work for contacts, deals, interactions
- [ ] Admin dashboard accessible with auth guard
- [ ] Auto-sync creates contacts on user signup
