import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteCourse, useQueryCourses } from "@/hook/course";
import { CourseDialog } from "./components/CourseDialog";
import { CourseItem } from "./components/CourseItem";

const Course = () => {
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState<Course | null>(null);

  // hook
  const { data, isLoading } = useQueryCourses()
  const { mutateAsync: deleteMutateAsync, isPending: deleteLoading } = useDeleteCourse()

  // handle dialog edit
  const onEdit = (value: Course) => {
    setFormValue(value);
    setOpen(true);
  };

  // handle dialog delete
  const onDelete = (id: string) => {
    return deleteMutateAsync(id)
      .then(() => true) // true close alert
      .catch(() => false); // false still open alert
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end gap-2">
        <Button size="sm" className="h-8 gap-1 float-end" onClick={() => setOpen(true)}>
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Course
          </span>
        </Button>
        <CourseDialog
          open={open}
          setOpen={setOpen}
          formValue={formValue}
          setFormValue={setFormValue}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Course</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
            {isLoading && Array(3).fill(null).map((_, index) => (
              <Skeleton key={index} className="h-[267px] rounded-xl" />
            ))}
            {data?.map((item, index) =>
              <CourseItem
                key={index}
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
                deleteLoading={deleteLoading}
              />)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Course;
