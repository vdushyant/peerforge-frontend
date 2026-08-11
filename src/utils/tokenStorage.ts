import { STORAGE_KEYS } from "@/constants/storageKeys";

export const tokenStorage = {
  saveTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem( STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem( STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  },

  getAccessToken() {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  getRefreshToken() {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  hasAccessToken() {
    return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  clearTokens() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN  );
  },
};