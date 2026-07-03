import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UsuarioModel } from '../../database/mongoose/UserModel';
import passport from '../passport';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-in-production';

// Endpoint para iniciar sesión con usuarios reales de MongoDB
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'El correo y la contraseña son requeridos.' });
      return;
    }

    const user = await UsuarioModel.findOne({ correo: email });
    if (!user) {
      res.status(401).json({ error: 'Credenciales inválidas.' });
      return;
    }

    if (!user.activo) {
      res.status(403).json({ error: 'Esta cuenta ha sido desactivada.' });
      return;
    }

    if (!user.hashContrasena) {
      res.status(401).json({ error: 'Usa Google para iniciar sesión con esta cuenta.' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.hashContrasena);
    if (!isMatch) {
      res.status(401).json({ error: 'Credenciales inválidas.' });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      { uid: user._id.toString(), email: user.correo, role: user.rol },
      JWT_SECRET,
      { expiresIn: '24h' },
    );

    res.json({ token, user: { uid: user._id.toString(), email: user.correo, role: user.rol } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error interno del servidor al iniciar sesión.' });
  }
});

// Endpoint para registrar nuevos usuarios en MongoDB
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, nombreCompleto, role } = req.body;

    if (!email || !password || !nombreCompleto) {
      res.status(400).json({ error: 'El correo, contraseña y nombre completo son requeridos.' });
      return;
    }

    const existingUser = await UsuarioModel.findOne({ correo: email });
    if (existingUser) {
      res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
      return;
    }

    const hashContrasena = await bcrypt.hash(password, 10);
    const newUser = new UsuarioModel({
      correo: email,
      hashContrasena,
      nombreCompleto,
      rol: role || 'STUDENT',
      activo: true,
    });
    await newUser.save();

    const token = jwt.sign(
      { uid: newUser._id.toString(), email: newUser.correo, role: newUser.rol },
      JWT_SECRET,
      { expiresIn: '24h' },
    );

    res.status(201).json({
      token,
      user: { uid: newUser._id.toString(), email: newUser.correo, role: newUser.rol },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Error interno del servidor al registrar usuario.' });
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

// ==========================================
// RUTAS OAUTH2 (GOOGLE) - SERVER SIDE FLOW
// ==========================================

// 1. Redirige a la pantalla de consentimiento de Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// 2. Callback desde Google
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:5173/login?error=oauth2_failed' }),
  (req: Request, res: Response) => {
    try {
      const user = req.user as any;
      if (!user) {
        res.redirect('http://localhost:5173/login?error=oauth2_failed');
        return;
      }

      // Generate JWT
      const token = jwt.sign(
        { uid: user._id.toString(), email: user.correo, role: user.rol },
        JWT_SECRET,
        { expiresIn: '24h' },
      );

      // Redirigir al frontend pasándole el token por la URL (estilo SPA callback)
      res.redirect(`http://localhost:5173/auth/callback?token=${token}`);
    } catch (error) {
      console.error('Google Callback Error:', error);
      res.redirect('http://localhost:5173/login?error=oauth2_failed');
    }
  }
);

export default router;
