"use client";

import { createSupabaseBrowser } from "@/lib/supabase/client";

type Provider = "google" | "kakao";

export function SocialButtons() {
  const signInWith = async (provider: Provider) => {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => signInWith("google")}
        className="flex h-12 items-center justify-center gap-2 rounded-pill border border-border bg-card font-medium text-foreground transition-colors hover:bg-muted"
      >
        Google로 시작하기
      </button>
      {/* 카카오 브랜드 가이드: 색상 #FEE500 고정, 문구 "카카오로 시작하기".
          비즈 앱 검수 + Supabase Provider 활성화 완료 후 동작한다 (스펙 Section 7.5). */}
      <button
        type="button"
        onClick={() => signInWith("kakao")}
        className="flex h-12 items-center justify-center gap-2 rounded-pill bg-[#FEE500] font-medium text-[#191600] transition-opacity hover:opacity-90"
      >
        카카오로 시작하기
      </button>
    </div>
  );
}
