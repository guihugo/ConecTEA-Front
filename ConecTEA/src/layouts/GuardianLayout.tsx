import { Outlet } from "react-router-dom";

import Sidebar from "@/components/guardian/Sidebar";
import Header from "@/components/guardian/Header";

export default function GuardianLayout() {
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