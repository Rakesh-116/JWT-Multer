import { Router } from 'express';
import LoginController from '../controllers/login.controller.js';

const loginRouter = Router();

loginRouter.post('/api/', LoginController);

export default loginRouter;