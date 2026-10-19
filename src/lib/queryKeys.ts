export const queryKeys = {

  profile: ["profile"] as const,
  mentor: {
    me: ["mentor", "me"] as const,
    availability: ["mentor", "availability"] as const,
    list: ["mentor", "list"] as const,
    detail: (mentorId: number) =>
      ["mentor", "detail", mentorId] as const,
    publicAvailability: (mentorId: number) =>
      ["mentor", "publicAvailability", mentorId] as const,
  },
  session: {
    me: ["session", "me"] as const,
    mentor: ["session", "mentor"] as const,
    messages: (sessionId: number) => ["session", "messages", sessionId] as const,
  },
  notifications: {
    inbox: ["notifications", "inbox"] as const,
  },
  dashboard: {
    mentor: ["dashboard", "mentor"] as const,
    platform: ["dashboard", "platform"] as const,
  },
  review: {
    eligibility: (sessionId: number) => ["review", "eligibility", sessionId] as const,
    mentor: (mentorId: number) => ["review", "mentor", mentorId] as const,
    moderation: (status: string) => ["review", "moderation", status] as const,
  },
  landing: {
    stats: ["landing", "stats"] as const,
    skills: ["landing", "skills"] as const,
    featuredReviews: ["landing", "featuredReviews"] as const,
  },

};
