-- User profiles linked to Supabase Auth
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'reader' check (role in ('reader', 'creator', 'admin')),
  created_at timestamptz not null default now(),

  primary key (id)
);

alter table public.profiles enable row level security;

grant select on public.profiles to anon;
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.profiles to service_role;

create policy "Users can view their own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function public.prevent_profile_role_change()
returns trigger
language plpgsql
as $$
begin
  if new.role is distinct from old.role then
    raise exception 'Role changes are not allowed';
  end if;
  return new;
end;
$$;

create trigger prevent_profile_role_change
  before update on public.profiles
  for each row
  execute function public.prevent_profile_role_change();

create policy "Users can insert their own profile"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    'reader'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
