import { Outlet } from "react-router-dom";

import Sidebar from "@/components/therapist/Sidebar";
import Header from "@/components/therapist/Header";

export default function TherapistLayout() {
    return (
        <div className="flex h-screen">

            <Sidebar />

            <div className="flex flex-1 flex-col">

                <Header />

                <main className="flex-1 overflow-auto bg-muted/30 p-6">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}