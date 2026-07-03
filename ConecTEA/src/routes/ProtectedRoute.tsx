import { Navigate, Outlet } from "react-router-dom";
import { getSession } from "@/services/storage";
import { roleMapInverse } from "@/constants/roles";

interface ProtectedRouteProps {
    allowedRoles: string[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const session = getSession();
    console.log("ProtectedRoute session:", session);

    const role = roleMapInverse[session.role as keyof typeof roleMapInverse];
    console.log("ProtectedRoute role:", role);
    
    if (!session) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}