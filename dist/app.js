"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
// routers
const chat_route_1 = __importDefault(require("./routes/chat.route"));
const auth_route_1 = __importDefault(require("./routes/auth/auth.route"));
const app = (0, express_1.default)();
exports.app = app;
// cors
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", 'PUT', 'DELETE']
}));
app.use(express_1.default.json());
app.use('/api', chat_route_1.default);
app.use('/auth', auth_route_1.default);
