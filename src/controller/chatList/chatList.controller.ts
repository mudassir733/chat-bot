import { Request, Response, NextFunction } from 'express';
import chatListService from '../../services/chatList/chatList.service';
import { CustomError } from '../../utils/custom_errors/api.error';

export default {
  async createChatList(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const data = await chatListService.createChatList(userId);
      return res.json({
        data,
        status: 201
      });
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });

      }
      const err = error as CustomError;
      next(err.message);

    }

  },

  async getChatList(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const data = await chatListService.getChatList(userId);
      return res.json({
        data,
        status: 200,
        message: 'Chat list fetch successfully'
      });
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });

      }
      const err = error as CustomError;
      next(err.message);
    }
  }
};