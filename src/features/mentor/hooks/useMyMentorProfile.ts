import { useQuery } from "@tanstack/react-query";

import { getMyMentorProfileApi } from "../api/mentorApi";
import { queryKeys } from "@/lib/queryKeys";

export function useMyMentorProfile() {
  return useQuery({
    queryKey: queryKeys.mentor.me,
    queryFn: getMyMentorProfileApi,
  });
}