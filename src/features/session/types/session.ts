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
  mentorEmail: string;
  clientId: number;
  clientName: string;
  clientEmail: string;
  startDateTime: string;
  endDateTime: string;
  status: SessionStatus;
}