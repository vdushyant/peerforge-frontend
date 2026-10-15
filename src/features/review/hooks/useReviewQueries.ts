import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import {
  approveReviewApi,
  createReviewApi,
  getMentorReviewsApi,
  getReviewsForModerationApi,
  getSessionReviewEligibilityApi,
  rejectReviewApi,
} from "../api/reviewApi";
import type { CreateReviewRequest, ReviewStatus } from "../types/review";

export function useSessionReviewEligibility(sessionId: number, enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.review.eligibility(sessionId),
    queryFn: () => getSessionReviewEligibilityApi(sessionId),
    enabled: enabled && Number.isFinite(sessionId),
  });
}

export function useMentorReviews(mentorId: number) {
  return useQuery({
    queryKey: queryKeys.review.mentor(mentorId),
    queryFn: () => getMentorReviewsApi(mentorId),
    enabled: Number.isFinite(mentorId),
  });
}

export function useSubmitReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sessionId, request }: { sessionId: number; request: CreateReviewRequest }) =>
      createReviewApi(sessionId, request),
    onSuccess: (_review, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.review.eligibility(variables.sessionId),
      });
    },
  });
}

export function usePendingReviews(status: ReviewStatus = "PENDING", enabled = true) {
  return useQuery({
    queryKey: queryKeys.review.moderation(status),
    queryFn: () => getReviewsForModerationApi(status),
    enabled,
  });
}

export function useModerateReview() {
  const queryClient = useQueryClient();
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["review", "moderation"] });
    queryClient.invalidateQueries({ queryKey: ["review", "mentor"] });
    queryClient.invalidateQueries({ queryKey: ["mentor"] });
  };

  const approve = useMutation({ mutationFn: approveReviewApi, onSuccess: invalidate });
  const reject = useMutation({
    mutationFn: ({ reviewId, reason }: { reviewId: number; reason: string }) =>
      rejectReviewApi(reviewId, reason),
    onSuccess: invalidate,
  });
  return { approve, reject };
}
