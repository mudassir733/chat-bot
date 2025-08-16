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
const auth_service_1 = __importDefault(require("../../services/auth/auth.service"));
const api_error_1 = require("../../utils/custom_errors/api.error");
exports.default = {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, username } = req.body;
                const response = yield auth_service_1.default.register(email, password, username);
                return res.json({
                    data: {
                        id: response.id,
                        email: response.email,
                        username: response.username
                    },
                    status: 201
                });
            }
            catch (error) {
                if (error instanceof api_error_1.CustomError) {
                    res.status(error.statusCode).json({ message: error.message });
                }
                console.error('Unexpected error:', error);
                res.status(500).json({ message: "internal server error" });
            }
        });
    }
};
