import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = Router();

// Mock User para demostración. En un sistema real esto vendría de MongoDB.
const MOCK_USER = {
  id: 'user_123',
  email: 'admin@unihorarios.edu',
  passwordHash: bcrypt.hashSync('admin123', 10), // la contraseña es admin123
  role: 'ADMIN',
};

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-in-production';

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    if (email !== MOCK_USER.email) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, MOCK_USER.passwordHash);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      { uid: MOCK_USER.id, email: MOCK_USER.email, role: MOCK_USER.role },
      JWT_SECRET,
      { expiresIn: '24h' },
    );

    res.json({ token, user: { uid: MOCK_USER.id, email: MOCK_USER.email, role: MOCK_USER.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/me', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    res.json({ user: decoded });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
