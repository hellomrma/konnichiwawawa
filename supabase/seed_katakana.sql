-- W7 가타카나 시드 데이터
-- 3 units / 12 lessons / 96 exercises (lesson당 8개: MCQ 5 + input 3)
-- gen_random_uuid() 로 ID 생성, CTE 체인으로 FK 연결.
-- units.sort_order=5,6,7 (히라가나 1~4에 이어서)
-- ON CONFLICT DO NOTHING 으로 재실행 안전성 확보.

-- ============================================================
-- Unit 5: 가타카나 1 (ア~サ行)
-- ============================================================
WITH
  u AS (
    INSERT INTO units (id, sort_order, title, description)
    VALUES (gen_random_uuid(), 5, '가타카나 1', 'ア~サ行')
    ON CONFLICT (sort_order) DO NOTHING
    RETURNING id
  ),
  l1 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 1, 'ア行 (アイウエオ)' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l2 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 2, 'カ行 (カキクケコ)' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l3 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 3, 'サ行 (サシスセソ)' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l4 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 4, 'ア~サ行 복습' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  )
INSERT INTO exercises (id, lesson_id, sort_order, exercise_type, prompt, correct_answer, options)
-- Lesson 1: ア行
SELECT gen_random_uuid(), id, 1, 'mcq', '「ア」의 발음은?', 'a', '["a","i","u","e"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「イ」의 발음은?', 'i', '["a","i","u","e"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「ウ」의 발음은?', 'u', '["u","o","a","e"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''e''에 해당하는 가타카나는?', 'エ', '["エ","オ","ア","イ"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''o''에 해당하는 가타카나는?', 'オ', '["オ","ウ","ア","エ"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"a"를 가타카나로 입력하세요', 'ア', NULL FROM l1
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"u"를 가타카나로 입력하세요', 'ウ', NULL FROM l1
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"o"를 가타카나로 입력하세요', 'オ', NULL FROM l1
-- Lesson 2: カ行
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「カ」의 발음은?', 'ka', '["ka","ki","ku","ke"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「キ」의 발음은?', 'ki', '["ki","ka","ko","ku"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「ク」의 발음은?', 'ku', '["ku","ke","ka","ki"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''ke''에 해당하는 가타카나는?', 'ケ', '["ケ","コ","カ","キ"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''ko''에 해당하는 가타카나는?', 'コ', '["コ","ク","カ","ケ"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"ka"를 가타카나로 입력하세요', 'カ', NULL FROM l2
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"ki"를 가타카나로 입력하세요', 'キ', NULL FROM l2
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"ko"를 가타카나로 입력하세요', 'コ', NULL FROM l2
-- Lesson 3: サ行
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「サ」의 발음은?', 'sa', '["sa","shi","su","se"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「シ」의 발음은?', 'shi', '["shi","sa","so","su"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「ス」의 발음은?', 'su', '["su","se","sa","shi"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''se''에 해당하는 가타카나는?', 'セ', '["セ","ソ","サ","シ"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''so''에 해당하는 가타카나는?', 'ソ', '["ソ","ス","サ","セ"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"sa"를 가타카나로 입력하세요', 'サ', NULL FROM l3
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"shi"를 가타카나로 입력하세요', 'シ', NULL FROM l3
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"so"를 가타카나로 입력하세요', 'ソ', NULL FROM l3
-- Lesson 4: ア~サ行 복습 (mixed MCQ)
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「エ」의 발음은?', 'e', '["e","a","i","o"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「キ」의 발음은?', 'ki', '["ki","ka","ku","sa"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「ス」의 발음은?', 'su', '["su","shi","sa","ku"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''ka''에 해당하는 가타카나는?', 'カ', '["カ","キ","サ","ア"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''i''에 해당하는 가타카나는?', 'イ', '["イ","ウ","エ","キ"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"sa"를 가타카나로 입력하세요', 'サ', NULL FROM l4
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"ke"를 가타카나로 입력하세요', 'ケ', NULL FROM l4
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"u"를 가타카나로 입력하세요', 'ウ', NULL FROM l4
ON CONFLICT (lesson_id, sort_order) DO NOTHING;

-- ============================================================
-- Unit 6: 가타카나 2 (タ~ハ行)
-- ============================================================
WITH
  u AS (
    INSERT INTO units (id, sort_order, title, description)
    VALUES (gen_random_uuid(), 6, '가타카나 2', 'タ~ハ行')
    ON CONFLICT (sort_order) DO NOTHING
    RETURNING id
  ),
  l1 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 1, 'タ行 (タチツテト)' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l2 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 2, 'ナ行 (ナニヌネノ)' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l3 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 3, 'ハ行 (ハヒフヘホ)' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l4 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 4, 'タ~ハ行 복습' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  )
INSERT INTO exercises (id, lesson_id, sort_order, exercise_type, prompt, correct_answer, options)
-- Lesson 1: タ行
SELECT gen_random_uuid(), id, 1, 'mcq', '「タ」의 발음은?', 'ta', '["ta","chi","tsu","te"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「チ」의 발음은?', 'chi', '["chi","ta","to","tsu"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「ツ」의 발음은?', 'tsu', '["tsu","te","ta","chi"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''te''에 해당하는 가타카나는?', 'テ', '["テ","ト","タ","チ"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''to''에 해당하는 가타카나는?', 'ト', '["ト","ツ","タ","テ"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"ta"를 가타카나로 입력하세요', 'タ', NULL FROM l1
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"tsu"를 가타카나로 입력하세요', 'ツ', NULL FROM l1
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"to"를 가타카나로 입력하세요', 'ト', NULL FROM l1
-- Lesson 2: ナ行
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「ナ」의 발음은?', 'na', '["na","ni","nu","ne"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「ニ」의 발음은?', 'ni', '["ni","na","no","nu"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「ヌ」의 발음은?', 'nu', '["nu","ne","na","ni"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''ne''에 해당하는 가타카나는?', 'ネ', '["ネ","ノ","ナ","ニ"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''no''에 해당하는 가타카나는?', 'ノ', '["ノ","ヌ","ナ","ネ"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"na"를 가타카나로 입력하세요', 'ナ', NULL FROM l2
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"ni"를 가타카나로 입력하세요', 'ニ', NULL FROM l2
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"no"를 가타카나로 입력하세요', 'ノ', NULL FROM l2
-- Lesson 3: ハ行
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「ハ」의 발음은?', 'ha', '["ha","hi","fu","he"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「ヒ」의 발음은?', 'hi', '["hi","ha","ho","fu"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「フ」의 발음은?', 'fu', '["fu","he","ha","hi"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''he''에 해당하는 가타카나는?', 'ヘ', '["ヘ","ホ","ハ","ヒ"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''ho''에 해당하는 가타카나는?', 'ホ', '["ホ","フ","ハ","ヘ"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"ha"를 가타카나로 입력하세요', 'ハ', NULL FROM l3
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"fu"를 가타카나로 입력하세요', 'フ', NULL FROM l3
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"ho"를 가타카나로 입력하세요', 'ホ', NULL FROM l3
-- Lesson 4: タ~ハ行 복습 (mixed MCQ)
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「チ」의 발음은?', 'chi', '["chi","ti","shi","tsu"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「ヌ」의 발음은?', 'nu', '["nu","ne","mu","no"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「フ」의 발음은?', 'fu', '["fu","hu","he","tsu"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''na''에 해당하는 가타카나는?', 'ナ', '["ナ","ニ","タ","ハ"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''to''에 해당하는 가타카나는?', 'ト', '["ト","テ","ノ","ホ"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"hi"를 가타카나로 입력하세요', 'ヒ', NULL FROM l4
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"te"를 가타카나로 입력하세요', 'テ', NULL FROM l4
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"ne"를 가타카나로 입력하세요', 'ネ', NULL FROM l4
ON CONFLICT (lesson_id, sort_order) DO NOTHING;

-- ============================================================
-- Unit 7: 가타카나 3 (マ~ワ行+ン)
-- ============================================================
WITH
  u AS (
    INSERT INTO units (id, sort_order, title, description)
    VALUES (gen_random_uuid(), 7, '가타카나 3', 'マ~ワ行+ン')
    ON CONFLICT (sort_order) DO NOTHING
    RETURNING id
  ),
  l1 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 1, 'マ行・ヤ行 (マミムメモ、ヤユヨ)' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l2 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 2, 'ラ行 (ラリルレロ)' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l3 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 3, 'ワ行・ン (ワヲン)' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l4 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 4, 'マ~ン 복습' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  )
INSERT INTO exercises (id, lesson_id, sort_order, exercise_type, prompt, correct_answer, options)
-- Lesson 1: マ行・ヤ行
SELECT gen_random_uuid(), id, 1, 'mcq', '「マ」의 발음은?', 'ma', '["ma","mi","mu","me"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「ミ」의 발음은?', 'mi', '["mi","ma","mo","mu"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「ム」의 발음은?', 'mu', '["mu","me","ma","mi"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '「ヤ」의 발음은?', 'ya', '["ya","yu","yo","ma"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''yo''에 해당하는 가타카나는?', 'ヨ', '["ヨ","ユ","ヤ","モ"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"mo"를 가타카나로 입력하세요', 'モ', NULL FROM l1
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"yu"를 가타카나로 입력하세요', 'ユ', NULL FROM l1
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"me"를 가타카나로 입력하세요', 'メ', NULL FROM l1
-- Lesson 2: ラ行
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「ラ」의 발음은?', 'ra', '["ra","ri","ru","re"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「リ」의 발음은?', 'ri', '["ri","ra","ro","ru"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「ル」의 발음은?', 'ru', '["ru","re","ra","ri"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''re''에 해당하는 가타카나는?', 'レ', '["レ","ロ","ラ","リ"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''ro''에 해당하는 가타카나는?', 'ロ', '["ロ","ル","ラ","レ"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"ra"를 가타카나로 입력하세요', 'ラ', NULL FROM l2
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"ri"를 가타카나로 입력하세요', 'リ', NULL FROM l2
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"ro"를 가타카나로 입력하세요', 'ロ', NULL FROM l2
-- Lesson 3: ワ行・ン
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「ワ」의 발음은?', 'wa', '["wa","wo","n","ra"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「ヲ」의 발음은?', 'wo', '["wo","wa","o","n"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「ン」의 발음은?', 'n', '["n","wa","wo","mu"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''wa''에 해당하는 가타카나는?', 'ワ', '["ワ","ヲ","ン","ラ"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''n''에 해당하는 가타카나는?', 'ン', '["ン","ワ","ソ","ム"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"wa"를 가타카나로 입력하세요', 'ワ', NULL FROM l3
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"wo"를 가타카나로 입력하세요', 'ヲ', NULL FROM l3
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"n"을 가타카나로 입력하세요', 'ン', NULL FROM l3
-- Lesson 4: マ~ン 복습 (mixed MCQ)
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「ム」의 발음은?', 'mu', '["mu","nu","me","mi"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「ユ」의 발음은?', 'yu', '["yu","ya","yo","ru"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「ル」의 발음은?', 'ru', '["ru","ra","ro","wo"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''ma''에 해당하는 가타카나는?', 'マ', '["マ","ミ","モ","ラ"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''ri''에 해당하는 가타카나는?', 'リ', '["リ","ラ","ル","ミ"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"mo"를 가타카나로 입력하세요', 'モ', NULL FROM l4
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"yo"를 가타카나로 입력하세요', 'ヨ', NULL FROM l4
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"re"를 가타카나로 입력하세요', 'レ', NULL FROM l4
ON CONFLICT (lesson_id, sort_order) DO NOTHING;
