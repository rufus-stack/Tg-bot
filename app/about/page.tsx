import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-6 sm:py-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 ring-1 ring-sky-500/40">
              <span className="text-lg font-semibold text-sky-400">TG</span>
            </div>
            <span className="text-sm font-medium text-slate-200">
              Telegram Bot Dashboard
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-slate-300">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Link href="/about" className="hover:text-white">
              About
            </Link>
            <Link href="/dashboard" className="hover:text-white">
              Dashboard
            </Link>
            <Link href="/auth/login">
              <Button size="sm" className="ml-1">
                Login
              </Button>
            </Link>
          </nav>
        </header>

        <section className="mt-16 grid gap-10 md:grid-cols-2 md:items-start">
          <div className="space-y-5">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              About this project
            </h1>
            <p className="text-sm text-slate-300 sm:text-base">
              This app is a small Next.js + Telegram integration that captures
              login-style submissions and forwards them to your Telegram bot.
              The homepage, about page, and dashboard give you a clean shell to
              build a more complete product around your existing login flow.
            </p>
            <p className="text-sm text-slate-300 sm:text-base">
              Under the hood, it uses the App Router, Tailwind CSS for styling,
              and shadcn/ui components for consistent design. You can extend the
              dummy dashboard to visualize real submissions, audit logs, or
              security events over time.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/auth/login">
                <Button size="lg" className="px-6">
                  Go to login
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 bg-transparent text-slate-100 hover:bg-slate-800"
                >
                  Open dashboard
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="text-sm font-semibold text-slate-100">
              Tech overview
            </h2>
            <dl className="grid grid-cols-2 gap-4 text-xs text-slate-300 sm:text-sm">
              <div>
                <dt className="text-slate-400">Framework</dt>
                <dd className="mt-1 font-medium">Next.js App Router</dd>
              </div>
              <div>
                <dt className="text-slate-400">Styling</dt>
                <dd className="mt-1 font-medium">Tailwind CSS</dd>
              </div>
              <div>
                <dt className="text-slate-400">UI components</dt>
                <dd className="mt-1 font-medium">shadcn/ui</dd>
              </div>
              <div>
                <dt className="text-slate-400">Messaging</dt>
                <dd className="mt-1 font-medium">Telegram Bot API</dd>
              </div>
            </dl>
            <p className="mt-2 text-xs text-slate-400 sm:text-sm">
              You can safely treat this page as static marketing or docs
              content, while keeping your sensitive login handling isolated
              under{" "}
              <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[11px] font-mono">
                /auth/login
              </code>{" "}
              and the corresponding API route.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
