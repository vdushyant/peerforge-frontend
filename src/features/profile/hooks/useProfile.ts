import { useQuery } from "@tanstack/react-query";

import { getMyProfileApi } from "@/features/profile/api/profileApi";
import { queryKeys } from "@/lib/queryKeys";

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: getMyProfileApi,
  });
}