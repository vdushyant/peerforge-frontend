import { useLocation } from "react-router-dom";
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

const TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/profile": "My Profile",
  "/mentors": "Find Mentors",
  "/sessions": "My Sessions",
  "/settings": "Settings",
};

export default function DashboardNavbar() {
  const { pathname } = useLocation();

  const { data: profile } = useProfile();

  const initials = profile
    ? `${profile.firstName[0]}${profile.lastName[0]}`
    : "U";

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-background px-6">

      <h1 className="text-xl font-semibold">
        {TITLES[pathname] ?? "PeerForge"}
      </h1>

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

    </header>
  );
}