import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useUpdateMentorProfile } from "../hooks/useUpdateMentorProfile";
import {
  mentorProfileSchema,
  type MentorProfileFormValues,
} from "../schema/mentorProfileSchema";
import type { MentorProfile } from "../types/mentor";

interface MentorProfileFormProps {
  profile: MentorProfile;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function MentorProfileForm({
  profile,
  onCancel,
  onSuccess,
}: MentorProfileFormProps) {
  const updateMentorProfile = useUpdateMentorProfile();

  const form = useForm<MentorProfileFormValues>({
    resolver: zodResolver(mentorProfileSchema),
    defaultValues: {
      about: profile.about,
      hourlyRate: profile.hourlyRate,
    },
  });

  useEffect(() => {
    form.reset({
      about: profile.about,
      hourlyRate: profile.hourlyRate,
    });
  }, [profile, form]);

  const handleSubmit = form.handleSubmit(async (values) => {
    await updateMentorProfile.mutateAsync({
      about: values.about.trim(),
      hourlyRate: values.hourlyRate,
    });

    onSuccess();
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="about">About</label>

          <Textarea
            id="about"
            {...form.register("about")}
          />

          {form.formState.errors.about && (
            <p className="text-sm text-destructive">
              {form.formState.errors.about.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="hourlyRate">
            Hourly Rate
          </label>

          <Input
            id="hourlyRate"
            type="number"
            min="0"
            step="0.01"
            {...form.register("hourlyRate", {
              valueAsNumber: true,
            })}
          />

          {form.formState.errors.hourlyRate && (
            <p className="text-sm text-destructive">
              {form.formState.errors.hourlyRate.message}
            </p>
          )}
        </div>

        {updateMentorProfile.isError && (
          <p className="text-sm text-destructive">
            Failed to update your mentor profile. Please try again.
          </p>
        )}

        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={updateMentorProfile.isPending}
          >
            {updateMentorProfile.isPending
              ? "Saving..."
              : "Save Changes"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={updateMentorProfile.isPending}
          >
            Cancel
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}