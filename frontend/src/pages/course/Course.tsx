import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CourseItem } from "./components/CourseItem";

const Course = () => {

  // query course list
  const { data, isLoading, error } = useQuery<Course[]>({
    queryKey: ['course'],
    queryFn: async () => {
      const response = await axios.get('/course'); // Adjust the URL as necessary
      return response.data;
    }
  });

  if (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    const errorMessage = axiosError.response?.data?.message || error.message
    toast.error(errorMessage);
  }
  return (
    <div className="flex flex-col gap-2">
      <Card>
        <CardHeader>
          <CardTitle>Course</CardTitle>
          <CardDescription>
            Manage your course and view their price.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
            {isLoading && Array(3).fill(null).map((_, index) => (
              <Skeleton key={index} className="h-[267px] rounded-xl" />
            ))}
            {data?.map((item, index) =>
              <CourseItem
                key={index}
                item={item}
              />)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Course;
