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
  "/mentor/sessions": "Incoming Sessions",
  "/admin/reviews": "Review Moderation",
  "/admin/mentors": "Mentor Applications",
  "/admin/users": "Users",
  "/admin/sessions": "Sessions",
  "/admin/analytics": "Platform Analytics",
};

export default function DashboardNavbar() {
  const { pathname } = useLocation();

  const { data: profile } = useProfile();
  const { data: inbox } = useNotifications();

  const initials = profile
    ? `${profile.firstName[0]}${profile.lastName[0]}`
    : "U";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/[0.07] bg-[#080d13]/90 px-5 backdrop-blur-xl sm:px-8">

      <h1 className="text-lg font-semibold tracking-tight text-slate-100">
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
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-300 px-1 text-[10px] font-semibold text-slate-950">
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

              <AvatarFallback className="bg-emerald-200/[0.12] font-semibold text-emerald-100 ring-1 ring-inset ring-emerald-100/15">
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
