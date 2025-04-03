import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useQueryCourses = ({ fetch = true } = {}) => {
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      try {
        const response = await axios.get("/course");
        return response.data;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || "Failed to fetch courses";
        toast.error(`Error fetching courses: ${errorMessage}`);
        throw error; // Ensures React Query knows the request failed
      }
    },
    enabled: fetch,

  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation<string, void, unknown>({
    mutationFn: (id) => {
      return axios.delete(`/course/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      toast.success("Course deleted successfully!")
    },
    onError: (error: any) => {
      const status = error.response?.status;
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";

      if (status === 400) {
        toast.warning(errorMessage);
      } else if (status === 500) {
        toast.error(`Server Error: ${errorMessage}`);
      } else {
        toast.error(`Error deleting course: ${errorMessage}`);
      }
    },
  })
}

export const useSubmitCourse = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any): Promise<any> => {
      if (id) {
        return axios
          .put(`/course/${id}`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
      } else {
        return axios.post(`/course`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      if (id) toast.success("Course has been updated")
      else toast.success("Course has been created")
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      toast.error(`Error course: ${errorMessage}`);
    },
  })
}