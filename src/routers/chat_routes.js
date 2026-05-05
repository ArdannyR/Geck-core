import { Router } from 'express';
import { verifyAuth } from '../middlewares/auth.js';
import {
  accessChat,
  createGroupChat,
  fetchChats,
  sendMessage,
  fetchMessages,
  editMessage,
  deleteMessage,
  sendAudioMessage
} from '../controllers/chat_controller.js';

const router = Router();
router.use(verifyAuth);

router.post('/access', accessChat);
router.post('/group', createGroupChat);
router.get('/chat', fetchChats);
router.post('/message', sendMessage);
router.put('/message/:messageId', editMessage);
router.delete('/message/:messageId', deleteMessage);
router.get('/:chatId/chat', fetchMessages);
router.post('/chat/audio', sendAudioMessage);

export default router;
