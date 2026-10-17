import SessionCard from "../components/SessionCard";
import { useMySessions } from "../hooks/useMySessions";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarDays, Compass } from "lucide-react";

export default function MySessionsPage() {
  const {
    data: sessions = [],
    isLoading,
    isError,
  } = useMySessions();

  if (isLoading) {
    return (
      <div className="py-8">
        <p className="text-sm text-slate-400" role="status">
          Loading sessions...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-8">
        <p className="text-sm text-rose-300" role="alert">
          Unable to load your sessions.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-7 py-2 sm:py-5">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-100/10 bg-emerald-200/[0.07] text-emerald-100">
          <CalendarDays className="h-5 w-5" />
        </div>
        <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          My Sessions
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          View your mentoring sessions and their status.
        </p>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-white/[0.09] bg-[#0d151a] px-6 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-200/[0.08] text-emerald-100"><Compass className="h-5 w-5" /></div>
          <h2 className="mt-4 font-semibold text-slate-100">No sessions on your calendar yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">Browse mentor profiles, find someone who fits your goals, and book your first conversation.</p>
          <Button asChild className="mt-5 h-10 rounded-xl bg-emerald-300 px-4 font-semibold text-slate-950 hover:bg-emerald-200"><Link to="/mentors">Explore mentors</Link></Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
            />
          ))}
        </div>
      )}
    </div>
  );
}
