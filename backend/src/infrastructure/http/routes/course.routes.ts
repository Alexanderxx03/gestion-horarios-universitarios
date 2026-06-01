import { Router } from 'express';
import { CourseModel } from '../../database/mongoose/CourseModel';

const router = Router();

// GET all courses with optional pagination and projection
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 30;
    const skip = (page - 1) * limit;

    // Si all=true, no paginamos (útil para cargar catálogos completos si se requiere)
    if (req.query.all === 'true') {
      const query: any = {};
      if (req.query.activo === 'true') {
        query.activo = true;
      }
      const cursos = await CourseModel.find(query).lean();
      res.json({ success: true, data: cursos });
      return;
    }

    const query: any = {};
    if (req.query.activo === 'true') {
      query.activo = true;
    }

    // Proyectamos solo las columnas necesarias para el listado para ahorrar ancho de banda
    const cursos = await CourseModel.find(query)
      .select(
        'codigo nombre creditos horasSemanales capacidadMaxima semestre requiereLaboratorio activo',
      )
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await CourseModel.countDocuments(query);

    res.json({
      success: true,
      data: cursos,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// POST new course
router.post('/', async (req, res) => {
  try {
    const newCourse = new CourseModel(req.body);
    await newCourse.save();
    res.status(201).json({ success: true, data: newCourse });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Bad Request' });
  }
});

export default router;
