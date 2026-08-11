import {
  CalendarDays,
  Home,
  Search,
  Settings,
  User,
} from "lucide-react";

export const dashboardNavigation = [
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
    label: "Settings",
    to: "/settings",
    icon: Settings,
  },
];