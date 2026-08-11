import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { AuthContext } from "./AuthContext";

import type { Profile } from "@/features/profile/types/profile";
import type {
  LoginRequest,
  RegisterRequest,
} from "../types/auth";

import {
  loginUser,
  logoutUser,
  registerUser,
  restoreSession,
} from "../services/authService";

import { tokenStorage } from "@/utils/tokenStorage";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<Profile | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(
    tokenStorage.hasAccessToken()
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initializeAuth() {
      try {
        const profile = await restoreSession();

        setUser(profile);
        setIsAuthenticated(tokenStorage.hasAccessToken());
      } finally {
        setIsLoading(false);
      }
    }

    initializeAuth();
  }, []);

  const login = useCallback(
    async (request: LoginRequest) => {
      const result = await loginUser(request);

      setUser(result.profile);
      setIsAuthenticated(true);
    },
    []
  );

  const register = useCallback(
    async (request: RegisterRequest) => {
      const result = await registerUser(request);

      setUser(result.profile);
      setIsAuthenticated(true);
    },
    []
  );

  const logout = useCallback(async () => {
    await logoutUser();

    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      user,

      isAuthenticated,

      isLoading,

      login,

      register,

      logout,
    }),
    [
      user,
      isAuthenticated,
      isLoading,
      login,
      register,
      logout,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}