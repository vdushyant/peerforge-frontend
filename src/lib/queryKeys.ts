export const queryKeys = {

  profile: ["profile"] as const,
  mentor: {
    me: ["mentor", "me"] as const,
    availability: ["mentor", "availability"] as const,
    list: ["mentor", "list"] as const,
    detail: (mentorId: number) =>
    ["mentor", "detail", mentorId] as const,
  },

};