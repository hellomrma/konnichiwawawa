# こんにちわわわ — Konnichiwawawa

치와와 마스코트 **코니**와 함께하는 일본어 입문 학습 서비스.
히라가나·가타카나·기초 어휘 100개를 게임처럼 배운다.

## 기능

- 히라가나 / 가타카나 / 기초 어휘 학습 (JLPT N5 입문)
- 객관식(MCQ) + 가나 직접 입력 2가지 문제 유형
- XP 포인트 + 연속 학습 Streak 게이미피케이션
- 이메일 / Google / Kakao 소셜 로그인

## 시작하기

### 필수 조건

- Node.js 18+
- pnpm
- Supabase 프로젝트

### 설치

```bash
pnpm install
```

### 환경변수

`.env.local` 파일을 생성하고 아래 값을 채운다.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### DB 초기화

Supabase 대시보드 → SQL 에디터에서 순서대로 실행한다.

```
supabase/schema.sql   # 테이블·인덱스·트리거 생성
supabase/rls.sql      # Row Level Security 정책 설정
```

### 개발 서버

```bash
pnpm dev
# http://localhost:3000
```

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 App Router |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS v4 |
| UI 컴포넌트 | shadcn/ui |
| DB / Auth | Supabase |
| 애니메이션 | Framer Motion |
| 일본어 입력 | wanakana |
| 배포 | Vercel (icn1 서울) |

## 라이선스

MIT
