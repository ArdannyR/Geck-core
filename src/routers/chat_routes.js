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
  sendAudioMessage,
  sendFileMessage,
  markChatAsRead
} from '../controllers/chat_controller.js';

const router = Router();
router.use(verifyAuth);

router.post('/access', accessChat);
router.post('/group', createGroupChat);
router.get('/chat', fetchChats);
router.post('/chat/file', sendFileMessage);
router.post('/chat/audio', sendAudioMessage);
router.post('/message', sendMessage);
router.put('/message/:messageId', editMessage);
router.delete('/message/:messageId', deleteMessage);
router.get('/:chatId/chat', fetchMessages);
router.patch('/:chatId/read', markChatAsRead);


export default router;
