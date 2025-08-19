import authController from "../../controller/auth/auth.controller";
import { Router } from "express";

const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

export default authRouter;