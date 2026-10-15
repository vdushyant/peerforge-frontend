import axiosInstance from "./axios";

import { tokenStorage } from "@/utils/tokenStorage";

export async function refreshAccessToken(): Promise<string> {

    const refreshToken =
    tokenStorage.getRefreshToken();

    if (!refreshToken) {
        throw new Error("No refresh token");
    }

    try {

        const response = await axiosInstance.post(
            "/auth/refresh",
            {
                refreshToken,
            }
        );

        tokenStorage.saveTokens( response.data.accessToken,
            response.data.refreshToken
        )

        return response.data.accessToken;

    } catch (error) {

        tokenStorage.clearTokens();

        throw error;
    }
}
