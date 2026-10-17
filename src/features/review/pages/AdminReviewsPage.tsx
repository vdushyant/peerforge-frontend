import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useModerateReview, usePendingReviews } from "../hooks/useReviewQueries";
import type { ReviewStatus } from "../types/review";
import { MessageSquareText } from "lucide-react";

export default function AdminReviewsPage() {
  const { user } = useAuth();
  const isAdmin = user?.roles.some((role) => role === "ADMIN" || role === "ROLE_ADMIN") ?? false;
  const [status, setStatus] = useState<ReviewStatus>("PENDING");
  const { data: reviews = [], isLoading, isError } = usePendingReviews(status, isAdmin);
  const moderation = useModerateReview();
  const [reasons, setReasons] = useState<Record<number, string>>({});

  if (!isAdmin) {
    return <p className="rounded-2xl border border-rose-200/10 bg-rose-300/[0.04] p-5 text-sm text-rose-200">You do not have access to review moderation.</p>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-7 py-2 sm:py-5">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-100/10 bg-emerald-200/[0.07] text-emerald-100"><MessageSquareText className="h-5 w-5" /></div>
        <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Review moderation</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">Approve appropriate reviews so they appear on mentor profiles, or reject them with a reason.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-2" role="tablist" aria-label="Review status">
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
        <div className="rounded-[1.35rem] border border-dashed border-white/[0.09] bg-[#0d151a] p-8 text-center text-sm text-slate-400">There are no {status.toLowerCase()} reviews.</div>
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
