import type { KoniExpression } from "@/components/exercise/types";

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
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-label={`Koni ${expression}`}
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
    </svg>
  );
}
