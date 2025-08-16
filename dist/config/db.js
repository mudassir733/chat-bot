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
exports.connectToDb = exports.prisma = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const postgres_1 = __importDefault(require("postgres"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
exports.prisma = new client_1.PrismaClient();
const sql = (0, postgres_1.default)(`${process.env.DB_URI}`, {
    ssl: 'require'
});
const connectToDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.prisma.$connect();
        const result = yield sql `SELECT NOW()`;
        console.log('Connected to NeonDB! Server time:', result[0]);
    }
    catch (error) {
        console.error('Error connecting to NeonDB:', error.message);
    }
});
exports.connectToDb = connectToDb;
