import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import MainLayout from "@/layouts/MainLayout";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/lessons" element={<h1>Lessons</h1>} />
                <Route path="/profile" element={<h1>Profile</h1>} />

            </Routes>
        </BrowserRouter>
    );
}