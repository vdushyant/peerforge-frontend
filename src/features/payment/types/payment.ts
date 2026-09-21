export interface CreatePaymentOrderResponse {
  paymentId: number;
  sessionId: number;
  razorpayOrderId: string;
  razorpayKey: string;
  amount: number;
  currency: string;
}

export interface VerifyPaymentRequest {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface PaymentResponse {
  id: number;
  sessionId: number;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
  providerOrderId: string;
  providerPaymentId: string;
  razorpayKey?: string;
}