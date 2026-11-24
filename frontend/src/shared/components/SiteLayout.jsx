import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
export function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#e5e5e5]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
