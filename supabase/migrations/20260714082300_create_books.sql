-- Books created by authors
create table public.books (
  id uuid not null default gen_random_uuid(),
  title text not null,
  description text,
  author_id uuid not null references auth.users on delete cascade,
  cover_url text,
  price numeric(10, 2) not null default 0,
  category text,
  published boolean not null default false,
  created_at timestamptz not null default now(),

  primary key (id)
);

create index books_author_id_idx on public.books (author_id);
create index books_published_idx on public.books (published);

alter table public.books enable row level security;

grant select on public.books to anon;
grant select, insert, update, delete on public.books to authenticated;
grant select, insert, update, delete on public.books to service_role;

create policy "Anyone can view published books"
  on public.books
  for select
  to anon, authenticated
  using (published = true);

create policy "Authors can view their own books"
  on public.books
  for select
  to authenticated
  using (auth.uid() = author_id);

create policy "Authors can create their own books"
  on public.books
  for insert
  to authenticated
  with check (auth.uid() = author_id);

create policy "Authors can update their own books"
  on public.books
  for update
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

create policy "Authors can delete their own books"
  on public.books
  for delete
  to authenticated
  using (auth.uid() = author_id);
