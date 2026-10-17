import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAdminSessions, useAdminUsers } from "../hooks/useAdminData";

type DirectoryView = "users" | "sessions";

export default function AdminDirectoryPage({ initialView }: { initialView: DirectoryView }) {
  const { user } = useAuth();
  const isAdmin = user?.roles.some((role) => role === "ADMIN" || role === "ROLE_ADMIN") ?? false;
  const [view, setView] = useState<DirectoryView>(initialView);
  const [page, setPage] = useState(0);
  useEffect(() => {
    setView(initialView);
    setPage(0);
  }, [initialView]);
  const users = useAdminUsers(page, view === "users");
  const sessions = useAdminSessions(page, view === "sessions");

  if (!isAdmin) return <p className="rounded-2xl border border-rose-200/10 bg-rose-300/[0.04] p-5 text-sm text-rose-200">You do not have access to admin directories.</p>;

  const result = view === "users" ? users.data : sessions.data;
  const loading = view === "users" ? users.isLoading : sessions.isLoading;
  const failed = view === "users" ? users.isError : sessions.isError;

  return (
    <section className="mx-auto max-w-6xl space-y-7 py-2 sm:py-5">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200/75">Administration</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Admin directories</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">Read-only paginated views of registered accounts and session activity.</p>
      </div>
      <div className="flex w-fit gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-2">
        <Button variant={view === "users" ? "default" : "outline"} onClick={() => { setView("users"); setPage(0); }}>Users</Button>
        <Button variant={view === "sessions" ? "default" : "outline"} onClick={() => { setView("sessions"); setPage(0); }}>Sessions</Button>
      </div>

      {loading ? <p className="text-muted-foreground">Loading {view}…</p> :
       failed ? <p className="text-destructive">The {view} directory could not be loaded.</p> :
       view === "users" ? (
        <div className="space-y-3">
          {(users.data?.content ?? []).length === 0 ? <p className="rounded-2xl border border-dashed border-white/[0.09] p-8 text-center text-sm text-slate-400">No users found.</p> : (users.data?.content ?? []).map((entry) => (
            <Card key={entry.id}><CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div><p className="font-medium">{entry.firstName} {entry.lastName}</p><p className="text-sm text-muted-foreground">{entry.email}</p></div>
              <div className="text-right text-sm"><p>{entry.roles.join(", ")}</p><p className="text-muted-foreground">{entry.accountStatus} · joined {new Date(entry.createdAt).toLocaleDateString()}</p></div>
            </CardContent></Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {(sessions.data?.content ?? []).length === 0 ? <p className="rounded-2xl border border-dashed border-white/[0.09] p-8 text-center text-sm text-slate-400">No sessions found.</p> : (sessions.data?.content ?? []).map((entry) => (
            <Card key={entry.id}><CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div><p className="font-medium">{entry.clientName} with {entry.mentorName}</p><p className="text-sm text-muted-foreground">{new Date(entry.startDateTime).toLocaleString()} – {new Date(entry.endDateTime).toLocaleTimeString()}</p></div>
              <div className="text-right text-sm"><p>{entry.status}</p><p className="text-muted-foreground">Payment: {entry.paymentStatus ?? "not created"}</p></div>
            </CardContent></Card>
          ))}
        </div>
      )}

      {!loading && !failed && result && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{result.totalElements} records · page {result.number + 1} of {Math.max(result.totalPages, 1)}</p>
          <div className="flex gap-2">
            <Button variant="outline" disabled={page === 0} onClick={() => setPage((current) => current - 1)}>Previous</Button>
            <Button variant="outline" disabled={page + 1 >= result.totalPages} onClick={() => setPage((current) => current + 1)}>Next</Button>
          </div>
        </div>
      )}
    </section>
  );
}
