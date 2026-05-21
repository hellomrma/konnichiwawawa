---
name: exercise-builder
description: "Konnichiwawawa 연습 문제 컴포넌트 빌더. McqExercise(객관식), KanaInputExercise(가나 입력), 레슨 플레이어, Koni 마스코트 피드백, 정답/오답 애니메이션을 구현할 때 반드시 이 스킬을 사용할 것. wanakana 통합, Framer Motion 애니메이션 패턴, exercise 타입 정의, XP 집계 로직을 포함한다."
---

## 역할
일본어 학습 연습 문제 컴포넌트를 구현한다. `components/exercise/types.ts` 타입을 기준으로, Framer Motion 피드백 애니메이션과 wanakana 가나 입력을 통합한다.

## 핵심 타입 (components/exercise/types.ts 기준)

```typescript
type Exercise = {
  id: string
  type: 'mcq' | 'kana_input'
  question_text: string
  choices?: string[]      // mcq 전용
  correct_answer: string
}

type ExerciseResult = {
  exercise_id: string
  is_correct: boolean
  user_answer: string
}

type KoniExpression = 'idle' | 'happy' | 'sad' | 'cheer'
```

## McqExercise 구현 패턴

```tsx
// components/exercise/McqExercise.tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

// 상태: null(미선택) → 선택 → 판정 → onComplete 호출
// 타이밍: 선택 즉시 정답/오답 표시, 1200ms 후 onComplete 호출
// 버튼: border-2 border-[var(--color-border)] + shadow-btn 기본
//       정답: bg-[var(--color-success)] text-white
//       오답: bg-[var(--color-destructive)] text-white
// 판정 후 모든 버튼 disabled
```

## KanaInputExercise 구현 패턴

```tsx
// components/exercise/KanaInputExercise.tsx
'use client'
import { useState } from 'react'
import { toHiragana } from 'wanakana'

// IME onChange: e.target.value를 toHiragana()로 실시간 변환하여 표시
// 정규화 비교: userAnswer.trim() === exercise.correct_answer.trim()
// 제출: Enter 키 또는 제출 버튼
// 제출 후 1200ms 후 onComplete 호출 (McqExercise와 동일 타이밍)
```

## Framer Motion 피드백 애니메이션

```tsx
// 정답 강조 (버튼/카드에 적용)
const correctAnim = {
  animate: { scale: [1, 1.06, 1], transition: { duration: 0.3 } }
}

// 오답 흔들기 (버튼/카드에 적용)
const wrongAnim = {
  animate: { x: [-6, 6, -6, 6, 0], transition: { duration: 0.4 } }
}

// Koni 점프 (완주 시)
const jumpAnim = {
  animate: { y: [0, -18, 0], transition: { duration: 0.5, ease: 'easeOut' } }
}

// Koni float (idle 기본)
const floatAnim = {
  animate: {
    y: [0, -6, 0],
    transition: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' }
  }
}
```

## Koni 마스코트 컴포넌트

```tsx
// components/koni/Koni.tsx
// 4가지 표정 SVG: idle | happy | sad | cheer
// - idle: float 애니메이션 (기본)
// - happy: 정답 후 scale + smile
// - sad: 오답 후 shake + sad face
// - cheer: 완주 후 jump + 두 팔 올림

// Props: { expression: KoniExpression; size?: number }
// SVG는 public/koni/ 또는 components/koni/ 내 인라인으로 관리
```

## 레슨 플레이어 구현 패턴

```tsx
// app/(learn)/learn/[lessonId]/page.tsx 또는 컴포넌트
// 상태:
//   currentIndex: number (현재 문제 인덱스)
//   results: ExerciseResult[] (누적 결과)
//   phase: 'playing' | 'complete'

// 완료 시 XP 계산:
const calcXP = (results: ExerciseResult[]) => {
  const correct = results.filter(r => r.is_correct).length
  const bonus50 = 50                        // 레슨 완주 보너스
  const bonus20 = correct === results.length ? 20 : 0  // 100% 보너스
  return correct * 10 + bonus50 + bonus20
}

// 완료 후 Server Action 호출: completeLesson(lessonId, results)
```

## 진행률 표시

```tsx
// shadcn/ui Progress 컴포넌트 사용
// value = (currentIndex / exercises.length) * 100
// 색상: --color-primary (코랄 오렌지)
```

## UI 텍스트 (사양서 기준)

| 상황 | 텍스트 |
|------|--------|
| 정답 | `うまい!` |
| 오답 | `음... 다시 해볼까요?` |
| 레슨 완주 | `오늘도 한 발짝!` |
| Streak N일 | `{N}일 연속!` |
| 빈 상태 | `코니가 기다리고 있어요` |

## MVP 외 구현 금지
- 하트/목숨 시스템
- 힌트 기능
- TTS / 듣기 문제
- SRS 알고리즘 (문제 순서 랜덤 없음 — order_index 순서 고정)

## 검증 체크리스트
- [ ] Exercise 타입 완전 준수 (any 없음)
- [ ] 정답/오답 피드백 애니메이션 동작
- [ ] onComplete 콜백 반드시 1회 호출
- [ ] wanakana 실시간 변환 (onChange에서 즉시 변환)
- [ ] 레슨 완주 후 XP 계산식 정확
- [ ] 판정 후 재입력/재선택 불가 (disabled)
