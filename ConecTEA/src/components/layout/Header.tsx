import { roleMapInverse } from "@/constants/roles";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
    const { user } = useAuth();
    if (!user) {
        return null;
    }


    const role = roleMapInverse[
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
                        {user?.fullName ?? "Usuário"}
                    </p>

                    <p className="text-sm text-muted-foreground">
                        {role === "Guardian"
                            ? "Responsável"
                            : "Terapeuta"}
                    </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    {user?.fullName?.charAt(0).toUpperCase() ?? "U"}
                </div>

            </div>
        </header>
    );
}