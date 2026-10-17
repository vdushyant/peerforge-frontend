import { Bell, CheckCheck, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotifications,
} from "../hooks/useNotifications";

export default function NotificationsPage() {
  const navigate = useNavigate();
  const notifications = useNotifications();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();
  const items = notifications.data?.notifications ?? [];

  const openNotification = async (id: number, actionUrl: string | null) => {
    try {
      await markRead.mutateAsync(id);
      if (actionUrl) navigate(actionUrl);
    } catch {
      toast.error("Could not update this notification.");
    }
  };

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-100/10 bg-emerald-200/[0.07] text-emerald-100"><Bell className="h-5 w-5" /></div>
            <h2 className="text-2xl font-semibold tracking-tight">Notifications</h2>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Booking, session, and payment updates for your account.
          </p>
        </div>
        <Button
          variant="outline"
          className="rounded-xl"
          onClick={() => markAllRead.mutate(undefined, { onError: () => toast.error("Could not mark notifications as read.") })}
          disabled={!notifications.data?.unreadCount || markAllRead.isPending}
        >
          <CheckCheck /> Mark all read
        </Button>
      </div>

      {notifications.isLoading ? (
        <p className="text-sm text-muted-foreground">Loading notifications…</p>
      ) : notifications.isError ? (
        <div className="rounded-[1.35rem] border border-white/[0.08] bg-[#0e171c] p-6 text-sm text-slate-400 ring-1 ring-inset ring-white/[0.04]">
          Notifications could not be loaded. Please try again.
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-white/[0.09] bg-[#0d151a] p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-200/[0.08] text-emerald-100"><Bell className="h-5 w-5" /></div>
          <p className="mt-4 font-medium text-slate-100">You’re all caught up</p>
          <p className="mt-1 text-sm text-slate-400">New booking and payment updates will show here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => void openNotification(item.id, item.actionUrl)}
              disabled={markRead.isPending}
              className={`w-full rounded-[1.25rem] border p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 ${item.read ? "border-white/[0.07] bg-[#0e171c] hover:border-emerald-100/15" : "border-emerald-100/15 bg-emerald-200/[0.045] hover:border-emerald-100/25"}`}
            >
              <div className="flex items-start gap-3">
                {!item.read && <Circle className="mt-1 size-2 fill-emerald-300 text-emerald-300" aria-label="Unread" />}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">{item.title}</p>
                    <time className="text-xs text-muted-foreground" dateTime={item.createdAt}>
                      {new Date(item.createdAt).toLocaleString()}
                    </time>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{item.message}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
