import Course from "../models/course";

// export const searchCourses = async (search: string) => {
//   if (!search) {
//     throw new Error("Query is required");
//   }

//   return await Course.find({ $text: { $search: search } });
// };

export const searchCourses = async () => {


  return await Course.find();
};
