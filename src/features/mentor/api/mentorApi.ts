import axiosInstance from "@/api/axios";

import type {
  Availability,
  CreateAvailabilityRequest,
  MentorApplicationRequest,
  MentorProfile,
  UpdateMentorProfileRequest,
  MentorCard,
  MentorDetail
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

export async function getMyMentorProfileApi(): Promise<MentorProfile> {
  const response = await axiosInstance.get<MentorProfile>(
    "mentors/me"
  );

  return response.data;
}

export async function updateMyMentorProfileApi(
  request: UpdateMentorProfileRequest
): Promise<MentorProfile> {
  const response = await axiosInstance.put<MentorProfile>(
    "mentors/me",
    request
  );

  return response.data;
}

export async function getMyAvailabilityApi(): Promise<Availability[]> {
  const response = await axiosInstance.get<Availability[]>(
    "mentors/availability"
  );

  return response.data;
}

export async function createAvailabilityApi(
  request: CreateAvailabilityRequest
): Promise<Availability> {
  const response = await axiosInstance.post<Availability>(
    "mentors/availability",
    request
  );

  return response.data;
}

export async function deleteAvailabilityApi(
  availabilityId: number
): Promise<void> {
  await axiosInstance.delete(
    `/mentors/availability/${availabilityId}`
  );
}

export async function getMentorsApi(): Promise<MentorCard[]> {
  const response = await axiosInstance.get<MentorCard[]>(
    "/mentors"
  );

  return response.data;
}

export async function getMentorByIdApi(
  mentorId: number
): Promise<MentorDetail> {
  const response = await axiosInstance.get<MentorDetail>(
    `/mentors/${mentorId}`
  );

  return response.data;
}