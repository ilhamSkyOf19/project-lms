import express, { Router } from "express";
import { validationRequest } from "../middlewares/validationRequest";
import { UserValidation } from "../validation/user-validation";
import { AuthController } from "../controllers/auth.controller";
import { LoginValidation } from "../validation/login-validation";
import { LoginController } from "../controllers/login.controller";
import { tokenMiddelware } from "../middlewares/tokenMiddleware";

const authRoutes: Router = express.Router();

// sign up
authRoutes.post('/sign-up', validationRequest(UserValidation.CREATE), AuthController.create)


// sign in 
authRoutes.post('/sign-in', validationRequest(LoginValidation.LOGIN), LoginController.create)


// auth 
authRoutes.get('/auth', tokenMiddelware, AuthController.getAuth);



export default authRoutes;