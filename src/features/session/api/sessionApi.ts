import axiosInstance from "@/api/axios";

import type {
  BookSessionRequest,
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