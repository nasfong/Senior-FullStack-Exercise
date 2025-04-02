import { Router } from 'express'
import { readAllData } from '../controllers/courseController'
import { createStudent, deleteStudent, getAllStudents, updateStudent } from '../controllers/studentController'

const router = Router()

router.get('/course', readAllData)


router.get('/student', getAllStudents)
router.post('/student', createStudent)
router.put('/student/:id', updateStudent)
router.delete('/student/:id', deleteStudent)

export default router 