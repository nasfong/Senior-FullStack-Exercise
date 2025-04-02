import { searchCourses } from "../services/courseService";
import Course from "../models/course";

jest.mock("../models/course"); // Mock Mongoose Model

describe("Course Service", () => {
  it("should return courses based on search query", async () => {
    const mockCourses = [
      { name: "Node.js", description: "Learn Node.js" },
      { name: "TypeScript", description: "Master TypeScript" },
    ];
    
    (Course.find as jest.Mock).mockResolvedValue(mockCourses); // Mock database response

    const result = await searchCourses("Node");
    expect(result).toEqual(mockCourses);
    expect(Course.find).toHaveBeenCalledWith({ $text: { $search: "Node" } });
  });

  it("should throw an error if no search query is provided", async () => {
    await expect(searchCourses("")).rejects.toThrow("Query is required");
  });
});
