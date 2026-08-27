import { useParams } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useMentor } from "../hooks/useMentor";
import { useMentorAvailability } from "../hooks/useMentorAvailability";
import BookSessionForm from "@/features/session/components/BookSessionForm";

export default function MentorDetailPage() {
  const { mentorId } = useParams();

  const id = Number(mentorId);

  const {
    data: mentor,
    isLoading,
    isError,
  } = useMentor(id);

  const {
  data: availability = [],
  isLoading: isAvailabilityLoading,
  isError: isAvailabilityError,
} = useMentorAvailability(id);

  if (!Number.isFinite(id)) {
    return (
      <div className="p-6">
        <p className="text-destructive">
          Invalid mentor.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">
          Loading mentor profile...
        </p>
      </div>
    );
  }

  if (isError || !mentor) {
    return (
      <div className="p-6">
        <p className="text-destructive">
          Unable to load mentor profile.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-semibold">
          {mentor.firstName} {mentor.lastName}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {mentor.headline}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground">
              {mentor.about}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mentor Details</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium">
                Experience
              </p>

              <p className="text-muted-foreground">
                {mentor.yearsOfExperience} years
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">
                Hourly Rate
              </p>

              <p className="text-xl font-semibold">
                ₹{mentor.hourlyRate}/hr
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">
                Rating
              </p>

              <p className="text-muted-foreground">
                {mentor.averageRating.toFixed(1)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>

        <CardContent>
          {mentor.skills.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No skills listed.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {mentor.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border px-3 py-1 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
  <CardHeader>
    <CardTitle>Availability</CardTitle>
  </CardHeader>

  <CardContent>
    {isAvailabilityLoading ? (
      <p className="text-sm text-muted-foreground">
        Loading availability...
      </p>
    ) : isAvailabilityError ? (
      <p className="text-sm text-destructive">
        Unable to load availability.
      </p>
    ) : availability.length === 0 ? (
      <p className="text-sm text-muted-foreground">
        This mentor currently has no availability.
      </p>
    ) : (
      <div className="space-y-3">
        {availability.map((slot) => (
          <div
            key={slot.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <span className="font-medium">
              {slot.dayOfWeek.charAt(0) +
                slot.dayOfWeek.slice(1).toLowerCase()}
            </span>

            <span className="text-sm text-muted-foreground">
              {slot.startTime.slice(0, 5)} -{" "}
              {slot.endTime.slice(0, 5)}
            </span>
          </div>
        ))}
      </div>
    )}
  </CardContent>
</Card>

<Card>
  <CardHeader>
    <CardTitle>Book a Session</CardTitle>
  </CardHeader>

  <CardContent>
    <BookSessionForm
      mentorId={mentor.mentorId}
      availability={availability}
    />
  </CardContent>
</Card>
    </div>
  );
}