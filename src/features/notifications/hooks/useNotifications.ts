import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import {
  getNotificationsApi,
  markAllNotificationsReadApi,
  markNotificationReadApi,
} from "../api/notificationApi";

export function useNotifications() {
  return useQuery({
    queryKey: queryKeys.notifications.inbox,
    queryFn: getNotificationsApi,
    refetchInterval: 30_000,
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markNotificationReadApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.notifications.inbox }),
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAllNotificationsReadApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.notifications.inbox }),
  });
}
