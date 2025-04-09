import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { toast } from "sonner";
import Register from "./Register";

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

global.fetch = jest.fn();

describe("Register Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Register component with pre-filled courseId from URL params", async () => {
    const mockCourses = [
      { id: "1", name: "React Basics", price: 100 },
      { id: "2", name: "Advanced React", price: 200 },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCourses,
    });

    render(
      <MemoryRouter initialEntries={["/register/1"]}>
        <Routes>
          <Route path="/register/:courseId" element={<Register />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const courseSelect = screen.getByLabelText(/course/i);
      expect(courseSelect).toBeInTheDocument();
      expect(courseSelect).toHaveValue("1");
    });
  });

  it("displays an error message when fetching courses fails", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Error fetching courses: Network error"
      );
    });
  });

});