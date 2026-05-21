import Link from "next/link";
import { Flame, Star, User } from "lucide-react";

// W2 자리표시자 — XP/스트릭은 더미 값. 실제 사용자 데이터 연결은 후속 작업.
const DUMMY_XP = 0;
const DUMMY_STREAK = 0;

export default function LearnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
              aria-label={`XP ${DUMMY_XP}`}
            >
              <Star className="size-4 fill-accent text-accent" />
              <span className="text-sm font-bold tabular-nums text-accent">
                {DUMMY_XP}
              </span>
            </div>

            <div
              className="flex items-center gap-1.5"
              aria-label={`연속 학습 ${DUMMY_STREAK}일`}
            >
              <Flame className="size-4 fill-primary text-primary" />
              <span className="text-sm font-bold tabular-nums text-foreground">
                {DUMMY_STREAK}
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
