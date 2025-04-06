import { Request, Response } from "express";
import * as registerService from "../services/registerService";
import * as studentService from "../services/studentService";

import Enrollment from "../models/enrollment";
import Course from "../models/course";

export const findAll = async (req: Request, res: Response) => {
  try {
    const courses = await registerService.findAll();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, courseId } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Student name is required" });
    }

    if (!phone) {
      return res.status(400).json({ message: "Student phone number is required" });
    }

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const student = await studentService.create({ name, phone, email });

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const enrollment = new Enrollment({
      student: student._id,
      course: course._id,
      date: new Date(),
    });

    await enrollment.save();

    return res.status(200).json({
      message: "Student created and enrolled successfully",
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
