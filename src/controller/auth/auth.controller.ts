import { Request, Response, NextFunction } from "express";
import authService from "../../services/auth/auth.service";
import { CustomError } from "../../utils/custom_errors/api.error";



export default {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email, password, } = req.body;
            const user = await authService.register(username, email, password);
            console.log("RES", user);
            return res.json({
                data: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                },
                status: 201
            });
        } catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ message: error.message });

            }
            next(error.message);
        }
    },

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const response = await authService.login(email, password);
            return res.json({
                data: {
                    id: response?.user?.id,
                    username: response?.user?.username,
                    email: response?.user?.email,
                    accessToken: response?.accessToken,
                    createdAt: response?.user?.createdAt
                },

                status: 200
            });
        } catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ message: error.message });

            }
            next(error.message);

        }
    }
}