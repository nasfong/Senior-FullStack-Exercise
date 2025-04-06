import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatPrice } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().nonempty("Student Name is required"),
  phone: z.string().nonempty("Phone is required"),
  email: z.string(),
  courseId: z.string()
});

const Register = () => {
  const navigate = useNavigate()
  const { courseId } = useParams()

  // query course list
  const { data: courseData, isLoading: courseLoading, error: courseError } = useQuery<Course[]>({
    queryKey: ['course'],
    queryFn: async () => {
      const response = await axios.get('/course'); // Adjust the URL as necessary
      return response.data;
    }
  });

  // mutation for register
  const { mutateAsync: registerMutation, isPending: registerLoading, error: registerError } = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => axios.post(`/register`, data),
  });

  // form control
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      courseId: courseId
    },
  });

  // submit handler
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    registerMutation(data).then((res) => {
      if (res.status === 200)
        navigate("/student")
    });
  };

  // error handler
  if (registerError) {
    const axiosError = (registerError || courseError) as AxiosError<{ message: string }>;
    const errorMessage = axiosError.response?.data?.message || registerError?.message || courseError?.message
    toast.error(errorMessage);
  }

  return (
    <div className="flex justify-center">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Manage your course and view their price.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              {/* Course */}
              <FormField
                control={form.control}
                name="courseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Course</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger loading={courseLoading}>
                          <SelectValue placeholder="Select a Course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courseData?.map(item => (
                          <SelectItem key={item.id} value={item.id}>{item.name} - {formatPrice(item.price)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Student Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name"
                        type="text"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Phone"
                        type="text"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g example@.com"
                        type="text"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" loading={registerLoading} className="mt-6">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register
