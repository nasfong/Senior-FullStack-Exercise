import { Router } from 'express'
import { courseController, registerController } from '../controllers'

const router = Router()

router.get('/course', courseController.findAll)
router.get('/register', registerController.findAll)
router.post('/register', registerController.create)


export default router 