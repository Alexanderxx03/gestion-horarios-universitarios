import { Router } from 'express';
import { EnrollmentModel } from '../../database/mongoose/EnrollmentModel';

const router = Router();

// GET all enrollments
router.get('/', async (req, res) => {
  try {
    const enrollments = await EnrollmentModel.find()
      .populate('cursosSeleccionados.cursoId')
      .populate('estudianteId', 'nombreCompleto correo')
      .lean();
    res.json({ success: true, data: enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// POST new enrollment
router.post('/', async (req, res) => {
  try {
    const newEnrollment = new EnrollmentModel(req.body);
    await newEnrollment.save();
    res.status(201).json({ success: true, data: newEnrollment });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Bad Request' });
  }
});

export default router;

// touch