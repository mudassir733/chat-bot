"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkerPath = getWorkerPath;
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = path_1.default.dirname(__filename);
function getWorkerPath(workerFileName) {
    // Agar hum dist folder me hain (build ke baad)
    if (__dirname.includes('dist')) {
        return path_1.default.resolve(__dirname, '../workers', workerFileName.replace('.ts', '.js'));
    }
    // Agar hum src folder me hain (development mode)
    return path_1.default.resolve(__dirname, '../workers', workerFileName);
}
