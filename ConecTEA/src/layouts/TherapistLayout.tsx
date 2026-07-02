import type { ReactNode } from "react";
import Sidebar from "@/components/therapist/Sidebar";
import Header from "@/components/therapist/Header";

interface TherapistLayoutProps {
    children: ReactNode;
}

export default function TherapistLayout({
    children,
}: TherapistLayoutProps) {
    return (
        <div className="flex h-screen">

            <Sidebar />

            <div className="flex flex-1 flex-col">

                <Header />

                <main className="flex-1 overflow-auto bg-muted/30 p-6">
                    {children}
                </main>

            </div>

        </div>
    );
}