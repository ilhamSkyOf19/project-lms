import express, { Router } from 'express';
import { tokenMiddelware } from '../middlewares/tokenMiddleware';
import { CourseController } from '../controllers/course.controller';
import { AuthRequest } from '../model/user-model';
import upload from '../utils/multer';
import { CourseValidation } from '../validation/course-validation';
import { validationRequest } from '../middlewares/validationRequest';


const coursRoutes: Router = express.Router();



// get 
coursRoutes.get('/course', tokenMiddelware, CourseController.get);


// create 
coursRoutes.post('/course', tokenMiddelware, upload.single('thumbnail'), CourseController.create);

// update
coursRoutes.put('/course/:id', tokenMiddelware, upload.single('thumbnail'), CourseController.update);

// delete
coursRoutes.delete('/course/:id', tokenMiddelware, CourseController.delete);


export default coursRoutes