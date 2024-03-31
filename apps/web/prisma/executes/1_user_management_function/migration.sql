/**
 * This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
 */
create or replace function
  public.handle_new_user () returns trigger as $$
  begin
    insert into public."User" (id, name, image, email)
    values (new.id::text, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'image', new.email);
    return new;
  end;
$$ language plpgsql security definer;

/**
 */
create or replace trigger
  on_auth_user_created
after
  insert on auth.users for each row
execute
  procedure public.handle_new_user ();
