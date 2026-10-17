import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfileCompletionCard() {
  return (
    <Card className="group relative overflow-hidden rounded-[1.5rem] border-0 bg-[#0e171c] py-0 text-white ring-1 ring-inset ring-white/[0.08] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#111c20] hover:ring-emerald-100/20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/35 to-transparent" />
      <CardHeader className="flex flex-row items-center gap-4 px-6 pt-6 sm:px-7 sm:pt-7">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-100/10 bg-emerald-200/[0.07] text-emerald-100">
          <UserRound className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200/75">Your profile</p>
          <CardTitle className="mt-1 text-lg font-semibold tracking-tight text-white">Make your profile stand out</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-4 sm:px-7 sm:pb-7">
        <p className="max-w-xl text-sm leading-6 text-slate-400">
          Add your goals, experience, and skills so mentors can tailor each conversation to you.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {["Your goals", "Your experience", "Your skills"].map((item) => (
            <span key={item} className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-xs text-slate-400">{item}</span>
          ))}
        </div>
        <Button asChild variant="outline" className="mt-6 h-10 rounded-xl border-white/10 bg-white/[0.035] px-4 text-slate-100 hover:border-emerald-100/25 hover:bg-emerald-200/[0.08] hover:text-emerald-50">
          <Link to="/profile">Complete your profile <ArrowRight /></Link>
        </Button>
      </CardContent>
    </Card>
  );
}
