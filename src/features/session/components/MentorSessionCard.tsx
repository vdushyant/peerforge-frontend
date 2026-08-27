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
    <Card>
      <CardHeader>
        <CardTitle>
          {session.clientName}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-medium">
            Date
          </p>

          <p className="text-sm text-muted-foreground">
            {formatDate(session.startDateTime)}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium">
            Time
          </p>

          <p className="text-sm text-muted-foreground">
            {formatTime(session.startDateTime)} -{" "}
            {formatTime(session.endDateTime)}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium">
            Status
          </p>

          <p className="text-sm text-muted-foreground">
            {session.status}
          </p>
        </div>
        {session.status === "PENDING" && (
          <div className="flex gap-3">
            <Button
              className="flex-1"
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
              className="flex-1"
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
            className="w-full"
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