import { Router } from 'express';
import { TeacherModel } from '../../database/mongoose/TeacherModel';

const router = Router();

// GET all teachers
router.get('/', async (req, res) => {
  try {
    const docentes = await TeacherModel.find({ activo: true }).populate('usuarioId');
    res.json({ success: true, data: docentes });
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

export default router;
