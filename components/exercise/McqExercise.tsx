"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import type { ExerciseProps, ExerciseResult } from "@/components/exercise/types";
import { cn } from "@/lib/utils";

// 판정 후 onSubmit까지의 대기 시간(ms). 사용자가 정답/오답 피드백을 인지할 시간을 준다.
const SUBMIT_DELAY_MS = 1200;

// 일본어/로마자 여부에 따라 폰트 클래스를 정한다. 일본어 글자가 섞이면 font-jp.
const JP_REGEX = /[぀-ヿ㐀-䶿一-鿿]/;

export function McqExercise({ exercise, onSubmit }: ExerciseProps) {
  const options = exercise.options ?? [];

  const [selected, setSelected] = useState<string | null>(null);
  const [judged, setJudged] = useState(false);

  // 문제가 화면에 표시된 시점. 응답 시간(responseMs) 계산 기준이 된다.
  // 시간 측정(performance.now)은 부수효과이므로 렌더가 아닌 effect에서만 읽는다.
  // 클릭 시각은 이벤트의 timeStamp(순수 값, performance.now와 같은 time origin)로 잰다.
  const startTimeRef = useRef(0);
  useEffect(() => {
    startTimeRef.current = performance.now();
  }, [exercise.id]);

  function handleSelect(
    option: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    if (judged) return;

    const correct = option === exercise.correctAnswer;
    const responseMs = Math.round(event.timeStamp - startTimeRef.current);

    setSelected(option);
    setJudged(true);

    const result: ExerciseResult = {
      exerciseId: exercise.id,
      correct,
      userAnswer: option,
      responseMs,
    };

    window.setTimeout(() => onSubmit(result), SUBMIT_DELAY_MS);
  }

  return (
    <div className="flex flex-col gap-6">
      <p
        className={cn(
          "text-center text-2xl font-bold",
          JP_REGEX.test(exercise.prompt) && "font-jp-display",
        )}
      >
        {exercise.prompt}
      </p>

      <ul className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const isSelected = selected === option;
          const isCorrectOption = option === exercise.correctAnswer;

          // 판정 후: 선택한 정답 또는 (오답을 골랐을 때) 강조할 정답을 success로 표시.
          const showSuccess = judged && isCorrectOption;
          // 판정 후: 선택한 오답만 destructive로 표시.
          const showDestructive = judged && isSelected && !isCorrectOption;

          // 정답 강조 시 scale 펄스, 오답 시 흔들림 애니메이션.
          const animate = showSuccess
            ? { scale: [1, 1.06, 1] }
            : showDestructive
              ? { x: [-6, 6, -6, 6, 0] }
              : undefined;
          const transition = showSuccess
            ? { duration: 0.3 }
            : showDestructive
              ? { duration: 0.4 }
              : undefined;

          return (
            <li key={option}>
              <motion.button
                type="button"
                disabled={judged}
                onClick={(event) => handleSelect(option, event)}
                animate={animate}
                transition={transition}
                style={{
                  boxShadow: judged
                    ? "var(--shadow-btn-active)"
                    : "var(--shadow-btn)",
                  // Framer Motion이 transform을 제어하는 버튼(애니메이션 대상)에는
                  // translateY를 직접 지정하지 않는다. 충돌 방지 + 눌림 효과는 그대로.
                  ...(judged && !animate ? { transform: "translateY(3px)" } : {}),
                }}
                className={cn(
                  "w-full rounded-xl border-2 px-4 py-5 text-xl font-bold transition-colors",
                  "disabled:cursor-default",
                  JP_REGEX.test(option) && "font-jp",
                  !judged && "border-border bg-card hover:bg-muted",
                  showSuccess && "border-success bg-success text-white",
                  showDestructive &&
                    "border-destructive bg-destructive text-white",
                  judged &&
                    !showSuccess &&
                    !showDestructive &&
                    "border-border bg-card opacity-60",
                )}
              >
                {option}
              </motion.button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
