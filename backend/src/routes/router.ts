import { Router } from 'express'
import { courseController, studentController } from '../controllers';

const router = Router()

// Course
router.get('/course', courseController.getAllCourses)
router.post('/student', courseController.createCourse)
router.put('/student/:id', courseController.updateCourse)
router.delete('/student/:id', courseController.deleteCourse)

// Student
router.get('/student', studentController.getAllStudents)
router.post('/student', studentController.createStudent)
router.put('/student/:id', studentController.updateStudent)
router.delete('/student/:id', studentController.deleteStudent)

export default router 