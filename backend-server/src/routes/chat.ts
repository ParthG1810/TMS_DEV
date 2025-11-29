import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { contacts, conversations } from '../_mock/_chat';

const router = Router();

// Get conversations
router.get('/conversations', async (req: Request, res: Response) => {
  res.status(200).json({ conversations });
});

// Get single conversation
router.get('/conversation', async (req: Request, res: Response) => {
  const { conversationKey } = req.query;
  const conversation = conversations.find((c) => c.id === conversationKey);

  if (!conversation) {
    return res.status(404).json({ message: 'Conversation not found' });
  }

  res.status(200).json({ conversation });
});

// Mark as seen
router.post('/conversation/mark-as-seen', async (req: Request, res: Response) => {
  const { conversationId } = req.body;
  const conversation = conversations.find((c) => c.id === conversationId);

  if (!conversation) {
    return res.status(404).json({ message: 'Conversation not found' });
  }

  // Mark as seen logic here
  res.status(200).json({ success: true });
});

// Get contacts
router.get('/contacts', async (req: Request, res: Response) => {
  res.status(200).json({ contacts });
});

// Get participants
router.get('/participants', async (req: Request, res: Response) => {
  const { conversationKey } = req.query;
  // Return participants for conversation
  res.status(200).json({ participants: contacts });
});

// Search
router.get('/search', async (req: Request, res: Response) => {
  const { query } = req.query;
  const searchQuery = (query as string || '').toLowerCase();

  const results = contacts.filter((contact) =>
    contact.name?.toLowerCase().includes(searchQuery)
  );

  res.status(200).json({ results });
});

// Send new message
router.post('/messages/new', async (req: Request, res: Response) => {
  const { conversationId, message } = req.body;

  const newMessage = {
    id: uuidv4(),
    conversationId,
    ...message,
    createdAt: new Date().toISOString(),
  };

  res.status(200).json({ message: newMessage });
});

export default router;
