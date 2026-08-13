import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";

import AppLayout from "@/layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute";

import TherapistLayout from "@/layouts/TherapistLayout";
import TherapistDashboard from "@/pages/therapist/TherapistDashboard";
import Patients from "@/pages/therapist/Patients";
import Reports from "@/pages/therapist/Reports";
import Statistics from "@/pages/therapist/Statistics";
import Settings from "@/pages/therapist/Settings";

import GuardianLayout from "@/layouts/GuardianLayout";
import GuardianDashboard from "@/pages/guardian/GuardianDashboard";
import GuardianReports from "@/pages/guardian/GuardianReport";

import PatientDetailsPage from "@/pages/patients/id/PatientDetailsPage";
import Pricing from "@/pages/Pricing";
import Community from "@/pages/Community";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/pricing" element={<Pricing />} />

          <Route element={<ProtectedRoute allowedRoles={["Therapist"]} />}>
            <Route path="/therapist" element={<TherapistLayout />}>
              <Route index element={<TherapistDashboard />} />
              <Route path="patients" element={<Patients />} />
              <Route path="patients/:id" element={<PatientDetailsPage />} />
              <Route path="reports" element={<Reports />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="community" element={<Community />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["Guardian"]} />}>
            <Route path="/guardian" element={<GuardianLayout />}>
              <Route index element={<GuardianDashboard />} />
              <Route path="reports" element={<GuardianReports />} />
              <Route path="settings" element={<Settings />} />
              <Route path="community" element={<Community />} />
            </Route>
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}