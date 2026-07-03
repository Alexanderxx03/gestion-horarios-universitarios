import { Router } from 'express';
import { CareerModel } from '../../database/mongoose/CareerModel';
import { CourseModel } from '../../database/mongoose/CourseModel';
import { StudentModel } from '../../database/mongoose/StudentModel';

const router = Router();

// GET /api/careers - List all careers
router.get('/', async (req, res) => {
  try {
    const careers = await CareerModel.find().sort({ nombre: 1 });
    res.json({ success: true, data: careers });
  } catch (error) {
    console.error('Error fetching careers:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/careers/:id/stats - Get stats for a career
router.get('/:id/stats', async (req, res) => {
  try {
    const carreraId = req.params.id;
    const totalCursos = await CourseModel.countDocuments({ carreraId });
    const totalEstudiantes = await StudentModel.countDocuments({ carreraId });
    
    res.json({ 
      success: true, 
      data: {
        totalCursos,
        totalEstudiantes
      }
    });
  } catch (error) {
    console.error('Error fetching career stats:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export const careerRoutes = router;
