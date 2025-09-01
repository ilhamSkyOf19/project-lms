import express, { Router } from "express";
import { tokenMiddelware } from "../middlewares/tokenMiddleware";
import { CourseDetailController } from "../controllers/courseDetail.controller";


const courseDetailRoutes: Router = express.Router();

// get all 
courseDetailRoutes.get('/course-detail', tokenMiddelware, CourseDetailController.getAll);


// create
courseDetailRoutes.post('/course/:id/course-detail', tokenMiddelware, CourseDetailController.create);

export default courseDetailRoutes