import authController from "../../controller/auth/auth.controller";
import { Router } from "express";

const authRouter = Router();

authRouter.post('/register', authController.register);

export default authRouter;