import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMySessions } from "@/features/session/hooks/useMySessions";

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
    <Card>

      <CardHeader>

        <CardTitle>
          Upcoming Sessions
        </CardTitle>

      </CardHeader>

      <CardContent>

        {sessions.isLoading ? (
          <p className="text-muted-foreground">Loading your upcoming sessions…</p>
        ) : sessions.isError ? (
          <p className="text-destructive">Upcoming sessions could not be loaded.</p>
        ) : upcoming.length === 0 ? (
          <p className="text-muted-foreground">You don’t have any upcoming sessions.</p>
        ) : (
          <div className="space-y-4">
            {upcoming.map((session) => (
              <div key={session.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 p-4">
                <div>
                  <p className="font-medium">{session.mentorName}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(session.startDateTime).toLocaleString()} · {session.status.toLowerCase()}
                  </p>
                </div>
              </div>
            ))}
            <Button asChild variant="outline" size="sm">
              <Link to="/sessions">View all sessions</Link>
            </Button>
          </div>
        )}

      </CardContent>

    </Card>
  );
}
