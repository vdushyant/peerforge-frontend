import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UpcomingSessionsCard() {
  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Upcoming Sessions
        </CardTitle>

      </CardHeader>

      <CardContent>

        <p className="text-muted-foreground">
          You don't have any upcoming sessions.
        </p>

      </CardContent>

    </Card>
  );
}