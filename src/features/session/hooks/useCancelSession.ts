import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { cancelSessionApi } from "../api/sessionApi";

export function useCancelSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelSessionApi,

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