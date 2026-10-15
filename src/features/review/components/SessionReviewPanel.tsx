import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSessionReviewEligibility, useSubmitReview } from "../hooks/useReviewQueries";

interface SessionReviewPanelProps {
  sessionId: number;
}

export default function SessionReviewPanel({ sessionId }: SessionReviewPanelProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const eligibility = useSessionReviewEligibility(sessionId, true);
  const submitReview = useSubmitReview();

  if (eligibility.isLoading) {
    return <p className="text-sm text-muted-foreground">Checking review eligibility...</p>;
  }
  if (eligibility.isError || !eligibility.data) {
    return <p className="text-sm text-destructive">Unable to load review details.</p>;
  }

  if (!eligibility.data.eligible) {
    if (!eligibility.data.review) return null;
    const { review } = eligibility.data;
    return (
      <div className="rounded-md border p-3 text-sm" role="status">
        <p className="font-medium">Review status: {review.status.toLowerCase()}</p>
        {review.moderationNote && (
          <p className="mt-1 text-muted-foreground">Moderator note: {review.moderationNote}</p>
        )}
      </div>
    );
  }

  return (
    <form
      className="space-y-3 rounded-md border p-3"
      onSubmit={(event) => {
        event.preventDefault();
        submitReview.mutate({ sessionId, request: { rating, comment } });
      }}
    >
      <div>
        <p className="text-sm font-medium">How was your session?</p>
        <div className="mt-1 flex gap-1" role="group" aria-label="Choose a rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              aria-label={`${value} out of 5 stars`}
              aria-pressed={rating === value}
              onClick={() => setRating(value)}
              className={`text-2xl ${value <= rating ? "text-amber-500" : "text-muted-foreground"}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <label className="block space-y-1 text-sm font-medium">
        Review (optional)
        <Textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          maxLength={2000}
          rows={3}
          placeholder="Share what was helpful about the session"
        />
      </label>
      {submitReview.isError && (
        <p className="text-sm text-destructive">Could not submit your review. Please try again.</p>
      )}
      <Button type="submit" disabled={rating === 0 || submitReview.isPending}>
        {submitReview.isPending ? "Submitting..." : "Submit review"}
      </Button>
      <p className="text-xs text-muted-foreground">Your review will appear after admin moderation.</p>
    </form>
  );
}
