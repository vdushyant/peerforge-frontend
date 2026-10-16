import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useModerateReview, usePendingReviews } from "../hooks/useReviewQueries";
import type { ReviewStatus } from "../types/review";

export default function AdminReviewsPage() {
  const { user } = useAuth();
  const isAdmin = user?.roles.some((role) => role === "ADMIN" || role === "ROLE_ADMIN") ?? false;
  const [status, setStatus] = useState<ReviewStatus>("PENDING");
  const { data: reviews = [], isLoading, isError } = usePendingReviews(status, isAdmin);
  const moderation = useModerateReview();
  const [reasons, setReasons] = useState<Record<number, string>>({});

  if (!isAdmin) {
    return <p className="p-6 text-destructive">You do not have access to review moderation.</p>;
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-semibold">Review moderation</h1>
        <p className="mt-2 text-muted-foreground">Approve appropriate reviews so they appear on mentor profiles, or reject them with a reason.</p>
      </div>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Review status">
        {(["PENDING", "APPROVED", "REJECTED"] as ReviewStatus[]).map((item) => (
          <Button key={item} variant={status === item ? "default" : "outline"} onClick={() => setStatus(item)}>
            {item === "PENDING" ? "Pending" : item === "APPROVED" ? "Approved" : "Rejected"}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading pending reviews...</p>
      ) : isError ? (
        <p className="text-destructive">Unable to load pending reviews.</p>
      ) : reviews.length === 0 ? (
        <p className="text-muted-foreground">There are no {status.toLowerCase()} reviews.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <CardTitle>{review.mentorName}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Session #{review.sessionId} · Client {review.reviewerName} · {review.rating}/5
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {review.comment ? (
                  <p className="whitespace-pre-wrap text-sm">{review.comment}</p>
                ) : (
                  <p className="text-sm italic text-muted-foreground">No written comment.</p>
                )}
                {status === "PENDING" && <label className="block space-y-1 text-sm font-medium">
                  Rejection reason (required only when rejecting)
                  <Textarea
                    value={reasons[review.id] ?? ""}
                    maxLength={500}
                    rows={2}
                    onChange={(event) => setReasons((current) => ({ ...current, [review.id]: event.target.value }))}
                  />
                </label>}
                {status === "PENDING" && (moderation.approve.isError || moderation.reject.isError) && (
                  <p className="text-sm text-destructive">The moderation action failed. Refresh and try again.</p>
                )}
                {status === "PENDING" && <div className="flex flex-wrap gap-3">
                  <Button
                    disabled={moderation.approve.isPending || moderation.reject.isPending}
                    onClick={() => moderation.approve.mutate(review.id)}
                  >
                    Approve and publish
                  </Button>
                  <Button
                    variant="destructive"
                    disabled={moderation.approve.isPending || moderation.reject.isPending || !reasons[review.id]?.trim()}
                    onClick={() => moderation.reject.mutate({ reviewId: review.id, reason: reasons[review.id]?.trim() ?? "" })}
                  >
                    Reject
                  </Button>
                </div>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
