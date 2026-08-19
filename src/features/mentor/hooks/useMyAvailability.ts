import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { getMyAvailabilityApi } from "../api/mentorApi";

export function useMyAvailability() {
  return useQuery({
    queryKey: queryKeys.mentor.availability,
    queryFn: getMyAvailabilityApi,
  });
}