import { prisma } from "../../config/db";
import { ConflictError, CustomError, ValidationError, NotFoundError, UnAuthorized } from "../../utils/custom_errors/api.error";
import { Worker } from "node:worker_threads";
import { generateToken } from "../../utils/jwt";
import bcrypt from "bcrypt"
import path from "node:path";



export default {
    async register(username: string, email: string, password: string) {
        try {
            if (!email || !password) {
                throw new ValidationError('Email and Password are required');
            }

            // existing user
            const existing_email = await prisma.user.findFirst({
                where: {
                    email: {
                        equals: email,
                        mode: 'insensitive'
                    }
                }
            });

            if (existing_email) {
                throw new ConflictError("User with this email already exist");
            }
            const accessToken = generateToken(email);

            const hash = await this.hashPasswordInWorker(password);
            const user = await prisma.user.create({
                data: {
                    username: username,
                    email: email,
                    password: hash,
                    googleId: ''
                }
            });
            return {
                user,
                accessToken
            };
        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode);

        }

    },

    async login(email: string, password: string) {
        try {

            const user = await prisma.user.findFirst({
                where: { email: email }
            })
            if (!user) {
                throw new NotFoundError('User not found in this email');
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new UnAuthorized('Invalid credentials')
            }


            const accessToken = generateToken(user.email);

            return {
                user,
                accessToken
            }

        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode)

        }
    },

    async hashPasswordInWorker(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const workerPath = path.join(__dirname, '..', '..', 'workers', 'hash.worker.ts');

            const worker = new Worker(workerPath, {
                workerData: { password, saltRounds: 10 },
                execArgv: ['-r', 'ts-node/register']
            });

            worker.on('message', (result) => {
                if (result?.error) {
                    reject(new Error(result.error));
                } else {
                    resolve(result);

                }
            });

            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0)
                    reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
    },
}