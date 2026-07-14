-- Book reviews from readers
create table public.reviews (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  book_id uuid not null references public.books on delete cascade,
  rating integer not null check (rating >= 1 and rating <= 5),
  review text,

  primary key (id),
  unique (user_id, book_id)
);

create index reviews_book_id_idx on public.reviews (book_id);
create index reviews_user_id_idx on public.reviews (user_id);

alter table public.reviews enable row level security;

grant select on public.reviews to anon;
grant select, insert, update, delete on public.reviews to authenticated;
grant select, insert, update, delete on public.reviews to service_role;

create policy "Anyone can view reviews"
  on public.reviews
  for select
  to anon, authenticated
  using (true);

create policy "Users can create their own reviews"
  on public.reviews
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own reviews"
  on public.reviews
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own reviews"
  on public.reviews
  for delete
  to authenticated
  using (auth.uid() = user_id);
