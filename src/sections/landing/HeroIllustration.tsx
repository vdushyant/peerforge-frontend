import { Button } from "@/components/ui/button";
import { ArrowUpRight, Check, Clock3, Star, Video } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[34rem] px-2 py-7 sm:px-7 sm:py-10">
      <div className="pointer-events-none absolute inset-8 rounded-full bg-emerald-300/10 blur-[90px]" />
      <div className="pointer-events-none absolute -right-1 top-2 h-28 w-28 rounded-full border border-emerald-200/10" />
      <div className="pointer-events-none absolute -bottom-1 left-3 h-20 w-20 rounded-full border border-cyan-200/10" />

      <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#111a20]/95 p-5 shadow-[0_35px_100px_-35px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:p-7">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/60 to-transparent" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">A little closer</p>
            <p className="mt-1 text-sm text-slate-400">to the work you want to do</p>
          </div>
          <span className="rounded-full border border-emerald-200/15 bg-emerald-300/[0.07] px-3 py-1 text-xs font-medium text-emerald-100">Example profile</span>
        </div>

        <div className="mt-7 rounded-2xl border border-white/[0.07] bg-[#0b1217] p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-200 to-teal-600 text-lg font-bold text-slate-950 shadow-lg shadow-emerald-950/30">RS</div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="text-lg font-semibold tracking-tight text-white">Rahul Sharma</h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-300/10 px-2 py-0.5 text-[10px] font-medium text-emerald-100"><Check className="h-3 w-3" /> Mentor</span>
              </div>
              <p className="mt-1 text-sm leading-5 text-slate-400">Senior backend engineer · 8 years</p>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
            <span className="font-semibold text-white">4.9</span>
            <span className="text-slate-500">from 126 learner reviews</span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {["Java", "Spring Boot", "System design", "AWS"].map((skill) => (
              <span key={skill} className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-xs text-slate-300">{skill}</span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> 1:1 session</span>
              <span className="inline-flex items-center gap-1.5"><Video className="h-3.5 w-3.5" /> Online</span>
            </div>
            <span className="text-sm font-semibold text-white">₹1,200 <span className="font-normal text-slate-500">/ hour</span></span>
          </div>

          <Button asChild className="mt-5 h-11 w-full rounded-xl bg-emerald-300 font-semibold text-slate-950 hover:bg-emerald-200">
            <Link to="/mentors">Explore mentor profiles <ArrowUpRight className="ml-auto" /></Link>
          </Button>
        </div>

        <p className="mt-5 text-center text-xs text-slate-500">A focused conversation can change your whole trajectory.</p>
      </div>

      <div className="absolute -bottom-1 -left-1 hidden rounded-2xl border border-white/10 bg-[#101a20] p-4 shadow-2xl sm:block">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {(["A", "M", "J"] as const).map((initial, index) => (
              <span key={initial} className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#101a20] text-[10px] font-bold text-slate-950 ${index === 0 ? "bg-emerald-200" : index === 1 ? "bg-cyan-200" : "bg-amber-200"}`}>{initial}</span>
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Learn from experience</p>
            <p className="mt-0.5 text-[10px] text-slate-400">Make your next move count</p>
          </div>
        </div>
      </div>
    </div>
  );
}
