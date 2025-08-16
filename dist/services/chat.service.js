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
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatService = void 0;
const chat_model_1 = require("../models/chat.model");
const genai_1 = require("@google/genai");
const genAI = new genai_1.GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});
const chatService = (userMessage) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    chat_model_1.chatHistory.push({ role: "user", content: userMessage });
    const response = yield genAI.models.generateContent({
        model: "gemini-1.5-flash",
        contents: userMessage,
    });
    const text = (_a = response.text) !== null && _a !== void 0 ? _a : "";
    chat_model_1.chatHistory.push({ role: "assistant", content: text });
    return text;
});
exports.chatService = chatService;
