import mongoose, { Types } from "mongoose";
import Enrollment, { IEnrollmentInput } from "../../models/enrollment";
import * as registerService from '../../services/registerService';

// Mock the Enrollment model
jest.mock('../../models/enrollment', () => {
  const mockFind = jest.fn().mockReturnThis(); // Make find() chainable
  const mockPopulate = jest.fn().mockReturnThis(); // Make populate() chainable
  const mockExec = jest.fn().mockResolvedValue([]); // Mock the execution to return data

  return {
    __esModule: true,
    default: {
      find: mockFind,
      populate: mockPopulate,
      exec: mockExec, // We can add exec() if you're using .exec() to execute the query
    },
  };
});

describe('RegisterService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return a list of enrollments with populated course and student', async () => {
      const mockData = [
        {
          course: { name: 'Course A' },
          student: { name: 'Student A' },
        },
      ];

      // Mock the behavior of populate to return mockData
      (Enrollment.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnThis(), // Mock populate chaining
        exec: jest.fn().mockResolvedValue(mockData), // Mock exec() to resolve the mock data
      });

      const result = await registerService.findAll();

      console.log(result); // For debugging purposes

      expect(result).toEqual(mockData); // Check if the result matches the mock data
      expect(Enrollment.find).toHaveBeenCalled(); // Ensure find was called
      expect(Enrollment.find().populate).toHaveBeenCalledTimes(2); // Ensure populate was called twice
    });
  });

  // Uncomment and fix the create test if needed
  // describe('create', () => {
  //   it('should create and return a new enrollment', async () => {
  //     const mockEnrollmentData: IEnrollmentInput = {
  //       course: new Types.ObjectId(),
  //       student: new Types.ObjectId(),
  //       date: new Date(),
  //     };

  //     const mockSave = jest.fn().mockResolvedValue({
  //       _id: 'enrollmentId789',
  //       ...mockEnrollmentData,
  //     });

  //     // Mock constructor behavior
  //     (Enrollment as unknown as jest.Mock).mockImplementation(() => ({
  //       save: mockSave,
  //     }));

  //     const result = await registerService.create(mockEnrollmentData);

  //     expect(mockSave).toHaveBeenCalled();
  //     expect(result).toEqual({
  //       _id: 'enrollmentId789',
  //       ...mockEnrollmentData,
  //     });
  //   });
  // });
});
