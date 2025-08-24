import express, { Router } from "express";
import { validationRequest } from "../middlewares/validationRequest";
import { UserValidation } from "../validation/user-validation";
import { AuthController } from "../controllers/auth.controller";

const authRoutes: Router = express.Router();

authRoutes.post('/sign-up', validationRequest(UserValidation.CREATE), AuthController.create)

export default authRoutes;