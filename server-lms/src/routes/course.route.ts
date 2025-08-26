import express, { Router } from 'express';
import { tokenMiddelware } from '../middlewares/tokenMiddleware';
import { CourseController } from '../controllers/course.controller';
import { AuthRequest } from '../model/user-model';


const coursRoutes: Router = express.Router();

// get 
coursRoutes.get('/course', tokenMiddelware, CourseController.get);

export default coursRoutes