import { Router } from 'express';
import { ClassroomModel } from '../../database/mongoose/ClassroomModel';

const router = Router();

// GET all classrooms
router.get('/', async (req, res) => {
  try {
    const aulas = await ClassroomModel.find({ activo: true });
    res.json({ success: true, data: aulas });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

export default router;
