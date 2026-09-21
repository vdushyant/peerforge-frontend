import axiosInstance from "@/api/axios";

import type {
  CreatePaymentOrderResponse,
  VerifyPaymentRequest,
  PaymentResponse,
} from "../types/payment";

export async function createPaymentOrderApi(
  sessionId: number
): Promise<CreatePaymentOrderResponse> {
  const response =
    await axiosInstance.post<CreatePaymentOrderResponse>(
      `/payments/orders/session/${sessionId}`
    );

  return response.data;
}

export async function verifyPaymentApi(
  request: VerifyPaymentRequest
): Promise<PaymentResponse> {
  const response =
    await axiosInstance.post<PaymentResponse>(
      "/payments/orders/verify",
      request
    );

  return response.data;
}

export async function markPaymentFailedApi(
  paymentId: number
): Promise<PaymentResponse> {
  const response =
    await axiosInstance.patch<PaymentResponse>(
      `/payments/${paymentId}/client-failed`
    );

  return response.data;
}