import { chatDeepSeekController } from '../controller/chat.controller';
import { Router } from 'express';

const router = Router();

router.post('/chat', chatDeepSeekController);

export default router;