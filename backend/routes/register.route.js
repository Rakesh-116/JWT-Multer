import { Router } from 'express';
import RegisterController from '../controllers/register.controller.js'

const registerRouter = Router()

registerRouter.post('/api/register', RegisterController)

export default registerRouter;