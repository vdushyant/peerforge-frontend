import type { UserProfile } from "@/features/profile/types/profile";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResult {
    accessToken: string;
    refreshToken: string;
    profile: UserProfile;
}