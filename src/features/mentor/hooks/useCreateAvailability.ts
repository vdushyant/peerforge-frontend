import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { createAvailabilityApi } from "../api/mentorApi";

export function useCreateAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAvailabilityApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mentor.availability,
      });
    },
  });
}