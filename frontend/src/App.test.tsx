// app.test.js
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {
  BrowserRouter,
  // MemoryRouter
} from 'react-router-dom'
import App from './App'

test('navigating to the Course page', async () => {
  render(<App />, { wrapper: BrowserRouter });
  const user = userEvent.setup();

  // Click on the "Course" link in the navigation
  const courseNavLink = screen.getByRole('link', { name: /^course$/i });
  await user.click(courseNavLink);

  // Verify the "Course Page" content is displayed
  expect(screen.getByText(/course choose/i)).toBeInTheDocument();
});

