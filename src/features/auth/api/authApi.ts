import axiosInstance from "@/api/axios";
import type {
  AuthenticationResponse,
  LoginRequest,
  LogoutRequest,
  MessageResponse,
  RegisterRequest,
} from "../types/auth";

export async function loginApi(
  request: LoginRequest
): Promise<AuthenticationResponse> {

  const { data } =
    await axiosInstance.post(
      "/auth/login",
      request
    );

  return data;
}

export async function logoutApi(
  request: LogoutRequest
): Promise<AuthenticationResponse> {

  const { data } =
    await axiosInstance.post(
      "/auth/logout",
      request
    );

  return data;
}

export async function registerApi(
  request: RegisterRequest
): Promise<MessageResponse> {

  const { data } =
    await axiosInstance.post(
      "/auth/register",
      request
    );

  return data;
}

export async function verifyEmailApi(token: string): Promise<MessageResponse> {
  const { data } = await axiosInstance.post("/auth/verify-email", { token });
  return data;
}

export async function resendVerificationApi(email: string): Promise<MessageResponse> {
  const { data } = await axiosInstance.post("/auth/resend-verification", { email });
  return data;
}

export async function requestPasswordResetApi(email: string): Promise<MessageResponse> {
  const { data } = await axiosInstance.post("/auth/forgot-password", { email });
  return data;
}

export async function resetPasswordApi(
  token: string,
  newPassword: string
): Promise<MessageResponse> {
  const { data } = await axiosInstance.post("/auth/reset-password", { token, newPassword });
  return data;
}

export async function refreshTokenApi(
  refreshToken: string
): Promise<AuthenticationResponse> {

  const { data } = await axiosInstance.post(
    "/auth/refresh",
    {
      refreshToken,
    }
  );

  return data;
}
