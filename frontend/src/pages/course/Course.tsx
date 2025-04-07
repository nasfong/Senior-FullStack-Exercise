import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CourseItem } from "../../components/CourseItem";

const Course = () => {
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://backend-ioa1m97aacsd.testing.sabay.com/api/course?q=${search}`);
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
        toast.error("Error fetching courses: " + (err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [search]);

  return (
    <div className="flex flex-col gap-2 p-4">
      {/* Search Input */}
      <h1>Course Choose</h1>
      <div className="mb-4">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="mt-2 p-2 border rounded-md  w-full"
          placeholder="Search for courses..."
        />
      </div>

      <div className="min-h-[100px]">
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Loading */}
          {isLoading && Array(2).fill(null).map((_, index) => (
            <div key={index} className="h-[267px] bg-gray-300 animate-pulse rounded-xl"></div>
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

      {/* Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
};



export default Course;
