import { useMutation } from "@tanstack/react-query";

import { applyForMentorshipApi } from "../api/mentorApi";

export function useApplyForMentorship() {
  return useMutation({
    mutationFn: applyForMentorshipApi,
  });
}