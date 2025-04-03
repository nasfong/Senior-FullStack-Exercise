import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Course from "./pages/course/Course";
import Layout from "./layout/Layout";

function App() {



  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="course" element={<Course />} />
        </Route>

        {/* Catch-All 404 Page */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  )
}

export default App
