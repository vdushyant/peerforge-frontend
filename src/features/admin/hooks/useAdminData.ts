import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ApprovalStatus } from "@/features/mentor/types/mentor";
import {
  approveMentorApi,
  getAdminSessionsApi,
  getAdminUsersApi,
  getMentorApplicationsApi,
  rejectMentorApi,
} from "../api/adminApi";

export function useMentorApplications(status: ApprovalStatus, page: number) {
  return useQuery({
    queryKey: ["admin", "mentorApplications", status, page],
    queryFn: () => getMentorApplicationsApi(status, page),
  });
}

export function useModerateMentorApplication() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin", "mentorApplications"] });
  return {
    approve: useMutation({ mutationFn: approveMentorApi, onSuccess: invalidate }),
    reject: useMutation({
      mutationFn: ({ id, reason }: { id: number; reason: string }) => rejectMentorApi(id, reason),
      onSuccess: invalidate,
    }),
  };
}

export function useAdminUsers(page: number, enabled: boolean) {
  return useQuery({
    queryKey: ["admin", "users", page],
    queryFn: () => getAdminUsersApi(page),
    enabled,
  });
}

export function useAdminSessions(page: number, enabled: boolean) {
  return useQuery({
    queryKey: ["admin", "sessions", page],
    queryFn: () => getAdminSessionsApi(page),
    enabled,
  });
}
