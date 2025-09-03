interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
  }
  
export const chatHistory: ChatMessage[] = [];
  