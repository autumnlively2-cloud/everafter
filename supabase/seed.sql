insert into storage.buckets (id, name, public)
values
  ('covers', 'covers', true),
  ('pages', 'pages', true),
  ('avatars', 'avatars', true),
  ('previews', 'previews', true),
  ('uploads', 'uploads', false)
on conflict (id) do nothing;
