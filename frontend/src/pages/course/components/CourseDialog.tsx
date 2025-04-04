import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useSubmitCourse } from "@/hook/course";
import { InputForm } from "@/components/custom/input-form";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formValue: Course | null;
  setFormValue: React.Dispatch<React.SetStateAction<Course | null>>;
};

export const CourseDialog = ({
  open,
  setOpen,
  formValue,
  setFormValue,
}: Props) => {
  const { mutateAsync, isPending } = useSubmitCourse(formValue?.id);

  const formSchema = z.object({
    name: z.string().nonempty("required"),
    description: z.string().nonempty("required"),
    capacity: z.number(),
    price: z.number(),
  });

  // default value
  const defaultValues = {
    name: "",
    description: "",
    capacity: 0,
    price: 0,
  };

  // hook form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  // handle dialog
  const onChangeModal = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setOpen(false);
      form.reset(defaultValues);
      setFormValue(null);
    }
  };

  // get edit
  useEffect(() => {
    if (formValue) {
      form.reset({
        name: formValue.name,
        description: formValue.description,
        capacity: formValue.capacity,
        price: formValue.price,
      });
    }
  }, [form, formValue]);

  // handle submit
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutateAsync(data).finally(() => {
      onChangeModal(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onChangeModal}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="min-w-[60%]">
        <DialogHeader>
          <DialogTitle>
            {!formValue?.id ? "Create Course" : "Edit Course"}
          </DialogTitle>
          <DialogDescription>product information form</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <InputForm name="name" label="Name" placeholder="Name" required />
            <InputForm name="description" label="Description" placeholder="Description" required />
            <InputForm name="capacity" type="number" label="Capacity" placeholder="Capacity" required />
            <InputForm name="price" type="number" label="Price" placeholder="Price" required />

            <DialogFooter className="mt-3">
              <Button type="submit" loading={isPending}>
                {formValue?.id ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
