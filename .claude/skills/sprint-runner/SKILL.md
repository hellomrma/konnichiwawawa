---
name: sprint-runner
description: "Konnichiwawawa 개발 스프린트 오케스트레이터. 'W2 구현해줘', '단원 트리 만들어줘', '레슨 플레이어 작업해줘', '이번 주 작업 진행해줘' 같이 기능 개발 작업을 요청하면 반드시 이 스킬을 사용할 것. konnichi-frontend, konnichi-backend, konnichi-qa 에이전트 팀을 조율하여 japanese-learning-plan.md의 9주 로드맵을 실행한다."
---

## 역할
Konnichiwawawa 개발 스프린트를 조율하는 오케스트레이터다. 사용자 요청을 분석하여 적절한 에이전트에게 작업을 분배하고, 결과를 종합하여 보고한다.

## 실행 모드
**에이전트 팀 모드.** konnichi-frontend + konnichi-backend + konnichi-qa가 팀을 구성한다. 팀원들은 SendMessage로 직접 통신하며, 중간 산출물은 파일로 공유한다.

## 스프린트 워크플로우

### 1단계: 요청 분석
`japanese-learning-plan.md`를 읽고 해당 주차·기능의 작업 목록과 완료 기준을 파악한다.

### 2단계: 작업 분배 기준

| 작업 유형 | 담당 에이전트 | 순서 |
|---------|------------|------|
| DB 스키마 / RLS / 마이그레이션 | konnichi-backend | 선행 |
| Server Actions / Zod 검증 | konnichi-backend | 선행 |
| types/db.ts 업데이트 | konnichi-backend | 선행 |
| UI 컴포넌트 / 페이지 | konnichi-frontend | 백엔드 완료 후 |
| 연습 문제 컴포넌트 | konnichi-frontend | exercise-builder 스킬 사용 |
| 콘텐츠 시드 SQL | konnichi-backend | content-seeder 스킬 사용 |
| 타입·정책·로직 검증 | konnichi-qa | 구현 완료 후 |

**병렬 실행 가능한 경우:** UI 스켈레톤 + DB 스키마는 동시 작업 가능. 타입 의존이 없는 독립 컴포넌트는 병렬로.

### 3단계: 파이프라인 실행

```
[DB 스키마 + RLS] → [types/db.ts 동기화] → [Server Actions]
                                                     ↓
[UI 스켈레톤 (병렬 가능)] ─────────────────→ [컴포넌트 조립]
                                                     ↓
                                              [konnichi-qa 검증]
                                                     ↓
                                              [완료 보고]
```

### 4단계: QA 검증
모든 구현 완료 후 konnichi-qa에게 검증 요청. 실패 항목은 해당 에이전트에게 수정 요청 후 재검증.

### 5단계: 완료 보고
- 구현된 파일 목록
- QA 결과 요약
- 해당 주차 완료 기준 달성 여부
- 다음 주차 준비 사항

## 주차별 작업 참조

| W | 핵심 작업 | 주 에이전트 |
|---|---------|-----------|
| W2 | DB 5개 테이블 + RLS + `/learn` 단원 트리 UI | backend → frontend |
| W3 | McqExercise + 레슨 플레이어 셸 | frontend (exercise-builder) |
| W4 | KanaInputExercise + 피드백 애니메이션 | frontend (exercise-builder) |
| W5 | Koni SVG 4종 + Framer Motion | frontend |
| W6 | 히라가나 콘텐츠 ~150문제 | backend (content-seeder) |
| W7 | 가타카나 콘텐츠 ~100문제 | backend (content-seeder) |
| W8 | 어휘 콘텐츠 ~50문제 + XP/streak 완성 | backend + frontend |
| W9 | 프로필, 반응형, `/privacy`·`/terms`, 배포 | frontend + backend |

## 데이터 전달 프로토콜
- 에이전트 간 타입/인터페이스: `types/db.ts`, `components/exercise/types.ts` 파일 경로 공유
- 중간 산출물: `_workspace/` 폴더 (예: `_workspace/01_backend_schema.sql`)
- 최종 산출물: 실제 프로젝트 경로에 위치

## 에러 핸들링
- 에이전트 실패 시 1회 재시도, 재실패 시 해당 부분 없이 진행 후 보고
- 타입 충돌: `types/db.ts` 기준으로 해결 (기존 타입 삭제 전 병기)
- QA 실패: 담당 에이전트에게 수정 위임, 최대 2회 재시도

## 테스트 시나리오

**정상 흐름 (W2):**
1. japanese-learning-plan.md W2 작업 목록 확인
2. konnichi-backend: 5개 테이블 SQL + RLS 정책 생성
3. konnichi-backend: types/db.ts 업데이트
4. konnichi-frontend: `/learn` 단원 트리 페이지 구현 (더미 데이터 렌더)
5. konnichi-qa: 타입 정합성 + RLS 존재 검증
6. 완료 보고: 생성 파일 목록 + W3 준비 사항

**에러 흐름:**
1. konnichi-frontend에서 타입 오류 발생
2. konnichi-backend에 types/db.ts 수정 요청
3. 수정 완료 후 konnichi-frontend 재작업
4. konnichi-qa 재검증
