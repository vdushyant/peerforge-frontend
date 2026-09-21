import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import type { Availability } from "@/features/mentor/types/mentor";
import { useCreatePaymentOrder } from "@/features/payment/hooks/useCreatePaymentOrder";
import { useMarkPaymentFailed } from "@/features/payment/hooks/useMarkPaymentFailed";
import { useVerifyPayment } from "@/features/payment/hooks/useVerifyPayment";
import { queryKeys } from "@/lib/queryKeys";

import { useBookSession } from "../hooks/useBookSession";
import type { Session } from "../types/session";


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

export default function BookSessionForm({
  mentorId,
  availability,
}: BookSessionFormProps) {
  const bookSession = useBookSession();
  const createPaymentOrder = useCreatePaymentOrder();
  const verifyPayment = useVerifyPayment();
  const queryClient = useQueryClient();
  const markPaymentFailed = useMarkPaymentFailed();

  const [selectedSlotId, setSelectedSlotId] =
    useState<number | null>(null);

  const [pendingSession, setPendingSession] =
    useState<Session | null>(null);

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

  const openPayment = async (session: Session) => {
    try {
      const paymentOrder =
        await createPaymentOrder.mutateAsync(
          session.id
        );
        
      if (!window.Razorpay) {
        throw new Error(
          "Razorpay checkout is not loaded"
        );
      }

      const options: RazorpayOptions = {
        key: paymentOrder.razorpayKey,

        // Razorpay expects amount in paise
        amount: paymentOrder.amount * 100,

        currency: paymentOrder.currency,

        name: "PeerForge",

        description: "Mentoring session",

        order_id:
          paymentOrder.razorpayOrderId,

        handler: async (response) => {
          try {
            const payment =
              await verifyPayment.mutateAsync({
                razorpayOrderId:
                  response.razorpay_order_id,

                razorpayPaymentId:
                  response.razorpay_payment_id,

                razorpaySignature:
                  response.razorpay_signature,
              });

            if (payment.status === "SUCCESS") {
              await queryClient.invalidateQueries({
                queryKey: queryKeys.session.me,
              });

              await queryClient.invalidateQueries({
                queryKey: queryKeys.session.mentor,
              });

              setPendingSession(null);

              setBookedSession({
                ...session,
                status: "CONFIRMED",
              });
            }
          } catch (error) {
            console.error(
              "Payment verification failed:",
              error
            );
          }
        },

        theme: {
          color: "#000000",
        },

        modal: {
          ondismiss: () => {
            console.log(
              "Razorpay checkout closed by user"
            );

            setPendingSession(session);
          },
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        async (response) => {
          try {
            console.error(
              "Razorpay payment failed:",
              response.error
            );

            await markPaymentFailed.mutateAsync(
              paymentOrder.paymentId
            );

          } catch (error) {
            console.error(
              "Failed to mark payment as failed:",
              error
            );
          }
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "Payment creation failed:",
        error
      );
    }
  };

  const handleBook = async () => {
    if (!selectedSlotId) {
      return;
    }

    const selectedSlot = availableDates.find(
      (slot) => slot.id === selectedSlotId
    );

    if (!selectedSlot) {
      return;
    }

    const startDateTime = new Date(
      selectedSlot.date
    );

    const [startHours, startMinutes] =
      selectedSlot.startTime
        .split(":")
        .map(Number);

    startDateTime.setHours(
      startHours,
      startMinutes,
      0,
      0
    );

    const endDateTime = new Date(
      selectedSlot.date
    );

    const [endHours, endMinutes] =
      selectedSlot.endTime
        .split(":")
        .map(Number);

    endDateTime.setHours(
      endHours,
      endMinutes,
      0,
      0
    );

    try {
      // 1. Create session
      const session =
        await bookSession.mutateAsync({
          mentorId,

          startDateTime:
            formatLocalDateTime(
              startDateTime
            ),

          endDateTime:
            formatLocalDateTime(
              endDateTime
            ),
        });

      // 2. Store pending session
      setPendingSession(session);

      // 3. Open payment
      await openPayment(session);
    } catch (error) {
      console.error(
        "Booking failed:",
        error
      );
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
            Your session has been successfully
            booked and payment has been completed.
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

  if (pendingSession) {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">
            Payment Pending
          </h3>

          <p className="text-sm text-muted-foreground">
            Your session has been reserved, but
            payment has not been completed yet.
          </p>
        </div>

        <div className="rounded-lg border p-4 space-y-2">
          <p>
            <span className="font-medium">
              Mentor:
            </span>{" "}
            {pendingSession.mentorName}
          </p>

          <p>
            <span className="font-medium">
              Date:
            </span>{" "}
            {new Date(
              pendingSession.startDateTime
            ).toLocaleDateString("en-IN")}
          </p>

          <p>
            <span className="font-medium">
              Time:
            </span>{" "}
            {new Date(
              pendingSession.startDateTime
            ).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {" - "}
            {new Date(
              pendingSession.endDateTime
            ).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <p>
            <span className="font-medium">
              Status:
            </span>{" "}
            {pendingSession.status}
          </p>
        </div>

        <Button
          onClick={() =>
            openPayment(pendingSession)
          }
          disabled={
            createPaymentOrder.isPending ||
            verifyPayment.isPending
          }
        >
          {createPaymentOrder.isPending ||
            verifyPayment.isPending
            ? "Processing..."
            : "Pay Now"}
        </Button>
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
          Choose one of the mentor's available
          slots.
        </p>
      </div>

      <div className="space-y-3">
        {availableDates.map((slot) => (
          <button
            key={slot.id}
            type="button"
            onClick={() =>
              setSelectedSlotId(slot.id)
            }
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
        onClick={handleBook}
        disabled={
          !selectedSlotId ||
          bookSession.isPending ||
          createPaymentOrder.isPending ||
          verifyPayment.isPending||
          markPaymentFailed.isPending
        }
      >
        {bookSession.isPending ||
          createPaymentOrder.isPending ||
          verifyPayment.isPending||
          markPaymentFailed.isPending
          ? "Processing..."
          : "Book & Pay"}
      </Button>
    </div>
  );
}