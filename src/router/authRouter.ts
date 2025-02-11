import { Router } from 'express'
import authController from '../controller/authController'
import { validationMiddleware } from '../middleware/validationMiddleware'
import { authValidationSchema } from '../validations/auth.ValidationTypes'

const router = Router()

router.get('/login', validationMiddleware(authValidationSchema), authController.userGet)


export default router
