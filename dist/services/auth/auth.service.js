"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../config/db");
const api_error_1 = require("../../utils/custom_errors/api.error");
const node_worker_threads_1 = require("node:worker_threads");
const jwt_1 = require("../../utils/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const node_path_1 = __importDefault(require("node:path"));
exports.default = {
    register(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email || !password) {
                    throw new api_error_1.ValidationError('Email and Password are required');
                }
                // existing user
                const existing_email = yield db_1.prisma.user.findFirst({
                    where: {
                        email: {
                            equals: email,
                            mode: 'insensitive'
                        }
                    }
                });
                if (existing_email) {
                    throw new api_error_1.ConflictError("User with this email already exist");
                }
                const hash = yield this.hashPasswordInWorker(password);
                console.log("Hash", hash);
                const user = yield db_1.prisma.user.create({
                    data: {
                        username: username,
                        email: email,
                        password: hash
                    }
                });
                return user;
            }
            catch (error) {
                throw new api_error_1.CustomError(error.message, error.statusCode);
            }
        });
    },
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield db_1.prisma.user.findFirst({
                    where: { email: email }
                });
                if (!user) {
                    throw new api_error_1.NotFoundError('User not found in this email');
                }
                const isMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!isMatch) {
                    throw new api_error_1.UnAuthorized('Invalid credentials');
                }
                const accessToken = (0, jwt_1.generateToken)(user.id, user.email);
                console.log("Access Token", accessToken);
                return {
                    user,
                    accessToken
                };
            }
            catch (error) {
                throw new api_error_1.CustomError(error.message, error.statusCode);
            }
        });
    },
    hashPasswordInWorker(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const workerPath = node_path_1.default.join(__dirname, '..', '..', 'workers', 'hash.worker.ts');
                const worker = new node_worker_threads_1.Worker(workerPath, {
                    workerData: { password, saltRounds: 10 },
                    execArgv: ['-r', 'ts-node/register']
                });
                worker.on('message', (result) => {
                    if (result === null || result === void 0 ? void 0 : result.error) {
                        reject(new Error(result.error));
                    }
                    else {
                        resolve(result);
                    }
                });
                worker.on('error', reject);
                worker.on('exit', (code) => {
                    if (code !== 0)
                        reject(new Error(`Worker stopped with exit code ${code}`));
                });
            });
        });
    }
};
