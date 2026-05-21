---
name: content-seeder
description: "Konnichiwawawa 학습 콘텐츠 시드 데이터 생성 스킬. 히라가나, 가타카나, 어휘 연습 문제를 SQL 시드 파일로 생성할 때 반드시 이 스킬을 사용할 것. W6-W8 콘텐츠 작업, 단원/레슨/문제 데이터 추가, CSV → SQL 변환 작업에 사용한다."
---

## 역할
`japanese-learning-plan.md`의 콘텐츠 명세에 따라 SQL 시드 데이터를 생성한다. 레슨당 8문제(MCQ 5 + KanaInput 3)를 기본 구성으로, 단계적 난이도로 배치한다.

## 전체 콘텐츠 구조

| 단원 | 내용 | 레슨 수 | 목표 문제 수 |
|------|------|--------|------------|
| 히라가나 1 | あ行~わ行 기본 46자 | 4 | ~48 |
| 히라가나 2 | 탁음(が~ぱ行) | 3 | ~36 |
| 히라가나 3 | 요음(きゃ~ぴょ) | 3 | ~36 |
| 히라가나 4 | 복합 연습 | 3 | ~30 |
| 가타카나 1 | ア行~ワ行 기본 | 3 | ~36 |
| 가타카나 2 | 탁음/반탁음 | 3 | ~36 |
| 가타카나 3 | 요음 + 외래어 | 3 | ~24 |
| 어휘: 인사 | おはよう 등 10개 | 2 | ~20 |
| 어휘: 숫자 | いち~じゅう 등 10개 | 2 | ~20 |
| 어휘: 일상 | 30개 기초 단어 | 4 | ~40 |

**총**: 10단원, 30개 레슨, ~330문제

## SQL 시드 패턴

```sql
-- 1. 단원(units) 삽입
insert into units (id, title, order_index, description, icon_emoji) values
  ('unit-hira-1', '히라가나 1', 1, 'あいうえお — 기초 46자', '🌸'),
  ('unit-hira-2', '히라가나 2', 2, '탁음과 반탁음', '🌺'),
  ('unit-hira-3', '히라가나 3', 3, '요음(きゃ~ぴょ)', '🌼'),
  ('unit-hira-4', '히라가나 4', 4, '복합 연습', '🌻'),
  ('unit-kata-1', '가타카나 1', 5, 'アイウエオ — 기초', '⭐'),
  ('unit-kata-2', '가타카나 2', 6, '탁음·반탁음', '✨'),
  ('unit-kata-3', '가타카나 3', 7, '요음·외래어', '💫'),
  ('unit-vocab-greet', '어휘: 인사', 8, '기본 인사 표현', '👋'),
  ('unit-vocab-num', '어휘: 숫자', 9, '1~10 숫자', '🔢'),
  ('unit-vocab-daily', '어휘: 일상', 10, '기초 일상 단어 30개', '📚')
;

-- 2. 레슨(lessons) 삽입 예시 (히라가나 1 기준)
insert into lessons (id, unit_id, title, order_index) values
  ('lesson-hira-1-1', 'unit-hira-1', 'あいうえお', 1),
  ('lesson-hira-1-2', 'unit-hira-1', 'かきくけこ', 2),
  ('lesson-hira-1-3', 'unit-hira-1', 'さしすせそ～なにぬねの', 3),
  ('lesson-hira-1-4', 'unit-hira-1', 'はひふへほ～わをん', 4)
;

-- 3. 문제(exercises) 삽입 — MCQ 예시
insert into exercises (lesson_id, type, question_text, choices, correct_answer, order_index) values
  ('lesson-hira-1-1', 'mcq', '「あ」의 로마자 발음은?',
   '["a", "i", "u", "e"]'::jsonb, 'a', 1),
  ('lesson-hira-1-1', 'mcq', '「い」의 로마자 발음은?',
   '["a", "i", "u", "o"]'::jsonb, 'i', 2),
  ('lesson-hira-1-1', 'mcq', '로마자 "u"에 해당하는 히라가나는?',
   '["あ", "い", "う", "え"]'::jsonb, 'う', 3),
  ('lesson-hira-1-1', 'mcq', '「え」를 로마자로 쓰면?',
   '["a", "e", "o", "i"]'::jsonb, 'e', 4),
  ('lesson-hira-1-1', 'mcq', '「お」의 로마자 발음은?',
   '["a", "u", "e", "o"]'::jsonb, 'o', 5)
;

-- 4. 문제(exercises) 삽입 — KanaInput 예시
insert into exercises (lesson_id, type, question_text, correct_answer, order_index) values
  ('lesson-hira-1-1', 'kana_input', '"a"를 히라가나로 입력하세요', 'あ', 6),
  ('lesson-hira-1-1', 'kana_input', '"i"를 히라가나로 입력하세요', 'い', 7),
  ('lesson-hira-1-1', 'kana_input', '"u"를 히라가나로 입력하세요', 'う', 8)
;
```

## 히라가나 발음 기준표

```
あ=a  い=i  う=u  え=e  お=o
か=ka き=ki く=ku け=ke こ=ko
さ=sa し=shi す=su せ=se そ=so
た=ta ち=chi つ=tsu て=te と=to
な=na に=ni ぬ=nu ね=ne の=no
は=ha ひ=hi ふ=fu へ=he ほ=ho
ま=ma み=mi む=mu め=me も=mo
や=ya        ゆ=yu        よ=yo
ら=ra り=ri る=ru れ=re ろ=ro
わ=wa              を=wo  ん=n
--- 탁음 ---
が=ga ぎ=gi ぐ=gu げ=ge ご=go
ざ=za じ=ji ず=zu ぜ=ze ぞ=zo
だ=da ぢ=ji づ=zu で=de ど=do
ば=ba び=bi ぶ=bu べ=be ぼ=bo
ぱ=pa ぴ=pi ぷ=pu ぺ=pe ぽ=po
--- 요음 (일부) ---
きゃ=kya きゅ=kyu きょ=kyo
しゃ=sha しゅ=shu しょ=sho
ちゃ=cha ちゅ=chu ちょ=cho
```

## 문제 생성 원칙
1. 레슨당 8문제 (MCQ 5개 + KanaInput 3개 기본)
2. MCQ 4지선다: 정답 1개 + 오답 3개 (비슷한 발음으로 선택)
3. KanaInput: 해당 레슨에서 배운 글자만 출제
4. 난이도: 순서 초반(order_index 1~3)은 단순, 후반(6~8)은 혼합 출제
5. MCQ choices 순서: 정답 위치를 랜덤하게 배치 (항상 첫 번째 금지)

## 마이그레이션 파일 위치
`supabase/migrations/YYYYMMDDHHMMSS_seed_[unit-name].sql`

예시:
- `20250601000000_seed_hiragana_1.sql`
- `20250608000000_seed_hiragana_2.sql`
- `20250615000000_seed_katakana.sql`
- `20250622000000_seed_vocabulary.sql`

## 검증 체크리스트
- [ ] 모든 exercises에 유효한 lesson_id 연결
- [ ] MCQ choices는 `jsonb` 배열 (반드시 `'[...]'::jsonb`)
- [ ] MCQ correct_answer가 choices 배열 안의 값과 정확히 일치
- [ ] KanaInput correct_answer가 실제 가나 문자 (로마자 금지)
- [ ] 레슨당 order_index 1~8, 중복 없음
- [ ] 단원당 order_index 중복 없음
