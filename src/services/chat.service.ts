import { chatHistory } from '../models/chat.model';
import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const chatService = async (userMessage: string) => {

  chatHistory.push({ role: 'user', content: userMessage });

  const response = await genAI.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: userMessage,
  });

  const text = response.text ?? '';

  chatHistory.push({ role: 'assistant', content: text });

  return text;
};
