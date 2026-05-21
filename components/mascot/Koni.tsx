"use client";

import { motion, type TargetAndTransition, type Transition } from "framer-motion";

import type { KoniExpression } from "@/components/exercise/types";

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

function KoniIdle() {
  return (
    <>
      {/* 왼쪽 귀 */}
      <path d="M 24 46 L 8 5 L 38 30 Z" fill="#edc882" stroke="#8b6347" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 24 44 L 14 13 L 36 32 Z" fill="#e8a090" />
      {/* 오른쪽 귀 */}
      <path d="M 76 46 L 92 5 L 62 30 Z" fill="#edc882" stroke="#8b6347" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 76 44 L 86 13 L 64 32 Z" fill="#e8a090" />
      {/* 머리 */}
      <circle cx="50" cy="57" r="31" fill="#f4d9a8" stroke="#8b6347" strokeWidth="2.5" />
      {/* 눈 흰자 */}
      <ellipse cx="38" cy="51" rx="7.5" ry="8.5" fill="white" />
      <ellipse cx="62" cy="51" rx="7.5" ry="8.5" fill="white" />
      {/* 눈동자 */}
      <circle cx="39" cy="52" r="5" fill="#2a2520" />
      <circle cx="61" cy="52" r="5" fill="#2a2520" />
      {/* 눈 하이라이트 */}
      <circle cx="41" cy="50" r="1.8" fill="white" />
      <circle cx="63" cy="50" r="1.8" fill="white" />
      {/* 주둥이 */}
      <ellipse cx="50" cy="66" rx="10" ry="7" fill="#ecc090" />
      {/* 코 */}
      <ellipse cx="50" cy="61" rx="4" ry="2.5" fill="#5a3e2a" />
      <ellipse cx="49" cy="60.5" rx="1.3" ry="0.9" fill="#8b6347" />
      {/* 입 — 살짝 미소 */}
      <path d="M 44 68 Q 50 73 56 68" stroke="#8b6347" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </>
  );
}

function KoniHappy() {
  return (
    <>
      {/* 왼쪽 귀 — 약간 더 쫑긋 */}
      <path d="M 22 44 L 5 2 L 36 28 Z" fill="#edc882" stroke="#8b6347" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 22 42 L 11 10 L 34 30 Z" fill="#e8a090" />
      {/* 오른쪽 귀 */}
      <path d="M 78 44 L 95 2 L 64 28 Z" fill="#edc882" stroke="#8b6347" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 78 42 L 89 10 L 66 30 Z" fill="#e8a090" />
      {/* 머리 */}
      <circle cx="50" cy="57" r="31" fill="#f4d9a8" stroke="#8b6347" strokeWidth="2.5" />
      {/* 볼 홍조 */}
      <ellipse cx="29" cy="62" rx="7" ry="4" fill="#ffb5a7" opacity="0.55" />
      <ellipse cx="71" cy="62" rx="7" ry="4" fill="#ffb5a7" opacity="0.55" />
      {/* 눈 — 행복하게 활처럼 */}
      <path d="M 30 53 Q 38 44 46 53" stroke="#2a2520" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 54 53 Q 62 44 70 53" stroke="#2a2520" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* 주둥이 */}
      <ellipse cx="50" cy="66" rx="10" ry="7" fill="#ecc090" />
      {/* 코 */}
      <ellipse cx="50" cy="61" rx="4" ry="2.5" fill="#5a3e2a" />
      <ellipse cx="49" cy="60.5" rx="1.3" ry="0.9" fill="#8b6347" />
      {/* 입 — 크게 벌린 미소 */}
      <path d="M 41 67 Q 50 77 59 67" stroke="#8b6347" strokeWidth="1.8" fill="#e8a090" strokeLinecap="round" />
    </>
  );
}

function KoniSad() {
  return (
    <>
      {/* 왼쪽 귀 — 약간 처짐 */}
      <path d="M 24 48 L 11 10 L 37 33 Z" fill="#d4b47a" stroke="#8b6347" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 24 46 L 16 18 L 35 35 Z" fill="#e8a090" />
      {/* 오른쪽 귀 */}
      <path d="M 76 48 L 89 10 L 63 33 Z" fill="#d4b47a" stroke="#8b6347" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 76 46 L 84 18 L 65 35 Z" fill="#e8a090" />
      {/* 머리 */}
      <circle cx="50" cy="57" r="31" fill="#edd9a0" stroke="#8b6347" strokeWidth="2.5" />
      {/* 눈 흰자 */}
      <ellipse cx="38" cy="52" rx="7.5" ry="8.5" fill="white" />
      <ellipse cx="62" cy="52" rx="7.5" ry="8.5" fill="white" />
      {/* 눈동자 — 아래로 */}
      <circle cx="38" cy="54" r="5" fill="#2a2520" />
      <circle cx="62" cy="54" r="5" fill="#2a2520" />
      {/* 눈 하이라이트 */}
      <circle cx="40" cy="52" r="1.8" fill="white" />
      <circle cx="64" cy="52" r="1.8" fill="white" />
      {/* 눈썹 — 팔(八)자 */}
      <path d="M 32 44 Q 38 41 44 44" stroke="#8b6347" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 56 44 Q 62 41 68 44" stroke="#8b6347" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* 눈물 */}
      <ellipse cx="44" cy="64" rx="1.8" ry="3" fill="#aadcf0" opacity="0.85" />
      {/* 주둥이 */}
      <ellipse cx="50" cy="67" rx="10" ry="7" fill="#d8aa78" />
      {/* 코 */}
      <ellipse cx="50" cy="62" rx="4" ry="2.5" fill="#5a3e2a" />
      <ellipse cx="49" cy="61.5" rx="1.3" ry="0.9" fill="#8b6347" />
      {/* 입 — 아래로 꺾임 */}
      <path d="M 43 71 Q 50 65 57 71" stroke="#8b6347" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </>
  );
}

function KoniCheer() {
  return (
    <>
      {/* 왼쪽 귀 — 최대로 쫑긋 */}
      <path d="M 20 42 L 2 0 L 34 26 Z" fill="#f0cc78" stroke="#8b6347" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 20 40 L 8 7 L 32 28 Z" fill="#e8a090" />
      {/* 오른쪽 귀 */}
      <path d="M 80 42 L 98 0 L 66 26 Z" fill="#f0cc78" stroke="#8b6347" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 80 40 L 92 7 L 68 28 Z" fill="#e8a090" />
      {/* 반짝이 */}
      <path d="M 6 30 L 8 24 L 10 30 L 16 32 L 10 34 L 8 40 L 6 34 L 0 32 Z" fill="#ffc94a" opacity="0.9" />
      <path d="M 88 22 L 89.5 18 L 91 22 L 95 23.5 L 91 25 L 89.5 29 L 88 25 L 84 23.5 Z" fill="#ffc94a" opacity="0.8" />
      {/* 머리 */}
      <circle cx="50" cy="57" r="31" fill="#f4d9a8" stroke="#8b6347" strokeWidth="2.5" />
      {/* 볼 홍조 — 짙게 */}
      <ellipse cx="27" cy="63" rx="8" ry="5" fill="#ffb5a7" opacity="0.65" />
      <ellipse cx="73" cy="63" rx="8" ry="5" fill="#ffb5a7" opacity="0.65" />
      {/* 눈 — 최대 행복 아치 */}
      <path d="M 28 53 Q 38 43 48 53" stroke="#2a2520" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M 52 53 Q 62 43 72 53" stroke="#2a2520" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* 눈 반짝이 */}
      <circle cx="35" cy="52" r="2.2" fill="#ffc94a" opacity="0.9" />
      <circle cx="65" cy="52" r="2.2" fill="#ffc94a" opacity="0.9" />
      {/* 주둥이 */}
      <ellipse cx="50" cy="66" rx="10" ry="7" fill="#ecc090" />
      {/* 코 */}
      <ellipse cx="50" cy="61" rx="4" ry="2.5" fill="#5a3e2a" />
      {/* 입 — 활짝 벌린 미소 */}
      <path d="M 39 66 Q 50 80 61 66" stroke="#8b6347" strokeWidth="1.8" fill="#e8a090" strokeLinecap="round" />
      {/* 이 */}
      <path d="M 44 67 L 44 72 M 50 68 L 50 73 M 56 67 L 56 72" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </>
  );
}

const FACE: Record<KoniExpression, () => React.JSX.Element> = {
  idle: KoniIdle,
  happy: KoniHappy,
  sad: KoniSad,
  cheer: KoniCheer,
};

export function Koni({
  expression = "idle",
  size = 80,
}: {
  expression?: KoniExpression;
  size?: number;
}) {
  const Face = FACE[expression];
  return (
    // key={expression}: expression 바뀔 때 re-mount → 등장 애니메이션 즉시 실행
    <motion.svg
      key={expression}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-label={`Koni ${expression}`}
      animate={ANIMATIONS[expression]}
      transition={TRANSITIONS[expression]}
    >
      <Face />
    </motion.svg>
  );
}
