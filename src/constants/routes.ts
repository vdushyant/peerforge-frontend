export const APP_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  VERIFY_EMAIL: "/verify-email",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  MENTORS: "/mentors",
  MENTOR: {
    BECOME: "/mentor/become",
    DASHBOARD: "/mentor/dashboard",
    DETAIL: "/mentors/:mentorId",
    SESSIONS: "/mentor/sessions",
  },
  MY_SESSIONS: "/sessions",
  NOTIFICATIONS: "/notifications",
  ADMIN: {
    REVIEWS: "/admin/reviews",
    ANALYTICS: "/admin/analytics",
    MENTORS: "/admin/mentors",
    USERS: "/admin/users",
    SESSIONS: "/admin/sessions",
  },
  SETTINGS: "/settings"
};
