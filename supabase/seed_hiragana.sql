-- W6 히라가나 시드 데이터
-- 4 units / 15 lessons / 120 exercises (lesson당 8개: MCQ 5 + input 3)
-- gen_random_uuid() 로 ID 생성, CTE 체인으로 FK 연결.
-- units.sort_order, lessons(unit_id, sort_order), exercises(lesson_id, sort_order)
-- 에 unique 제약이 걸려 있어 ON CONFLICT DO NOTHING 으로 재실행 안전성 확보.

-- ============================================================
-- Unit 1: 히라가나 1 (あ~さ行)
-- ============================================================
WITH
  u AS (
    INSERT INTO units (id, sort_order, title, description)
    VALUES (gen_random_uuid(), 1, '히라가나 1', 'あ~さ行')
    ON CONFLICT (sort_order) DO NOTHING
    RETURNING id
  ),
  l1 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 1, 'あ行 (あいうえお)' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l2 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 2, 'か行 (かきくけこ)' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l3 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 3, 'さ行 (さしすせそ)' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l4 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 4, 'あ~さ行 복습' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  )
INSERT INTO exercises (id, lesson_id, sort_order, exercise_type, prompt, correct_answer, options)
-- Lesson 1: あ行
SELECT gen_random_uuid(), id, 1, 'mcq', '「あ」의 발음은?', 'a', '["a","i","u","e"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「い」의 발음은?', 'i', '["a","i","u","e"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「う」의 발음은?', 'u', '["u","o","a","e"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''e''에 해당하는 히라가나는?', 'え', '["え","お","あ","い"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''o''에 해당하는 히라가나는?', 'お', '["お","う","あ","え"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"a"를 히라가나로 입력하세요', 'あ', NULL FROM l1
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"u"를 히라가나로 입력하세요', 'う', NULL FROM l1
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"o"를 히라가나로 입력하세요', 'お', NULL FROM l1
-- Lesson 2: か行
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「か」의 발음은?', 'ka', '["ka","ki","ku","ke"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「き」의 발음은?', 'ki', '["ki","ka","ko","ku"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「く」의 발음은?', 'ku', '["ku","ke","ka","ki"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''ke''에 해당하는 히라가나는?', 'け', '["け","こ","か","き"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''ko''에 해당하는 히라가나는?', 'こ', '["こ","く","か","け"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"ka"를 히라가나로 입력하세요', 'か', NULL FROM l2
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"ki"를 히라가나로 입력하세요', 'き', NULL FROM l2
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"ko"를 히라가나로 입력하세요', 'こ', NULL FROM l2
-- Lesson 3: さ行
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「さ」의 발음은?', 'sa', '["sa","shi","su","se"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「し」의 발음은?', 'shi', '["shi","sa","so","su"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「す」의 발음은?', 'su', '["su","se","sa","shi"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''se''에 해당하는 히라가나는?', 'せ', '["せ","そ","さ","し"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''so''에 해당하는 히라가나는?', 'そ', '["そ","す","さ","せ"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"sa"를 히라가나로 입력하세요', 'さ', NULL FROM l3
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"shi"를 히라가나로 입력하세요', 'し', NULL FROM l3
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"so"를 히라가나로 입력하세요', 'そ', NULL FROM l3
-- Lesson 4: あ~さ行 복습 (mixed MCQ)
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「え」의 발음은?', 'e', '["e","a","i","o"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「き」의 발음은?', 'ki', '["ki","ka","ku","sa"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「す」의 발음은?', 'su', '["su","shi","sa","ku"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''ka''에 해당하는 히라가나는?', 'か', '["か","き","さ","あ"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''i''에 해당하는 히라가나는?', 'い', '["い","う","え","き"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"sa"를 히라가나로 입력하세요', 'さ', NULL FROM l4
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"ke"를 히라가나로 입력하세요', 'け', NULL FROM l4
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"u"를 히라가나로 입력하세요', 'う', NULL FROM l4
ON CONFLICT (lesson_id, sort_order) DO NOTHING;

-- ============================================================
-- Unit 2: 히라가나 2 (た~は行)
-- ============================================================
WITH
  u AS (
    INSERT INTO units (id, sort_order, title, description)
    VALUES (gen_random_uuid(), 2, '히라가나 2', 'た~は行')
    ON CONFLICT (sort_order) DO NOTHING
    RETURNING id
  ),
  l1 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 1, 'た行 (たちつてと)' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l2 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 2, 'な行 (なにぬねの)' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l3 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 3, 'は行 (はひふへほ)' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l4 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 4, 'た~は行 복습' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  )
INSERT INTO exercises (id, lesson_id, sort_order, exercise_type, prompt, correct_answer, options)
-- Lesson 1: た行
SELECT gen_random_uuid(), id, 1, 'mcq', '「た」의 발음은?', 'ta', '["ta","chi","tsu","te"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「ち」의 발음은?', 'chi', '["chi","ta","to","tsu"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「つ」의 발음은?', 'tsu', '["tsu","te","ta","chi"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''te''에 해당하는 히라가나는?', 'て', '["て","と","た","ち"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''to''에 해당하는 히라가나는?', 'と', '["と","つ","た","て"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"ta"를 히라가나로 입력하세요', 'た', NULL FROM l1
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"tsu"를 히라가나로 입력하세요', 'つ', NULL FROM l1
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"to"를 히라가나로 입력하세요', 'と', NULL FROM l1
-- Lesson 2: な行
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「な」의 발음은?', 'na', '["na","ni","nu","ne"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「に」의 발음은?', 'ni', '["ni","na","no","nu"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「ぬ」의 발음은?', 'nu', '["nu","ne","na","ni"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''ne''에 해당하는 히라가나는?', 'ね', '["ね","の","な","に"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''no''에 해당하는 히라가나는?', 'の', '["の","ぬ","な","ね"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"na"를 히라가나로 입력하세요', 'な', NULL FROM l2
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"ni"를 히라가나로 입력하세요', 'に', NULL FROM l2
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"no"를 히라가나로 입력하세요', 'の', NULL FROM l2
-- Lesson 3: は行
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「は」의 발음은?', 'ha', '["ha","hi","fu","he"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「ひ」의 발음은?', 'hi', '["hi","ha","ho","fu"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「ふ」의 발음은?', 'fu', '["fu","he","ha","hi"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''he''에 해당하는 히라가나는?', 'へ', '["へ","ほ","は","ひ"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''ho''에 해당하는 히라가나는?', 'ほ', '["ほ","ふ","は","へ"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"ha"를 히라가나로 입력하세요', 'は', NULL FROM l3
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"fu"를 히라가나로 입력하세요', 'ふ', NULL FROM l3
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"ho"를 히라가나로 입력하세요', 'ほ', NULL FROM l3
-- Lesson 4: た~は行 복습 (mixed MCQ)
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「ち」의 발음은?', 'chi', '["chi","ti","shi","tsu"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「ぬ」의 발음은?', 'nu', '["nu","ne","mu","no"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「ふ」의 발음은?', 'fu', '["fu","hu","he","tsu"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''na''에 해당하는 히라가나는?', 'な', '["な","に","た","は"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''to''에 해당하는 히라가나는?', 'と', '["と","て","の","ほ"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"hi"를 히라가나로 입력하세요', 'ひ', NULL FROM l4
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"te"를 히라가나로 입력하세요', 'て', NULL FROM l4
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"ne"를 히라가나로 입력하세요', 'ね', NULL FROM l4
ON CONFLICT (lesson_id, sort_order) DO NOTHING;

-- ============================================================
-- Unit 3: 히라가나 3 (ま~わ行+ん)
-- ============================================================
WITH
  u AS (
    INSERT INTO units (id, sort_order, title, description)
    VALUES (gen_random_uuid(), 3, '히라가나 3', 'ま~わ行+ん')
    ON CONFLICT (sort_order) DO NOTHING
    RETURNING id
  ),
  l1 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 1, 'ま行・や行 (まみむめも、やゆよ)' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l2 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 2, 'ら行 (らりるれろ)' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l3 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 3, 'わ行・ん (わをん)' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l4 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 4, 'ま~ん 복습' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  )
INSERT INTO exercises (id, lesson_id, sort_order, exercise_type, prompt, correct_answer, options)
-- Lesson 1: ま行・や行
SELECT gen_random_uuid(), id, 1, 'mcq', '「ま」의 발음은?', 'ma', '["ma","mi","mu","me"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「み」의 발음은?', 'mi', '["mi","ma","mo","mu"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「む」의 발음은?', 'mu', '["mu","me","ma","mi"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '「や」의 발음은?', 'ya', '["ya","yu","yo","ma"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''yo''에 해당하는 히라가나는?', 'よ', '["よ","ゆ","や","も"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"mo"를 히라가나로 입력하세요', 'も', NULL FROM l1
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"yu"를 히라가나로 입력하세요', 'ゆ', NULL FROM l1
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"me"를 히라가나로 입력하세요', 'め', NULL FROM l1
-- Lesson 2: ら行
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「ら」의 발음은?', 'ra', '["ra","ri","ru","re"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「り」의 발음은?', 'ri', '["ri","ra","ro","ru"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「る」의 발음은?', 'ru', '["ru","re","ra","ri"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''re''에 해당하는 히라가나는?', 'れ', '["れ","ろ","ら","り"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''ro''에 해당하는 히라가나는?', 'ろ', '["ろ","る","ら","れ"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"ra"를 히라가나로 입력하세요', 'ら', NULL FROM l2
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"ri"를 히라가나로 입력하세요', 'り', NULL FROM l2
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"ro"를 히라가나로 입력하세요', 'ろ', NULL FROM l2
-- Lesson 3: わ行・ん
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「わ」의 발음은?', 'wa', '["wa","wo","n","ra"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「を」의 발음은?', 'wo', '["wo","wa","o","n"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「ん」의 발음은?', 'n', '["n","wa","wo","mu"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''wa''에 해당하는 히라가나는?', 'わ', '["わ","を","ん","ら"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''n''에 해당하는 히라가나는?', 'ん', '["ん","わ","を","む"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"wa"를 히라가나로 입력하세요', 'わ', NULL FROM l3
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"wo"를 히라가나로 입력하세요', 'を', NULL FROM l3
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"n"을 히라가나로 입력하세요', 'ん', NULL FROM l3
-- Lesson 4: ま~ん 복습 (mixed MCQ)
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「む」의 발음은?', 'mu', '["mu","nu","me","mi"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「ゆ」의 발음은?', 'yu', '["yu","ya","yo","ru"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「る」의 발음은?', 'ru', '["ru","ra","ro","wo"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '''ma''에 해당하는 히라가나는?', 'ま', '["ま","み","も","ら"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''ri''에 해당하는 히라가나는?', 'り', '["り","ら","る","み"]' FROM l4
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"mo"를 히라가나로 입력하세요', 'も', NULL FROM l4
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"yo"를 히라가나로 입력하세요', 'よ', NULL FROM l4
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"re"를 히라가나로 입력하세요', 'れ', NULL FROM l4
ON CONFLICT (lesson_id, sort_order) DO NOTHING;

-- ============================================================
-- Unit 4: 히라가나 4 (탁음·반탁음·요음)
-- ============================================================
WITH
  u AS (
    INSERT INTO units (id, sort_order, title, description)
    VALUES (gen_random_uuid(), 4, '히라가나 4', '탁음·반탁음·요음')
    ON CONFLICT (sort_order) DO NOTHING
    RETURNING id
  ),
  l1 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 1, '탁음 (が·ざ·だ·ば行)' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l2 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 2, '반탁음 + 요음 1 (ぱ行 + きゃ/しゃ/ちゃ)' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  ),
  l3 AS (
    INSERT INTO lessons (id, unit_id, sort_order, title)
    SELECT gen_random_uuid(), id, 3, '요음 2 (にゃ/ひゃ/みゃ/りゃ)' FROM u
    ON CONFLICT (unit_id, sort_order) DO NOTHING
    RETURNING id
  )
INSERT INTO exercises (id, lesson_id, sort_order, exercise_type, prompt, correct_answer, options)
-- Lesson 1: 탁음 (が·ざ·だ·ば行)
SELECT gen_random_uuid(), id, 1, 'mcq', '「が」의 발음은?', 'ga', '["ga","gi","gu","ka"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「ざ」의 발음은?', 'za', '["za","ji","zu","sa"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「だ」의 발음은?', 'da', '["da","ji","zu","ta"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '「ば」의 발음은?', 'ba', '["ba","bi","bu","ha"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''go''에 해당하는 히라가나는?', 'ご', '["ご","こ","ぞ","ど"]' FROM l1
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"ga"를 히라가나로 입력하세요', 'が', NULL FROM l1
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"za"를 히라가나로 입력하세요', 'ざ', NULL FROM l1
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"bu"를 히라가나로 입력하세요', 'ぶ', NULL FROM l1
-- Lesson 2: 반탁음 + 요음 1
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「ぱ」의 발음은?', 'pa', '["pa","pi","pu","ba"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「ぽ」의 발음은?', 'po', '["po","pu","pa","bo"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「きゃ」의 발음은?', 'kya', '["kya","kyu","kyo","ka"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '「しゃ」의 발음은?', 'sha', '["sha","shu","sho","sa"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '「ちゃ」의 발음은?', 'cha', '["cha","chu","cho","ta"]' FROM l2
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"pa"를 히라가나로 입력하세요', 'ぱ', NULL FROM l2
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"kya"를 히라가나로 입력하세요', 'きゃ', NULL FROM l2
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"sho"를 히라가나로 입력하세요', 'しょ', NULL FROM l2
-- Lesson 3: 요음 2
UNION ALL SELECT gen_random_uuid(), id, 1, 'mcq', '「にゃ」의 발음은?', 'nya', '["nya","nyu","nyo","na"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 2, 'mcq', '「ひゃ」의 발음은?', 'hya', '["hya","hyu","hyo","ha"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 3, 'mcq', '「みゃ」의 발음은?', 'mya', '["mya","myu","myo","ma"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 4, 'mcq', '「りゃ」의 발음은?', 'rya', '["rya","ryu","ryo","ra"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 5, 'mcq', '''ryo''에 해당하는 히라가나는?', 'りょ', '["りょ","りゅ","りゃ","にょ"]' FROM l3
UNION ALL SELECT gen_random_uuid(), id, 6, 'input', '"nya"를 히라가나로 입력하세요', 'にゃ', NULL FROM l3
UNION ALL SELECT gen_random_uuid(), id, 7, 'input', '"hyu"를 히라가나로 입력하세요', 'ひゅ', NULL FROM l3
UNION ALL SELECT gen_random_uuid(), id, 8, 'input', '"mya"를 히라가나로 입력하세요', 'みゃ', NULL FROM l3
ON CONFLICT (lesson_id, sort_order) DO NOTHING;
