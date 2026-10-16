export interface LandingStats {
  mentorCount: number;
  completedSessionCount: number;
  skillCount: number;
  averageRating: number;
}

export interface FeaturedReview {
  id: number;
  mentorName: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface LandingSkill {
  id: number;
  name: string;
}
