import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { EnrollmentItem } from "./components/EnrollmentItem";


const Enrollment = () => {

  // query course list
  const { data, isLoading, error } = useQuery<Enrollment[]>({
    queryKey: ['register'],
    queryFn: async () => {
      const response = await axios.get('/register'); // Adjust the URL as necessary
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
    <div className="flex flex-col gap-2">
      <Card>
        <CardHeader>
          <CardTitle>Enrollment</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <EnrollmentItem
            data={data}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Enrollment;
