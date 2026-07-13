-- Allow signed-out visitors to view the public character roster and sheets.
-- Background remains in character_data and is hidden only by the application UI.

grant select on table public."d6v-characters" to anon, authenticated;

drop policy if exists "Authenticated users can view characters" on public."d6v-characters";
drop policy if exists "Anyone can view characters" on public."d6v-characters";
create policy "Anyone can view characters"
  on public."d6v-characters"
  for select
  to anon, authenticated
  using (true);
