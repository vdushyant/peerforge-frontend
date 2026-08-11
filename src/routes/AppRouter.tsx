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

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<LandingPage />} />

                <Route element={<GuestRoute />}>
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />

                    <Route
                        path="/register"
                        element={<RegisterPage />}
                    />
                </Route>

                <Route element={<ProtectedRoute />}>

                    <Route element={<DashboardLayout />}>

                        <Route
                            path="/dashboard"
                            element={<DashboardPage />}
                        />

                        <Route
                            path="/profile"
                            element={<ProfilePage />}
                        />

                        <Route
                            path="/mentors"
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