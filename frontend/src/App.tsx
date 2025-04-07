import { Routes, Route, Navigate, NavLink } from "react-router-dom";

import Course from "./pages/course/Course";
import Enrollment from "./pages/Enrollment/Enrollment";
import Register from "./pages/Register/Register";
import NotFound from "./pages/Notfound";

function App() {
  return (
    <div>
      <nav className="p-4 bg-gray-100 flex gap-6">
        <NavLink
          to="/course"
          className={({ isActive }) =>
            isActive
              ? "text-lg font-medium text-blue-600"
              : "text-lg font-medium text-gray-600"
          }
        >
          Course
        </NavLink>
        <NavLink
          to="/enrollment"
          className={({ isActive }) =>
            isActive
              ? "text-lg font-medium text-blue-600"
              : "text-lg font-medium text-gray-600"
          }
        >
          Enrollment
        </NavLink>
      </nav>
      <div>
        <Routes>
          {/* Redirect root path to /course */}
          <Route path="/" element={<Navigate to="/course" />} />
          <Route path="course" element={<Course />} />
          <Route path="enrollment" element={<Enrollment />} />
          <Route path="register/:courseId" element={<Register />} />

          {/* Catch-All 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
