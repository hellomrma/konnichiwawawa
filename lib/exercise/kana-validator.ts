import { toHiragana } from "wanakana";

/** 로마자 또는 히라가나 입력을 히라가나로 정규화한다. */
export function normalizeKana(input: string): string {
  return toHiragana(input.trim().toLowerCase());
}

/** 사용자 입력과 정답을 비교한다. 양쪽 모두 정규화 후 비교. */
export function validateKanaAnswer(
  userInput: string,
  correctAnswer: string,
): boolean {
  return normalizeKana(userInput) === correctAnswer.trim();
}
