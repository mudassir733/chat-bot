import { prisma } from "../../config/db";
import becrypt from "bcrypt";
import { CustomError } from "../../utils/custom_errors/api.error";



export default {
    async register(username: string, email: string, password: string) {
        try {
            if (!email || !password) {
                throw new Error('Email and Password are required');
            }
            const saltRound = 10;
            const salt = await becrypt.genSalt(saltRound);
            let passwordHash = await becrypt.hash(password, salt);

            const user = await prisma.user.create({
                data: {
                    username: username,
                    email: email,
                    password: passwordHash
                }
            });
            return user;
        } catch (error: any) {
            throw new CustomError(error.message, 400);

        }

    }
}