import express from 'express';
import { getChatResponse } from '../services/openAiService.js';
import Chat from '../models/Chat.js';
const router = express.Router();

// Route to get chat response and save to database
router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await getChatResponse(message);
    const chat = new Chat({
      userMessage: message,
      botResponse: response,
    });
    await chat.save();
    res.json({ userMessage: message, botResponse: response });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get response' });
  }
});

export default router;