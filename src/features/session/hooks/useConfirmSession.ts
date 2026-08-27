import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { confirmSessionApi } from "../api/sessionApi";

export function useConfirmSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: confirmSessionApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.session.mentor,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.session.me,
      });
    },
  });
}