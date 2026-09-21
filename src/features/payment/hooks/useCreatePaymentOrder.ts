import { useMutation } from "@tanstack/react-query";

import { createPaymentOrderApi } from "../api/paymentApi";

export function useCreatePaymentOrder() {
  return useMutation({
    mutationFn: createPaymentOrderApi,
  });
}