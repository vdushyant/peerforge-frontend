import DashboardNavbar from "@/features/dashboard/components/DashboardNavbar";
import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";
import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface DashboardLayoutProps {
  children?: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#080d13]">

      <DashboardSidebar />

      <div className="flex min-w-0 flex-1 flex-col">

        <DashboardNavbar />

        <main className="flex-1 overflow-y-auto px-5 py-7 sm:px-8">
          {children ?? <Outlet />}
        </main>

      </div>

    </div>
  );
}
