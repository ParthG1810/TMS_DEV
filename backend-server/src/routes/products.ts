import { Router, Request, Response } from 'express';
import { products } from '../_mock/_products';

const router = Router();

// Get all products
router.get('/', async (req: Request, res: Response) => {
  res.status(200).json({ products });
});

// Get single product
router.get('/product', async (req: Request, res: Response) => {
  const { name } = req.query;
  const product = products.find((p) => p.name === name);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json({ product });
});

// Search products
router.get('/search', async (req: Request, res: Response) => {
  const { query } = req.query;
  const searchQuery = (query as string || '').toLowerCase();

  const results = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery) ||
    product.description?.toLowerCase().includes(searchQuery)
  );

  res.status(200).json({ results });
});

export default router;
