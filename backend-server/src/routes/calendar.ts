import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Mock events storage
let events: any[] = [];

// Get all events
router.get('/events', async (req: Request, res: Response) => {
  res.status(200).json({ events });
});

// Create new event
router.post('/events/new', async (req: Request, res: Response) => {
  try {
    const event = {
      id: uuidv4(),
      ...req.body,
    };
    events.push(event);
    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update event
router.post('/events/update', async (req: Request, res: Response) => {
  try {
    const { eventId } = req.body;
    const index = events.findIndex((e) => e.id === eventId);

    if (index === -1) {
      return res.status(404).json({ message: 'Event not found' });
    }

    events[index] = { ...events[index], ...req.body };
    res.status(200).json({ event: events[index] });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete event
router.post('/events/delete', async (req: Request, res: Response) => {
  try {
    const { eventId } = req.body;
    events = events.filter((e) => e.id !== eventId);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
