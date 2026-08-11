import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfileCompletionCard() {
  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Profile Completion
        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-5">
        <p className="text-sm text-muted-foreground">
          Complete your profile to improve visibility and help mentors know more about you.
        </p>

        <Button variant="outline">
          Complete Profile
        </Button>

      </CardContent>

    </Card>
  );
}