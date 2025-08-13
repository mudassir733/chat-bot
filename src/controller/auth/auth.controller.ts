import { Request, Response, NextFunction } from "express";
import authService from "../../services/auth/auth.service";
import createError from "http-errors"


export default {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, username } = req.body;
            const response = await authService.register(email, password, username);
            return res.json({
                data: {
                    username: response.username,
                    email: response.email
                },
                status: 201
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}