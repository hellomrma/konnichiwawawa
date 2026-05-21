# Konnichiwawawa — 개발 사양서 (Spec for Claude Code)

> 이 문서는 Claude Code가 읽고 바로 작업을 시작하기 위한 명세서입니다.
> 의사결정은 모두 확정된 상태이며, 모호한 부분은 "결정 필요" 섹션에 명시됩니다.

---

## 0. TL;DR

- **제품**: 일본어 입문(JLPT N5 일부) 웹 학습 서비스
- **브랜드**: Konnichiwawawa (짧은 호칭 Koni, 마스코트 치와와 Koni)
- **스택**: Next.js 15 (App Router) + React 19 + TypeScript + Tailwind v4 + shadcn/ui + Supabase + Vercel
- **범위**: 히라가나/가타카나 + 기초 어휘 100개. 4가지 문제 유형 아님, **객관식 + 가나입력 2종만**
- **게이미피케이션**: XP + Streak만. 하트/미션/SRS 없음
- **일정**: 9주 (1인 사이드)
- **배포**: Vercel(서울 `icn1`) + Supabase(서울 `ap-northeast-2`)

---

## 1. 명시적 Out of Scope (MVP에서 절대 만들지 말 것)

- SRS / 간격반복 알고리즘
- 하트(목숨) 시스템
- 일일/주간 미션
- TTS / 듣기 문제
- 한자 / 후리가나
- 어드민 페이지 (콘텐츠 입력 UI)
- 친구 / 리더보드
- 결제 / 프리미엄
- 매칭 / 빈칸 문제 유형
- 푸시 알림
- 다크 모드

위 항목은 MVP 검증 통과 후 V1.1에서 검토. 지금 만들면 일정이 깨집니다.

---

## 2. 프로젝트 셋업 (W1 초기 명령어)

```bash
# Next.js 15 + TypeScript + Tailwind + App Router
pnpm create next-app@latest konnichiwawawa \
  --typescript --tailwind --app --eslint --src-dir=false \
  --import-alias "@/*"

cd konnichiwawawa

# 핵심 의존성
pnpm add @supabase/supabase-js @supabase/ssr
pnpm add wanakana
pnpm add framer-motion
pnpm add zod react-hook-form @hookform/resolvers
pnpm add class-variance-authority clsx tailwind-merge
pnpm add lucide-react

# 폰트 (Next.js 자동 최적화 사용 — 별도 패키지 불필요)

# shadcn/ui
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card input progress dialog toast

# 개발 도구
pnpm add -D @types/node prettier prettier-plugin-tailwindcss
```

### 환경변수 (`.env.local`)

```bash
# Supabase (Vercel Integration 사용 시 자동 주입)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# 사이트 URL (OAuth redirect 처리용)
NEXT_PUBLIC_SITE_URL=http://localhost:3000   # 프로덕션에서는 https://konnichiwawawa.app
```

OAuth provider별 client_id / secret은 Supabase Dashboard의 Authentication → Providers 에 직접 입력합니다. `.env`에 둘 필요 없음.

### `vercel.json`

```json
{
  "regions": ["icn1"],
  "framework": "nextjs"
}
```

---

## 3. 디자인 토큰

### 3.1 `app/globals.css`

```css
@import "tailwindcss";

@theme {
  /* 베이스: 따뜻한 크림 */
  --color-bg: #fff8ed;
  --color-surface: #ffffff;
  --color-text: #2a2520;
  --color-text-muted: #7a716a;
  --color-border: #f0e6d2;

  /* 액센트 */
  --color-primary: #ff7849;        /* 코랄 오렌지 — CTA, 진행도 */
  --color-primary-hover: #f25a25;
  --color-secondary: #4a5fc1;      /* 인디고 — 링크, 보조 액션 */

  /* 피드백 */
  --color-success: #4ea674;        /* 정답 */
  --color-error: #e15a5a;          /* 오답 */
  --color-accent: #ffc94a;         /* XP/스트릭 */

  /* 라운드 */
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-pill: 9999px;

  /* 그림자 (듀오링고식 입체 버튼) */
  --shadow-btn: 0 4px 0 0 rgba(0,0,0,0.1);
  --shadow-btn-active: 0 1px 0 0 rgba(0,0,0,0.1);

  /* 폰트 변수 — next/font에서 주입 */
  --font-sans: var(--font-pretendard), system-ui, sans-serif;
  --font-jp: var(--font-noto-jp), sans-serif;
  --font-jp-display: var(--font-zen-maru), var(--font-noto-jp), sans-serif;
}

html { background: var(--color-bg); color: var(--color-text); }
```

### 3.2 `app/layout.tsx` 폰트 주입

```tsx
import { Noto_Sans_JP, Zen_Maru_Gothic } from "next/font/google";

const notoJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-jp",
  display: "swap",
});

const zenMaru = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-zen-maru",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${notoJP.variable} ${zenMaru.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 4. 파일 구조

```text
konnichiwawawa/
├─ app/
│  ├─ (auth)/
│  │  ├─ login/page.tsx
│  │  └─ signup/page.tsx
│  ├─ auth/
│  │  └─ callback/route.ts        # OAuth 콜백 (Google/Kakao 공통)
│  ├─ (learn)/
│  │  ├─ layout.tsx              # XP/streak 헤더
│  │  ├─ learn/page.tsx          # 단원 트리
│  │  └─ lesson/[id]/page.tsx    # 문제 풀이
│  ├─ profile/page.tsx
│  ├─ layout.tsx
│  ├─ globals.css
│  └─ page.tsx                   # 랜딩
├─ components/
│  ├─ ui/                        # shadcn/ui 생성물
│  ├─ exercise/
│  │  ├─ McqExercise.tsx
│  │  ├─ KanaInputExercise.tsx
│  │  ├─ ExerciseFeedback.tsx
│  │  └─ types.ts
│  ├─ gamification/
│  │  ├─ XpBar.tsx
│  │  └─ StreakBadge.tsx
│  ├─ mascot/
│  │  ├─ Koni.tsx                # 표정 prop으로 SVG 스위칭
│  │  └─ koni-svgs/              # idle/happy/sad/cheer.svg
│  └─ layout/
│     └─ LearnHeader.tsx
├─ lib/
│  ├─ supabase/
│  │  ├─ client.ts               # 브라우저용
│  │  ├─ server.ts               # 서버용
│  │  └─ middleware.ts           # 세션 갱신
│  ├─ gamification/
│  │  └─ streak.ts               # Server Action
│  ├─ japanese/
│  │  └─ kana-validator.ts       # wanakana 래퍼
│  └─ utils.ts                   # cn() 등
├─ types/
│  └─ db.ts                      # Supabase 타입 (자동 생성)
├─ supabase/
│  ├─ schema.sql                 # 아래 8번 섹션 그대로
│  ├─ seed.sql                   # 콘텐츠 시드 (사용자가 W6~W8에 작성)
│  └─ rls.sql                    # RLS 정책
├─ middleware.ts                 # 인증 세션 갱신
├─ vercel.json
├─ next.config.ts
├─ tsconfig.json
└─ package.json
```

---

## 5. 데이터 모델 (실행 가능한 SQL)

`supabase/schema.sql`:

```sql
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
  sort_order int not null,
  title text not null,
  description text
);

create table lessons (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references units(id) on delete cascade,
  sort_order int not null,
  title text not null
);

create table exercises (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  sort_order int not null,
  exercise_type text not null check (exercise_type in ('mcq','input')),
  prompt text not null,
  correct_answer text not null,
  options jsonb
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
```

`supabase/rls.sql`:

```sql
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
```

---

## 6. 핵심 타입 정의

`components/exercise/types.ts`:

```ts
export type ExerciseType = "mcq" | "input";

export type Exercise = {
  id: string;
  lessonId: string;
  sortOrder: number;
  exerciseType: ExerciseType;
  prompt: string;
  correctAnswer: string;
  options: string[] | null;
};

export type ExerciseResult = {
  exerciseId: string;
  correct: boolean;
  userAnswer: string;
  responseMs: number;
};

export interface ExerciseProps {
  exercise: Exercise;
  onSubmit: (result: ExerciseResult) => void;
}

export type KoniExpression = "idle" | "happy" | "sad" | "cheer";
```

---

## 7. UX 라이팅 톤 (UI 텍스트 기준)

| 상황 | 텍스트 |
| --- | --- |
| 정답 | `うまい!` |
| 오답 | `음... 다시 해볼까요?` |
| 정답 (보조설명) | `정답이에요` |
| 오답 (정답 노출) | `정답은 {answer}` |
| 레슨 완주 | `오늘도 한 발짝!` |
| 빈 상태 | `코니가 기다리고 있어요` |
| 로그인 CTA | `시작하기` |
| 회원가입 CTA | `코니와 함께하기` |
| Streak 0일 | `오늘 첫 학습을 해보세요` |
| Streak N일 | `{N}일 연속!` |

---

## 7.5 인증 (Auth)

### 확정 사항

- **방식**: Supabase Auth 사용
- **Provider**: 이메일/비밀번호 + **Google** + **Kakao**
- **네이버는 제외** (Supabase 미지원, Custom OAuth 구현 부담)

### Provider별 셋업 절차

#### Google

1. https://console.cloud.google.com → 프로젝트 생성
2. APIs & Services → Credentials → OAuth 2.0 Client ID 생성
3. Authorized redirect URI: `https://<your-project>.supabase.co/auth/v1/callback`
4. Supabase Dashboard → Authentication → Providers → Google 활성화 → Client ID/Secret 입력
5. 검수 불필요. 즉시 사용 가능.

#### Kakao (주의: 비즈 앱 검수 필수)

1. https://developers.kakao.com → 애플리케이션 추가
2. 플랫폼 → Web 도메인 등록 (`http://localhost:3000`, `https://konnichiwawawa.app`)
3. 카카오 로그인 → 활성화, Redirect URI: `https://<your-project>.supabase.co/auth/v1/callback`
4. 동의항목 → 이메일 수집 권한 신청 → **비즈 앱 전환 필요**
   - 일반 앱은 이메일 받지 못함
   - 비즈 앱 전환: 개인 개발자(주민등록증) 또는 사업자등록증 필요
   - 검수 소요: 영업일 1~3일
5. Supabase Dashboard → Authentication → Providers → Kakao 활성화 → REST API Key + Client Secret 입력

**일정 영향**: W1 시작 시점에 카카오 비즈 앱 전환 신청을 먼저 넣어야 합니다. 검수 진행 중에는 이메일+Google만으로 개발하고, 검수 완료되면 카카오 활성화.

### 클라이언트 코드

```tsx
// components/auth/SocialButtons.tsx
"use client";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export function SocialButtons() {
  const supabase = createSupabaseBrowser();

  const signInWith = async (provider: "google" | "kakao") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <button onClick={() => signInWith("google")} className="...">
        Google로 시작하기
      </button>
      <button onClick={() => signInWith("kakao")} className="bg-[#FEE500] ...">
        카카오로 시작하기
      </button>
    </div>
  );
}
```

### OAuth 콜백 라우트

```ts
// app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/learn";

  if (code) {
    const supabase = await createSupabaseServer();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }
  return NextResponse.redirect(`${origin}/login?error=oauth_failed`);
}
```

### 세션 갱신 미들웨어

```ts
// middleware.ts
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
```

### 법적 요구사항 (카카오/Google 검수 통과 조건)

배포 전 다음 두 페이지가 반드시 필요합니다.

- `/privacy` — 개인정보처리방침 (한국어 + 영어 권장)
- `/terms` — 서비스 이용약관

W9 배포 전까지 작성 필수. 카카오 비즈 앱 검수에서도 두 URL 제출을 요구합니다.

### 카카오 브랜드 가이드 준수

- 버튼 색상: `#FEE500` (카카오 노란색) 고정
- 텍스트: "카카오로 시작하기" / "카카오 로그인" (다른 변형 금지)
- 카카오 로고 사용 시 가이드라인 따를 것: https://developers.kakao.com/docs/latest/ko/getting-started/design-guide

---

## 8. 게이미피케이션 로직 (확정)

### XP 규칙

| 행동 | XP |
| --- | --- |
| 문제 정답 | +10 |
| 레슨 완주 (전 문제 정답률 무관) | +50 |
| 첫 정답률 100% 레슨 보너스 | +20 |

### Streak 규칙

- 하루 1레슨 이상 완주 시 +1
- 24시간 이상 미접속 시 다음 학습 시점에 0으로 리셋
- `last_active_date`와 오늘 비교로 판정
- 시간대는 사용자 브라우저 로컬 자정 기준 (서버에서는 UTC 저장, 클라이언트에서 변환)

### Server Action 예시

```ts
// lib/gamification/streak.ts
"use server";
import { createSupabaseServer } from "@/lib/supabase/server";

export async function updateStreakOnLessonComplete(userId: string) {
  const supabase = await createSupabaseServer();
  const { data: profile } = await supabase
    .from("profiles")
    .select("current_streak, longest_streak, last_active_date")
    .eq("id", userId)
    .single();
  if (!profile) return;

  const today = new Date().toISOString().slice(0, 10);
  if (profile.last_active_date === today) return;

  const y = new Date();
  y.setDate(y.getDate() - 1);
  const yesterday = y.toISOString().slice(0, 10);

  const nextStreak =
    profile.last_active_date === yesterday ? profile.current_streak + 1 : 1;
  const longest = Math.max(profile.longest_streak, nextStreak);

  await supabase
    .from("profiles")
    .update({
      current_streak: nextStreak,
      longest_streak: longest,
      last_active_date: today,
    })
    .eq("id", userId);
}
```

---

## 9. 콘텐츠 구조 (학습자가 볼 단원)

```text
1. 히라가나 1   (あ행 ~ さ행, 15자)        — 단원 ID: unit-hira-1
2. 히라가나 2   (た행 ~ は행, 15자)        — unit-hira-2
3. 히라가나 3   (ま행 ~ わ행 + ん, 16자)   — unit-hira-3
4. 탁음·반탁음·요음 (정리)                 — unit-hira-4
5. 가타카나 1   (ア행 ~ サ행, 15자)        — unit-kata-1
6. 가타카나 2   (タ행 ~ ハ행, 15자)        — unit-kata-2
7. 가타카나 3   (マ행 ~ ワ행 + ン, 16자)   — unit-kata-3
8. 인사 어휘 10개                           — unit-vocab-greeting
9. 숫자 1~10                                — unit-vocab-number
10. 일상 단어 30개 (음식·요일·가족)        — unit-vocab-daily
```

단원당 3~5레슨, 레슨당 8문제. 총 약 250~300문제. **실제 콘텐츠 데이터는 사용자가 Google Sheets로 작성 → CSV 임포트.**

### 시드 CSV 포맷

```csv
unit_sort,unit_title,lesson_sort,lesson_title,exercise_sort,exercise_type,prompt,correct_answer,options
1,히라가나 1,1,あ행,1,mcq,"[あ] 의 발음은?",a,"[""a"",""i"",""u"",""e""]"
1,히라가나 1,1,あ행,2,input,"""a""를 히라가나로",あ,
```

---

## 10. 마스코트 코니 (Koni)

### SVG 자리표시자

W5 작업 전까지 자리표시자 SVG로 진행. Claude Code는 다음 단순 SVG를 우선 생성하고, 추후 일러스트로 교체.

```tsx
// components/mascot/Koni.tsx
import type { KoniExpression } from "@/components/exercise/types";

export function Koni({ expression = "idle", size = 80 }: {
  expression?: KoniExpression;
  size?: number;
}) {
  // 임시: 단순 원형 + 표정. W5에 실제 SVG로 교체
  const colors: Record<KoniExpression, string> = {
    idle: "#f4d9a8",
    happy: "#f4d9a8",
    sad: "#e8c896",
    cheer: "#f4d9a8",
  };
  const mouth: Record<KoniExpression, string> = {
    idle: "M 35 55 Q 50 60 65 55",
    happy: "M 30 50 Q 50 70 70 50",
    sad: "M 35 60 Q 50 50 65 60",
    cheer: "M 30 50 Q 50 75 70 50",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-label={`Koni ${expression}`}>
      <ellipse cx="20" cy="25" rx="12" ry="20" fill={colors[expression]} stroke="#5a3e2a" strokeWidth="3" />
      <ellipse cx="80" cy="25" rx="12" ry="20" fill={colors[expression]} stroke="#5a3e2a" strokeWidth="3" />
      <circle cx="50" cy="50" r="35" fill={colors[expression]} stroke="#5a3e2a" strokeWidth="3" />
      <circle cx="38" cy="45" r="3" fill="#2a2520" />
      <circle cx="62" cy="45" r="3" fill="#2a2520" />
      <path d={mouth[expression]} stroke="#2a2520" strokeWidth="2" fill="none" />
    </svg>
  );
}
```

### 애니메이션 규칙 (Framer Motion)

- 정답 시: `scale: [1, 1.1, 1]`, duration 0.4s
- 오답 시: `x: [-5, 5, -5, 5, 0]`, duration 0.4s
- 레슨 완주: `y: [0, -10, 0]` bounce, duration 0.6s

---

## 11. 화면 명세 (Acceptance Criteria)

### 11.1 `/learn` — 단원 트리

- 단원 카드 리스트 (수직)
- 각 단원: 제목, 레슨 N개 중 완료한 M개 표시, 진행도 바
- 단원 카드 클릭 → 첫 미완료 레슨으로 이동
- 완료한 레슨은 체크 아이콘
- 로그아웃 상태 → `/login`으로 리다이렉트

### 11.2 `/lesson/[id]` — 레슨 플레이어

- 상단: 진행도 바 (현재 문제 / 전체)
- 좌측 상단: 코니 마스코트 (50x50, expression은 마지막 정답/오답 결과 반영)
- 중앙: Exercise 컴포넌트 (`exerciseType`에 따라 McqExercise 또는 KanaInputExercise)
- 하단: "정답 확인" 버튼 (답 입력 전 비활성)
- 정답 확인 후: 피드백 영역 표시 + "다음" 버튼
- 전 문제 완료 시 결과 화면 → XP 표시 + "오늘도 한 발짝!" + `/learn`으로 돌아가기 버튼

### 11.3 `/profile`

- 디스플레이 이름
- 현재 XP (큰 숫자)
- 현재 streak (불꽃 아이콘 + 일수)
- 최고 streak
- 완료한 단원 수 / 전체 단원 수
- 로그아웃 버튼

### 11.4 헤더 (`(learn)/layout.tsx`)

- 좌: 로고 (Konnichiwawawa)
- 우: XP (금색 숫자) · Streak (불꽃 + 일수) · 프로필 아이콘

---

## 12. 9주 일정 + 산출물

| 주차 | 작업 | 완료 기준 (Acceptance) |
| --- | --- | --- |
| W1 | 프로젝트 셋업, 디자인 토큰, 인증(이메일+Google), **카카오 비즈 앱 검수 신청** | `pnpm dev` 동작 / 이메일·Google 로그인 작동 / 디자인 토큰 적용 확인 / 카카오 검수 신청 완료 |
| W2 | DB 스키마, RLS, `/learn` 단원 트리, **카카오 검수 통과 시 활성화** | Supabase에 스키마 적용 / 더미 데이터로 단원 리스트 렌더 / 카카오 로그인 동작 (검수 완료 시) |
| W3 | McqExercise + 레슨 플레이어 셸 | 객관식 문제 풀이 → 정답 판정 → 다음 문제 진행 |
| W4 | KanaInputExercise (wanakana) + 정답/오답 피드백 애니메이션 | 로마자 입력 → 가나 자동 변환 / 코니 표정 변화 |
| W5 | 코니 마스코트 SVG 4종 + 모션 적용 | idle/happy/sad/cheer 표정 SVG 교체 완료 |
| W6 | 히라가나 콘텐츠 작성 (단원 1~4, 약 150문제) | seed.sql 또는 CSV 임포트 완료, 실 데이터로 학습 가능 |
| W7 | 가타카나 콘텐츠 작성 (단원 5~7, 약 100문제) | 동일 |
| W8 | 어휘 콘텐츠 작성 (단원 8~10, 약 50문제) + XP/streak 로직 | XP 누적, streak 일일 갱신 동작 |
| W9 | 프로필 화면, 반응형, 빈 상태, `/privacy`·`/terms` 작성, Vercel 배포 | 모바일/데스크톱 모두 동작 / 약관 페이지 노출 / 프로덕션 배포 |

---

## 13. 배포 (Vercel)

- **리전**: Function `icn1` (서울), Supabase `ap-northeast-2` (서울) — 반드시 일치
- **플랜**: 베타까지 Hobby(무료). 결제·광고 도입 시 Pro($20/월) 필수 (Hobby는 비상업 용도 한정)
- **Integration**: Vercel 마켓플레이스에서 Supabase 연결 → 환경변수 자동 주입
- **브랜치 전략**:
  - `main` → 프로덕션
  - `feature/*` → Preview Deployment 자동
- **모니터링**: Vercel Web Analytics + Speed Insights (무료 한도 내)

### `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## 14. 코드 컨벤션

- TypeScript strict 모드 (`tsconfig.json` `"strict": true`)
- Server Component 기본, 인터랙션 필요 시에만 `"use client"`
- Supabase 호출은 Server Action 우선, 클라이언트 직접 호출은 실시간 필요 시에만
- 모든 사용자 입력은 Zod 검증 후 처리
- 일본어 텍스트는 `font-jp` 또는 `font-jp-display` 클래스 강제 적용
- 컴포넌트는 `function ComponentName()` 선언식, default export 지양 (단 page.tsx 제외)
- 파일명: 컴포넌트 `PascalCase.tsx`, 그 외 `kebab-case.ts`

---

## 15. 검증 기준 (베타 출시 후)

- 베타 사용자 10명 모집
- 1주일 후 5명 이상 재방문 시 V1.1 진행
- 실패 시: 콘텐츠/UX 재검토. 기능 추가는 답이 아님.

---

## 16. 결정 필요 / 보류 항목

| 항목 | 결정 | 비고 |
| --- | --- | --- |
| 인증 방식 | **확정**: 이메일 + Google + Kakao | 네이버는 V1.1로 보류 |
| 도메인 | **미결정** | konnichiwawawa.app / koni.app 가용성 확인 필요 |
| 마스코트 일러스트 | **미결정** | 직접 / 외주 / AI 보조 — W5 시작 전 결정 |
| 콘텐츠 시드 데이터 | CSV 권장 | Google Sheets → CSV → Supabase 임포트 |
| 카카오 비즈 앱 검수 | W1 즉시 신청 | 영업일 1~3일 소요. 사업자등록증 또는 개인 신분증 필요 |
| 약관·개인정보처리방침 | W9까지 작성 필수 | 카카오/Google 검수 조건 |

---

## 17. Claude Code 작업 진입점

권장 작업 순서:

1. **W1 부트스트랩**: 섹션 2의 명령어 실행 → 섹션 3의 디자인 토큰 적용 → 섹션 4의 디렉토리 구조 생성
2. **Supabase 셋업**: 사용자가 Supabase 프로젝트 생성한 후, 섹션 5의 SQL 두 파일을 적용
3. **인증**: 섹션 16의 인증 방식 결정 후 진행
4. **`/learn` 단원 트리**: 섹션 11.1 기준
5. **레슨 플레이어 + 문제 컴포넌트**: 섹션 11.2 기준, 섹션 6의 타입 사용
6. **마스코트**: 섹션 10의 자리표시자로 시작, W5에 실제 SVG 교체
7. **콘텐츠 임포트**: 섹션 9의 CSV 포맷으로 사용자가 작성한 데이터 적용
8. **XP/Streak**: 섹션 8의 로직 구현
9. **프로필 + 배포**: 섹션 11.3, 섹션 13 기준

각 단계마다 섹션 12의 Acceptance 기준 충족 확인 후 다음 단계 진행.
