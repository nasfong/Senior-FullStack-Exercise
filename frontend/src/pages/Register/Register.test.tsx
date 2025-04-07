import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

  it("displays validation errors when form fields are empty", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(screen.getByText(/Please fill in all required fields/i)).toBeInTheDocument();
    });
  });

  // it("displays an error message when form submission fails", async () => {
  //   const mockCourses = [
  //     { id: "1", name: "React Basics", price: 100 },
  //   ];
  
  //   (fetch as jest.Mock)
  //     .mockResolvedValueOnce({
  //       ok: true,
  //       json: async () => mockCourses,
  //     }) // Mock course fetch
  //     .mockRejectedValueOnce(new Error("Submission error")); // Mock form submission
  
  //   render(
  //     <MemoryRouter>
  //       <Register />
  //     </MemoryRouter>
  //   );
  
  //   // Fill out the form with valid data
  //   fireEvent.change(screen.getByLabelText(/student name/i), {
  //     target: { value: "John Doe" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/phone/i), {
  //     target: { value: "1234567890" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/course/i), {
  //     target: { value: "1" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/email/i), {
  //     target: { value: "johndoe@example.com" },
  //   });
  
  //   fireEvent.click(screen.getByText(/submit/i));
  
  //   // Wait for the error toast to be called
  //   await waitFor(() => {
  //     expect(toast.error).toHaveBeenCalledWith("Submission error");
  //   });
  // });

  // it("submits the form successfully", async () => {
  //   const mockCourses = [
  //     { id: "1", name: "React Basics", price: 100 },
  //   ];
  
  //   (fetch as jest.Mock)
  //     .mockResolvedValueOnce({
  //       ok: true,
  //       json: async () => mockCourses,
  //     }) // Mock course fetch
  //     .mockResolvedValueOnce({
  //       ok: true,
  //       json: async () => ({ message: "Register successful" }),
  //     }); // Mock form submission
  
  //   render(
  //     <MemoryRouter>
  //       <Register />
  //     </MemoryRouter>
  //   );
  
  //   // Fill out the form with valid data
  //   fireEvent.change(screen.getByLabelText(/student name/i), {
  //     target: { value: "John Doe" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/phone/i), {
  //     target: { value: "1234567890" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/course/i), {
  //     target: { value: "1" },
  //   });
  
  //   // Ensure the email field is filled if required
  //   fireEvent.change(screen.getByLabelText(/email/i), {
  //     target: { value: "johndoe@example.com" },
  //   });
  
  //   fireEvent.click(screen.getByText(/submit/i));
  
  //   // Wait for the success toast to be called
  //   await waitFor(() => {
  //     expect(toast.success).toHaveBeenCalledWith("Register successful");
  //   });
  // });
});