-- Book purchase orders
create table public.orders (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  book_id uuid not null references public.books on delete restrict,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'cancelled')),
  total numeric(10, 2) not null,
  created_at timestamptz not null default now(),

  primary key (id)
);

create index orders_user_id_idx on public.orders (user_id);
create index orders_book_id_idx on public.orders (book_id);
create index orders_status_idx on public.orders (status);

alter table public.orders enable row level security;

grant select, insert on public.orders to authenticated;
grant select, insert, update, delete on public.orders to service_role;

create policy "Users can view their own orders"
  on public.orders
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can create their own orders"
  on public.orders
  for insert
  to authenticated
  with check (auth.uid() = user_id);
