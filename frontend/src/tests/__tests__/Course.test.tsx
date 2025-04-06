// // src/__tests__/useQueryCourses.test.tsx
// import { render, screen } from '@testing-library/react';
// // import { useQueryCourses } from '@/hook/course';
// import Course from '@/pages/course/Course';

// // Mock the useQueryCourses hook
// jest.mock('@/hook/course', () => ({
//   useQueryCourses: jest.fn(),
// }));

// describe('useQueryCourses Hook', () => {
//   it('renders loading state when data is being fetched', () => {
//     // Mock useQueryCourses to simulate loading
//     (useQueryCourses as jest.Mock).mockReturnValue({
//       data: null,
//       isLoading: true,
//     });

//     render(<Course />);

//     // Expect to see a loading indicator (e.g., skeleton or spinner)
//     expect(screen.getByRole('status')).toBeInTheDocument(); // Adjust if needed
//   });

//   it('renders course data when fetch is successful', () => {
//     // Mock useQueryCourses to simulate a successful fetch
//     (useQueryCourses as jest.Mock).mockReturnValue({
//       data: [
//         { id: '1', name: 'Course 1' },
//         { id: '2', name: 'Course 2' },
//       ],
//       isLoading: false,
//     });

//     render(<Course />);

//     // Expect the course names to be rendered
//     expect(screen.getByText('Course 1')).toBeInTheDocument();
//     expect(screen.getByText('Course 2')).toBeInTheDocument();
//   });

//   it('renders empty state if no courses are available', () => {
//     // Mock useQueryCourses to simulate no data
//     (useQueryCourses as jest.Mock).mockReturnValue({
//       data: [],
//       isLoading: false,
//     });

//     render(<Course />);

//     // Expect to see a message for no courses
//     expect(screen.getByText('No courses available')).toBeInTheDocument(); // You can adjust this text
//   });
// });
