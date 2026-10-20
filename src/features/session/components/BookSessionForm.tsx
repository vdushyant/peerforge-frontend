import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import type { Availability } from "@/features/mentor/types/mentor";
import { useCreatePaymentOrder } from "@/features/payment/hooks/useCreatePaymentOrder";
import { getSessionPaymentStatusApi } from "@/features/payment/api/paymentApi";
import { queryKeys } from "@/lib/queryKeys";

import { useBookSession } from "../hooks/useBookSession";
import type { Session } from "../types/session";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { CreatePaymentOrderResponse } from "@/features/payment/types/payment";


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
  const { isAuthenticated } = useAuth();
  const bookSession = useBookSession();
  const createPaymentOrder = useCreatePaymentOrder();
  const queryClient = useQueryClient();

  const [selectedSlotId, setSelectedSlotId] =
    useState<number | null>(null);

  const [pendingSession, setPendingSession] =
    useState<Session | null>(null);

  const [bookedSession, setBookedSession] =
    useState<Session | null>(null);

  const [paymentQuote, setPaymentQuote] =
    useState<CreatePaymentOrderResponse | null>(null);
  const [paymentError, setPaymentError] = useState("");
  const qrExpired = Boolean(
    paymentQuote && Date.parse(paymentQuote.razorpayQrCodeExpiresAt) <= Date.now()
  );
  const paymentStatus = useQuery({
    queryKey: ["session-payment-status", pendingSession?.id],
    queryFn: () => getSessionPaymentStatusApi(pendingSession!.id),
    enabled: Boolean(pendingSession && paymentQuote),
    refetchInterval: (query) => query.state.data?.status === "SUCCESS" ? false : 5000,
  });

  useEffect(() => {
    if (paymentStatus.data?.status !== "SUCCESS" || !pendingSession) return;
    void queryClient.invalidateQueries({ queryKey: queryKeys.session.me });
    void queryClient.invalidateQueries({ queryKey: queryKeys.session.mentor });
    setBookedSession({
      ...pendingSession,
      status: "CONFIRMED",
      paymentStatus: "SUCCESS",
      meetingLink: null,
    });
    setPendingSession(null);
  }, [paymentStatus.data?.status, pendingSession, queryClient]);

  const availableDates = useMemo(() => {
    return availability.map((slot) => ({
      ...slot,
      date: getNextDateForDay(slot.dayOfWeek),
    }));
  }, [availability]);

  if (!isAuthenticated) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Sign in to book a session with this mentor.
        </p>
        <Button asChild>
          <Link to="/login">Sign in to book</Link>
        </Button>
      </div>
    );
  }

  if (availability.length === 0) {
    return (
      <div>
        <p className="text-sm text-muted-foreground">
          This mentor currently has no available sessions.
        </p>
      </div>
    );
  }

  const preparePayment = async (session: Session) => {
    try {
      setPaymentError("");
      const paymentOrder =
        await createPaymentOrder.mutateAsync(
          session.id
        );
      setPaymentQuote(paymentOrder);
    } catch (error) {
      console.error("Payment quote failed:", error);
      setPaymentError("We could not prepare the payment total. Please try again.");
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

      // 3. Create the booking's tracked QR payment
      await preparePayment(session);
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
        {paymentQuote && !qrExpired && (
          <PaymentBreakdown quote={paymentQuote} />
        )}

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

        {paymentQuote ? <PaymentBreakdown quote={paymentQuote} /> : (
          <p className="text-sm text-muted-foreground">Prepare the amount due to see the session price and PeerForge fee before paying.</p>
        )}
        {paymentError && <p className="text-sm text-rose-300" role="alert">{paymentError}</p>}

        {paymentQuote && (
          <div className="grid gap-4 rounded-xl border p-4 sm:grid-cols-[minmax(0,1fr)_180px] sm:items-center">
            <div className="space-y-2">
              <h4 className="font-semibold">Scan to pay with any UPI app</h4>
              <p className="text-sm text-muted-foreground">Pay the exact amount shown above. Keep this page open; PeerForge confirms the booking after Razorpay verifies the payment.</p>
              <p className="text-xs text-muted-foreground">QR reference: {paymentQuote.razorpayQrCodeId}</p>
              <p className="text-xs text-muted-foreground">QR expires {new Date(paymentQuote.razorpayQrCodeExpiresAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}.</p>
              <p className="text-xs text-muted-foreground">{paymentStatus.isFetching ? "Checking payment status…" : paymentStatus.data?.status === "SUCCESS" ? "Payment received." : "Waiting for payment."}</p>
            </div>
            <img src={paymentQuote.razorpayQrCodeImageUrl} alt="Razorpay UPI payment QR code" className="mx-auto w-44 rounded-lg bg-white p-2" />
          </div>
        )}
        <div className="flex flex-wrap gap-3">
          {!paymentQuote && <Button onClick={() => preparePayment(pendingSession)} disabled={createPaymentOrder.isPending}>{createPaymentOrder.isPending ? "Preparing QR…" : "Prepare payment QR"}</Button>}
          {paymentQuote && qrExpired && <Button onClick={() => preparePayment(pendingSession)} disabled={createPaymentOrder.isPending}>{createPaymentOrder.isPending ? "Preparing QR…" : "QR expired — generate a new one"}</Button>}
          {paymentQuote && !qrExpired && <Button variant="outline" onClick={() => void paymentStatus.refetch()}>Check payment status</Button>}
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
          createPaymentOrder.isPending
        }
      >
        {bookSession.isPending ||
          createPaymentOrder.isPending
          ? "Processing..."
          : "Reserve & see total"}
      </Button>
    </div>
  );
}

function PaymentBreakdown({ quote }: { quote: CreatePaymentOrderResponse }) {
  const currency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: quote.currency,
    minimumFractionDigits: 2,
  });
  return (
    <div className="space-y-2 rounded-xl border border-emerald-100/10 bg-emerald-200/[0.04] p-4 text-sm">
      <div className="flex justify-between gap-4 text-slate-300"><span>Mentor session price</span><span>{currency.format(quote.mentorAmount)}</span></div>
      <div className="flex justify-between gap-4 text-slate-300"><span>PeerForge service fee</span><span>{currency.format(quote.clientFee)}</span></div>
      <div className="flex justify-between gap-4 border-t border-white/[0.08] pt-2 font-semibold text-white"><span>Total due</span><span>{currency.format(quote.amount)}</span></div>
      <p className="text-xs leading-5 text-slate-400">The fee is shown separately. The mentor’s listed session price is preserved in the payment record.</p>
    </div>
  );
}
