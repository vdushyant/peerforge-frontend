import { Card, CardContent } from "@/components/ui/card";

export default function WelcomeCard() {
  return (
    <Card>

      <CardContent className="p-8">

        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back 👋
        </h1>

        <p className="mt-3 text-muted-foreground">
          Ready to continue your learning journey on PeerForge?
        </p>

      </CardContent>

    </Card>
  );
}