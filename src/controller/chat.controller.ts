import { Request, Response } from "express";
import { chatService } from "../services/chat.service";

export const chatDeepSeekController = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        console.log("Message", message);
        if (!message) return res.status(400).json({ error: "Message is required" });

        const reply = await chatService(message);
        console.log("REPLY", reply);
        res.status(200).json({ reply });
    } catch (error: any) {
        console.error("Error chatting:", error.message);
        console.error("Full error:", error.response?.data || error);
        res.status(500).json({ error: error.message });

    }
}