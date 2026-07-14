-- Storage buckets for EverAfter
-- covers:    Book covers
-- pages:     Page illustrations
-- avatars:   User profile photos
-- previews:  Watermarked previews
-- uploads:   Creator assets (private)

insert into storage.buckets (id, name, public)
values
  ('covers', 'covers', true),
  ('pages', 'pages', true),
  ('avatars', 'avatars', true),
  ('previews', 'previews', true),
  ('uploads', 'uploads', false)
on conflict (id) do nothing;
