import { cn } from "@/lib/utils";
import { NavLink, Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const Layout = () => {
  return (
    <div>
      {/* Navigation Menu */}
      <nav className="p-4 bg-gray-100 flex gap-6">
        <NavLink
          to="/course"
          className={({ isActive }) =>
            cn("text-lg font-medium", isActive ? "text-blue-600" : "text-gray-600")
          }
        >
          Course
        </NavLink>
        <NavLink
          to="/enrollment"
          className={({ isActive }) =>
            cn("text-lg font-medium", isActive ? "text-blue-600" : "text-gray-600")
          }
        >
          Enrollment
        </NavLink>
      </nav>

      {/* Page Content */}
      <main className="p-5">
        <Outlet />
        <Toaster />
      </main>
    </div>
  );
};

export default Layout;
