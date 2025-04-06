type Course = {
  id: string;
  name: string;
  description: string;
  capacity: number;
  price: number;
};

type Student = {
  id: string
  name: string
  phone: string
  email: string
}

type Enrollment = {
  id: string
  course?: Course
  student?: Student
  date: Date
}
