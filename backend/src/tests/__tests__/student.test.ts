import * as studentService from '../../services/studentService';
import Student from '../../models/student';

// jest.mock('../../models/student'); // Mock the Student model

describe('studentService', () => {
  describe('create', () => {
    it('should create a new student', async () => {
      const studentData = {
        name: 'John Doe',
        phone: '1234567890',
        email: 'john@example.com',
      };

      const result = await studentService.create(studentData);

      expect(result.name).toBe(studentData.name);
      expect(result.phone).toBe(studentData.phone);
      expect(result.email).toBe(studentData.email);
    });

    it('should throw an error if student save fails', async () => {
      const studentData = {
        name: '',
        phone: '',
        email: '',
      };

      await expect(studentService.create(studentData)).rejects.toThrow('Error creating student');
    });
  });
});
