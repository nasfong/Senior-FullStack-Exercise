import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { EnrollmentItem } from "./components/EnrollmentItem";

const Enrollment = () => {

  // query enrollment list
  const { data, isLoading, error } = useQuery<Enrollment[]>({
    queryKey: ['enrollment'],
    queryFn: async () => {
      const response = await axios.get('/enrollment'); // Adjust the URL as necessary
      return response.data;
    }
  });

  // error handler
  if (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    const errorMessage = axiosError.response?.data?.message || error.message
    toast.error(errorMessage);
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Enrollment Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Enrollment</h1>
        <p className="text-sm text-gray-500">Manage your course enrollments here.</p>
      </div>

      {/* Enrollment List */}
      <div className="min-h-[100px]">
        <EnrollmentItem
          data={data}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Enrollment;
