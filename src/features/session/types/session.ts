export type SessionStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

export interface BookSessionRequest {
  mentorId: number;
  startDateTime: string;
  endDateTime: string;
}

export interface Session {
  id: number;
  mentorId: number;
  mentorName: string;
  clientId: number;
  clientName: string;
  startDateTime: string;
  endDateTime: string;
  status: SessionStatus;
  paymentStatus: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED" | null;
  meetingLink: string | null;
}

export interface SessionMessage {
  id: number;
  senderName: string;
  message: string;
  createdAt: string;
  sentByMe: boolean;
}
