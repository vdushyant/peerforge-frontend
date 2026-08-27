import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";

import Logo from "@/components/branding/Logo";
import { Button } from "@/components/ui/button";

import { dashboardNavigation } from "../types/navigation";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useMyMentorProfile } from "@/features/mentor/hooks/useMyMentorProfile";

export default function DashboardSidebar() {
  const { logout } = useAuth();

  const { data: mentorProfile } =
    useMyMentorProfile();

  const visibleNavigation =
    dashboardNavigation.filter(
      (item) =>
        !item.mentorOnly ||
        mentorProfile?.approvalStatus === "APPROVED"
    );

  return (
    <aside className="flex w-64 flex-col border-r border-white/10 bg-[#0B0F19]">

      {/* Logo */}

      <div className="border-b border-white/10 p-6">
        <Logo />
      </div>

      {/* Navigation */}

      <nav className="flex flex-1 flex-col gap-2 p-4">

        {visibleNavigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `
                flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all

                ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }
                `
              }
            >
              <Icon size={18} />

              {item.label}
            </NavLink>
          );
        })}

      </nav>

      {/* Logout */}

      <div className="border-t border-white/10 p-4">

        <Button
          variant="ghost"
          onClick={logout}
          className="w-full justify-start gap-3 text-slate-300 hover:text-white"
        >
          <LogOut size={18} />

          Logout
        </Button>

      </div>

    </aside>
  );
}