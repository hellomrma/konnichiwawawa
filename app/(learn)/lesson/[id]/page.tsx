import { redirect } from "next/navigation";

import { LessonPlayer } from "@/components/lesson/LessonPlayer";
import type { Exercise } from "@/components/exercise/types";
import { createSupabaseServer } from "@/lib/supabase/server";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: rows } = await supabase
    .from("exercises")
    .select(
      "id, lesson_id, sort_order, exercise_type, prompt, correct_answer, options",
    )
    .eq("lesson_id", id)
    .order("sort_order");

  if (!rows || rows.length === 0) redirect("/learn");

  const exercises: Exercise[] = rows.map((row) => ({
    id: row.id,
    lessonId: row.lesson_id,
    sortOrder: row.sort_order,
    exerciseType: row.exercise_type,
    prompt: row.prompt,
    correctAnswer: row.correct_answer,
    options: row.options as string[] | null,
  }));

  return <LessonPlayer lessonId={id} exercises={exercises} />;
}
