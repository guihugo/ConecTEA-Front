import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import MainLayout from "@/layouts/MainLayout";
import SignUp from "@/pages/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import TherapistLayout from "@/layouts/TherapistLayout";
import Patients from "@/pages/therapist/Patients";
import Reports from "@/pages/therapist/Reports";
import Statistics from "@/pages/therapist/Statistics";
import Settings from "@/pages/therapist/Settings";
import Dashboard from "@/pages/therapist/Dashboard";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />


                <Route path="/lessons" element={<h1>Lessons</h1>} />
                <Route path="/profile" element={<h1>Profile</h1>} />

                <Route element={<ProtectedRoute allowedRoles={["Therapist"]} />}>
                    <Route path="/therapist" element={<TherapistLayout />}>

                        <Route index element={<Dashboard />} />

                        <Route path="patients" element={<Patients />} />

                        <Route path="reports" element={<Reports />} />

                        <Route path="statistics" element={<Statistics />} />

                        <Route path="settings" element={<Settings />} />

                    </Route>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}