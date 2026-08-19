import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useMyAvailability } from "../hooks/useMyAvailability";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import AddAvailabilityForm from "./AddAvailabilityForm";
import { Trash2 } from "lucide-react";
import { useDeleteAvailability } from "../hooks/useDeleteAvailability";

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
      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
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
      <Card>
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Availability</CardTitle>

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
              <p className="text-sm text-muted-foreground">
                You haven't added any availability yet.
              </p>
            ) : (
              <div className="space-y-3">
                {availability.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center justify-between rounded-lg border p-4"
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