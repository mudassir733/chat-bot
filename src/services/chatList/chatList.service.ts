import { prisma } from '../../config/db';
import { NotFoundError, ValidationError, CustomError } from '../../utils/custom_errors/api.error';

export default {
  async createChatList(userId: string) {

    try {
      if (!userId) {
        throw new ValidationError('User id is missing');
      }
      const user = await prisma.user.findFirst({
        select: {
          id: true,
          username: true
        }
      });
      if (!user) {
        throw new NotFoundError('User not found!');

      }
      const chat = await prisma.chatList.create({
        data: {
          userId: user?.id,
          username: user?.username,
          updatedAt: new Date()
        }
      });
      return chat;
    } catch (error: unknown) {
      const err = error as CustomError;
      throw new CustomError(err.message, err.statusCode);

    }

  },
  async getChatList(userId: string) {
    try {
      if (!userId) {
        throw new ValidationError('User id is missing!');
      }

      const user = await prisma.user.findFirst({
        select: {
          id: true,
          username: true
        }
      });
      if (!user) {
        throw new NotFoundError('User not found!');

      }

      const chat = await prisma.chatList.findMany({
        where: {
          userId: user?.id,
          username: user?.username
        }
      });

      return chat;
    } catch (error: unknown) {
      const err = error as CustomError;
      throw new CustomError(err.message, err.statusCode);
    }

  }
};