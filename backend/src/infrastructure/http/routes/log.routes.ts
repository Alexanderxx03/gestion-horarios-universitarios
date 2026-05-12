import { Router, Request, Response } from 'express';
import LogModel from '../../database/mongoose/models/LogModel';

const router = Router();

// Endpoint para guardar logs
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { executionId, step, message, timestamp, data } = req.body;

    if (!executionId || step === undefined || !message) {
      res.status(400).json({ error: 'Faltan campos requeridos: executionId, step, message' });
      return;
    }

    const logEntry = new LogModel({
      executionId,
      step,
      message,
      timestamp: timestamp || new Date(),
      data,
    });

    await logEntry.save();
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error saving log:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para obtener logs de una ejecución específica
router.get('/:executionId', async (req: Request, res: Response): Promise<void> => {
  try {
    const logs = await LogModel.find({ executionId: req.params.executionId }).sort({ step: 1 });
    res.json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
