import { Router, Request, Response } from 'express';
import { labels, mails } from '../_mock/_mail';

const router = Router();

// Get all mails
router.get('/mails', async (req: Request, res: Response) => {
  res.status(200).json({ mails });
});

// Get single mail
router.get('/mail', async (req: Request, res: Response) => {
  const { mailId } = req.query;
  const mail = mails.find((m) => m.id === mailId);

  if (!mail) {
    return res.status(404).json({ message: 'Mail not found' });
  }

  res.status(200).json({ mail });
});

// Get labels
router.get('/labels', async (req: Request, res: Response) => {
  res.status(200).json({ labels });
});

export default router;
