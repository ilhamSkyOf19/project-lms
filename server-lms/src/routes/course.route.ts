import express, { Router } from 'express';
import { tokenMiddelware } from '../middlewares/tokenMiddleware';
import { CourseController } from '../controllers/course.controller';
import upload from '../utils/multer';


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