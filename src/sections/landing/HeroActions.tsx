import { Button } from "@/components/ui/button";

export default function HeroActions() {
  return (
    <div className="mt-10 flex gap-4">

      <Button size="lg">

        Find a Mentor

      </Button>

      <Button
        variant="outline"
        size="lg"
      >

        Start Mentoring

      </Button>

    </div>
  );
}