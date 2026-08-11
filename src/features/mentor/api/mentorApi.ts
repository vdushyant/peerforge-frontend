import axiosInstance from "@/api/axios";

import type {
  MentorApplicationRequest,
  MentorProfile,
} from "../types/mentor";

export async function applyForMentorshipApi(
  request: MentorApplicationRequest
): Promise<MentorProfile> {
  const response = await axiosInstance.post<MentorProfile>(
    "mentors/apply",
    request
  );

  return response.data;
}