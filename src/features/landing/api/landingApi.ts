import axiosInstance from "@/api/axios";
import type { FeaturedReview, LandingSkill, LandingStats } from "../types";

export async function getLandingStatsApi(): Promise<LandingStats> {
  const response = await axiosInstance.get<LandingStats>("/public/landing-stats");
  return response.data;
}

export async function getFeaturedReviewsApi(): Promise<FeaturedReview[]> {
  const response = await axiosInstance.get<FeaturedReview[]>("/public/featured-reviews");
  return response.data;
}

export async function getLandingSkillsApi(): Promise<LandingSkill[]> {
  const response = await axiosInstance.get<LandingSkill[]>("/skills");
  return response.data;
}
