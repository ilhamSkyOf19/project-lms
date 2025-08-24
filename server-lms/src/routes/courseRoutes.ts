import express, { Router } from "express";
import { CourseControllers } from "../controllers/courseControllers";
import { validationRequest } from "../middlewares/validationRequest";
import { CourseValidation } from "../validation/course-validation";

const courseRoutes: Router = express.Router();

courseRoutes.get('/course', CourseControllers.getCourse)
courseRoutes.post('/course', validationRequest(CourseValidation.CREATE), CourseControllers.getCourse)


export default courseRoutes;