import express, { Router } from "express";
import { validationRequest } from "../middlewares/validationRequest";
import { UserValidation } from "../validation/user-validation";
import { AuthController } from "../controllers/auth.controller";
import { LoginValidation } from "../validation/login-validation";
import { LoginController } from "../controllers/login.controller";

const authRoutes: Router = express.Router();

authRoutes.post('/sign-up', validationRequest(UserValidation.CREATE), AuthController.create)

authRoutes.post('/sign-in', validationRequest(LoginValidation.LOGIN), LoginController.create)


export default authRoutes;