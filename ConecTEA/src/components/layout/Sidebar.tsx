import {
    LayoutDashboard,
    Users,
    FileText,
    BarChart3,
    Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { roleMapInverse } from "@/constants/roles";


export default function Sidebar() {

    const { user } = useAuth();

    if (!user) {
        return null;
    }

    const role = roleMapInverse[
        Number(user.role) as keyof typeof roleMapInverse
    ];
    const isTherapist = role === "Therapist";

    const menuItems = isTherapist
        ? [
            {
                label: "Dashboard",
                path: "/therapist",
                icon: LayoutDashboard,
                end: true,
            },
            {
                label: "Pacientes",
                path: "/therapist/patients",
                icon: Users,
            },
            {
                label: "Relatórios",
                path: "/therapist/reports",
                icon: FileText,
            },
            {
                label: "Estatísticas",
                path: "/therapist/statistics",
                icon: BarChart3,
            },
            {
                label: "Configurações",
                path: "/therapist/settings",
                icon: Settings,
            },
        ]
        : [
            {
                label: "Dashboard",
                path: "/guardian",
                icon: LayoutDashboard,
                end: true,
            },
            {
                label: "Relatórios",
                path: "/guardian/reports",
                icon: FileText,
            },
            {
                label: "Configurações",
                path: "/guardian/settings",
                icon: Settings,
            },
        ];


    const baseClass =
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors";

    const activeClass =
        "bg-primary text-primary-foreground";

    const inactiveClass =
        "hover:bg-muted";


    return (
        <aside className="w-64 border-r bg-white">

            <div className="border-b p-6">
                <h1 className="text-2xl font-bold text-primary">
                    ConecTEA
                </h1>

                <p className="text-sm text-muted-foreground">
                    {isTherapist
                        ? "Painel do Terapeuta"
                        : "Painel do Responsável"}
                </p>
            </div>


            <nav className="flex flex-col gap-2 p-4">

                {menuItems.map((item) => {

                    const Icon = item.icon;


                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) =>
                                `${baseClass} ${
                                    isActive
                                        ? activeClass
                                        : inactiveClass
                                }`
                            }
                        >
                            <Icon size={20} />

                            {item.label}

                        </NavLink>
                    );

                })}

            </nav>

        </aside>
    );
}