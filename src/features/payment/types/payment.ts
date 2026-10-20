export interface CreatePaymentOrderResponse {
  paymentId: number;
  sessionId: number;
  razorpayOrderId: string | null;
  razorpayKey: string | null;
  amount: number;
  mentorAmount: number;
  clientFee: number;
  currency: string;
  razorpayQrCodeId: string;
  razorpayQrCodeImageUrl: string;
  razorpayQrCodeExpiresAt: string;
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
  mentorAmount: number;
  clientFee: number;
  status: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
  providerOrderId: string | null;
  providerPaymentId: string | null;
  razorpayKey?: string;
}
