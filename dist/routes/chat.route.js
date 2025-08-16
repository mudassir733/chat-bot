"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_controller_1 = require("../controller/chat.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/chat", chat_controller_1.chatDeepSeekController);
exports.default = router;
