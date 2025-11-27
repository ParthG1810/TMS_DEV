const { query } = require('../config/database');
const ApiResponse = require('../utils/response');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * @route   GET /api/products
 * @desc    Get all products with filters
 * @access  Public
 */
exports.getAllProducts = asyncHandler(async (req, res) => {
  const { category, gender, status, search, limit = 20, offset = 0 } = req.query;

  let sql = `
    SELECT
      p.*,
      (SELECT image_url FROM product_images WHERE product_id = p.id AND is_cover = TRUE LIMIT 1) as cover_image
    FROM products p
    WHERE 1=1
  `;
  const params = [];

  if (category) {
    sql += ' AND p.category = ?';
    params.push(category);
  }

  if (gender) {
    sql += ' AND p.gender = ?';
    params.push(gender);
  }

  if (status) {
    sql += ' AND p.status = ?';
    params.push(status);
  }

  if (search) {
    sql += ' AND (p.name LIKE ? OR p.description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  sql += ` ORDER BY p.created_at DESC LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`;

  const products = await query(sql, params);

  // Get total count
  let countSql = 'SELECT COUNT(*) as total FROM products p WHERE 1=1';
  const countParams = [];

  if (category) {
    countSql += ' AND p.category = ?';
    countParams.push(category);
  }

  if (gender) {
    countSql += ' AND p.gender = ?';
    countParams.push(gender);
  }

  if (status) {
    countSql += ' AND p.status = ?';
    countParams.push(status);
  }

  if (search) {
    countSql += ' AND (p.name LIKE ? OR p.description LIKE ?)';
    countParams.push(`%${search}%`, `%${search}%`);
  }

  const [{ total }] = await query(countSql, countParams);

  return ApiResponse.success(res, {
    products: products.map((p) => ({
      id: p.id,
      name: p.name,
      code: p.code,
      sku: p.sku,
      price: parseFloat(p.price),
      priceSale: p.price_sale ? parseFloat(p.price_sale) : null,
      cover: p.cover_image,
      status: p.status,
      inventoryType: p.inventory_type,
      available: p.available,
      sold: p.sold,
      category: p.category,
      gender: p.gender,
      totalRating: parseFloat(p.total_rating),
      totalReview: p.total_review,
    })),
    pagination: {
      total: parseInt(total),
      limit: parseInt(limit),
      offset: parseInt(offset),
      hasMore: parseInt(offset) + parseInt(limit) < parseInt(total),
    },
  }, 'Products fetched successfully');
});

/**
 * @route   GET /api/products/:id
 * @desc    Get single product with all details
 * @access  Public
 */
exports.getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Get product basic info
  const [product] = await query('SELECT * FROM products WHERE id = ?', [id]);

  if (!product) {
    return ApiResponse.notFound(res, 'Product not found');
  }

  // Get images
  const images = await query(
    'SELECT image_url, is_cover, sort_order FROM product_images WHERE product_id = ? ORDER BY sort_order',
    [id]
  );

  // Get tags
  const tags = await query('SELECT tag FROM product_tags WHERE product_id = ?', [id]);

  // Get sizes
  const sizes = await query('SELECT size FROM product_sizes WHERE product_id = ?', [id]);

  // Get colors
  const colors = await query(
    'SELECT color_name, color_hex FROM product_colors WHERE product_id = ?',
    [id]
  );

  // Get reviews
  const reviews = await query(
    'SELECT * FROM product_reviews WHERE product_id = ? ORDER BY posted_at DESC LIMIT 10',
    [id]
  );

  return ApiResponse.success(res, {
    id: product.id,
    name: product.name,
    code: product.code,
    sku: product.sku,
    price: parseFloat(product.price),
    priceSale: product.price_sale ? parseFloat(product.price_sale) : null,
    description: product.description,
    status: product.status,
    inventoryType: product.inventory_type,
    available: product.available,
    sold: product.sold,
    totalRating: parseFloat(product.total_rating),
    totalReview: product.total_review,
    category: product.category,
    gender: product.gender,
    cover: images.find((img) => img.is_cover)?.image_url || images[0]?.image_url,
    images: images.map((img) => img.image_url),
    tags: tags.map((t) => t.tag),
    sizes: sizes.map((s) => s.size),
    colors: colors.map((c) => c.color_hex),
    reviews: reviews.map((r) => ({
      id: r.id,
      name: r.user_name,
      avatarUrl: r.avatar_url,
      comment: r.comment,
      rating: r.rating,
      isPurchased: r.is_purchased,
      helpful: r.helpful,
      postedAt: r.posted_at,
    })),
  }, 'Product fetched successfully');
});

/**
 * @route   GET /api/products/search
 * @desc    Search products
 * @access  Public
 */
exports.searchProducts = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return ApiResponse.badRequest(res, 'Search query is required');
  }

  const products = await query(
    `SELECT
      p.id, p.name, p.code, p.price, p.price_sale, p.category,
      (SELECT image_url FROM product_images WHERE product_id = p.id AND is_cover = TRUE LIMIT 1) as cover_image
    FROM products p
    WHERE p.name LIKE ? OR p.description LIKE ? OR p.code LIKE ?
    LIMIT 20`,
    [`%${q}%`, `%${q}%`, `%${q}%`]
  );

  return ApiResponse.success(res, {
    results: products.map((p) => ({
      id: p.id,
      name: p.name,
      code: p.code,
      price: parseFloat(p.price),
      priceSale: p.price_sale ? parseFloat(p.price_sale) : null,
      cover: p.cover_image,
      category: p.category,
    })),
  }, 'Search completed successfully');
});
