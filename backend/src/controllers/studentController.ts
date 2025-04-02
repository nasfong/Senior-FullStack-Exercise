import { Request, Response } from "express"
import Student from "../models/student"
// import { getFromCache, setToCache } from "../middleware/cacheMiddleware";

export const getAllStudents = async (req: Request, res: Response) => {
  try {

    const data = await Student
      .find()
      .select('-__v')


    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const createStudent = async (req: Request, res: Response) => {
  try {
    const data = new Student({
      ...req.body
    });
    const saveData = await data.save();

    res.status(201).json(saveData);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updateData = await Student.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updateData) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(updateData);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteStudent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = req.params.id;

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};