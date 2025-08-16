"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = __importDefault(require("../../controller/auth/auth.controller"));
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
authRouter.post('/register', auth_controller_1.default.register);
exports.default = authRouter;
