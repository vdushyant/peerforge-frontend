import axiosInstance from "@/api/axios";

import type {
  BookSessionRequest,
  SessionMessage,
  Session,
} from "../types/session";

export async function bookSessionApi(
  request: BookSessionRequest
): Promise<Session> {
  const response = await axiosInstance.post<Session>(
    "/sessions",
    request
  );

  return response.data;
}

export async function getMySessionsApi(): Promise<Session[]> {
  const response = await axiosInstance.get<Session[]>(
    "/sessions/me"
  );

  return response.data;
}

export async function getMentorSessionsApi(): Promise<Session[]> {
  const response = await axiosInstance.get<Session[]>(
    "/sessions/mentor"
  );

  return response.data;
}

export async function confirmSessionApi(
  sessionId: number
): Promise<Session> {
  const response = await axiosInstance.patch<Session>(
    `/sessions/${sessionId}/confirm`
  );

  return response.data;
}

export async function cancelSessionApi(
  sessionId: number
): Promise<Session> {
  const response = await axiosInstance.patch<Session>(
    `/sessions/${sessionId}/cancel`
  );

  return response.data;
}

export async function completeSessionApi(
  sessionId: number
): Promise<Session> {
  const response = await axiosInstance.patch<Session>(
    `/sessions/${sessionId}/complete`
  );

  return response.data;
}

export async function getSessionMessagesApi(sessionId: number): Promise<SessionMessage[]> {
  const response = await axiosInstance.get<SessionMessage[]>(`/sessions/${sessionId}/messages`);
  return response.data;
}

export async function sendSessionMessageApi(
  sessionId: number,
  message: string,
): Promise<SessionMessage> {
  const response = await axiosInstance.post<SessionMessage>(
    `/sessions/${sessionId}/messages`,
    { message },
  );
  return response.data;
}

export async function updateMeetingLinkApi(
  sessionId: number,
  meetingLink: string,
): Promise<Session> {
  const response = await axiosInstance.put<Session>(
    `/sessions/${sessionId}/meeting-link`,
    { meetingLink },
  );
  return response.data;
}
