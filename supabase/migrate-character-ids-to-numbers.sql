-- Replace mutable name-based text IDs with permanent generated numeric IDs.
-- The former text ID is retained as legacy_id for reference.

begin;

create sequence if not exists public."d6v-characters_id_seq";

alter table public."d6v-characters"
  add column numeric_id bigint;

alter table public."d6v-characters"
  alter column numeric_id set default nextval('public."d6v-characters_id_seq"'::regclass);

update public."d6v-characters"
set numeric_id = nextval('public."d6v-characters_id_seq"'::regclass)
where numeric_id is null;

alter table public."d6v-characters"
  alter column numeric_id set not null;

alter table public."d6v-characters"
  drop constraint "d6v-characters_pkey";

alter table public."d6v-characters"
  rename column id to legacy_id;

alter table public."d6v-characters"
  alter column legacy_id drop not null;

alter table public."d6v-characters"
  rename column numeric_id to id;

alter table public."d6v-characters"
  add constraint "d6v-characters_pkey" primary key (id);

create unique index if not exists "d6v-characters_legacy_id_key"
  on public."d6v-characters" (legacy_id);

alter sequence public."d6v-characters_id_seq"
  owned by public."d6v-characters".id;

select setval(
  'public."d6v-characters_id_seq"'::regclass,
  greatest(coalesce((select max(id) from public."d6v-characters"), 1), 1),
  true
);

commit;
