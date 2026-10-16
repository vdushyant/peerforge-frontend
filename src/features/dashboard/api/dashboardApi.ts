import axiosInstance from "@/api/axios";
import type { MentorDashboardAnalytics, PlatformAnalytics } from "../types/analytics";

export async function getMentorDashboardApi(): Promise<MentorDashboardAnalytics> {
  const response = await axiosInstance.get<MentorDashboardAnalytics>("/dashboard/mentor");
  return response.data;
}

export async function getPlatformAnalyticsApi(): Promise<PlatformAnalytics> {
  const response = await axiosInstance.get<PlatformAnalytics>("/admin/analytics");
  return response.data;
}
