import type { ApprovalStatus } from "@/features/mentor/types/mentor";

export interface PageResult<T> {
  content: T[];
  number: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

export interface MentorApplication {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  about: string;
  hourlyRate: number;
  approvalStatus: ApprovalStatus;
  rejectionReason: string | null;
  submittedAt: string;
}

export interface AdminUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  accountStatus: string;
  roles: string[];
  createdAt: string;
}

export interface AdminSession {
  id: number;
  mentorName: string;
  clientName: string;
  startDateTime: string;
  endDateTime: string;
  status: string;
  paymentStatus: string | null;
}
