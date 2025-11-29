import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { board } from '../_mock/_kanban';

const router = Router();

// Get board
router.get('/board', async (req: Request, res: Response) => {
  res.status(200).json({ board });
});

// Create new column
router.post('/columns/new', async (req: Request, res: Response) => {
  try {
    const column = {
      id: uuidv4(),
      ...req.body,
    };
    board.columns.push(column);
    res.status(200).json({ column });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update column
router.post('/columns/update', async (req: Request, res: Response) => {
  try {
    const { columnId } = req.body;
    const index = board.columns.findIndex((c: any) => c.id === columnId);

    if (index === -1) {
      return res.status(404).json({ message: 'Column not found' });
    }

    board.columns[index] = { ...board.columns[index], ...req.body };
    res.status(200).json({ column: board.columns[index] });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete column
router.post('/columns/delete', async (req: Request, res: Response) => {
  try {
    const { columnId } = req.body;
    board.columns = board.columns.filter((c: any) => c.id !== columnId);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
