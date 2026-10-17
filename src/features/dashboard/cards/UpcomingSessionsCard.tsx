import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMySessions } from "@/features/session/hooks/useMySessions";
import { ArrowRight, CalendarDays, Clock3, Compass } from "lucide-react";

export default function UpcomingSessionsCard() {
  const sessions = useMySessions();
  const upcoming = (sessions.data ?? [])
    .filter((session) =>
      (session.status === "PENDING" || session.status === "CONFIRMED") &&
      new Date(session.startDateTime).getTime() > Date.now()
    )
    .sort((left, right) => left.startDateTime.localeCompare(right.startDateTime))
    .slice(0, 3);

  return (
    <Card className="overflow-hidden rounded-[1.5rem] border-0 bg-[#0d151a] py-0 text-white ring-1 ring-inset ring-white/[0.08]">
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-white/[0.06] px-6 py-5 sm:px-7">
        <div className="flex items-center gap-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-100/10 bg-emerald-200/[0.07] text-emerald-100">
            <CalendarDays className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200/70">Your calendar</p>
            <CardTitle className="mt-0.5 text-base font-semibold text-white">Upcoming sessions</CardTitle>
          </div>
        </div>
        {!sessions.isLoading && !sessions.isError && upcoming.length > 0 && (
          <Button asChild variant="ghost" size="sm" className="rounded-lg text-slate-300 hover:bg-white/[0.05] hover:text-emerald-100">
            <Link to="/sessions">View all <ArrowRight /></Link>
          </Button>
        )}
      </CardHeader>

      <CardContent className="p-5 sm:p-6">
        {sessions.isLoading ? (
          <p className="py-4 text-sm text-slate-400" role="status">Loading your sessions…</p>
        ) : sessions.isError ? (
          <p className="py-4 text-sm text-rose-300" role="alert">Your sessions could not be loaded. Please try again shortly.</p>
        ) : upcoming.length === 0 ? (
          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-dashed border-white/[0.09] bg-white/[0.015] px-5 py-5 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-slate-400">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-slate-200">Your calendar is clear—for now.</p>
                <p className="mt-1 text-sm text-slate-500">Explore mentors and find a conversation worth putting on it.</p>
              </div>
            </div>
            <Button asChild className="h-10 shrink-0 rounded-xl bg-emerald-300 px-4 font-semibold text-slate-950 hover:bg-emerald-200">
              <Link to="/mentors">Find a mentor <ArrowRight /></Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.map((session) => {
              const start = new Date(session.startDateTime);
              return (
                <div key={session.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-emerald-200/[0.08] text-emerald-100">
                      <span className="text-[9px] font-semibold uppercase">{start.toLocaleDateString(undefined, { month: "short" })}</span>
                      <span className="text-base font-semibold leading-4">{start.getDate()}</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-100">Session with {session.mentorName}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock3 className="h-3.5 w-3.5" />
                        {start.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })} · {session.status.toLowerCase()}
                      </p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${session.status === "CONFIRMED" ? "bg-emerald-200/[0.08] text-emerald-100" : "bg-amber-200/[0.08] text-amber-100"}`}>
                    {session.status.toLowerCase()}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
