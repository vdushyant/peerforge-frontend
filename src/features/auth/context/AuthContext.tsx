import { createContext } from "react";
import type { LoginRequest, RegisterRequest } from "../types/auth";
import type { Profile } from "@/features/profile/types/profile";

export interface AuthContextType {
  user: Profile| null;

  isAuthenticated: boolean;

  isLoading: boolean;

  login(request: LoginRequest): Promise<void>;

  register(request: RegisterRequest): Promise<void>;

  logout(): Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);