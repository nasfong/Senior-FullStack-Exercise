import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { formatPrice } from "@/lib/utils";

const Register = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState<Course[]>([]);
  const [courseLoading, setCourseLoading] = useState<boolean>(true);
  const [registerLoading, setRegisterLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch course data
  useEffect(() => {
    const fetchCourses = async () => {
      setCourseLoading(true);
      try {
        const response = await fetch("https://backend-ioa1m97aacsd.testing.sabay.com/api/course");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourseData(data);
      } catch (err) {
        const msg = (err as Error).message;
        setError(msg);
        toast.error("Error fetching courses: " + msg);
      } finally {
        setCourseLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    courseId: courseId || ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, courseId: e.target.value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.phone || !formData.courseId) {
      return "Please fill in all required fields.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterLoading(true);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      setRegisterLoading(false);
      return;
    }

    try {
      const response = await fetch("https://backend-ioa1m97aacsd.testing.sabay.com/api/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message);
        navigate("/enrollment");
      } else {
        const result = await response.json();
        setError(result.message);
        toast.error(result.message);
      }
    } catch (err) {
      const msg = (err as Error).message;
      setError("Error submitting form: " + msg);
      toast.error(msg);
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Register</h1>
          <p className="text-sm text-gray-500">Manage your course and view their price.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Course */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold flex" htmlFor="courseId">
              Course <span className="text-red-500">*</span>
            </label>
            <select
              id="courseId"
              name="courseId"
              value={formData.courseId}
              onChange={handleSelectChange}
              className="mt-2 p-2 border rounded-md"
              disabled={courseLoading}
              required
            >
              <option value="">Select a Course</option>
              {courseData?.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name} - {formatPrice(course.price)}
                </option>
              ))}
            </select>
            {courseLoading && <p className="text-gray-500">Loading courses...</p>}
          </div>

          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold flex" htmlFor="name">
              Student Name<span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Student Name"
              className="mt-2 p-2 border rounded-md"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold flex" htmlFor="phone">
              Phone<span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              className="mt-2 p-2 border rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="e.g example@domain.com"
              className="mt-2 p-2 border rounded-md"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white rounded-md"
            disabled={registerLoading}
          >
            {registerLoading ? "Submitting..." : "Submit"}
          </button>

          {/* Error Message */}
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
