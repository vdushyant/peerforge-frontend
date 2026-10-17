import MentorSessionCard from "../components/MentorSessionCard";
import { useMentorSessions } from "../hooks/useMentorSessions";
import { CalendarDays, Clock3 } from "lucide-react";

export default function MentorSessionsPage() {
  const {
    data: sessions = [],
    isLoading,
    isError,
  } = useMentorSessions();

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
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-100/10 bg-emerald-200/[0.07] text-emerald-100"><CalendarDays className="h-5 w-5" /></div>
        <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Incoming Sessions
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Manage sessions requested by clients.
        </p>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-white/[0.09] bg-[#0d151a] px-6 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-200/[0.08] text-emerald-100"><Clock3 className="h-5 w-5" /></div>
          <h2 className="mt-4 font-semibold text-slate-100">No incoming requests right now</h2>
          <p className="mt-2 text-sm text-slate-400">New booking requests will appear here so you can review and respond.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sessions.map((session) => (
            <MentorSessionCard
              key={session.id}
              session={session}
            />
          ))}
        </div>
      )}
    </div>
  );
}
