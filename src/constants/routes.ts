export const APP_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
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
  ADMIN: {
    REVIEWS: "/admin/reviews",
  },
  SETTINGS: "/settings"
};
