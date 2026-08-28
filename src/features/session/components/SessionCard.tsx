import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Session } from "../types/session";
import { Button } from "@/components/ui/button";
import { useCancelSession } from "../hooks/useCancelSession";

interface SessionCardProps {
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

export default function SessionCard({
  session,
}: SessionCardProps) {
  const cancelSession = useCancelSession();
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {session.mentorName}
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
          {(session.status === "PENDING" ||
            session.status === "CONFIRMED") && (
              <Button
                variant="outline"
                className="w-full"
                disabled={cancelSession.isPending}
                onClick={() =>
                  cancelSession.mutate(session.id)
                }
              >
                {cancelSession.isPending
                  ? "Cancelling..."
                  : "Cancel Session"}
              </Button>
            )}
        </div>
      </CardContent>
    </Card>
  );
}