import { Navigate, Outlet } from "react-router-dom";
import { getSession } from "@/storage/storage";
import { roleMapInverse } from "@/constants/roles";

interface ProtectedRouteProps {
    allowedRoles: string[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const session = getSession();

    const role = roleMapInverse[session.role as keyof typeof roleMapInverse];
    
    if (!session) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}