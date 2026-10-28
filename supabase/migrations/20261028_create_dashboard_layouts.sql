create table public.dashboard_layouts (
  user_id uuid primary key references auth.users (id) on delete cascade,
  layout jsonb not null,
  version integer not null default 1,
  updated_at timestamptz not null default now()
);

alter table public.dashboard_layouts enable row level security;
