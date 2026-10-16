import { Link, useLocation } from "react-router-dom";
import { Bell } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useProfile } from "@/features/profile/hooks";
import { logoutUser } from "@/features/auth/services/authService";

import { Button } from "@/components/ui/button";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";

const TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/profile": "My Profile",
  "/mentors": "Find Mentors",
  "/sessions": "My Sessions",
  "/notifications": "Notifications",
  "/settings": "Settings",
};

export default function DashboardNavbar() {
  const { pathname } = useLocation();

  const { data: profile } = useProfile();
  const { data: inbox } = useNotifications();

  const initials = profile
    ? `${profile.firstName[0]}${profile.lastName[0]}`
    : "U";

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-background px-6">

      <h1 className="text-xl font-semibold">
        {TITLES[pathname] ?? "PeerForge"}
      </h1>

      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="relative">
          <Link
            to="/notifications"
            aria-label={`Notifications${inbox?.unreadCount ? `, ${inbox.unreadCount} unread` : ""}`}
          >
            <Bell />
            {!!inbox?.unreadCount && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] text-white">
                {inbox.unreadCount > 99 ? "99+" : inbox.unreadCount}
              </span>
            )}
          </Link>
        </Button>

      <DropdownMenu>

        <DropdownMenuTrigger asChild>

          <Button
            variant="ghost"
            className="h-auto rounded-full p-0"
          >
            <Avatar>

              <AvatarFallback>
                {initials}
              </AvatarFallback>

            </Avatar>
          </Button>

        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">

          <DropdownMenuItem>
            My Profile
          </DropdownMenuItem>

          <DropdownMenuItem>
            Settings
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={logoutUser}
            className="text-red-500"
          >
            Logout
          </DropdownMenuItem>

        </DropdownMenuContent>

        </DropdownMenu>
      </div>

    </header>
  );
}
