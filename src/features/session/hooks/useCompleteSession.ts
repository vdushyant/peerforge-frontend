import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { completeSessionApi } from "../api/sessionApi";

export function useCompleteSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeSessionApi,

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