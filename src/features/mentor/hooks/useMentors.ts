import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { getMentorsApi } from "../api/mentorApi";

export function useMentors() {
  return useQuery({
    queryKey: queryKeys.mentor.list,
    queryFn: getMentorsApi,
  });
}