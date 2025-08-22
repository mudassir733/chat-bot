import authController from "../../controller/auth/auth.controller";
import passport from 'passport';
import dotenv from 'dotenv'
import { Router } from "express";

dotenv.config();
const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);


authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => res.redirect(`${process.env.FRONTEND_REDIRECT_URI}`)
);

authRouter.get('/success', authController.loginSuccess);
authRouter.get('/logout', authController.logoutUser);


export default authRouter;