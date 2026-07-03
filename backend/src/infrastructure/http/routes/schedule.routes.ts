import { Router, Request, Response } from 'express';
import { generateSchedule } from '../../../application/usecases/generateSchedule';
import { MongooseCourseRepository } from '../../database/mongoose/repositories/MongooseCourseRepository';
import { MongooseTeacherRepository } from '../../database/mongoose/repositories/MongooseTeacherRepository';
import { MongooseClassroomRepository } from '../../database/mongoose/repositories/MongooseClassroomRepository';
import { MongooseScheduleRepository } from '../../database/mongoose/repositories/MongooseScheduleRepository';
import { MongooseAcademicPeriodRepository } from '../../database/mongoose/repositories/MongooseAcademicPeriodRepository';

const router = Router();

// Endpoint para generar horario usando el solver CSP en el backend MERN y MongoDB
router.post('/generate', async (req: Request, res: Response): Promise<void> => {
  try {
    const { periodId, carreraId, ciclo } = req.body;

    if (!periodId) {
      res.status(400).json({ success: false, message: 'El campo periodId es requerido.' });
      return;
    }

    console.log(`🤖 Iniciando generación de horarios para el período: ${periodId}`);

    const courses = new MongooseCourseRepository();
    const teachers = new MongooseTeacherRepository();
    const classrooms = new MongooseClassroomRepository();
    const schedules = new MongooseScheduleRepository();
    const periods = new MongooseAcademicPeriodRepository();

    const result = await generateSchedule(
      { periodId, carreraId, ciclo },
      { courses, teachers, classrooms, schedules, periods },
    );

    console.log(
      `✅ Horario generado con éxito: ${result.scheduleId} (${result.assignmentCount} asignaciones)`,
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('❌ Error ejecutando el motor CSP en el servidor MongoDB:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error interno al generar el horario mediante el motor CSP.',
    });
  }
});

// Endpoint para obtener el detalle de un horario y sus asignaciones
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const scheduleRepo = new MongooseScheduleRepository();
    const schedule = await scheduleRepo.findById(req.params.id);

    if (!schedule) {
      res.status(404).json({ success: false, message: 'Horario no encontrado.' });
      return;
    }

    res.status(200).json({
      success: true,
      data: schedule,
    });
  } catch (error: any) {
    console.error('Error recuperando detalles de horario:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al recuperar el horario.',
    });
  }
});

export default router;
