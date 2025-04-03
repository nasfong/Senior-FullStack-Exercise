import { Request, Response } from "express";
import * as studentService from "../services/studentService";

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await studentService.getAllStudents();
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json(student);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await studentService.updateStudent(req.params.id, req.body);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await studentService.deleteStudent(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
