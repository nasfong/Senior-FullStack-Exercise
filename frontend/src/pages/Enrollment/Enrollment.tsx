import { useState, useEffect } from "react";
import { toast } from "sonner";
import { EnrollmentItem } from "../../components/EnrollmentItem";

const Enrollment = () => {
  const [data, setData] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch('https://backend-ioa1m97aacsd.testing.sabay.com/api/enrollment'); // Adjust the URL as necessary
        if (!response.ok) {
          throw new Error("Failed to fetch enrollments");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
        toast.error("Error fetching enrollments: " + (err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Enrollment Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Enrollment</h1>
        <p className="text-sm text-gray-500">Manage your course enrollments here.</p>
      </div>

      {/* Enrollment List */}
      <div className="min-h-[100px]">
        <EnrollmentItem data={data} isLoading={isLoading} />
      </div>

      {/* Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
};

export default Enrollment;
