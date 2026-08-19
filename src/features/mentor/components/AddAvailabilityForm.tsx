import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useCreateAvailability } from "../hooks/useCreateAvailability";
import type { DayOfWeek } from "../types/mentor";

const availabilitySchema = z
  .object({
    dayOfWeek: z.enum([
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ]),

    startTime: z.string().min(1, "Start time is required"),

    endTime: z.string().min(1, "End time is required"),
  })
  .refine(
    (values) => values.startTime < values.endTime,
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

type AvailabilityFormValues = z.infer<
  typeof availabilitySchema
>;

interface AddAvailabilityFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddAvailabilityForm({
  onSuccess,
  onCancel,
}: AddAvailabilityFormProps) {
  const createAvailability = useCreateAvailability();

  const form = useForm<AvailabilityFormValues>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      dayOfWeek: "MONDAY",
      startTime: "",
      endTime: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await createAvailability.mutateAsync({
        dayOfWeek: values.dayOfWeek as DayOfWeek,
        startTime: values.startTime,
        endTime: values.endTime,
      });

      form.reset();
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="dayOfWeek">
          Day
        </label>

        <select
          id="dayOfWeek"
          {...form.register("dayOfWeek")}
          className="w-full rounded-md border bg-background px-3 py-2"
        >
          <option value="MONDAY">Monday</option>
          <option value="TUESDAY">Tuesday</option>
          <option value="WEDNESDAY">Wednesday</option>
          <option value="THURSDAY">Thursday</option>
          <option value="FRIDAY">Friday</option>
          <option value="SATURDAY">Saturday</option>
          <option value="SUNDAY">Sunday</option>
        </select>

        {form.formState.errors.dayOfWeek && (
          <p className="text-sm text-destructive">
            {form.formState.errors.dayOfWeek.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="startTime">
          Start Time
        </label>

        <Input
          id="startTime"
          type="time"
          {...form.register("startTime")}
        />

        {form.formState.errors.startTime && (
          <p className="text-sm text-destructive">
            {form.formState.errors.startTime.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="endTime">
          End Time
        </label>

        <Input
          id="endTime"
          type="time"
          {...form.register("endTime")}
        />

        {form.formState.errors.endTime && (
          <p className="text-sm text-destructive">
            {form.formState.errors.endTime.message}
          </p>
        )}
      </div>

      {createAvailability.isError && (
        <p className="text-sm text-destructive">
          Unable to create availability. Please check for
          overlapping slots and try again.
        </p>
      )}

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={createAvailability.isPending}
        >
          {createAvailability.isPending
            ? "Adding..."
            : "Add Availability"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={createAvailability.isPending}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}