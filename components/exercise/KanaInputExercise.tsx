"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toHiragana } from "wanakana";

import { validateKanaAnswer } from "@/lib/exercise/kana-validator";
import { cn } from "@/lib/utils";
import type { ExerciseProps } from "@/components/exercise/types";

// 판정 후 onSubmit까지의 대기 시간(ms). 사용자가 정답/오답 피드백을 인지할 시간을 준다.
const SUBMIT_DELAY_MS = 1200;

export function KanaInputExercise({ exercise, onSubmit }: ExerciseProps) {
  const [value, setValue] = useState("");
  const [judged, setJudged] = useState(false);
  const [correct, setCorrect] = useState(false);

  // 문제가 화면에 표시된 시점. 응답 시간(responseMs) 계산 기준이 된다.
  // LessonPlayer가 문제마다 key={exercise.id}로 remount하므로 value/judged는
  // 자연히 초기화된다. 따라서 effect에서는 측정 기준 시각(ref)만 갱신한다.
  const startTimeRef = useRef(0);
  useEffect(() => {
    startTimeRef.current = performance.now();
  }, [exercise.id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (judged) return;
    // 로마자 타이핑을 실시간으로 히라가나로 변환해 표시한다.
    setValue(toHiragana(e.target.value));
  }

  function handleSubmit() {
    if (judged || !value.trim()) return;

    const isCorrect = validateKanaAnswer(value, exercise.correctAnswer);
    const responseMs = Math.round(performance.now() - startTimeRef.current);

    setCorrect(isCorrect);
    setJudged(true);

    window.setTimeout(
      () =>
        onSubmit({
          exerciseId: exercise.id,
          correct: isCorrect,
          userAnswer: value,
          responseMs,
        }),
      SUBMIT_DELAY_MS,
    );
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSubmit();
  }

  // animate 값은 judged 후에만 적용한다. 정답은 scale 펄스, 오답은 흔들림.
  const animateContainer = judged
    ? correct
      ? { scale: [1, 1.05, 1] }
      : { x: [-6, 6, -6, 6, 0] }
    : undefined;
  const transitionContainer = judged
    ? correct
      ? { duration: 0.3 }
      : { duration: 0.4 }
    : undefined;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-center text-2xl font-bold">{exercise.prompt}</p>

      <motion.div
        className="flex flex-col gap-3"
        animate={animateContainer}
        transition={transitionContainer}
      >
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={judged}
          placeholder="히라가나로 입력..."
          style={{ boxShadow: "var(--shadow-btn)" }}
          className={cn(
            "w-full rounded-xl border-2 px-4 py-5 text-center font-jp text-2xl outline-none transition-colors",
            !judged && "border-border bg-card",
            judged && correct && "border-success bg-success/10 text-success",
            judged &&
              !correct &&
              "border-destructive bg-destructive/10 text-destructive",
          )}
          autoFocus
        />

        {judged && (
          <p
            className={cn(
              "text-center font-bold",
              correct
                ? "font-jp-display text-xl text-success"
                : "text-sm text-destructive",
            )}
          >
            {correct ? "うまい!" : `정답은 ${exercise.correctAnswer}`}
          </p>
        )}
      </motion.div>

      {!judged && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!value.trim()}
          style={{ boxShadow: "var(--shadow-btn)" }}
          className={cn(
            "self-center rounded-pill bg-primary px-10 py-3 text-base font-bold text-primary-foreground transition-opacity",
            "active:translate-y-[3px] active:[box-shadow:var(--shadow-btn-active)]",
            !value.trim() && "cursor-not-allowed opacity-50",
          )}
        >
          정답 확인
        </button>
      )}
    </div>
  );
}
