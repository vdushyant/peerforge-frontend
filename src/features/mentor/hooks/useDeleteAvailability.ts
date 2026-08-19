import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { deleteAvailabilityApi } from "../api/mentorApi";

export function useDeleteAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAvailabilityApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mentor.availability,
      });
    },
  });
}