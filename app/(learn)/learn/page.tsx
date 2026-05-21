import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createSupabaseServer } from "@/lib/supabase/server";

// W2 더미 데이터 — 실제 DB(units 테이블) 연결은 후속 작업(스펙 Section 11.1).
type Unit = {
  id: string;
  title: string;
  lessonCount: number;
  progress: number; // 0–100
};

const DUMMY_UNITS: Unit[] = [
  { id: "hira-1", title: "히라가나 1", lessonCount: 4, progress: 0 },
  { id: "hira-2", title: "히라가나 2", lessonCount: 3, progress: 0 },
  { id: "hira-3", title: "히라가나 3", lessonCount: 3, progress: 0 },
  { id: "hira-4", title: "히라가나 4", lessonCount: 3, progress: 0 },
  { id: "kata-1", title: "가타카나 1", lessonCount: 3, progress: 0 },
  { id: "kata-2", title: "가타카나 2", lessonCount: 3, progress: 0 },
  { id: "kata-3", title: "가타카나 3", lessonCount: 3, progress: 0 },
  { id: "vocab-greet", title: "어휘: 인사", lessonCount: 2, progress: 0 },
  { id: "vocab-num", title: "어휘: 숫자", lessonCount: 2, progress: 0 },
  { id: "vocab-daily", title: "어휘: 일상", lessonCount: 4, progress: 0 },
];

export default async function LearnPage() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const units = DUMMY_UNITS;

  if (units.length === 0) {
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
        {units.map((unit) => (
          <li key={unit.id}>
            <Link href="#" aria-disabled className="block">
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
