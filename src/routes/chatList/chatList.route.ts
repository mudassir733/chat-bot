import chatListController from '../../controller/chatList/chatList.controller';
import { Router } from 'express';


const chatListRouter = Router();

chatListRouter.post('/create-chat/:id', chatListController.createChatList);
chatListRouter.get('/create-chat/:id', chatListController.getChatList);


export default chatListRouter;