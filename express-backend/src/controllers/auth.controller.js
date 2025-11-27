const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { query } = require('../config/database');
const config = require('../config/env');
const ApiResponse = require('../utils/response');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * Generate JWT Token
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 * @access  Public
 */
exports.register = asyncHandler(async (req, res) => {
  const { email, password, displayName } = req.body;

  // Check if user already exists
  const existingUser = await query('SELECT id FROM users WHERE email = ?', [email]);

  if (existingUser.length > 0) {
    return ApiResponse.conflict(res, 'User with this email already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user
  const userId = uuidv4();
  await query(
    'INSERT INTO users (id, display_name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
    [userId, displayName || email.split('@')[0], email, passwordHash, 'user']
  );

  // Fetch created user
  const [user] = await query(
    'SELECT id, display_name, email, role, is_public, created_at FROM users WHERE id = ?',
    [userId]
  );

  // Generate token
  const token = generateToken(user);

  return ApiResponse.created(res, {
    user: {
      id: user.id,
      displayName: user.display_name,
      email: user.email,
      role: user.role,
      isPublic: user.is_public,
    },
    token,
  }, 'User registered successfully');
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const [user] = await query('SELECT * FROM users WHERE email = ?', [email]);

  if (!user) {
    return ApiResponse.unauthorized(res, 'Invalid email or password');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    return ApiResponse.unauthorized(res, 'Invalid email or password');
  }

  // Generate token
  const token = generateToken(user);

  return ApiResponse.success(res, {
    user: {
      id: user.id,
      displayName: user.display_name,
      email: user.email,
      photoURL: user.photo_url,
      phoneNumber: user.phone_number,
      country: user.country,
      address: user.address,
      state: user.state,
      city: user.city,
      zipCode: user.zip_code,
      about: user.about,
      role: user.role,
      isPublic: user.is_public,
    },
    token,
  }, 'Login successful');
});

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
exports.getProfile = asyncHandler(async (req, res) => {
  const [user] = await query('SELECT * FROM users WHERE id = ?', [req.user.id]);

  if (!user) {
    return ApiResponse.notFound(res, 'User not found');
  }

  return ApiResponse.success(res, {
    id: user.id,
    displayName: user.display_name,
    email: user.email,
    photoURL: user.photo_url,
    phoneNumber: user.phone_number,
    country: user.country,
    address: user.address,
    state: user.state,
    city: user.city,
    zipCode: user.zip_code,
    about: user.about,
    role: user.role,
    isPublic: user.is_public,
  }, 'Profile fetched successfully');
});

/**
 * @route   PUT /api/auth/me
 * @desc    Update current user profile
 * @access  Private
 */
exports.updateProfile = asyncHandler(async (req, res) => {
  const {
    displayName,
    photoURL,
    phoneNumber,
    country,
    address,
    state,
    city,
    zipCode,
    about,
    isPublic,
  } = req.body;

  await query(
    `UPDATE users SET
      display_name = COALESCE(?, display_name),
      photo_url = COALESCE(?, photo_url),
      phone_number = COALESCE(?, phone_number),
      country = COALESCE(?, country),
      address = COALESCE(?, address),
      state = COALESCE(?, state),
      city = COALESCE(?, city),
      zip_code = COALESCE(?, zip_code),
      about = COALESCE(?, about),
      is_public = COALESCE(?, is_public)
    WHERE id = ?`,
    [displayName, photoURL, phoneNumber, country, address, state, city, zipCode, about, isPublic, req.user.id]
  );

  const [updatedUser] = await query('SELECT * FROM users WHERE id = ?', [req.user.id]);

  return ApiResponse.success(res, {
    id: updatedUser.id,
    displayName: updatedUser.display_name,
    email: updatedUser.email,
    photoURL: updatedUser.photo_url,
    phoneNumber: updatedUser.phone_number,
    country: updatedUser.country,
    address: updatedUser.address,
    state: updatedUser.state,
    city: updatedUser.city,
    zipCode: updatedUser.zip_code,
    about: updatedUser.about,
    role: updatedUser.role,
    isPublic: updatedUser.is_public,
  }, 'Profile updated successfully');
});
