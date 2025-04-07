import { render, screen, waitFor } from "@testing-library/react";
import Enrollment from "./Enrollment";
import { toast } from "sonner";

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

window.fetch = jest.fn();

describe("Enrollment Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays fetched enrollment data", async () => {
    const mockEnrollments: Enrollment[] = [
      {
        id: "1",
        course: {
          id: "1",
          name: "React Basics",
          capacity: 1,
          description: "Learn the basics of React",
          price: 10,
        },
        student: {
          id: "1",
          name: "John Doe",
          phone: "093292931",
          email: "example@gmail.com",
        },
        date: new Date("2025-04-08T10:00:00Z"),
      },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockEnrollments,
    });

    render(<Enrollment />);

    await waitFor(() => {
      // Check if the course name is rendered
      expect(screen.getByText(/react basics/i)).toBeInTheDocument();
      expect(screen.getByText(/john doe/i)).toBeInTheDocument();
      expect(screen.getByText(/093292931/i)).toBeInTheDocument();
      expect(screen.getByText(/example@gmail.com/i)).toBeInTheDocument();
    });
  });

  it("displays an error message when fetching enrollments fails", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    render(<Enrollment />);

    await waitFor(() => {
      // Verify that the toast.error function is called with the correct message
      expect(toast.error).toHaveBeenCalledWith(
        "Error fetching enrollments: Network error"
      );
    });
  });

  it("displays a loading state while fetching enrollments", async () => {
    (fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise(() => {
          // Simulate a pending fetch
        })
    );

    render(<Enrollment />);

    // Check if the loading state is displayed
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});