import { useMutation, useQueryClient } from "@tanstack/react-query";

import { applyForMentorshipApi } from "../api/mentorApi";
import { queryKeys } from "@/lib/queryKeys";

export function useApplyForMentorship() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: applyForMentorshipApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.mentor.me }),
  });
}
