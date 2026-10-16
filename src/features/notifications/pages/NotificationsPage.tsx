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
            <Bell className="text-violet-400" />
            <h2 className="text-2xl font-semibold">Notifications</h2>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Booking, session, and payment updates for your account.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => markAllRead.mutate(undefined, { onError: () => toast.error("Could not mark notifications as read.") })}
          disabled={!notifications.data?.unreadCount || markAllRead.isPending}
        >
          <CheckCheck /> Mark all read
        </Button>
      </div>

      {notifications.isLoading ? (
        <p className="text-sm text-muted-foreground">Loading notifications…</p>
      ) : notifications.isError ? (
        <div className="rounded-xl border border-white/10 p-6 text-sm text-muted-foreground">
          Notifications could not be loaded. Please try again.
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-white/10 p-10 text-center">
          <Bell className="mx-auto text-muted-foreground" />
          <p className="mt-3 font-medium">You’re all caught up</p>
          <p className="mt-1 text-sm text-muted-foreground">New booking and payment updates will show here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => void openNotification(item.id, item.actionUrl)}
              disabled={markRead.isPending}
              className={`w-full rounded-xl border p-4 text-left transition hover:border-violet-500/50 ${item.read ? "border-white/10 bg-background" : "border-violet-500/30 bg-violet-500/5"}`}
            >
              <div className="flex items-start gap-3">
                {!item.read && <Circle className="mt-1 size-2 fill-violet-400 text-violet-400" aria-label="Unread" />}
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
