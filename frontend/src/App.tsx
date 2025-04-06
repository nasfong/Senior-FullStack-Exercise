import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Course from "./pages/course/Course";
import Layout from "./layout/Layout";
import Enrollment from "./pages/Enrollment/Enrollment";
import Register from "./pages/Register/Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to /course */}
        <Route path="/" element={<Navigate to="/course" />} />
        
        <Route path="/" element={<Layout />}>
          <Route path="course" element={<Course />} />
          <Route path="enrollment" element={<Enrollment />} />
          <Route path="register/:courseId" element={<Register />} />
        </Route>

        {/* Catch-All 404 Page */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
