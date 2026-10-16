import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroActions() {
  return (
    <div className="mt-10 flex gap-4">

      <Button asChild size="lg">
        <Link to="/mentors">Find a Mentor</Link>
      </Button>

      <Button
        asChild
        variant="outline"
        size="lg"
      >
        <Link to="/register">Start Mentoring</Link>
      </Button>

    </div>
  );
}
