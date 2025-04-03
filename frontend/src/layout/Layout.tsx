import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      {/* Navigation Menu */}
      <nav style={{ padding: "10px", background: "#eee", display: "flex", gap: "15px" }}>
        <Link to="/course">Course</Link>
        <Link to="/student">Student</Link>
        <Link to="/enrollment">Enrollment</Link>
      </nav>

      {/* Page Content */}
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
