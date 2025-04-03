import { Request, Response } from "express";
import * as courseService from "../services/courseService";

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await courseService.getAllCourses();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const student = await courseService.createCourse(req.body);
    res.status(201).json(student);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const student = await courseService.updateCourse(req.params.id, req.body);

    if (!student) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(student);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const student = await courseService.deleteCourse(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
