import Course from '../../models/course';
import * as courseService from '../../services/courseService';

describe('Course', () => {
  beforeEach(async () => {
    // Clear the database and create new test courses before each test
    await Course.create({ name: 'Frontend Course', description: 'Description 1', price: 100, capacity: 30, });
    await Course.create({ name: 'Backend Course', description: 'Description 2', price: 200, capacity: 30, });
  });

  describe('Get List Courses', () => {
    it('should return a list of courses', async () => {
      // Call the actual service method to retrieve all courses
      const result = await courseService.findAll();

      // Check that the result matches the expected courses
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Frontend Course');
      expect(result[1].name).toBe('Backend Course');
    });
  });

  describe('Search Courses', () => {
    it('should return a list of courses', async () => {
      // Call the actual service method to retrieve all courses
      const q = 'Frontend'
      const result = await courseService.findAll(q);

      // Check that the result matches the expected courses
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Frontend Course');
    });
  });
});
