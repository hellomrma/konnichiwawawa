"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { createSupabaseServer } from "@/lib/supabase/server";

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

const signupSchema = z.object({
  displayName: z.string().trim().min(1).max(20),
  email: z.email(),
  password: z.string().min(6),
});

export type AuthState = { error: string } | undefined;

export async function loginAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: "이메일과 비밀번호를 확인해 주세요" };
  }

  const supabase = await createSupabaseServer();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    return { error: "로그인에 실패했어요. 이메일과 비밀번호를 확인해 주세요" };
  }

  redirect("/learn");
}

export async function signupAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = signupSchema.safeParse({
    displayName: formData.get("displayName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: "입력한 정보를 다시 확인해 주세요" };
  }

  const supabase = await createSupabaseServer();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: { data: { display_name: parsed.data.displayName } },
  });
  if (error) {
    return { error: "회원가입에 실패했어요. 잠시 후 다시 시도해 주세요" };
  }

  redirect("/learn");
}
