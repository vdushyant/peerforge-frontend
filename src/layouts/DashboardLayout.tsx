import DashboardNavbar from "@/features/dashboard/components/DashboardNavbar";
import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">

      <DashboardSidebar />

      <div className="flex flex-1 flex-col">

        <DashboardNavbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}