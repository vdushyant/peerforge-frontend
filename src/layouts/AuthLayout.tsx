import type { ReactNode } from "react";

import AuthHero from "@/features/auth/components/AuthHero";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center gap-10 px-6 py-10">

        <AuthHero />

        <div className="flex flex-1 justify-center">

          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111827] p-10 shadow-2xl">

            <h1 className="text-4xl font-bold text-white">
              {title}
            </h1>

            <p className="mt-3 text-slate-400">
              {subtitle}
            </p>

            <div className="mt-10">
              {children}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}