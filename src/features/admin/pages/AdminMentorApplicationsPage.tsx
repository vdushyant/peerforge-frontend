import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { ApprovalStatus } from "@/features/mentor/types/mentor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useMentorApplications, useModerateMentorApplication } from "../hooks/useAdminData";
import { ShieldCheck } from "lucide-react";

const statuses: ApprovalStatus[] = ["PENDING", "APPROVED", "REJECTED"];

export default function AdminMentorApplicationsPage() {
  const { user } = useAuth();
  const isAdmin = user?.roles.some((role) => role === "ADMIN" || role === "ROLE_ADMIN") ?? false;
  const [status, setStatus] = useState<ApprovalStatus>("PENDING");
  const [page, setPage] = useState(0);
  const [reasons, setReasons] = useState<Record<number, string>>({});
  const applications = useMentorApplications(status, page);
  const moderation = useModerateMentorApplication();

  if (!isAdmin) return <p className="rounded-2xl border border-rose-200/10 bg-rose-300/[0.04] p-5 text-sm text-rose-200">You do not have access to mentor applications.</p>;

  const approve = (id: number) => moderation.approve.mutate(id, {
    onSuccess: () => toast.success("Mentor application approved."),
    onError: () => toast.error("Could not approve this application."),
  });
  const reject = (id: number) => {
    const reason = reasons[id]?.trim();
    if (!reason) return;
    moderation.reject.mutate({ id, reason }, {
      onSuccess: () => {
        setReasons((current) => ({ ...current, [id]: "" }));
        toast.success("Application rejected. The applicant was notified." );
      },
      onError: () => toast.error("Could not reject this application."),
    });
  };

  return (
    <section className="mx-auto max-w-6xl space-y-7 py-2 sm:py-5">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-100/10 bg-emerald-200/[0.07] text-emerald-100"><ShieldCheck className="h-5 w-5" /></div>
        <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Mentor applications</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">Review applications, record a clear reason when declining, and applicants can update and reapply.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-2" role="tablist" aria-label="Application status">
        {statuses.map((item) => (
          <Button key={item} variant={status === item ? "default" : "outline"} onClick={() => { setStatus(item); setPage(0); }}>
            {item === "PENDING" ? "Pending" : item === "APPROVED" ? "Approved" : "Rejected"}
          </Button>
        ))}
      </div>

      {applications.isLoading ? <p className="text-muted-foreground">Loading applications…</p> :
       applications.isError ? <p className="text-destructive">Applications could not be loaded.</p> :
       !applications.data?.content.length ? <div className="rounded-[1.35rem] border border-dashed border-white/[0.09] bg-[#0d151a] p-8 text-center text-sm text-slate-400">No applications in this status.</div> : (
        <div className="space-y-4">
          {applications.data.content.map((application) => (
            <Card key={application.id}>
              <CardHeader>
                <CardTitle>{application.firstName} {application.lastName}</CardTitle>
                <p className="text-sm text-muted-foreground">{application.email} · Applied {new Date(application.submittedAt).toLocaleDateString()} · ₹{application.hourlyRate}/hour</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="whitespace-pre-wrap text-sm">{application.about}</p>
                {application.rejectionReason && (
                  <p className="rounded-md border border-amber-500/20 bg-amber-500/5 p-3 text-sm">
                    <span className="font-medium">Previous decision: </span>{application.rejectionReason}
                  </p>
                )}
                {status === "PENDING" && (
                  <>
                    <label className="block space-y-2 text-sm font-medium">
                      Rejection reason (required to reject)
                      <Textarea
                        rows={2}
                        maxLength={500}
                        value={reasons[application.id] ?? ""}
                        onChange={(event) => setReasons((current) => ({ ...current, [application.id]: event.target.value }))}
                      />
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <Button disabled={moderation.approve.isPending || moderation.reject.isPending} onClick={() => approve(application.id)}>Approve application</Button>
                      <Button variant="destructive" disabled={!reasons[application.id]?.trim() || moderation.approve.isPending || moderation.reject.isPending} onClick={() => reject(application.id)}>Reject with reason</Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{applications.data.totalElements} applications · page {applications.data.number + 1} of {Math.max(applications.data.totalPages, 1)}</p>
            <div className="flex gap-2">
              <Button variant="outline" disabled={page === 0} onClick={() => setPage((current) => current - 1)}>Previous</Button>
              <Button variant="outline" disabled={page + 1 >= applications.data.totalPages} onClick={() => setPage((current) => current + 1)}>Next</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
