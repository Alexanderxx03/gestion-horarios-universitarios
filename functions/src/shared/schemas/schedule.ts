import { z } from 'zod';

export const GenerateScheduleSchema = z.object({
  periodId: z.string().min(1, 'El período académico es requerido'),
});

export type GenerateScheduleInput = z.infer<typeof GenerateScheduleSchema>;
