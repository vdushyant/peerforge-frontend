import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { APP_ROUTES } from "@/constants/routes";

export default function BecomeMentorCard() {
  const navigate = useNavigate();

  const handleBecomeMentor = () => {
    navigate(APP_ROUTES.MENTOR.BECOME);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Become a Mentor
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Share your knowledge, connect with learners and earn money
          through paid mentorship sessions.
        </p>

        <Button onClick={handleBecomeMentor}>
          Become Mentor
        </Button>
      </CardContent>
    </Card>
  );
}