import { User, LogOut } from "lucide-react";

import { roleMapInverse } from "@/constants/roles";
import { useAuth } from "@/contexts/AuthContext";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }
    if (!user) {
        return null;
    }

    const role =
        roleMapInverse[
        Number(user.role) as keyof typeof roleMapInverse
        ];

    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
            <h2 className="text-xl font-semibold">
                Dashboard
            </h2>

            <div className="flex items-center gap-3">
                <div className="text-right">
                    <p className="font-medium">
                        {user.fullName}
                    </p>

                    <p className="text-sm text-muted-foreground">
                        {role === "Guardian"
                            ? "Responsável"
                            : "Terapeuta"}
                    </p>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition hover:opacity-90 focus:outline-none">
                            {user.fullName.charAt(0).toUpperCase()}
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        className="w-48"
                    >
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            Meu perfil
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="text-red-600 focus:text-red-600"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}