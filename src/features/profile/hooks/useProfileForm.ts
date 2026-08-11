import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { profileSchema } from "../schema/profileSchema";

import type {
  ProfileFormValues,
  UpdateProfileRequest,
} from "../types";

export function useProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),

    defaultValues: {
      headline: "",
      bio: "",
      yearsOfExperience: "",
      githubUrl: "",
      linkedInUrl: "",
      skills: [],
    },

    mode: "onBlur",
  });

  const toRequest = (
  values: ProfileFormValues,
): UpdateProfileRequest => ({
  headline: values.headline.trim() || null,
  bio: values.bio.trim() || null,

  yearsOfExperience:
    values.yearsOfExperience === ""
      ? null
      : Number(values.yearsOfExperience),

  githubUrl: values.githubUrl.trim() || null,

  linkedInUrl: values.linkedInUrl.trim() || null,

  skills: values.skills,
});

return {
  form,
  toRequest,
};
}