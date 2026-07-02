import { LayoutDashboard, Users, FileText, BarChart3, Settings } from "lucide-react";

export default function Sidebar() {
    return (
        <aside className="w-64 border-r bg-white">
            <div className="border-b p-6">
                <h1 className="text-2xl font-bold text-primary">
                    ConecTEA
                </h1>
                <p className="text-sm text-muted-foreground">
                    Painel do Terapeuta
                </p>
            </div>

            <nav className="flex flex-col gap-2 p-4">

                <button className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
                    <LayoutDashboard size={20}/>
                    Dashboard
                </button>

                <button className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
                    <Users size={20}/>
                    Pacientes
                </button>

                <button className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
                    <FileText size={20}/>
                    Relatórios
                </button>

                <button className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
                    <BarChart3 size={20}/>
                    Estatísticas
                </button>

                <button className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
                    <Settings size={20}/>
                    Configurações
                </button>

            </nav>
        </aside>
    );
}