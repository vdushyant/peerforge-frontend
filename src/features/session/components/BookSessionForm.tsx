import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

import type { Availability } from "@/features/mentor/types/mentor";
import { useBookSession } from "../hooks/useBookSession";
import type {
  Session,
} from "../types/session";

interface BookSessionFormProps {
  mentorId: number;
  availability: Availability[];
}

const DAY_ORDER = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
] as const;

function getNextDateForDay(day: string): Date {
  const today = new Date();
  const targetDay = DAY_ORDER.indexOf(
    day as (typeof DAY_ORDER)[number]
  );

  const currentDay = today.getDay();

  let daysUntil = targetDay - currentDay;

  if (daysUntil < 0) {
    daysUntil += 7;
  }

  const result = new Date(today);
  result.setDate(today.getDate() + daysUntil);

  return result;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}

export default function BookSessionForm({
  mentorId,
  availability,
}: BookSessionFormProps) {
  const bookSession = useBookSession();

  const [selectedSlotId, setSelectedSlotId] =
    useState<number | null>(null);

  const [bookedSession, setBookedSession] =
    useState<Session | null>(null);

  const availableDates = useMemo(() => {
    return availability.map((slot) => ({
      ...slot,
      date: getNextDateForDay(slot.dayOfWeek),
    }));
  }, [availability]);

  if (availability.length === 0) {
    return (
      <div>
        <p className="text-sm text-muted-foreground">
          This mentor currently has no available sessions.
        </p>
      </div>
    );
  }

  function formatLocalDateTime(date: Date) {
    const year = date.getFullYear();
    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
      date.getDate()
    ).padStart(2, "0");
    const hours = String(
      date.getHours()
    ).padStart(2, "0");
    const minutes = String(
      date.getMinutes()
    ).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:00`;
  }

  const handleBook = async () => {
    const selectedSlot = availableDates.find(
      (slot) => slot.id === selectedSlotId
    );

    if (!selectedSlot) {
      return;
    }

    const startDateTime = new Date(selectedSlot.date);

    const [startHour, startMinute] =
      selectedSlot.startTime
        .slice(0, 5)
        .split(":")
        .map(Number);

    startDateTime.setHours(
      startHour,
      startMinute,
      0,
      0
    );

    const endDateTime = new Date(selectedSlot.date);

    const [endHour, endMinute] =
      selectedSlot.endTime
        .slice(0, 5)
        .split(":")
        .map(Number);

    endDateTime.setHours(
      endHour,
      endMinute,
      0,
      0
    );

    try {
      const session = await bookSession.mutateAsync({
        mentorId,
        startDateTime: formatLocalDateTime(
          startDateTime
        ),
        endDateTime: formatLocalDateTime(
          endDateTime
        ),
      });

      setBookedSession(session);
    } catch (error) {
      console.error("Failed to book session:", error);
    }
  };

  if (bookedSession) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">
          Session Booked
        </h3>

        <p className="text-sm text-muted-foreground">
          Your session has been successfully requested.
        </p>
      </div>

      <div className="rounded-lg border p-4 space-y-2">
        <p>
          <span className="font-medium">
            Mentor:
          </span>{" "}
          {bookedSession.mentorName}
        </p>

        <p>
          <span className="font-medium">
            Date:
          </span>{" "}
          {new Date(
            bookedSession.startDateTime
          ).toLocaleDateString("en-IN")}
        </p>

        <p>
          <span className="font-medium">
            Time:
          </span>{" "}
          {new Date(
            bookedSession.startDateTime
          ).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
          {" - "}
          {new Date(
            bookedSession.endDateTime
          ).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        <p>
          <span className="font-medium">
            Status:
          </span>{" "}
          {bookedSession.status}
        </p>
      </div>
    </div>
  );
}

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium">
          Select a time
        </h3>

        <p className="text-sm text-muted-foreground">
          Choose one of the mentor's available slots.
        </p>
      </div>

      <div className="space-y-3">
        {availableDates.map((slot) => (
          <button
            key={slot.id}
            type="button"
            onClick={() => setSelectedSlotId(slot.id)}
            className={`w-full rounded-lg border p-4 text-left transition ${selectedSlotId === slot.id
                ? "border-primary bg-primary/5"
                : "hover:bg-muted"
              }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {formatDate(slot.date)}
                </p>

                <p className="text-sm text-muted-foreground">
                  {slot.startTime.slice(0, 5)} -{" "}
                  {slot.endTime.slice(0, 5)}
                </p>
              </div>

              <span className="text-sm text-muted-foreground">
                1 hour
              </span>
            </div>
          </button>
        ))}
      </div>

      <Button
        disabled={
          selectedSlotId === null ||
          bookSession.isPending
        }
        onClick={handleBook}
      >
        {bookSession.isPending
          ? "Booking..."
          : "Book Session"}
      </Button>
    </div>
  );
}