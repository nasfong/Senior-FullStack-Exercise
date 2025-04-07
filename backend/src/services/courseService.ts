import Course from "../models/course";

export const findAll = async (query?: string) => {
  const searchCriteria = query ? {
    $or: [
      { name: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } }
    ]
  } : {};

  return await Course.find(searchCriteria);
}

