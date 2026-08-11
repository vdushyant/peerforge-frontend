import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../LandingPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import MentorListPage from "../features/mentor/pages/MentorListPage";
import MentorProfilePage from "../features/mentor/pages/MentorProfilePage";
import MySessionsPage from "../features/session/pages/MySessionsPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";
import SettingsPage from "@/features/settings/pages/SettingsPage";
import NotFoundPage from "../NotFoundPage";
import { ProtectedRoute } from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import BecomeMentorPage from "@/features/mentor/pages/BecomeMentorPage";
import { APP_ROUTES } from "@/constants/routes";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<LandingPage />} />

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
                            path={APP_ROUTES.DASHBOARD}
                            element={<DashboardPage />}
                        />

                        <Route
                            path={APP_ROUTES.PROFILE}
                            element={<ProfilePage />}
                        />

                        <Route
                            path={APP_ROUTES.MENTORS}
                            element={<MentorListPage />}
                        />

                        <Route
                            path="/mentors/:mentorId"
                            element={<MentorProfilePage />}
                        />

                        <Route
                            path="/sessions"
                            element={<MySessionsPage />}
                        />

                        <Route
                            path="/settings"
                            element={<SettingsPage />}
                        />

                        <Route
                            path={APP_ROUTES.MENTOR.BECOME}
                            element={<BecomeMentorPage />}
                        />
                    </Route>

                </Route>

                <Route
                    path="*"
                    element={<NotFoundPage />}
                />

            </Routes>
        </BrowserRouter>
    );
}