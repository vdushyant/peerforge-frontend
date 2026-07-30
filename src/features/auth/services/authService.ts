import { tokenStorage } from "@/utils/tokenStorage";

import {
  getMyProfileApi,
  loginApi,
  logoutApi,
  registerApi,
} from "../api/authApi";

import type {
  LoginRequest,
  AuthResult,
  RegisterRequest,
} from "../types/auth";

import type { UserProfile } from "@/features/profile/types/profile";

import axios from "axios";

export async function loginUser(
  request: LoginRequest
): Promise<AuthResult> {
  const response = await loginApi(request);

  return buildAuthResult(
    response.accessToken,
    response.refreshToken
  );
}

export async function registerUser(
  request: RegisterRequest
): Promise<AuthResult> {
  const response = await registerApi(request);

  return buildAuthResult(
    response.accessToken,
    response.refreshToken
  );
}

export async function restoreSession(): Promise<UserProfile | null> {
  if (!tokenStorage.hasAccessToken()) {
    return null;
  }

  try {
    return await getMyProfileApi();
  } catch {
    tokenStorage.clearTokens();
    return null;
  }
}

export async function logoutUser() {
  const refreshToken = tokenStorage.getRefreshToken();

  if (refreshToken) {
    try {
      await logoutApi(refreshToken);
    } catch {
      // Ignore backend failure
    }
  }

  tokenStorage.clearTokens();
}

async function buildAuthResult(
  accessToken: string,
  refreshToken: string
): Promise<AuthResult> {
  tokenStorage.saveTokens(accessToken, refreshToken);

  const profile = await getMyProfileApi();

return {
    accessToken,
    refreshToken,
    profile,
};
}