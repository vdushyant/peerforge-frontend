import { tokenStorage } from "@/utils/tokenStorage";

import {
  loginApi,
  logoutApi,
  registerApi,
} from "../api";

import { getMyProfileApi } from "@/features/profile/api";

import type {
  LoginRequest,
  AuthResult,
  RegisterRequest,
} from "../types/auth";

import type { Profile } from "@/features/profile/types/profile";

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

export async function restoreSession(): Promise<Profile | null> {
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
      await logoutApi({
        refreshToken,
      });
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