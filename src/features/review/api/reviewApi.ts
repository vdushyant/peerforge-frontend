import axiosInstance from "@/api/axios";
import type {
  CreateReviewRequest,
  Review,
  ReviewEligibility,
  ReviewStatus,
} from "../types/review";

export async function getSessionReviewEligibilityApi(
  sessionId: number
): Promise<ReviewEligibility> {
  const response = await axiosInstance.get<ReviewEligibility>(
    `/sessions/${sessionId}/review`
  );
  return response.data;
}

export async function createReviewApi(
  sessionId: number,
  request: CreateReviewRequest
): Promise<Review> {
  const response = await axiosInstance.post<Review>(
    `/sessions/${sessionId}/reviews`,
    request
  );
  return response.data;
}

export async function getMentorReviewsApi(
  mentorId: number
): Promise<Review[]> {
  const response = await axiosInstance.get<Review[]>(
    `/mentors/${mentorId}/reviews`
  );
  return response.data;
}

export async function getReviewsForModerationApi(
  status: ReviewStatus = "PENDING"
): Promise<Review[]> {
  const response = await axiosInstance.get<Review[]>("/admin/reviews", {
    params: { status },
  });
  return response.data;
}

export async function approveReviewApi(reviewId: number): Promise<Review> {
  const response = await axiosInstance.patch<Review>(
    `/admin/reviews/${reviewId}/approve`
  );
  return response.data;
}

export async function rejectReviewApi(
  reviewId: number,
  reason: string
): Promise<Review> {
  const response = await axiosInstance.patch<Review>(
    `/admin/reviews/${reviewId}/reject`,
    { reason }
  );
  return response.data;
}
