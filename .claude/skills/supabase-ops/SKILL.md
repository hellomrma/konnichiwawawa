---
name: supabase-ops
description: "Konnichiwawawa Supabase 운영 스킬. DB 스키마 작성, RLS 정책 설정, 마이그레이션 파일 생성, types/db.ts 갱신, Server Actions 작성, XP/Streak 집계 로직을 구현할 때 반드시 이 스킬을 사용할 것. supabase 관련 작업이면 항상 이 스킬을 사용한다."
---

## 역할
Supabase PostgreSQL 스키마, RLS 정책, Server Actions를 관리한다. 스키마 변경 시 항상 `types/db.ts`를 동기화하여 프론트엔드 타입 안전성을 보장한다.

## 프로젝트 Supabase 설정
- 클라이언트: `lib/supabase/client.ts` (브라우저용)
- 서버 클라이언트: `lib/supabase/server.ts` (Server Actions용)
- 미들웨어: `lib/supabase/middleware.ts` (세션 갱신)
- 환경변수: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- 리전: ap-northeast-2 (서울)

## 전체 스키마 (5개 테이블)

```sql
-- 실행 순서: profiles → units → lessons → exercises → user_lesson_progress

create table profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  display_name text not null,
  xp integer not null default 0,
  streak_count integer not null default 0,
  last_active_date date
);

create table units (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  order_index integer not null unique,
  description text,
  icon_emoji text,
  created_at timestamptz default now()
);

create table lessons (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid references units(id) on delete cascade not null,
  title text not null,
  order_index integer not null,
  created_at timestamptz default now(),
  unique(unit_id, order_index)
);

create table exercises (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references lessons(id) on delete cascade not null,
  type text not null check (type in ('mcq', 'kana_input')),
  question_text text not null,
  choices jsonb,            -- mcq 전용: ["a", "i", "u", "e"]
  correct_answer text not null,
  order_index integer not null,
  created_at timestamptz default now(),
  unique(lesson_id, order_index)
);

create table user_lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  lesson_id uuid references lessons(id) on delete cascade not null,
  completed_at timestamptz default now(),
  score integer not null,       -- 정답 수
  xp_earned integer not null,
  unique(user_id, lesson_id)    -- 레슨당 1회 기록 (upsert)
);
```

## RLS 정책 전체

```sql
-- RLS 활성화 (모든 테이블 필수)
alter table profiles enable row level security;
alter table units enable row level security;
alter table lessons enable row level security;
alter table exercises enable row level security;
alter table user_lesson_progress enable row level security;

-- profiles: 본인만 접근
create policy "profiles_select" on profiles
  for select using (auth.uid() = id);
create policy "profiles_insert" on profiles
  for insert with check (auth.uid() = id);
create policy "profiles_update" on profiles
  for update using (auth.uid() = id);

-- units/lessons/exercises: 인증된 사용자 전체 읽기 (공개 콘텐츠)
create policy "units_select" on units
  for select using (auth.role() = 'authenticated');
create policy "lessons_select" on lessons
  for select using (auth.role() = 'authenticated');
create policy "exercises_select" on exercises
  for select using (auth.role() = 'authenticated');

-- user_lesson_progress: 본인만 CRUD
create policy "progress_select" on user_lesson_progress
  for select using (auth.uid() = user_id);
create policy "progress_insert" on user_lesson_progress
  for insert with check (auth.uid() = user_id);
create policy "progress_update" on user_lesson_progress
  for update using (auth.uid() = user_id);
```

## XP/Streak Server Action 패턴

```typescript
// app/actions/progress.ts
'use server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const CompleteSchema = z.object({
  lessonId: z.string().uuid(),
  results: z.array(z.object({
    exercise_id: z.string().uuid(),
    is_correct: z.boolean(),
    user_answer: z.string(),
  })),
})

export async function completeLesson(input: unknown) {
  const { lessonId, results } = CompleteSchema.parse(input)
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const correct = results.filter(r => r.is_correct).length
  const isAllCorrect = correct === results.length
  const xp = correct * 10 + 50 + (isAllCorrect ? 20 : 0)

  // Streak 계산
  const { data: profile } = await supabase
    .from('profiles')
    .select('streak_count, last_active_date')
    .eq('id', user.id)
    .single()

  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const lastDate = profile?.last_active_date

  let newStreak = profile?.streak_count ?? 0
  if (lastDate === yesterday) newStreak += 1
  else if (lastDate !== today) newStreak = 1  // 리셋

  // 트랜잭션: 진도 + 프로필 동시 업데이트
  await Promise.all([
    supabase.from('user_lesson_progress').upsert({
      user_id: user.id,
      lesson_id: lessonId,
      score: correct,
      xp_earned: xp,
      completed_at: new Date().toISOString(),
    }),
    supabase.from('profiles').update({
      xp: (profile?.xp ?? 0) + xp,   // 누적
      streak_count: newStreak,
      last_active_date: today,
    }).eq('id', user.id),
  ])

  return { xp, streak: newStreak }
}
```

## profiles 자동 생성 트리거

```sql
-- Auth 회원가입 시 profiles 자동 생성
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', '학습자'));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

## 마이그레이션 파일 규칙
- 위치: `supabase/migrations/YYYYMMDDHHMMSS_설명.sql`
- 예시: `supabase/migrations/20250521000000_initial_schema.sql`

## 검증 체크리스트
- [ ] 5개 테이블 모두 `enable row level security`
- [ ] profiles: insert/select/update 정책 3개
- [ ] units/lessons/exercises: select 정책 각 1개
- [ ] user_lesson_progress: select/insert/update 정책 3개
- [ ] Server Actions에 `'use server'` 선언
- [ ] Zod 스키마로 입력 검증
- [ ] types/db.ts에 모든 테이블 타입 반영
- [ ] profiles 자동 생성 트리거 존재
