"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { McqExercise } from "@/components/exercise/McqExercise";
import { Koni } from "@/components/mascot/Koni";
import { Progress } from "@/components/ui/progress";
import type {
  Exercise,
  ExerciseResult,
  KoniExpression,
} from "@/components/exercise/types";
import { completeLesson } from "@/app/actions/lesson";

type LessonPlayerProps = {
  lessonId: string;
  exercises: Exercise[];
};

type Phase = "playing" | "complete";

// 결과 화면 전환 전, 마지막 문제의 정답/오답 피드백을 잠깐 더 보여준다.
const COMPLETE_DELAY_MS = 700;

export function LessonPlayer({ lessonId, exercises }: LessonPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const [phase, setPhase] = useState<Phase>("playing");
  const [koniExpression, setKoniExpression] = useState<KoniExpression>("idle");
  const [judged, setJudged] = useState(false);

  const total = exercises.length;
  const isLast = currentIndex >= total - 1;

  function handleSubmit(result: ExerciseResult) {
    setResults((prev) => [...prev, result]);
    setKoniExpression(result.correct ? "happy" : "sad");
    setJudged(true);

    if (isLast) {
      window.setTimeout(() => setPhase("complete"), COMPLETE_DELAY_MS);
    }
  }

  function handleNext() {
    setCurrentIndex((prev) => prev + 1);
    setKoniExpression("idle");
    setJudged(false);
  }

  if (phase === "complete") {
    return (
      <CompleteScreen
        lessonId={lessonId}
        results={results}
        total={total}
      />
    );
  }

  const current = exercises[currentIndex];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <Koni expression={koniExpression} size={50} />
        <Progress
          value={(currentIndex / total) * 100}
          aria-label={`진행도 ${currentIndex}/${total}`}
          className="flex-1"
        />
      </div>

      <McqExercise
        key={current.id}
        exercise={current}
        onSubmit={handleSubmit}
      />

      {judged && !isLast && (
        <button
          type="button"
          onClick={handleNext}
          style={{ boxShadow: "var(--shadow-btn)" }}
          className="self-end rounded-pill bg-primary px-8 py-3 text-base font-bold text-primary-foreground active:translate-y-[3px] active:[box-shadow:var(--shadow-btn-active)]"
        >
          다음
        </button>
      )}
    </div>
  );
}

function CompleteScreen({
  lessonId,
  results,
  total,
}: {
  lessonId: string;
  results: ExerciseResult[];
  total: number;
}) {
  const correctCount = results.filter((r) => r.correct).length;
  const allCorrect = total > 0 && correctCount === total;
  const xp = correctCount * 10 + 50 + (allCorrect ? 20 : 0);

  // 완료 기록은 백엔드(W8)에서 실제 DB에 반영된다. 실패해도 결과 UI는 그대로 보여준다.
  useCompleteLesson(lessonId, results);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <Koni expression="cheer" size={80} />

      <p className="font-jp-display text-3xl text-primary">오늘도 한 발짝!</p>

      <div className="flex flex-col items-center gap-1">
        <span className="text-sm text-muted-foreground">획득 XP</span>
        <span className="text-4xl font-bold tabular-nums text-accent">
          +{xp}
        </span>
        <span className="text-sm text-muted-foreground">
          {correctCount} / {total} 정답
          {allCorrect && " · 만점 보너스 +20"}
        </span>
      </div>

      <Link
        href="/learn"
        style={{ boxShadow: "var(--shadow-btn)" }}
        className="rounded-pill bg-primary px-8 py-3 text-base font-bold text-primary-foreground active:translate-y-[3px] active:[box-shadow:var(--shadow-btn-active)]"
      >
        학습으로 돌아가기
      </Link>
    </div>
  );
}

// 완료 화면 마운트 시 한 번만 Server Action을 호출한다.
function useCompleteLesson(lessonId: string, results: ExerciseResult[]) {
  const sentRef = useRef(false);

  useEffect(() => {
    if (sentRef.current) return;
    sentRef.current = true;

    completeLesson({
      lessonId,
      results: results.map((r) => ({
        exerciseId: r.exerciseId,
        correct: r.correct,
      })),
    }).catch(() => {
      // Server Action 파일은 백엔드 에이전트가 생성한다. 미구현이거나 실패해도 UI는 정상 표시.
    });
    // 완료 화면은 한 번만 마운트되므로 마운트 시점의 값으로 전송한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
