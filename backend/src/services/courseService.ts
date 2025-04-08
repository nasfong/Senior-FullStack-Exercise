import Course from "../models/course";

export const findAll = async (query?: string) => {
  const searchCriteria = query ? {
    $text: { $search: query }
  } : {};

  return await Course.find(searchCriteria);
}

