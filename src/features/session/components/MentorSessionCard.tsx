import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Session } from "../types/session";
import { Button } from "@/components/ui/button";
import { useConfirmSession } from "../hooks/useConfirmSession";
import { useCancelSession } from "../hooks/useCancelSession";
import { useCompleteSession } from "../hooks/useCompleteSession";
import { CalendarDays, Clock3, UserRound } from "lucide-react";


interface MentorSessionCardProps {
  session: Session;
}

function formatDate(dateTime: string) {
  return new Date(dateTime).toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

function formatTime(dateTime: string) {
  return new Date(dateTime).toLocaleTimeString(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

export default function MentorSessionCard({
  session,
}: MentorSessionCardProps) {
  const confirmSession = useConfirmSession();
  const cancelSession = useCancelSession();
  const completeSession = useCompleteSession();
  return (
    <Card className="border-0 bg-[#0e171c] text-white ring-1 ring-inset ring-white/[0.08] transition-all duration-200 hover:-translate-y-0.5 hover:ring-emerald-100/20">
      <CardHeader className="border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-200/[0.08] text-emerald-100"><UserRound className="h-4 w-4" /></div>
          <CardTitle className="font-semibold tracking-tight text-white">
          {session.clientName}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <p className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
            <CalendarDays className="h-3.5 w-3.5 text-emerald-200/80" />
            Date
          </p>

          <p className="text-sm text-muted-foreground">
            {formatDate(session.startDateTime)}
          </p>
        </div>

        <div>
          <p className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
            <Clock3 className="h-3.5 w-3.5 text-emerald-200/80" />
            Time
          </p>

          <p className="text-sm text-muted-foreground">
            {formatTime(session.startDateTime)} -{" "}
            {formatTime(session.endDateTime)}
          </p>
        </div>

        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
            Status
          </p>

          <p className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${session.status === "CONFIRMED" ? "bg-emerald-200/[0.08] text-emerald-100" : session.status === "PENDING" ? "bg-amber-200/[0.08] text-amber-100" : "bg-white/[0.06] text-slate-300"}`}>
            {session.status.toLowerCase()}
          </p>
        </div>
        {session.status === "PENDING" && (
          <div className="flex gap-3">
            <Button
              className="flex-1 rounded-xl"
              disabled={
                confirmSession.isPending ||
                cancelSession.isPending
              }
              onClick={() =>
                confirmSession.mutate(session.id)
              }
            >
              {confirmSession.isPending
                ? "Confirming..."
                : "Confirm"}
            </Button>

            <Button
              variant="outline"
              className="flex-1 rounded-xl"
              disabled={
                confirmSession.isPending ||
                cancelSession.isPending
              }
              onClick={() =>
                cancelSession.mutate(session.id)
              }
            >
              {cancelSession.isPending
                ? "Cancelling..."
                : "Cancel"}
            </Button>
          </div>
        )}

        {session.status === "CONFIRMED" && (
          <Button
            className="w-full rounded-xl"
            disabled={completeSession.isPending}
            onClick={() =>
              completeSession.mutate(session.id)
            }
          >
            {completeSession.isPending
              ? "Completing..."
              : "Complete Session"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
