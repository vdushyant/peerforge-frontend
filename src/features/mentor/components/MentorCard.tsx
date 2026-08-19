import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { MentorCard as MentorCardData } from "../types/mentor";

interface MentorCardProps {
  mentor: MentorCardData;
  onViewProfile: (mentorId: number) => void;
}

export default function MentorCard({
  mentor,
  onViewProfile,
}: MentorCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {mentor.firstName} {mentor.lastName}
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          {mentor.headline}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>
            {mentor.yearsOfExperience} years experience
          </span>

          <span>
            ₹{mentor.hourlyRate}/hr
          </span>
        </div>

        <div>
          <p className="text-sm font-medium">
            Skills
          </p>

          {mentor.skills.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {mentor.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border px-2 py-1 text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">
              No skills added
            </p>
          )}
        </div>

        <div className="text-sm">
          <span className="font-medium">
            Rating:
          </span>{" "}
          {mentor.averageRating.toFixed(1)}
        </div>

        <Button
          onClick={() => onViewProfile(mentor.mentorId)}
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
}