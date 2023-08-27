-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique not null,
  email text unique not null,
  avatar_url text,
  queue text[],
  watched text[],
  favorites text[],
  adult boolean not null default false,
  country text,
  updated_at timestamp with time zone default current_timestamp,
  created_at timestamp with time zone default current_timestamp

  constraint username_length check (char_length(username) >= 3)
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

create policy "Users can delete own profiles." on profiles
  for delete using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, username)
  values (new.id, new.email, new.raw_user_meta_data->>'username');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create extension if not exists moddatetime schema extensions;
-- this trigger will set the "updated_at" column to the current timestamp for every update
create trigger handle_updated_at before update on profiles
  for each row execute procedure moddatetime (updated_at);

-- not sure if this works...
create or replace function delete_user()
  returns void
LANGUAGE SQL SECURITY DEFINER as $$
   delete from auth.users where id = auth.uid();
$$;

-- add item to which_col provided, check if show_id exists before adding
CREATE OR REPLACE FUNCTION add_item(show_id text, profile_id uuid, which_col text)
RETURNS SETOF profiles AS
$$
DECLARE
    dynamic_query text;
    existing_show_id text;
BEGIN
    IF show_id NOT LIKE 'tv-%' AND show_id NOT LIKE 'movie-%' THEN
        RAISE EXCEPTION 'Invalid show_id prefix';
    END IF;

    EXECUTE format('SELECT unnest(%I) FROM profiles WHERE id = %L', which_col, profile_id)
    INTO existing_show_id;

    IF existing_show_id = show_id THEN
        RAISE NOTICE 'show_id already exists in %', which_col;
    ELSE
        EXECUTE format('
            UPDATE profiles
            SET %I = array_append(%I, %L)
            WHERE id = %L', which_col, which_col, show_id, profile_id);
    END IF;

    RETURN QUERY SELECT * FROM profiles WHERE id = profile_id;
END;
$$
LANGUAGE plpgsql;