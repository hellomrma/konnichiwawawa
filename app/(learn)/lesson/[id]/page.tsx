import { redirect } from "next/navigation";

import { LessonPlayer } from "@/components/lesson/LessonPlayer";
import type { Exercise } from "@/components/exercise/types";
import { createSupabaseServer } from "@/lib/supabase/server";

// W3 더미 데이터 — 실제 DB(exercises 테이블) 연결은 후속 작업(W6–W8).
function buildDummyExercises(lessonId: string): Exercise[] {
  return [
    {
      id: "ex-1",
      lessonId,
      sortOrder: 1,
      exerciseType: "mcq",
      prompt: "「あ」의 발음은?",
      correctAnswer: "a",
      options: ["a", "i", "u", "e"],
    },
    {
      id: "ex-2",
      lessonId,
      sortOrder: 2,
      exerciseType: "mcq",
      prompt: "「い」의 발음은?",
      correctAnswer: "i",
      options: ["a", "i", "u", "o"],
    },
    {
      id: "ex-3",
      lessonId,
      sortOrder: 3,
      exerciseType: "mcq",
      prompt: "「う」의 발음은?",
      correctAnswer: "u",
      options: ["u", "e", "a", "o"],
    },
    {
      id: "ex-4",
      lessonId,
      sortOrder: 4,
      exerciseType: "mcq",
      prompt: "「え」의 발음은?",
      correctAnswer: "e",
      options: ["i", "e", "o", "a"],
    },
    {
      id: "ex-5",
      lessonId,
      sortOrder: 5,
      exerciseType: "mcq",
      prompt: "「お」의 발음은?",
      correctAnswer: "o",
      options: ["u", "a", "o", "e"],
    },
    {
      id: "ex-6",
      lessonId,
      sortOrder: 6,
      exerciseType: "mcq",
      prompt: "'ka'에 해당하는 히라가나는?",
      correctAnswer: "か",
      options: ["か", "き", "く", "こ"],
    },
    {
      id: "ex-7",
      lessonId,
      sortOrder: 7,
      exerciseType: "mcq",
      prompt: "'sa'에 해당하는 히라가나는?",
      correctAnswer: "さ",
      options: ["さ", "し", "す", "せ"],
    },
    {
      id: "ex-8",
      lessonId,
      sortOrder: 8,
      exerciseType: "mcq",
      prompt: "「な」의 발음은?",
      correctAnswer: "na",
      options: ["na", "ni", "nu", "ne"],
    },
  ];
}

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

  const exercises = buildDummyExercises(id);

  return <LessonPlayer lessonId={id} exercises={exercises} />;
}
