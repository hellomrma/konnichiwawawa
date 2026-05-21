-- W8 어휘 시드 데이터
-- 3 units / 6 lessons / 48 exercises
-- sort_order=8,9,10 (히라가나 1~4, 가타카나 5~7에 이어서)

-- ============================================================
-- Unit 8: 인사 어휘
-- ============================================================
WITH
  u AS (
    INSERT INTO units (id, sort_order, title, description)
    VALUES (gen_random_uuid(), 8, '인사 어휘', '기본 인사말 10개')
    ON CONFLICT (sort_order) DO NOTHING
    RETURNING id
  ),
  l1 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 1, '기본 인사' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l2 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 2, '인사 복습' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  )
INSERT INTO exercises (id, lesson_id, sort_order, exercise_type, prompt, correct_answer, options)
-- Lesson 1: 기본 인사 (MCQ 5 + input 3)
SELECT gen_random_uuid(), id, 1, 'mcq', '「こんにちは」의 뜻은?', '안녕하세요', '["안녕하세요","고마워요","실례합니다","안녕히 가세요"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「ありがとう」의 뜻은?', '고마워요', '["고마워요","미안합니다","어서요","네"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「すみません」의 뜻은?', '실례합니다', '["실례합니다","고마워요","아니오","어서요"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '"안녕하세요"(아침)를 일본어로?', 'おはよう', '["おはよう","こんにちは","こんばんは","さようなら"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '"안녕하세요"(저녁)를 일본어로?', 'こんばんは', '["こんばんは","おはよう","こんにちは","ありがとう"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '「네」를 일본어로 입력하세요', 'はい', NULL FROM l1
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '「아니오」를 일본어로 입력하세요', 'いいえ', NULL FROM l1
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '「어서요」를 일본어로 입력하세요', 'どうぞ', NULL FROM l1
-- Lesson 2: 인사 복습 (MCQ 6 + input 2)
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「こんばんは」의 뜻은?', '안녕하세요', '["안녕하세요","고마워요","미안합니다","네"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「ごめんなさい」의 뜻은?', '미안합니다', '["미안합니다","고마워요","어서요","안녕히 가세요"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「さようなら」의 뜻은?', '안녕히 가세요', '["안녕히 가세요","안녕하세요","고마워요","아니오"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '「はい」의 뜻은?', '네', '["네","아니오","어서요","미안합니다"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '"고마워요"를 일본어로?', 'ありがとう', '["ありがとう","すみません","ごめんなさい","どうぞ"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 6, 'mcq', '"실례합니다"를 일본어로?', 'すみません', '["すみません","ありがとう","ごめんなさい","さようなら"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '「고마워요」를 일본어로 입력하세요', 'ありがとう', NULL FROM l2
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '「안녕히 가세요」를 일본어로 입력하세요', 'さようなら', NULL FROM l2
ON CONFLICT (lesson_id, sort_order) DO NOTHING;

-- ============================================================
-- Unit 9: 숫자 1~10
-- ============================================================
WITH
  u AS (
    INSERT INTO units (id, sort_order, title, description)
    VALUES (gen_random_uuid(), 9, '숫자 1~10', '일본어 숫자')
    ON CONFLICT (sort_order) DO NOTHING
    RETURNING id
  ),
  l1 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 1, '숫자 1~10' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  )
INSERT INTO exercises (id, lesson_id, sort_order, exercise_type, prompt, correct_answer, options)
-- Lesson 1: 숫자 1~10 (MCQ 6 + input 2)
SELECT gen_random_uuid(), id, 1, 'mcq', '「いち」의 뜻은?', '1', '["1","2","3","4"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「に」의 뜻은?', '2', '["2","1","4","5"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「ろく」의 뜻은?', '6', '["6","5","7","8"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '숫자 5를 일본어로?', 'ご', '["ご","ろく","なな","はち"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '숫자 9를 일본어로?', 'きゅう', '["きゅう","じゅう","はち","なな"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 6, 'mcq', '숫자 10을 일본어로?', 'じゅう', '["じゅう","きゅう","はち","ご"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '숫자 1을 일본어로 입력하세요', 'いち', NULL FROM l1
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '숫자 3을 일본어로 입력하세요', 'さん', NULL FROM l1
ON CONFLICT (lesson_id, sort_order) DO NOTHING;

-- ============================================================
-- Unit 10: 일상 어휘 (음식·요일·가족)
-- ============================================================
WITH
  u AS (
    INSERT INTO units (id, sort_order, title, description)
    VALUES (gen_random_uuid(), 10, '일상 어휘', '음식·요일·가족')
    ON CONFLICT (sort_order) DO NOTHING
    RETURNING id
  ),
  l1 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 1, '음식 어휘' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l2 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 2, '요일' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l3 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 3, '가족' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  )
INSERT INTO exercises (id, lesson_id, sort_order, exercise_type, prompt, correct_answer, options)
-- Lesson 1: 음식 어휘 (MCQ 6 + input 2)
SELECT gen_random_uuid(), id, 1, 'mcq', '「すし」의 뜻은?', '초밥', '["초밥","물","밥","생선"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「さかな」의 뜻은?', '생선', '["생선","고기","달걀","밥"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「たまご」의 뜻은?', '달걀', '["달걀","빵","물","고기"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '"빵"을 일본어로?', 'パン', '["パン","ラーメン","ごはん","すし"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '"라면"을 일본어로?', 'ラーメン', '["ラーメン","パン","さかな","みず"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 6, 'mcq', '"밥"을 일본어로?', 'ごはん', '["ごはん","にく","すし","たまご"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '「물」을 일본어로 입력하세요', 'みず', NULL FROM l1
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '「고기」를 일본어로 입력하세요', 'にく', NULL FROM l1
-- Lesson 2: 요일 (MCQ 8)
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「げつようび」의 뜻은?', '월요일', '["월요일","화요일","수요일","목요일"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「かようび」의 뜻은?', '화요일', '["화요일","월요일","수요일","금요일"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「すいようび」의 뜻은?', '수요일', '["수요일","화요일","목요일","토요일"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '「もくようび」의 뜻은?', '목요일', '["목요일","수요일","금요일","일요일"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '"금요일"을 일본어로?', 'きんようび', '["きんようび","もくようび","どようび","にちようび"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 6, 'mcq', '"토요일"을 일본어로?', 'どようび', '["どようび","にちようび","きんようび","げつようび"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 7, 'mcq', '"일요일"을 일본어로?', 'にちようび', '["にちようび","どようび","げつようび","かようび"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 8, 'mcq', '「どようび」의 뜻은?', '토요일', '["토요일","일요일","금요일","월요일"]' FROM l2
-- Lesson 3: 가족 (MCQ 6 + input 2)
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「おかあさん」의 뜻은?', '어머니', '["어머니","아버지","언니/누나","형/오빠"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「おとうさん」의 뜻은?', '아버지', '["아버지","어머니","남동생","여동생"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「おにいさん」의 뜻은?', '형/오빠', '["형/오빠","언니/누나","아버지","남동생"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '「おねえさん」의 뜻은?', '언니/누나', '["언니/누나","형/오빠","어머니","여동생"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '"어머니"를 일본어로?', 'おかあさん', '["おかあさん","おとうさん","おにいさん","おねえさん"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 6, 'mcq', '"아버지"를 일본어로?', 'おとうさん', '["おとうさん","おかあさん","おとうと","いもうと"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '「여동생」을 일본어로 입력하세요', 'いもうと', NULL FROM l3
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '「남동생」을 일본어로 입력하세요', 'おとうと', NULL FROM l3
ON CONFLICT (lesson_id, sort_order) DO NOTHING;
