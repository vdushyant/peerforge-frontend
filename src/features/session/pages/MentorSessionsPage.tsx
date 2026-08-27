import MentorSessionCard from "../components/MentorSessionCard";
import { useMentorSessions } from "../hooks/useMentorSessions";

export default function MentorSessionsPage() {
  const {
    data: sessions = [],
    isLoading,
    isError,
  } = useMentorSessions();

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">
          Loading sessions...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-destructive">
          Unable to load your sessions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-semibold">
          Incoming Sessions
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage sessions requested by clients.
        </p>
      </div>

      {sessions.length === 0 ? (
        <p className="text-muted-foreground">
          You don't have any sessions yet.
        </p>
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