import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateMyMentorProfileApi } from "../api/mentorApi";
import { queryKeys } from "@/lib/queryKeys";

export function useUpdateMentorProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyMentorProfileApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mentor.me,
      });
    },
  });
}