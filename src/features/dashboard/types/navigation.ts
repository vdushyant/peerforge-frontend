import {
  CalendarDays,
  Home,
  Search,
  Settings,
  User,
} from "lucide-react";

interface DashboardNavigationItem {
  label: string;
  to: string;
  icon: typeof Home;
  mentorOnly?: boolean;
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
    label: "Incoming Sessions",
    to: "/mentor/sessions",
    icon: CalendarDays,
    mentorOnly: true,
  },
  {
    label: "Settings",
    to: "/settings",
    icon: Settings,
  },
];