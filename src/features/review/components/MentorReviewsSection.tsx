import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMentorReviews } from "../hooks/useReviewQueries";

interface MentorReviewsSectionProps {
  mentorId: number;
  reviewCount: number;
}

export default function MentorReviewsSection({ mentorId, reviewCount }: MentorReviewsSectionProps) {
  const { data: reviews = [], isLoading, isError } = useMentorReviews(mentorId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews ({reviewCount})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading reviews...</p>
        ) : isError ? (
          <p className="text-sm text-destructive">Unable to load reviews.</p>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground">No published reviews yet.</p>
        ) : reviews.map((review) => (
          <article key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium">{review.reviewerName}</p>
              <p className="text-sm text-amber-600" aria-label={`${review.rating} out of 5 stars`}>
                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
              </p>
            </div>
            {review.comment && <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{review.comment}</p>}
            <time className="mt-2 block text-xs text-muted-foreground" dateTime={review.createdAt}>
              {new Date(review.createdAt).toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric",
              })}
            </time>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
