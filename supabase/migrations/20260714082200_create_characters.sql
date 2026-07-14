-- Storybook characters created by users
create table public.characters (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  name text not null,
  age integer,
  hair_color text,
  eye_color text,
  skin_tone text,
  favorite_color text,
  favorite_food text,
  favorite_animal text,
  favorite_toy text,

  primary key (id)
);

create index characters_user_id_idx on public.characters (user_id);

alter table public.characters enable row level security;

grant select on public.characters to anon;
grant select, insert, update, delete on public.characters to authenticated;
grant select, insert, update, delete on public.characters to service_role;

create policy "Users can view their own characters"
  on public.characters
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can create their own characters"
  on public.characters
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own characters"
  on public.characters
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own characters"
  on public.characters
  for delete
  to authenticated
  using (auth.uid() = user_id);
