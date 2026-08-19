import { useNavigate } from "react-router-dom";

import MentorCard from "../components/MentorCard";
import { useMentors } from "../hooks/useMentors";

export default function MentorListPage() {
  const navigate = useNavigate();

  const {
    data: mentors = [],
    isLoading,
    isError,
  } = useMentors();

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">
          Loading mentors...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-destructive">
          Unable to load mentors.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-semibold">
          Find a Mentor
        </h1>

        <p className="mt-2 text-muted-foreground">
          Connect with experienced mentors and learn from
          their expertise.
        </p>
      </div>

      {mentors.length === 0 ? (
        <p className="text-muted-foreground">
          No mentors are currently available.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor) => (
            <MentorCard
              key={mentor.mentorId}
              mentor={mentor}
              onViewProfile={(mentorId) =>
                navigate(`/mentors/${mentorId}`)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}