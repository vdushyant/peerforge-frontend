import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { getMentorByIdApi } from "../api/mentorApi";

export function useMentor(mentorId: number) {
  return useQuery({
    queryKey: queryKeys.mentor.detail(mentorId),
    queryFn: () => getMentorByIdApi(mentorId),
    enabled: Number.isFinite(mentorId),
  });
}