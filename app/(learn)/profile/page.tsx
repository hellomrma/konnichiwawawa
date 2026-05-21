import { redirect } from "next/navigation";
import { Flame, Star, User } from "lucide-react";
import { createSupabaseServer } from "@/lib/supabase/server";

async function signOut() {
  "use server";
  const supabase = await createSupabaseServer();
  await supabase.auth.signOut();
  redirect("/login");
}

export default async function ProfilePage() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: profile }, { data: lessons }, { data: progress }, { data: units }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("display_name, current_xp, current_streak, longest_streak, created_at")
        .eq("id", user.id)
        .single(),
      supabase.from("lessons").select("id, unit_id"),
      supabase.from("user_lesson_progress").select("lesson_id").eq("user_id", user.id),
      supabase.from("units").select("id"),
    ]);

  const completedLessonIds = new Set(progress?.map((p) => p.lesson_id) ?? []);

  const completedUnits = (units ?? []).filter((unit) => {
    const unitLessons = (lessons ?? []).filter((l) => l.unit_id === unit.id);
    return (
      unitLessons.length > 0 && unitLessons.every((l) => completedLessonIds.has(l.id))
    );
  });

  const totalUnits = units?.length ?? 0;
  const completedUnitsCount = completedUnits.length;

  const joinedAt = profile?.created_at
    ? (() => {
        const d = new Date(profile.created_at);
        return `${d.getFullYear()}년 ${String(d.getMonth() + 1).padStart(2, "0")}월`;
      })()
    : null;

  return (
    <div className="flex flex-col gap-6">
      {/* Avatar + name */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex size-16 items-center justify-center rounded-pill bg-muted">
          <User className="size-8 text-muted-foreground" />
        </div>
        <h1 className="text-xl font-bold">{profile?.display_name ?? "사용자"}</h1>
        {joinedAt && (
          <p className="text-sm text-muted-foreground">{joinedAt}부터 함께</p>
        )}
      </div>

      {/* Stats grid: 2 columns */}
      <div className="grid grid-cols-2 gap-3">
        {/* XP card */}
        <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-1.5">
            <Star className="size-4 fill-accent text-accent" />
            <span className="text-xs font-medium text-muted-foreground">경험치</span>
          </div>
          <span className="text-2xl font-bold text-accent tabular-nums">
            {profile?.current_xp ?? 0}
          </span>
          <span className="text-xs text-muted-foreground">XP</span>
        </div>

        {/* Streak card */}
        <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-1.5">
            <Flame className="size-4 fill-primary text-primary" />
            <span className="text-xs font-medium text-muted-foreground">연속 학습</span>
          </div>
          <span className="text-2xl font-bold tabular-nums">
            {profile?.current_streak ?? 0}
          </span>
          <span className="text-xs text-muted-foreground">일 연속</span>
        </div>

        {/* Best streak card */}
        <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-1.5">
            <Flame className="size-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">최고 기록</span>
          </div>
          <span className="text-2xl font-bold tabular-nums">
            {profile?.longest_streak ?? 0}
          </span>
          <span className="text-xs text-muted-foreground">일</span>
        </div>

        {/* Units completed card */}
        <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-4">
          <span className="text-xs font-medium text-muted-foreground">단원 완료</span>
          <span className="text-2xl font-bold tabular-nums">
            {completedUnitsCount}{" "}
            <span className="text-base font-normal text-muted-foreground">
              / {totalUnits}
            </span>
          </span>
          <span className="text-xs text-muted-foreground">단원</span>
        </div>
      </div>

      {/* Logout */}
      <form action={signOut}>
        <button
          type="submit"
          className="w-full rounded-xl bg-destructive px-4 py-3 text-sm font-bold text-destructive-foreground transition-opacity hover:opacity-90 active:opacity-75"
          style={{ boxShadow: "var(--shadow-btn)" }}
        >
          로그아웃
        </button>
      </form>
    </div>
  );
}
