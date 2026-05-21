"use client";

import { motion, type TargetAndTransition, type Transition } from "framer-motion";

import type { KoniExpression } from "@/components/exercise/types";

// 표정별 등장 애니메이션. idle은 정지 상태로 애니메이션 없음.
const ANIMATIONS: Record<KoniExpression, TargetAndTransition> = {
  idle: {},
  happy: { scale: [1, 1.1, 1] },
  sad: { x: [-5, 5, -5, 5, 0] },
  cheer: { y: [0, -10, 0] },
};
const TRANSITIONS: Record<KoniExpression, Transition> = {
  idle: {},
  happy: { duration: 0.4 },
  sad: { duration: 0.4 },
  cheer: { duration: 0.6 },
};

export function Koni({
  expression = "idle",
  size = 80,
}: {
  expression?: KoniExpression;
  size?: number;
}) {
  const colors: Record<KoniExpression, string> = {
    idle: "#f4d9a8",
    happy: "#f4d9a8",
    sad: "#e8c896",
    cheer: "#f4d9a8",
  };
  const mouth: Record<KoniExpression, string> = {
    idle: "M 35 55 Q 50 60 65 55",
    happy: "M 30 50 Q 50 70 70 50",
    sad: "M 35 60 Q 50 50 65 60",
    cheer: "M 30 50 Q 50 75 70 50",
  };
  return (
    // key={expression}: expression이 바뀌면 re-mount되어 등장 애니메이션이 즉시 실행된다.
    <motion.svg
      key={expression}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-label={`Koni ${expression}`}
      animate={ANIMATIONS[expression]}
      transition={TRANSITIONS[expression]}
    >
      <ellipse
        cx="20"
        cy="25"
        rx="12"
        ry="20"
        fill={colors[expression]}
        stroke="#5a3e2a"
        strokeWidth="3"
      />
      <ellipse
        cx="80"
        cy="25"
        rx="12"
        ry="20"
        fill={colors[expression]}
        stroke="#5a3e2a"
        strokeWidth="3"
      />
      <circle
        cx="50"
        cy="50"
        r="35"
        fill={colors[expression]}
        stroke="#5a3e2a"
        strokeWidth="3"
      />
      <circle cx="38" cy="45" r="3" fill="#2a2520" />
      <circle cx="62" cy="45" r="3" fill="#2a2520" />
      <path d={mouth[expression]} stroke="#2a2520" strokeWidth="2" fill="none" />
    </motion.svg>
  );
}
