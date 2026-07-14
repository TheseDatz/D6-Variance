create table if not exists public.dice_rolls (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  roller_id uuid not null references auth.users(id) default auth.uid(),
  roller_username text not null check (roller_username ~ '^[a-z0-9_-]{1,32}$'),
  character_name text check (char_length(character_name) between 1 and 80),
  roll_label text check (char_length(roll_label) between 1 and 80),
  source_code integer not null check (source_code in (0, 1)),
  dice_count integer not null check (dice_count between 1 and 30),
  modifier integer not null check (modifier between -99 and 99),
  subtotal integer not null check (subtotal between 1 and 999),
  total integer not null check (total between -99 and 1098),
  wild_total integer not null check (wild_total between 1 and 999),
  wild_status_code integer not null check (wild_status_code in (0, 1, 2))
);

alter table public.dice_rolls add column if not exists roll_label text;
alter table public.dice_rolls add column if not exists character_name text;

alter table public.dice_rolls enable row level security;
revoke all on table public.dice_rolls from anon, authenticated;
grant insert on table public.dice_rolls to authenticated;
grant select (id, created_at, roller_username, character_name, roll_label, source_code, dice_count, modifier, subtotal, total, wild_total, wild_status_code)
on table public.dice_rolls to authenticated;

drop policy if exists "Allow authenticated dice roll inserts" on public.dice_rolls;
create policy "Allow authenticated dice roll inserts" on public.dice_rolls
for insert to authenticated
with check (
  roller_id = auth.uid()
  and roller_username = left(
    regexp_replace(lower(regexp_replace(auth.jwt() ->> 'email', '@dead-empire\.local$', '')), '[^a-z0-9_-]', '_', 'g'),
    32
  )
);

drop policy if exists "Allow authenticated dice roll reads" on public.dice_rolls;
create policy "Allow authenticated dice roll reads" on public.dice_rolls
for select to authenticated using (true);

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'dice_rolls'
  ) then
    alter publication supabase_realtime add table public.dice_rolls;
  end if;
end $$;
