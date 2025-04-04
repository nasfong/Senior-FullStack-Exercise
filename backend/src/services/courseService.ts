import Course, { ICourse } from "../models/course";

export const getAllCourses = async () => {
  return await Course.find()
};

export const createCourse = async (courseData: ICourse) => {
  const course = new Course(courseData);
  return await course.save();
};

export const updateCourse = async (id: string, courseData: ICourse) => {
  return await Course.findByIdAndUpdate(id, courseData, { new: true, runValidators: true });
};

export const deleteCourse = async (id: string) => {
  return await Course.findByIdAndDelete(id);
};
