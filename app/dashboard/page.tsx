import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
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

        <section className="mt-10 space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Dummy dashboard
              </h1>
              <p className="mt-2 max-w-xl text-sm text-slate-300 sm:text-base">
                This is a placeholder view you can wire up to real Telegram data
                later. For now it shows example metrics and recent activity so
                you can design around a realistic layout.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/auth/login">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-600 bg-transparent text-slate-100 hover:bg-slate-800"
                >
                  Go to login
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs font-medium text-slate-400">
                Today&apos;s attempts
              </p>
              <p className="mt-3 text-3xl font-semibold">24</p>
              <p className="mt-1 text-xs text-emerald-400">+8 vs yesterday</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs font-medium text-slate-400">
                Delivered to Telegram
              </p>
              <p className="mt-3 text-3xl font-semibold">24</p>
              <p className="mt-1 text-xs text-slate-400">100% delivery rate</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs font-medium text-slate-400">
                Flagged as risky
              </p>
              <p className="mt-3 text-3xl font-semibold">3</p>
              <p className="mt-1 text-xs text-amber-300">
                Manual review suggested
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                Recent activity
              </p>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 ring-1 ring-emerald-500/40">
                Sample data
              </span>
            </div>
            <div className="divide-y divide-slate-800 text-xs text-slate-200 sm:text-sm">
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">Login attempt</p>
                  <p className="text-[11px] text-slate-400 sm:text-xs">
                    Email submitted from Europe, sent to Telegram
                  </p>
                </div>
                <span className="text-[11px] text-slate-500">2 min ago</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">Suspicious password pattern</p>
                  <p className="text-[11px] text-slate-400 sm:text-xs">
                    Marked for manual review in your bot
                  </p>
                </div>
                <span className="text-[11px] text-slate-500">18 min ago</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">Telegram delivery OK</p>
                  <p className="text-[11px] text-slate-400 sm:text-xs">
                    API responded with status 200
                  </p>
                </div>
                <span className="text-[11px] text-slate-500">1 hr ago</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
