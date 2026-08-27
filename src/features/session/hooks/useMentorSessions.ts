import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { getMentorSessionsApi } from "../api/sessionApi";

export function useMentorSessions() {
  return useQuery({
    queryKey: queryKeys.session.mentor,
    queryFn: getMentorSessionsApi,
  });
}