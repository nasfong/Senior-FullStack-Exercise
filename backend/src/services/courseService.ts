import Course from "../models/course";

export const findAll = async () => {
  return await Course.find()
};

