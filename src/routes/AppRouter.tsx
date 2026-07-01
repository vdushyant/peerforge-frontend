import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import MentorListPage from "../pages/mentor/MentorListPage";
import MentorProfilePage from "../pages/mentor/MentorProfilePage";
import MySessionsPage from "../pages/session/MySessionsPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/mentors" element={<MentorListPage />} />
                <Route path="/mentors/:mentorId" element={<MentorProfilePage />} />
                <Route path="/sessions" element={<MySessionsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}