
import axiosInstance from "@/api/axios";
import type { Profile, UpdateProfileRequest } from "@/features/profile/types/profile";

export async function getMyProfileApi(): Promise<Profile> {
  const { data } = await axiosInstance.get("/profile/me");
  return data;
}


export async function updateMyProfileApi(request: UpdateProfileRequest): Promise<UpdateProfileRequest> {
  const { data } =
    await axiosInstance.put(
      "/profile/me",
      request
    );

  return data;
}