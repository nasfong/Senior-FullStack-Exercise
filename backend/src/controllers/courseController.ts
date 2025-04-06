import { Request, Response } from "express";
import * as courseService from "../services/courseService";

export const findAll = async (req: Request, res: Response) => {
  try {
    const courses = await courseService.findAll();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

