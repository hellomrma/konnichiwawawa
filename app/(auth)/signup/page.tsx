"use client";

import Link from "next/link";
import { useActionState } from "react";

import { SocialButtons } from "@/components/auth/SocialButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signupAction } from "../actions";

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(signupAction, undefined);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-jp-display text-4xl text-primary">はじめまして</p>
          <h1 className="mt-3 text-xl font-bold">코니와 함께 시작해요</h1>
        </div>

        <form action={formAction} className="flex flex-col gap-3">
          <Input
            name="displayName"
            type="text"
            placeholder="이름"
            autoComplete="nickname"
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="이메일"
            autoComplete="email"
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="비밀번호 (6자 이상)"
            autoComplete="new-password"
            required
          />
          {state?.error ? (
            <p className="text-sm text-destructive">{state.error}</p>
          ) : null}
          <Button type="submit" size="lg" disabled={pending} className="w-full">
            {pending ? "가입 중..." : "코니와 함께하기"}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3 text-text-muted">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs">또는</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <SocialButtons />

        <p className="mt-6 text-center text-sm text-text-muted">
          이미 계정이 있으신가요?{" "}
          <Link
            href="/login"
            className="font-medium text-secondary hover:underline"
          >
            로그인
          </Link>
        </p>
      </div>
    </main>
  );
}
