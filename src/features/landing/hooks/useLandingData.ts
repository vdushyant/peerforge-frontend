import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import {
  getFeaturedReviewsApi,
  getLandingSkillsApi,
  getLandingStatsApi,
} from "../api/landingApi";

export function useLandingStats() {
  return useQuery({
    queryKey: queryKeys.landing.stats,
    queryFn: getLandingStatsApi,
  });
}

export function useLandingSkills() {
  return useQuery({
    queryKey: queryKeys.landing.skills,
    queryFn: getLandingSkillsApi,
  });
}

export function useFeaturedReviews() {
  return useQuery({
    queryKey: queryKeys.landing.featuredReviews,
    queryFn: getFeaturedReviewsApi,
  });
}
