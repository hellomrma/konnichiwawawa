-- Konnichiwawawa database schema
-- Tables: profiles, units, lessons, exercises, user_lesson_progress
-- Includes indexes and an auth trigger that auto-creates a profile on signup.

-- profiles
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  current_xp int not null default 0,
  current_streak int not null default 0,
  longest_streak int not null default 0,
  last_active_date date,
  created_at timestamptz not null default now()
);

-- 코스 구조
create table units (
  id uuid primary key default gen_random_uuid(),
  sort_order int not null unique,
  title text not null,
  description text
);

create table lessons (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references units(id) on delete cascade,
  sort_order int not null,
  title text not null,
  unique(unit_id, sort_order)
);

create table exercises (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  sort_order int not null,
  exercise_type text not null check (exercise_type in ('mcq','input')),
  prompt text not null,
  correct_answer text not null,
  options jsonb,
  unique(lesson_id, sort_order)
);

-- 진도
create table user_lesson_progress (
  user_id uuid not null references profiles(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  completed_at timestamptz not null default now(),
  best_score int,
  attempts int not null default 0,
  primary key (user_id, lesson_id)
);

-- 인덱스
create index idx_lessons_unit on lessons(unit_id, sort_order);
create index idx_exercises_lesson on exercises(lesson_id, sort_order);
create index idx_progress_user on user_lesson_progress(user_id);

-- 프로필 자동 생성 트리거
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
