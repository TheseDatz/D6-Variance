-- Apply to an existing D6V database. Existing unowned characters remain admin-only.

alter table public."d6v-characters"
  add column if not exists owner_id uuid references auth.users(id) on delete set null default auth.uid();

grant select, update, delete on table public."d6v-characters" to authenticated;

drop policy if exists "Authenticated users can update characters" on public."d6v-characters";
drop policy if exists "Owners and admins can update characters" on public."d6v-characters";
create policy "Owners and admins can update characters"
  on public."d6v-characters"
  for update
  to authenticated
  using (
    owner_id = (select auth.uid())
    or (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
  with check (
    owner_id = (select auth.uid())
    or (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

drop policy if exists "Owners and admins can delete characters" on public."d6v-characters";
create policy "Owners and admins can delete characters"
  on public."d6v-characters"
  for delete
  to authenticated
  using (
    owner_id = (select auth.uid())
    or (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );
