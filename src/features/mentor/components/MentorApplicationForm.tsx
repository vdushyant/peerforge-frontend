import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  mentorApplicationSchema,
  type MentorApplicationFormValues,
} from "../schema/mentorApplicationSchema";

import type { MentorApplicationRequest } from "../types/mentor";
import { useApplyForMentorship } from "../hooks/useApplyForMentorship";

interface MentorApplicationFormProps {
  onSuccess: () => void;
}

export default function MentorApplicationForm({
  onSuccess,
}: MentorApplicationFormProps) {
  const applyForMentorship = useApplyForMentorship();

  const form = useForm<MentorApplicationFormValues>({
    resolver: zodResolver(mentorApplicationSchema),
    defaultValues: {
      about: "",
      hourlyRate: undefined,
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    const request: MentorApplicationRequest = {
      about: values.about.trim(),
      hourlyRate: values.hourlyRate,
    };

    await applyForMentorship.mutateAsync(request);

    onSuccess();
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="about">About</label>

          <Textarea
            id="about"
            placeholder="Tell learners about your experience and what you can help them with..."
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
            placeholder="500"
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

        {applyForMentorship.isError && (
          <p className="text-sm text-destructive">
            Failed to submit your mentor application. Please try again.
          </p>
        )}

        <Button
          type="submit"
          disabled={applyForMentorship.isPending}
        >
          {applyForMentorship.isPending
            ? "Submitting..."
            : "Apply to Become a Mentor"}
        </Button>
      </form>
    </FormProvider>
  );
}