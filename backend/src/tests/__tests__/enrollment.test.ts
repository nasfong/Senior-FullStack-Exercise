import mongoose from "mongoose";
import * as enrollmentService from '../../services/enrollmentService';
import Course from "../../models/course";
import Student from "../../models/student";
import Enrollment from "../../models/enrollment";

describe('Enrollment Service', () => {
  describe('createEnrollment', () => {
    test('should create and return a new enrollment', async () => {
      const mockEnrollmentData = {
        course: new mongoose.Types.ObjectId(),
        student: new mongoose.Types.ObjectId(),
        date: new Date(),
      };

      const result = await enrollmentService.create(mockEnrollmentData);

      expect(result.course).toBe(mockEnrollmentData.course);
      expect(result.student).toBe(mockEnrollmentData.student);
      expect(result.date).toBe(mockEnrollmentData.date);
    });
  });

  describe('findAllEnrollment', () => {
    beforeEach(async () => {
      const course = await Course.create({
        name: 'Course 1',
        description: 'Description 1',
        price: 100,
        capacity: 30,
      });

      const student = await Student.create({
        name: 'Student 1',
        description: 'Description 1',
        phone: '01234567'
      });

      await Enrollment.create({
        course: course.id,
        student: student.id,
        date: new Date(),
      });
    });

    test('should find and return all enrollments with populated course and student', async () => {
      const enrollments = await enrollmentService.findAll();

      expect(enrollments).toHaveLength(1);

      expect(enrollments[0].course).toBeDefined();
      expect(enrollments[0].student).toBeDefined();
      expect(enrollments[0].date).toBeDefined();

    });
  });

});
