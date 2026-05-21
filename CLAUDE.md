# Konnichiwawawa — Claude Code Guide

일본어 입문 학습 웹앱. 치와와 마스코트 코니와 함께 히라가나·가타카나·기초 어휘를 배운다.

## 명령어

```bash
pnpm dev        # 개발 서버 (localhost:3000)
pnpm build      # 프로덕션 빌드
pnpm lint       # ESLint
```

## 기술 스택

- **프레임워크**: Next.js 16 App Router
- **언어**: TypeScript strict
- **스타일**: Tailwind CSS v4 (CSS 변수 기반 디자인 토큰)
- **UI**: shadcn/ui (`components/ui/`)
- **DB/Auth**: Supabase (PostgreSQL + Auth)
- **애니메이션**: Framer Motion
- **일본어 입력**: wanakana (로마자 → 가나 변환)
- **패키지 매니저**: pnpm

## 프로젝트 구조

```
app/
  (auth)/           # 로그인·회원가입 (인증 불필요)
  (learn)/          # 학습 화면 (인증 필수, 공통 헤더 레이아웃)
    layout.tsx      # 헤더: 로고 / XP / Streak / 프로필
    learn/page.tsx  # 단원 트리
  auth/callback/    # OAuth 콜백 핸들러
  page.tsx          # 랜딩
components/
  exercise/types.ts # Exercise, ExerciseResult, KoniExpression 타입
  ui/               # shadcn/ui 컴포넌트
lib/supabase/       # client.ts / server.ts / middleware.ts
types/db.ts         # Supabase 테이블 타입 (수기 관리, 스키마 변경 시 동기화)
supabase/
  schema.sql        # 전체 스키마 (Supabase SQL 에디터에서 실행)
  rls.sql           # RLS 정책 (schema.sql 실행 후 실행)
```

## 코드 컨벤션

- **Server Component 기본** — 상태·이벤트가 필요한 부분만 `'use client'`
- **컴포넌트 선언식** — `function MyComponent()`, default export 지양 (page.tsx 제외)
- **파일명** — 컴포넌트 `PascalCase.tsx`, 그 외 `kebab-case.ts`
- **Supabase 호출** — Server Actions 또는 Route Handlers에서만, 클라이언트 직접 호출 금지
- **입력 검증** — 모든 Server Action 입력은 Zod로 검증
- **일본어 텍스트** — `font-jp` 또는 `font-jp-display` 클래스 필수

## 디자인 토큰

Tailwind 색상 유틸(`bg-red-500` 등) **사용 금지**. CSS 변수 기반 시맨틱 클래스만 사용한다.

```
bg-primary        → #ff7849 코랄 오렌지 (CTA, 진행도)
bg-secondary      → #4a5fc1 인디고 (링크, 보조)
bg-accent         → #ffc94a 금색 (XP/streak)
bg-success        → #4ea674 초록 (정답)
bg-destructive    → #e15a5a 빨강 (오답)
bg-background     → #fff8ed 크림 (배경)
bg-muted          → #f4ead6
text-muted-foreground → #7a716a
--shadow-btn      → 0 4px 0 0 rgb(0 0 0 / 0.1)  (입체 버튼)
--radius-lg: 24px / --radius-md: 16px / --radius-pill: 9999px
```

## 데이터 모델 (5개 테이블)

```
profiles              — 사용자 (current_xp, current_streak, longest_streak)
units                 — 단원 (sort_order, title)
lessons               — 레슨 (unit_id, sort_order)
exercises             — 문제 (lesson_id, exercise_type: 'mcq'|'input', options jsonb)
user_lesson_progress  — 진도 (user_id, lesson_id, best_score, attempts)
```

스키마 변경 시 `types/db.ts`를 항상 동기화한다.

## XP / Streak 규칙

- 정답 1개: +10 XP
- 레슨 완주: +50 XP
- 100% 정답률 완주 보너스: +20 XP
- Streak: `last_active_date`가 어제면 +1, 오늘이면 유지, 그 외 리셋

## MVP 범위 — 구현 금지 항목

SRS/간격반복, 하트/목숨, TTS/듣기, 한자/후리가나, 다크 모드, 어드민, 친구/리더보드, 결제/프리미엄

## 인증

Supabase Auth. Provider: 이메일/비밀번호 + Google + Kakao.
- `(learn)` 라우트 그룹은 `supabase.auth.getUser()` 후 미로그인 시 `/login` 리다이렉트.
- OAuth 콜백: `app/auth/callback/route.ts`

## 환경변수 (`.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL
```

## 개발 현황

| W | 상태 | 내용 |
|---|------|------|
| W1 | ✅ | 셋업, 디자인 토큰, 이메일+Google 인증 |
| W2 | ✅ | DB 스키마·RLS, `/learn` 단원 트리 (더미 데이터) |
| W3 | ⏳ | McqExercise + 레슨 플레이어 |
| W4 | ⏳ | KanaInputExercise + 피드백 애니메이션 |
| W5 | ⏳ | Koni SVG 4종 + Framer Motion |
| W6 | ✅ | 히라가나 콘텐츠 (4 units / 15 lessons / 120문제) + DB 연결 |
| W7 | ✅ | 가타카나 콘텐츠 (3 units / 12 lessons / 96문제) |
| W8 | ⏳ | 어휘 콘텐츠 + XP/Streak 로직 |
| W9 | ⏳ | 프로필, 반응형, /privacy·/terms, 배포 |

## 하네스 (에이전트 팀)

`.claude/agents/` — konnichi-frontend, konnichi-backend, konnichi-qa
`.claude/skills/` — sprint-runner (오케스트레이터), exercise-builder, supabase-ops, content-seeder

"W3 구현해줘" 처럼 요청하면 sprint-runner가 팀을 조율해 실행한다.
