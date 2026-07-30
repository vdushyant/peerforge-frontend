import axiosInstance from "@/api/axios";
import type {
  AuthenticationResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth";
import type { UserProfile } from "@/features/profile/types/profile";

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

export async function getMyProfileApi(): Promise<UserProfile> {
  const { data } = await axiosInstance.get("/profile/me");
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

export async function logoutApi(refreshToken: string) {
    await axiosInstance.post("/auth/logout", {
        refreshToken,
    });
}