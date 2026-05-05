import { Router } from 'express';

const router = Router();

// Endpoint simulado para generar horario usando el CSP
router.post('/generate', async (req, res) => {
  try {
    const { periodId } = req.body;

    // Aquí iría la llamada al caso de uso de dominio
    // const result = await generateScheduleUseCase(periodId, ...);

    res.status(200).json({
      success: true,
      data: {
        scheduleId: 'simulated-id',
        assignmentCount: 45,
        generationTimeMs: 1200,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error generando horario' });
  }
});

export default router;
