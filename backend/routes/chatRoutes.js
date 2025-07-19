import express from 'express';
import { chatController } from '../Controllers/chatController.js';

const router = express.Router();

// POST /chat route
router.post('/chat', chatController);

export default router;
