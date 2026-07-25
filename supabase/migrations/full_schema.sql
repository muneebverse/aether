-- ============================================================================
-- AETHER — Full database schema reference
-- ============================================================================
-- Reconstructed from every admin form/action/query in the codebase (I don't
-- have direct access to your live Supabase instance, so this is inferred from
-- the app code, not introspected from the DB itself). Uses
-- `create table if not exists`, so it's safe to run even if some of these
-- tables already exist — it won't overwrite or drop anything.
--
-- Run in: Supabase Dashboard → SQL Editor → New query → paste → Run.
-- Run once, top to bottom (order matters — services/posts must exist before
-- pricing_tiers, which references services).
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1. SERVICES
-- Used by: /admin/services (CRUD), public /services, referenced by pricing_tiers
-- ----------------------------------------------------------------------------
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  price_range text,
  category text,                 -- 'academic' | 'career' | 'restaurant' (free text, not enforced)
  status text not null default 'active',   -- 'active' | 'inactive'
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

alter table services enable row level security;

create policy "Public can read services" on services
  for select using (true);

create policy "Authenticated can manage services" on services
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- ----------------------------------------------------------------------------
-- 2. PRICING TIERS
-- Used by: /admin/pricing (CRUD), public /pricing, /services (deep-links here)
-- ----------------------------------------------------------------------------
create table if not exists pricing_tiers (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references services(id) on delete set null,
  name text not null,
  price_pkr integer not null default 0,
  badge text,
  features text[] not null default '{}',
  is_bundle boolean not null default false,
  bundle_includes text,
  status text not null default 'active',   -- 'active' | 'unavailable'
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

alter table pricing_tiers enable row level security;

create policy "Public can read pricing_tiers" on pricing_tiers
  for select using (true);

create policy "Authenticated can manage pricing_tiers" on pricing_tiers
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create index if not exists pricing_tiers_service_id_idx on pricing_tiers(service_id);


-- ----------------------------------------------------------------------------
-- 3. POSTS (Blog)
-- Used by: /admin/posts (CRUD), public /blog and /blog/[slug]
-- ----------------------------------------------------------------------------
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,                  -- HTML/rich text, rendered via dangerouslySetInnerHTML
  cover_image_url text,
  meta_title text,
  meta_description text,
  status text not null default 'draft',    -- 'draft' | 'published'
  published_at timestamptz,      -- set automatically when status becomes 'published'
  created_at timestamptz not null default now()
);

alter table posts enable row level security;

create policy "Public can read posts" on posts
  for select using (true);

create policy "Authenticated can manage posts" on posts
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- ----------------------------------------------------------------------------
-- 4. PORTFOLIO PROJECTS
-- Used by: /admin/portfolio (CRUD), public /portfolio
-- ----------------------------------------------------------------------------
create table if not exists portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  tech_tags text[] not null default '{}',
  image_url text,
  project_url text,
  category text not null default 'other',  -- 'robotics' | 'automation' | 'other'
  status text not null default 'active',   -- 'active' | 'draft'
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

alter table portfolio_projects enable row level security;

create policy "Public can read portfolio_projects" on portfolio_projects
  for select using (true);

create policy "Authenticated can manage portfolio_projects" on portfolio_projects
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- ----------------------------------------------------------------------------
-- 5. SERVICE SAMPLES (Restaurant Websites showcase)
-- Used by: /admin/restaurant-samples (CRUD, always writes category='restaurant'),
-- public /restaurant-websites
-- ----------------------------------------------------------------------------
create table if not exists service_samples (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text,
  live_url text,
  caption text,
  category text not null default 'restaurant',
  status text not null default 'showcase', -- 'showcase' | 'active' | 'sold'
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

alter table service_samples enable row level security;

create policy "Public can read service_samples" on service_samples
  for select using (true);

create policy "Authenticated can manage service_samples" on service_samples
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- ----------------------------------------------------------------------------
-- 6. RESOURCES
-- Used by: /admin/resources (CRUD), public /resources
-- ----------------------------------------------------------------------------
create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  drive_link text not null,
  resource_type text not null default 'course_link', -- 'course_link' | 'guide' | 'template'
  category text,                 -- optional free-text grouping label
  status text not null default 'active',   -- 'active' | 'inactive'
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

alter table resources enable row level security;

create policy "Public can read resources" on resources
  for select using (true);

create policy "Authenticated can manage resources" on resources
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- ----------------------------------------------------------------------------
-- 7. LEADS
-- Used by: /api/leads (public form submission, anon insert via service-role
-- client), /admin/leads (CRUD read/update), /api/track (public order lookup)
-- ----------------------------------------------------------------------------
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  order_id text not null unique,          -- short human-friendly code, e.g. shown to the client for tracking
  name text not null,
  email text not null,
  whatsapp text not null,
  service_interested text not null,
  instructions text,
  desired_date date,
  is_urgent boolean not null default false,
  file_urls text[] not null default '{}', -- storage paths in the 'lead-attachments' bucket
  status text not null default 'received', -- 'received' | 'in_progress' | 'completed'
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table leads enable row level security;

-- No public SELECT policy — leads contain client PII (email, WhatsApp,
-- instructions). The public-facing insert (/api/leads) and the tracking
-- lookup (/api/track) both use the service-role client (lib/supabase-admin.ts),
-- which bypasses RLS entirely, so no anon policy is needed for either to work.
create policy "Authenticated can manage leads" on leads
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- ============================================================================
-- STORAGE BUCKET — not created by SQL, needs one manual step:
-- Supabase Dashboard → Storage → New bucket → name it exactly "lead-attachments"
-- → keep it Private (not public) since these are client-uploaded files
-- referenced only through the admin dashboard.
-- ============================================================================
