import { Router } from 'express'
import { courseController, enrollmentController } from '../controllers'

const router = Router()

router.get('/course', courseController.findAll)
router.get('/enrollment', enrollmentController.findAll)
router.post('/enrollment', enrollmentController.create)


export default router 