import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <Outlet />
    </div>
  );
}