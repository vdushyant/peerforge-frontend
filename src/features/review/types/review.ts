export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Review {
  id: number;
  sessionId: number;
  mentorId: number;
  mentorName: string;
  reviewerName: string;
  rating: number;
  comment: string | null;
  status: ReviewStatus;
  moderationNote: string | null;
  createdAt: string;
}

export interface ReviewEligibility {
  eligible: boolean;
  reason: string | null;
  review: Review | null;
}

export interface CreateReviewRequest {
  rating: number;
  comment: string;
}
