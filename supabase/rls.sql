-- Konnichiwawawa row level security policies
-- profiles & user_lesson_progress: owner-only access.
-- units / lessons / exercises (content): readable by any authenticated user.

alter table profiles enable row level security;
alter table units enable row level security;
alter table lessons enable row level security;
alter table exercises enable row level security;
alter table user_lesson_progress enable row level security;

-- profiles: 본인만
create policy "profiles_select_own" on profiles
  for select using (auth.uid() = id);
create policy "profiles_update_own" on profiles
  for update using (auth.uid() = id);

-- 콘텐츠: 인증 사용자 모두 읽기
create policy "units_read_all" on units
  for select using (auth.role() = 'authenticated');
create policy "lessons_read_all" on lessons
  for select using (auth.role() = 'authenticated');
create policy "exercises_read_all" on exercises
  for select using (auth.role() = 'authenticated');

-- 진도: 본인만
create policy "progress_select_own" on user_lesson_progress
  for select using (auth.uid() = user_id);
create policy "progress_insert_own" on user_lesson_progress
  for insert with check (auth.uid() = user_id);
create policy "progress_update_own" on user_lesson_progress
  for update using (auth.uid() = user_id);
