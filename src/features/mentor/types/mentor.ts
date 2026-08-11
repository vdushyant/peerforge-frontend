export type ApprovalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export interface MentorApplicationRequest {
  about: string;
  hourlyRate: number;
}

export interface MentorProfile {
  id: number;
  about: string;
  hourlyRate: number;
  approvalStatus: ApprovalStatus;
  sessionsCompleted: number;
  averageRating: number;
}