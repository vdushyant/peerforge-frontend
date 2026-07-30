import axiosInstance from "./axios";

import { tokenStorage } from "@/utils/tokenStorage";
import { refreshAccessToken } from "./refreshToken";

let isRefreshing = false;

let refreshPromise: Promise<string> | null = null;

export function setupInterceptors() {

  axiosInstance.interceptors.request.use(config => {

    const token = tokenStorage.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  axiosInstance.interceptors.response.use(

    response => response,

    async error => {

      const originalRequest = error.config;

      if (originalRequest.url?.includes("/auth/refresh")) {
        return Promise.reject(error);
      }

      if (
        error.response?.status !== 401 ||
        originalRequest._retry
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {

        if (!isRefreshing) {

          isRefreshing = true;

          refreshPromise = refreshAccessToken();

        }

        const newAccessToken = await refreshPromise!;

        isRefreshing = false;

        refreshPromise = null;

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);

      } catch (e) {

        isRefreshing = false;

        refreshPromise = null;

        tokenStorage.clearTokens();

        window.location.href = "/login";

        return Promise.reject(e);
      }
    }
  );
}