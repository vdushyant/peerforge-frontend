import { useMutation } from "@tanstack/react-query";

import { verifyPaymentApi } from "../api/paymentApi";

export function useVerifyPayment() {
  return useMutation({
    mutationFn: verifyPaymentApi,
  });
}