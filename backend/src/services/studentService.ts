import Student from "../models/student";
import { IStudent } from "../models/student"; 

export const create = async (studentData: { name: string, phone: string, email?: string }): Promise<IStudent> => {
  try {
    const newStudent = new Student({
      name: studentData.name,
      phone: studentData.phone,
      email: studentData.email,
    });

    await newStudent.save();

    return newStudent;
  } catch (error) {
    throw new Error("Error creating student");
  }
};
