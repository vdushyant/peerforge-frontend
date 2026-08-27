import { useMutation } from "@tanstack/react-query";

import { bookSessionApi } from "../api/sessionApi";

export function useBookSession() {
  return useMutation({
    mutationFn: bookSessionApi,
  });
}