export interface MentorDashboardAnalytics {
  completedSessions: number;
  pendingBookings: number;
  confirmedSessions: number;
  upcomingSessions: number;
  approvedReviewCount: number;
  averageRating: number;
  grossSuccessfulPayments: number;
}

export interface PlatformAnalytics {
  totalUsers: number;
  approvedMentors: number;
  pendingMentorApplications: number;
  totalSessions: number;
  bookingsLast30Days: number;
  pendingSessions: number;
  completedSessions: number;
  cancelledSessions: number;
  pendingReviews: number;
  grossSuccessfulPayments: number;
}
