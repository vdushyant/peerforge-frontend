import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";

import Logo from "@/components/branding/Logo";
import { Button } from "@/components/ui/button";

import { dashboardNavigation } from "../types/navigation";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useMyMentorProfile } from "@/features/mentor/hooks/useMyMentorProfile";

export default function DashboardSidebar() {
  const { logout, user } = useAuth();

  const { data: mentorProfile } =
    useMyMentorProfile();

  const visibleNavigation =
    dashboardNavigation.filter(
      (item) =>
        !item.mentorOnly ||
        mentorProfile?.approvalStatus === "APPROVED"
    );

  const roleFilteredNavigation = visibleNavigation.filter(
    (item) =>
      !item.adminOnly ||
      user?.roles.some((role) => role === "ADMIN" || role === "ROLE_ADMIN")
  );

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-white/[0.07] bg-[#090f14]">

      {/* Logo */}

        <div className="border-b border-white/[0.07] px-5 py-5">
        <Logo />
      </div>

      {/* Navigation */}

      <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto p-3">

        {roleFilteredNavigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `
                flex items-center gap-3 rounded-xl px-3.5 py-3 text-[13px] font-medium transition-all

                ${
                  isActive
                    ? "bg-emerald-300/[0.12] text-emerald-100 ring-1 ring-inset ring-emerald-200/10"
                    : "text-slate-400 hover:bg-white/[0.045] hover:text-white"
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

      <div className="border-t border-white/[0.07] p-3">

        <Button
          variant="ghost"
          onClick={logout}
          className="w-full justify-start gap-3 rounded-xl text-slate-400 hover:bg-rose-400/[0.07] hover:text-rose-200"
        >
          <LogOut size={18} />

          Logout
        </Button>

      </div>

    </aside>
  );
}
