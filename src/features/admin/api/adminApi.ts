import axiosInstance from "@/api/axios";
import type { ApprovalStatus, MentorProfile } from "@/features/mentor/types/mentor";
import type { AdminSession, AdminUser, MentorApplication, PageResult } from "../types/admin";

export async function getMentorApplicationsApi(status: ApprovalStatus, page: number): Promise<PageResult<MentorApplication>> {
  const response = await axiosInstance.get<PageResult<MentorApplication>>("/admin/mentors", {
    params: { status, page, size: 20 },
  });
  return response.data;
}

export async function approveMentorApi(id: number): Promise<MentorProfile> {
  const response = await axiosInstance.patch<MentorProfile>(`/admin/mentors/${id}/approve`);
  return response.data;
}

export async function rejectMentorApi(id: number, reason: string): Promise<MentorProfile> {
  const response = await axiosInstance.patch<MentorProfile>(`/admin/mentors/${id}/reject`, { reason });
  return response.data;
}

export async function getAdminUsersApi(page: number): Promise<PageResult<AdminUser>> {
  const response = await axiosInstance.get<PageResult<AdminUser>>("/admin/users", { params: { page, size: 20 } });
  return response.data;
}

export async function getAdminSessionsApi(page: number): Promise<PageResult<AdminSession>> {
  const response = await axiosInstance.get<PageResult<AdminSession>>("/admin/sessions", { params: { page, size: 20 } });
  return response.data;
}
