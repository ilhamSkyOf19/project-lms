import express, { Router } from "express";
import { tokenMiddelware } from "../middlewares/tokenMiddleware";
import { CourseDetailController } from "../controllers/courseDetail.controller";
import { validationRequest } from "../middlewares/validationRequest";
import { CourseDetailValidation } from "../validation/courseDetail-validation";


const courseDetailRoutes: Router = express.Router();

// get all 
courseDetailRoutes.get('/course-detail', tokenMiddelware, CourseDetailController.getAll);


// create
courseDetailRoutes.post('/course/:id/course-detail', tokenMiddelware, validationRequest(CourseDetailValidation.CREATE), CourseDetailController.create);


// update 
courseDetailRoutes.put('/course/:idCourse/course-detail/:idCourseDetail', tokenMiddelware, validationRequest(CourseDetailValidation.CREATE), CourseDetailController.update);


// delete 
courseDetailRoutes.delete('/course/:idCourse/course-detail/:idCourseDetail', tokenMiddelware, CourseDetailController.delete);
export default courseDetailRoutes