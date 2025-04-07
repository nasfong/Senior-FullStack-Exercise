import { useState } from "react";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { CourseItem } from "./components/CourseItem";
import { Input } from "@/components/ui/input";

const Course = () => {
  const [search, setSearch] = useState<string>('');

  // query course list
  const { data, isLoading, error } = useQuery<Course[]>({
    queryKey: ['course', search],
    queryFn: async () => {
      const response = await axios.get('/course', {
        params: { q: search }
      });
      return response.data;
    }
  });

  if (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    const errorMessage = axiosError.response?.data?.message || error.message
    toast.error(errorMessage);
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      {/* Search Input */}
      <div className="mb-4">
        <Input 
          onChange={(e) => setSearch(e.target.value)} 
          value={search} 
          placeholder="Search for courses..." 
        />
      </div>

      <div className="min-h-[100px]">
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Loading */}
          {isLoading && Array(2).fill(null).map((_, index) => (
            <Skeleton key={index} className="h-[267px] rounded-xl" />
          ))}

          {/* List Data */}
          {data?.map((item, index) => (
            <CourseItem key={index} item={item} />
          ))}
        </div>

        {/* No Data */}
        {data?.length === 0 && !isLoading && (
          <p className="text-center text-gray-500">No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default Course;
