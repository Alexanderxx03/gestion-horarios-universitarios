import { z } from 'zod';

export const SelectedCourseSchema = z.object({
  courseId: z.string().min(1),
  courseName: z.string().min(1),
  credits: z.number().int().min(1).max(10),
});

export const CreateEnrollmentSchema = z.object({
  periodId: z.string().min(1),
  selectedCourses: z.array(SelectedCourseSchema).min(1).max(10),
});

export type CreateEnrollmentInput = z.infer<typeof CreateEnrollmentSchema>;
export type SelectedCourse = z.infer<typeof SelectedCourseSchema>;
