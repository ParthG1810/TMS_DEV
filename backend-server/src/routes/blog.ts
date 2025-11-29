import { Router, Request, Response } from 'express';
import { posts } from '../_mock/_blog';

const router = Router();

// Get all posts
router.get('/posts', async (req: Request, res: Response) => {
  res.status(200).json({ posts });
});

// Get recent posts
router.get('/posts/recent', async (req: Request, res: Response) => {
  const recentPosts = posts.slice(0, 5);
  res.status(200).json({ posts: recentPosts });
});

// Search posts
router.get('/posts/search', async (req: Request, res: Response) => {
  const { query } = req.query;
  const searchQuery = (query as string || '').toLowerCase();

  const results = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery) ||
    post.description?.toLowerCase().includes(searchQuery)
  );

  res.status(200).json({ results });
});

// Get single post
router.get('/post', async (req: Request, res: Response) => {
  const { title } = req.query;
  const post = posts.find((p) => p.title === title);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.status(200).json({ post });
});

export default router;
