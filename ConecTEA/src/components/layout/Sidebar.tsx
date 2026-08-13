import {
    LayoutDashboard,
    Users,
    FileText,
    BarChart3,
    Settings,
    MessageCircle,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { roleMapInverse } from "@/constants/roles";

import logo from "@/assets/logo_conectea.png";

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
                  label: "Comunidade",
                  path: "/therapist/community",
                  icon: MessageCircle,
                  special: true,
                  notifications: 3,
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
                  label: "Comunidade",
                  path: "/guardian/community",
                  icon: MessageCircle,
                  special: true,
                  notifications: 3,
              },
              {
                  label: "Configurações",
                  path: "/guardian/settings",
                  icon: Settings,
              },
          ];

    const baseClass =
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200";

    const activeClass = "bg-[#3B6FD8] text-white";

    const inactiveClass =
        "text-neutral-700 hover:bg-neutral-100";

    return (
        <aside className="w-64 border-r bg-white">

            {/* Logo */}
            <div className="border-b p-6">
                <img
                    src={logo}
                    alt="ConecTEA"
                    className="mx-auto mb-8 h-12 w-auto object-contain"
                />

                <p className="text-sm text-muted-foreground">
                    {isTherapist
                        ? "Painel do Terapeuta"
                        : "Painel do Responsável"}
                </p>
            </div>

            {/* Menu */}
            <nav className="flex flex-col gap-2 p-4">

                {menuItems.map((item) => {
                    const Icon = item.icon;

                    /* Comunidade especial */
                    if (item.special) {
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `group relative flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 ${
                                        isActive
                                            ? "bg-[#3B6FD8] text-white shadow-sm"
                                            : "border border-transparent bg-neutral-50 text-neutral-700 hover:border-[#dce6fb] hover:bg-[#f5f8ff] hover:shadow-sm"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <div
                                            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 ${
                                                isActive
                                                    ? "bg-white/20"
                                                    : "bg-white shadow-sm group-hover:scale-105"
                                            }`}
                                        >
                                            <Icon
                                                size={19}
                                                className="transition-transform duration-200 group-hover:scale-110"
                                            />
                                        </div>

                                        <div className="flex flex-1 flex-col">
                                            <span className="text-sm font-medium">
                                                {item.label}
                                            </span>

                                            <span
                                                className={`text-[11px] ${
                                                    isActive
                                                        ? "text-white/75"
                                                        : "text-neutral-500"
                                                }`}
                                            >
                                                Troque experiências
                                            </span>
                                        </div>

                                        {item.notifications &&
                                            item.notifications > 0 && (
                                                <span
                                                    className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold ${
                                                        isActive
                                                            ? "bg-white text-[#3B6FD8]"
                                                            : "bg-[#3B6FD8] text-white"
                                                    }`}
                                                >
                                                    {item.notifications}
                                                </span>
                                            )}
                                    </>
                                )}
                            </NavLink>
                        );
                    }

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