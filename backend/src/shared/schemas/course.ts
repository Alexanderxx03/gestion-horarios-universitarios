import { z } from 'zod';

export const CourseSchema = z.object({
  code: z.string().min(1, 'El código del curso es requerido'),
  name: z.string().min(1, 'El nombre del curso es requerido'),
  credits: z.number().int().min(1, 'Los créditos deben ser al menos 1').max(10),
  weeklyHours: z.number().int().min(1).max(20),
  requiresLab: z.boolean(),
  prerequisites: z.array(z.string()).default([]),
  maxCapacity: z.number().int().min(1, 'La capacidad debe ser al menos 1').max(200),
  isActive: z.boolean().default(true),
  careerId: z.string().min(1, 'La carrera es requerida'),
  semester: z.number().int().min(1).max(12),
});

export const CreateCourseSchema = CourseSchema;
export const UpdateCourseSchema = CourseSchema.partial();

export type CreateCourseInput = z.infer<typeof CreateCourseSchema>;
export type UpdateCourseInput = z.infer<typeof UpdateCourseSchema>;
