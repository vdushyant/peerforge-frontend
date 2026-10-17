import { useAuth } from "@/features/auth/hooks/useAuth";
import DashboardLayout from "@/layouts/DashboardLayout";
import Navbar from "@/sections/landing/Navbar";
import Footer from "@/sections/landing/Footer";
import { Outlet } from "react-router-dom";

export default function MentorRouteLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen bg-[#080d13]" aria-label="Loading PeerForge" />;
  }

  if (isAuthenticated) {
    return (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d13]">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
