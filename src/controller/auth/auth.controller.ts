import { Request, Response, NextFunction } from "express";
import authService from "../../services/auth/auth.service";
import { CustomError } from "../../utils/custom_errors/api.error";



export default {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, username } = req.body;
            const response = await authService.register(email, password, username);
            return res.json({
                data: {
                    id: response.id,
                    email: response.email,
                    username: response.username
                },
                status: 201
            });
        } catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ message: error.message });

            }
            res.status(500).json({ message: "internal server error" });
        }
    }
}