import { Request, Response } from 'express';
import { chatService } from '../services/chat.service';
import { CustomError } from '../utils/custom_errors/api.error';

export const chatDeepSeekController = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    console.log('Message', message);
    if (!message) return res.status(400).json({ error: 'Message is required' });

    const reply = await chatService(message);
    console.log('REPLY', reply);
    res.status(200).json({ reply });
  } catch (error: unknown) {
    const err = error as CustomError;
    res.status(500).json({ error: err.message });

  }
};