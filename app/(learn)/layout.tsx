import Link from "next/link";
import { Flame, Star, User } from "lucide-react";
import { createSupabaseServer } from "@/lib/supabase/server";

export default async function LearnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let xp = 0;
  let streak = 0;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("current_xp, current_streak")
      .eq("id", user.id)
      .single();
    if (profile) {
      xp = profile.current_xp;
      streak = profile.current_streak;
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-2xl items-center justify-between px-4">
          <Link
            href="/learn"
            className="font-jp-display text-lg leading-none text-primary"
          >
            こんにちわわわ
          </Link>

          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-1.5"
              aria-label={`XP ${xp}`}
            >
              <Star className="size-4 fill-accent text-accent" />
              <span className="text-sm font-bold tabular-nums text-accent">
                {xp}
              </span>
            </div>

            <div
              className="flex items-center gap-1.5"
              aria-label={`연속 학습 ${streak}일`}
            >
              <Flame className="size-4 fill-primary text-primary" />
              <span className="text-sm font-bold tabular-nums text-foreground">
                {streak}
              </span>
            </div>

            <Link
              href="/profile"
              aria-label="프로필"
              className="flex size-8 items-center justify-center rounded-pill bg-muted text-muted-foreground transition-colors hover:bg-border hover:text-foreground"
            >
              <User className="size-4" />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
        {children}
      </main>
    </div>
  );
}
