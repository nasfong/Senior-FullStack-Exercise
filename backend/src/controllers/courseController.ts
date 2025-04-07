import { Request, Response } from "express";
import * as courseService from "../services/courseService";

export const findAll = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    const courses = await courseService.findAll(q ? q.toString() : undefined);
    
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

