create table if not exists public.site_state (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_state enable row level security;

drop policy if exists "No public access to site_state" on public.site_state;
create policy "No public access to site_state"
  on public.site_state
  for all
  using (false)
  with check (false);
