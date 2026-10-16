import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getMentorDashboardApi, getPlatformAnalyticsApi } from "../api/dashboardApi";

export function useMentorDashboardAnalytics() {
  return useQuery({
    queryKey: queryKeys.dashboard.mentor,
    queryFn: getMentorDashboardApi,
  });
}

export function usePlatformAnalytics() {
  return useQuery({
    queryKey: queryKeys.dashboard.platform,
    queryFn: getPlatformAnalyticsApi,
  });
}
