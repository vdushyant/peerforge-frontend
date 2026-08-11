import axiosInstance from "@/api/axios";
import type {
  AuthenticationResponse,
  LoginRequest,
  LogoutRequest,
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
): Promise<AuthenticationResponse> {

  const { data } =
    await axiosInstance.post(
      "/auth/register",
      request
    );

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
