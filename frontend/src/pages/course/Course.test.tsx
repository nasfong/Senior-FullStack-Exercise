import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Course from "./Course";

window.fetch = jest.fn();

describe("Course Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays fetched courses", async () => {
    const mockCourses = [
      { id: 1, name: "React Basics", description: "Learn React", price: 100 },
      { id: 2, name: "Advanced React", description: "Master React", price: 200 },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCourses,
    });

    render(
      <MemoryRouter>
        <Course />
      </MemoryRouter>
    );

    // Simulate typing in the search input
    fireEvent.change(screen.getByPlaceholderText(/search for courses/i), {
      target: { value: "React" },
    });

    // Wait for the courses to be displayed
    await waitFor(() => {
      expect(screen.getByText(/react basics/i)).toBeInTheDocument();
      expect(screen.getByText(/advanced react/i)).toBeInTheDocument();
    });
  });

});