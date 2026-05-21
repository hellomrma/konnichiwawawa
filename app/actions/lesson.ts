"use server";

import { createSupabaseServer } from "@/lib/supabase/server";
import { updateStreakOnLessonComplete } from "@/lib/gamification/streak";

export async function completeLesson(input: {
  lessonId: string;
  results: { exerciseId: string; correct: boolean }[];
}): Promise<{ xp: number; newStreak: number }> {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { lessonId, results } = input;
  const correctCount = results.filter((r) => r.correct).length;
  const totalCount = results.length;
  const isAllCorrect = totalCount > 0 && correctCount === totalCount;

  // 기존 진도 확인 (첫 완주 여부 / attempts 누적용)
  const { data: existing } = await supabase
    .from("user_lesson_progress")
    .select("best_score, attempts")
    .eq("user_id", user.id)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  // 첫 100% 정답률 보너스: 이전 기록이 없고(best_score null) 전부 맞을 때
  const isFirstPerfect = isAllCorrect && existing?.best_score == null;
  const xp = correctCount * 10 + 50 + (isFirstPerfect ? 20 : 0);

  // 진도 upsert (PK: user_id + lesson_id)
  const newBestScore =
    existing?.best_score != null
      ? Math.max(existing.best_score, correctCount)
      : correctCount;
  const nextAttempts = (existing?.attempts ?? 0) + 1;

  await supabase.from("user_lesson_progress").upsert({
    user_id: user.id,
    lesson_id: lessonId,
    completed_at: new Date().toISOString(),
    best_score: newBestScore,
    attempts: nextAttempts,
  });

  // XP 누적 (increment_xp RPC 미존재 → 직접 update)
  const { data: xpProfile } = await supabase
    .from("profiles")
    .select("current_xp")
    .eq("id", user.id)
    .single();
  await supabase
    .from("profiles")
    .update({ current_xp: (xpProfile?.current_xp ?? 0) + xp })
    .eq("id", user.id);

  // Streak 업데이트
  await updateStreakOnLessonComplete(user.id);

  // 최신 streak 조회
  const { data: profile } = await supabase
    .from("profiles")
    .select("current_streak")
    .eq("id", user.id)
    .single();

  return { xp, newStreak: profile?.current_streak ?? 0 };
}
