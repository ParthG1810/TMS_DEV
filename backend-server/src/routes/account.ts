import { Router, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { users, JWT_SECRET, JWT_EXPIRES_IN } from '../_mock/_account';

const router = Router();

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = users.find((_user) => _user.email === email);

    if (!user) {
      return res.status(400).json({
        message: 'There is no user corresponding to the email address.',
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: 'Wrong password',
      });
    }

    const accessToken = sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      accessToken,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
});

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email = '', password, firstName, lastName } = req.body;

    const existUser = users.find((_user) => _user.email === email);

    if (existUser) {
      return res.status(400).json({
        message: 'There already exists an account with the given email address.',
      });
    }

    const user = {
      id: uuidv4(),
      displayName: `${firstName} ${lastName}`,
      email,
      password,
      photoURL: null,
      phoneNumber: null,
      country: null,
      address: null,
      state: null,
      city: null,
      zipCode: null,
      about: null,
      role: 'user',
      isPublic: true,
    };

    const accessToken = sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.status(200).json({ accessToken, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

// Get my account
router.get('/my-account', async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        message: 'Authorization token missing',
      });
    }

    const accessToken = `${authorization}`.split(' ')[1];

    const data = verify(accessToken, JWT_SECRET);

    const userId = typeof data === 'object' ? data?.userId : '';

    const user = users.find((_user) => _user.id === userId);

    if (!user) {
      return res.status(401).json({
        message: 'Invalid authorization token',
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

export default router;
