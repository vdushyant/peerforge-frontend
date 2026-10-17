import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useMyAvailability } from "../hooks/useMyAvailability";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import AddAvailabilityForm from "./AddAvailabilityForm";
import { Trash2 } from "lucide-react";
import { useDeleteAvailability } from "../hooks/useDeleteAvailability";
import { CalendarClock } from "lucide-react";

function formatDay(day: string) {
  return day.charAt(0) + day.slice(1).toLowerCase();
}

function formatTime(time: string) {
  return time.slice(0, 5);
}

export default function MentorAvailabilityCard() {
  const {
    data: availability = [],
    isLoading,
    isError,
  } = useMyAvailability();

  const [isAdding, setIsAdding] = useState(false);
  const deleteAvailability = useDeleteAvailability();

  if (isLoading) {
    return (
      <Card className="border-0 bg-[#0e171c] text-white ring-1 ring-inset ring-white/[0.08]">
        <CardHeader>
          <CardTitle className="font-semibold tracking-tight">Availability</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Loading availability...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="border-0 bg-[#0e171c] text-white ring-1 ring-inset ring-white/[0.08]">
        <CardHeader>
          <CardTitle>Availability</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-destructive">
            Unable to load your availability.
          </p>
        </CardContent>

        {deleteAvailability.isError && (
          <p className="mt-3 text-sm text-destructive">
            Unable to delete availability. Please try again.
          </p>
        )}
      </Card>
    );
  }

  return (
    <Card className="border-0 bg-[#0e171c] text-white ring-1 ring-inset ring-white/[0.08]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-200/[0.07] text-emerald-100"><CalendarClock className="h-4 w-4" /></div>
          <CardTitle className="font-semibold tracking-tight">Availability</CardTitle>
        </div>

        {!isAdding && (
          <Button
            variant="outline"
            onClick={() => setIsAdding(true)}
          >
            Add Availability
          </Button>
        )}
      </CardHeader>

      <CardContent>
        {isAdding ? (
          <AddAvailabilityForm
            onCancel={() => setIsAdding(false)}
            onSuccess={() => setIsAdding(false)}
          />
        ) : (
          <>
            {availability.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/[0.09] bg-white/[0.015] px-5 py-8 text-center">
                <p className="font-medium text-slate-200">Set your weekly availability</p>
                <p className="mt-1 text-sm text-slate-400">Learners can only book time slots you make available.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {availability.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4"
                  >
                    <div>
                      <p className="font-medium">
                        {formatDay(slot.dayOfWeek)}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {formatTime(slot.startTime)} -{" "}
                        {formatTime(slot.endTime)}
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        deleteAvailability.mutate(slot.id)
                      }
                      disabled={deleteAvailability.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
