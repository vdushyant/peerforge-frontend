import axiosInstance from "@/api/axios";
import type { NotificationInbox } from "../types/notification";

export async function getNotificationsApi(): Promise<NotificationInbox> {
  const response = await axiosInstance.get<NotificationInbox>("/notifications");
  return response.data;
}

export async function markNotificationReadApi(id: number): Promise<void> {
  await axiosInstance.patch(`/notifications/${id}/read`);
}

export async function markAllNotificationsReadApi(): Promise<void> {
  await axiosInstance.patch("/notifications/read-all");
}
