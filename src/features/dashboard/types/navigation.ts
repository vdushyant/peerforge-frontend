import {
  CalendarDays,
  Bell,
  Home,
  Search,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react";

interface DashboardNavigationItem {
  label: string;
  to: string;
  icon: typeof Home;
  mentorOnly?: boolean;
  adminOnly?: boolean;
}

export const dashboardNavigation: DashboardNavigationItem[] = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: Home,
  },
  {
    label: "My Profile",
    to: "/profile",
    icon: User,
  },
  {
    label: "Find Mentors",
    to: "/mentors",
    icon: Search,
  },
  {
    label: "My Sessions",
    to: "/sessions",
    icon: CalendarDays,
  },
  {
    label: "Notifications",
    to: "/notifications",
    icon: Bell,
  },
  {
    label: "Incoming Sessions",
    to: "/mentor/sessions",
    icon: CalendarDays,
    mentorOnly: true,
  },
  {
    label: "Review Moderation",
    to: "/admin/reviews",
    icon: ShieldCheck,
    adminOnly: true,
  },
  {
    label: "Settings",
    to: "/settings",
    icon: Settings,
  },
];
