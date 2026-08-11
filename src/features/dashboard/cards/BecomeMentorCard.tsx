import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BecomeMentorCard() {
  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Become a Mentor
        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-4">

        <p className="text-sm text-muted-foreground">
          Share your knowledge, connect with learners and earn money through paid mentorship sessions.
        </p>

        <Button>
          Become Mentor
        </Button>

      </CardContent>

    </Card>
  );
}