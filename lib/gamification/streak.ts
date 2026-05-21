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
  if (profile.last_active_date === today) return; // 이미 오늘 처리됨

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
