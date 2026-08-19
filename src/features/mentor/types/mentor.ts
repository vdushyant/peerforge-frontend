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

export interface UpdateMentorProfileRequest {
  about: string;
  hourlyRate: number;
}

export interface Availability {
  id: number;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
}

export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

  export interface CreateAvailabilityRequest {
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
}

export interface MentorCard {
  mentorId: number;
  firstName: string;
  lastName: string;
  headline: string;
  yearsOfExperience: number;
  skills: string[];
  hourlyRate: number;
  averageRating: number;
}

export interface MentorDetail {
  mentorId: number;
  firstName: string;
  lastName: string;
  headline: string;
  yearsOfExperience: number;
  skills: string[];
  about: string;
  hourlyRate: number;
  averageRating: number;
}
