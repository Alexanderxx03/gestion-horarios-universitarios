import { z } from 'zod';

const TimeSlotSchema = z.object({
  dayOfWeek: z.number().int().min(1, 'Día inválido').max(6, 'Día inválido'),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Formato de hora inválido (HH:mm)'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Formato de hora inválido (HH:mm)'),
});

export const TeacherSchema = z.object({
  userId: z.string().min(1, 'El ID de usuario es requerido'),
  employeeCode: z.string().min(1, 'El código de empleado es requerido'),
  department: z.string().min(1, 'El departamento es requerido'),
  maxHoursPerWeek: z.number().int().min(1).max(40),
  availability: z.array(TimeSlotSchema).min(1, 'Debe tener al menos una franja de disponibilidad'),
  qualifiedCourses: z.array(z.string()).default([]),
});

export const CreateTeacherSchema = TeacherSchema;
export const UpdateTeacherSchema = TeacherSchema.partial();

export type CreateTeacherInput = z.infer<typeof CreateTeacherSchema>;
export type UpdateTeacherInput = z.infer<typeof UpdateTeacherSchema>;
