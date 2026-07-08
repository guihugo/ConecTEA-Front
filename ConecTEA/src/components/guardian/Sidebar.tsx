import {
    LayoutDashboard,
    Users,
    FileText,
    BarChart3,
    Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
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
                    Painel do Responsável
                </p>
            </div>

            <nav className="flex flex-col gap-2 p-4">

                <NavLink
                    to="/guardian"
                    end
                    className={({ isActive }) =>
                        `${baseClass} ${isActive ? activeClass : inactiveClass}`
                    }
                >
                    <LayoutDashboard size={20} />
                    Dashboard
                </NavLink>


                <NavLink
                    to="/guardian/reports"
                    className={({ isActive }) =>
                        `${baseClass} ${isActive ? activeClass : inactiveClass}`
                    }
                >
                    <FileText size={20} />
                    Relatórios
                </NavLink>

                <NavLink
                    to="/guardian/settings"
                    className={({ isActive }) =>
                        `${baseClass} ${isActive ? activeClass : inactiveClass}`
                    }
                >
                    <Settings size={20} />
                    Configurações
                </NavLink>

            </nav>
        </aside>
    );
}