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
exports.chatDeepSeekController = void 0;
const chat_service_1 = require("../services/chat.service");
const chatDeepSeekController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { message } = req.body;
        console.log("Message", message);
        if (!message)
            return res.status(400).json({ error: "Message is required" });
        const reply = yield (0, chat_service_1.chatService)(message);
        console.log("REPLY", reply);
        res.status(200).json({ reply });
    }
    catch (error) {
        console.error("Error chatting:", error.message);
        console.error("Full error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error);
        res.status(500).json({ error: error.message });
    }
});
exports.chatDeepSeekController = chatDeepSeekController;
