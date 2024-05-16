import { Router } from 'express'
import HomeController from '../controllers/home.controller.js';
import { upload } from '../middleware/multer.middleware.js';

const homeRouter = Router();

homeRouter.post('/api/home', upload.single('file'), HomeController);

export default homeRouter;