import Student, { IStudent } from "../models/student";

export const getAllStudents = async () => {
  return await Student.find().select("-__v");
};

export const createStudent = async (studentData: IStudent) => {
  const student = new Student(studentData);
  return await student.save();
};

export const updateStudent = async (id: string, studentData: IStudent) => {
  return await Student.findByIdAndUpdate(id, studentData, { new: true, runValidators: true });
};

export const deleteStudent = async (id: string) => {
  return await Student.findByIdAndDelete(id);
};
