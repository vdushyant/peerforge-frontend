import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { updateMyProfileApi } from "@/features/profile/api/profileApi";
import { queryKeys } from "@/lib/queryKeys";

export function useUpdateProfile() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyProfileApi,

    onSuccess: () => {
    queryClient.invalidateQueries({
        queryKey: queryKeys.profile,
    });
}

  });

}