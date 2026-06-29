import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  User,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Atividades",
    href: "/lessons",
    icon: BookOpen,
  },
  {
    title: "Perfil",
    href: "/profile",
    icon: User,
  },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 border-r bg-background p-4">
      <div className="mb-8 text-xl font-bold">
        ConecTEA
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="
              flex items-center gap-3 rounded-md
              px-3 py-2 text-sm
              hover:bg-muted
            "
          >
            <item.icon size={18} />

            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}