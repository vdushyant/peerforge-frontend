import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { getMentorAvailabilityApi } from "../api/mentorApi";

export function useMentorAvailability(mentorId: number) {
  return useQuery({
    queryKey: queryKeys.mentor.publicAvailability(mentorId),
    queryFn: () => getMentorAvailabilityApi(mentorId),
    enabled: Number.isFinite(mentorId),
  });
}