export type ExerciseType = "mcq" | "input";

export type Exercise = {
  id: string;
  lessonId: string;
  sortOrder: number;
  exerciseType: ExerciseType;
  prompt: string;
  correctAnswer: string;
  options: string[] | null;
};

export type ExerciseResult = {
  exerciseId: string;
  correct: boolean;
  userAnswer: string;
  responseMs: number;
};

export interface ExerciseProps {
  exercise: Exercise;
  onSubmit: (result: ExerciseResult) => void;
}

export type KoniExpression = "idle" | "happy" | "sad" | "cheer";
