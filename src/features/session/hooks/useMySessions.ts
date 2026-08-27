import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { getMySessionsApi } from "../api/sessionApi";

export function useMySessions() {
  return useQuery({
    queryKey: queryKeys.session.me,
    queryFn: getMySessionsApi,
  });
}