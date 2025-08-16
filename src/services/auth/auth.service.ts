import { prisma } from "../../config/db";
import { ConflictError, CustomError, ValidationError } from "../../utils/custom_errors/api.error";
import { Worker } from "node:worker_threads";
import path from "node:path";



export default {
    async register(username: string, email: string, password: string) {
        try {
            if (!email || !password) {
                throw new ValidationError('Email and Password are required');
            }

            // existing user
            const existing_User = await prisma.user.findMany({
                where: { email: email }
            });
            console.log("Existing", existing_User);

            if (existing_User) {
                throw new ConflictError("User with this email already exist");
            }

            const hash = await this.hashPasswordInWorker(password);
            console.log("Hash", hash)
            const user = await prisma.user.create({
                data: {
                    username: username,
                    email: email,
                    password: hash
                }
            });
            return user;
        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode);

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
    }
}