import { Navigate, Outlet } from "react-router-dom";
import { getSession } from "@/services/storage";

interface ProtectedRouteProps {
    allowedRoles: string[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const session = getSession();

    console.log("ProtectedRoute session:", session);

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(session.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}