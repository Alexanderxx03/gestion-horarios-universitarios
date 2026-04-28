import { z } from 'zod';

export const ClassroomSchema = z.object({
  name: z.string().min(1, 'El nombre del aula es requerido'),
  building: z.string().min(1, 'El edificio es requerido'),
  floor: z.number().int().min(0).max(20),
  capacity: z.number().int().min(1, 'La capacidad debe ser al menos 1').max(500),
  isLab: z.boolean(),
  hasProjector: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

export const CreateClassroomSchema = ClassroomSchema;
export const UpdateClassroomSchema = ClassroomSchema.partial();

export type CreateClassroomInput = z.infer<typeof CreateClassroomSchema>;
export type UpdateClassroomInput = z.infer<typeof UpdateClassroomSchema>;
