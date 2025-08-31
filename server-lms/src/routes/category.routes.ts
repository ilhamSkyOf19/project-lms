import express, { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { tokenMiddelware } from "../middlewares/tokenMiddleware";

const categoryRoutes: Router = express.Router();

// get name 
categoryRoutes.get('/category', tokenMiddelware, CategoryController.getAll);


export default categoryRoutes;