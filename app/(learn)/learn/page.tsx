import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createSupabaseServer } from "@/lib/supabase/server";

type UnitCard = {
  id: string;
  title: string;
  lessonCount: number;
  progress: number; // 0–100
  href: string;
};

export default async function LearnPage() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [{ data: units }, { data: lessons }, { data: progress }] =
    await Promise.all([
      supabase.from("units").select("id, sort_order, title").order("sort_order"),
      supabase
        .from("lessons")
        .select("id, unit_id, sort_order")
        .order("sort_order"),
      supabase
        .from("user_lesson_progress")
        .select("lesson_id")
        .eq("user_id", user.id),
    ]);

  const completedIds = new Set((progress ?? []).map((p) => p.lesson_id));

  const unitCards: UnitCard[] = (units ?? []).map((unit) => {
    // lessons는 sort_order 순으로 정렬되어 있으므로 단원별 첫 미완료 레슨을 그대로 찾는다.
    const unitLessons = (lessons ?? []).filter(
      (lesson) => lesson.unit_id === unit.id,
    );
    const lessonCount = unitLessons.length;
    const completedCount = unitLessons.filter((lesson) =>
      completedIds.has(lesson.id),
    ).length;
    const progressPct =
      lessonCount === 0 ? 0 : Math.round((completedCount / lessonCount) * 100);

    const firstIncomplete = unitLessons.find(
      (lesson) => !completedIds.has(lesson.id),
    );
    const target = firstIncomplete ?? unitLessons[0];
    const href = target ? `/lesson/${target.id}` : "#";

    return {
      id: unit.id,
      title: unit.title,
      lessonCount,
      progress: progressPct,
      href,
    };
  });

  if (unitCards.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <p className="font-jp-display text-4xl text-primary">わんわん</p>
        <p className="mt-4 text-lg font-bold">코니가 기다리고 있어요</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">학습</h1>

      <ul className="flex flex-col gap-3">
        {unitCards.map((unit) => (
          <li key={unit.id}>
            <Link
              href={unit.href}
              aria-disabled={unit.lessonCount === 0 || undefined}
              className="block"
            >
              <Card className="transition-shadow hover:ring-foreground/20">
                <CardContent className="flex items-center gap-4">
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-base font-bold">
                        {unit.title}
                      </span>
                      <span className="shrink-0 text-sm text-muted-foreground">
                        레슨 {unit.lessonCount}개
                      </span>
                    </div>
                    <Progress
                      value={unit.progress}
                      aria-label={`${unit.title} 진행도 ${unit.progress}%`}
                    />
                  </div>
                  <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
