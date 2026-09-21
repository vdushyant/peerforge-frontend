import { useMutation } from "@tanstack/react-query";
import { markPaymentFailedApi } from "../api/paymentApi";

export function useMarkPaymentFailed() {
  return useMutation({
    mutationFn: markPaymentFailedApi,
  });
}