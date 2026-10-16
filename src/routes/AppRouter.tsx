import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../LandingPage";
import Navbar from "@/sections/landing/Navbar";
import Footer from "@/sections/landing/Footer";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import MentorListPage from "../features/mentor/pages/MentorListPage";
import MySessionsPage from "../features/session/pages/MySessionsPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";
import SettingsPage from "@/features/settings/pages/SettingsPage";
import NotFoundPage from "../NotFoundPage";
import { ProtectedRoute } from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import BecomeMentorPage from "@/features/mentor/pages/BecomeMentorPage";
import MentorDashboardPage from "@/features/mentor/pages/MentorDashboardPage";
import MentorDetailPage from "@/features/mentor/pages/MentorDetailPage";
import MentorSessionsPage from "@/features/session/pages/MentorSessionsPage";
import AdminReviewsPage from "@/features/review/pages/AdminReviewsPage";
import NotificationsPage from "@/features/notifications/pages/NotificationsPage";
import AdminAnalyticsPage from "@/features/dashboard/pages/AdminAnalyticsPage";
import { APP_ROUTES } from "@/constants/routes";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<LandingPage />} />

                <Route
                    path={APP_ROUTES.MENTORS}
                    element={<><Navbar /><MentorListPage /><Footer /></>}
                />
                <Route
                    path={APP_ROUTES.MENTOR.DETAIL}
                    element={<><Navbar /><MentorDetailPage /><Footer /></>}
                />

                <Route element={<GuestRoute />}>
                    <Route
                        path={APP_ROUTES.LOGIN}
                        element={<LoginPage />}
                    />

                    <Route
                        path={APP_ROUTES.REGISTER}
                        element={<RegisterPage />}
                    />
                </Route>

                <Route element={<ProtectedRoute />}>

                    <Route element={<DashboardLayout />}>

                        <Route
                            path={APP_ROUTES.NOTIFICATIONS}
                            element={<NotificationsPage />}
                        />

                        <Route
                            path={APP_ROUTES.DASHBOARD}
                            element={<DashboardPage />}
                        />

                        <Route
                            path={APP_ROUTES.SETTINGS}
                            element={<SettingsPage />}
                        />

                        <Route
                            path={APP_ROUTES.MENTOR.BECOME}
                            element={<BecomeMentorPage />}
                        />

                        <Route
                            path={APP_ROUTES.PROFILE}
                            element={<ProfilePage />}
                        />

                        <Route
                            path={APP_ROUTES.MY_SESSIONS}
                            element={<MySessionsPage />}
                        />

                        <Route
                            path={APP_ROUTES.MENTOR.SESSIONS}
                            element={<MentorSessionsPage />}
                        />

                        <Route
                            path={APP_ROUTES.ADMIN.REVIEWS}
                            element={<AdminReviewsPage />}
                        />

                        <Route
                            path={APP_ROUTES.ADMIN.ANALYTICS}
                            element={<AdminAnalyticsPage />}
                        />

                    </Route>

                    <Route
                        path={APP_ROUTES.MENTOR.DASHBOARD}
                        element={<MentorDashboardPage />}
                    />


                </Route>

                <Route
                    path="*"
                    element={<NotFoundPage />}
                />

            </Routes>
        </BrowserRouter>
    );
}
