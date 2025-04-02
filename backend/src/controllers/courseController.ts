import { Request, Response } from "express";
import * as courseService from "../services/courseService";

export const readAllData = async (req: Request, res: Response) => {
  try {
    // const search = req.query.search as string;
    // if (!search) return res.status(400).json({ message: "Query is required" });

    const courses = await courseService.searchCourses();
    res.json(courses);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
