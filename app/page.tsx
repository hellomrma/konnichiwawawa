import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <p className="font-jp-display text-5xl text-primary">こんにちわわわ</p>
      <h1 className="mt-4 text-3xl leading-snug font-bold tracking-tight">
        치와와 코니와 함께하는
        <br />
        일본어 첫걸음
      </h1>
      <p className="mt-3 max-w-xs text-text-muted">
        히라가나부터 기초 어휘까지, 하루 한 발짝씩.
      </p>

      <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
        <Link
          href="/signup"
          className={cn(buttonVariants({ size: "lg" }), "w-full")}
        >
          코니와 함께하기
        </Link>
        <Link
          href="/login"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full")}
        >
          시작하기
        </Link>
      </div>

      <p className="mt-8 flex gap-4 text-xs text-muted-foreground">
        <Link href="/privacy" className="hover:underline">개인정보처리방침</Link>
        <Link href="/terms" className="hover:underline">이용약관</Link>
      </p>
    </main>
  );
}
