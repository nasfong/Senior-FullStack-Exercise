import Course from '../../models/course';
import * as courseService from '../../services/courseService';

// 👇 Mock the entire Course model module
jest.mock('../../models/course', () => ({
  __esModule: true,
  default: {
    find: jest.fn(), // mock `find` method
  },
}));

describe('UserService with MongoMemoryServer', () => {
  jest.setTimeout(30000);

  describe('courseController', () => {
    describe('findAll', () => {
      it('should return a list of courses', async () => {
        const mockCourses = [
          { name: 'Course 1', description: 'Description 1' },
          { name: 'Course 2', description: 'Description 2' },
        ];

        (Course.find as jest.Mock).mockResolvedValue(mockCourses);

        const result = await courseService.findAll();

        expect(result).toEqual(mockCourses);
        expect(Course.find).toHaveBeenCalledTimes(1);
      });

      it('should return an empty list if no courses are found', async () => {
        (Course.find as jest.Mock).mockResolvedValue([]);

        const result = await courseService.findAll();

        expect(result).toEqual([]);
        expect(Course.find).toHaveBeenCalledTimes(1);
      });
    });
  });
});
