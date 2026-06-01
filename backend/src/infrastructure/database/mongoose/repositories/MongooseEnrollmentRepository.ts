import type { Enrollment } from '../../../../domain/model/enrollment';
import type { EnrollmentRepoPort } from '../../../../domain/ports/ports';
import { EnrollmentModel } from '../EnrollmentModel';

export class MongooseEnrollmentRepository implements EnrollmentRepoPort {
  async findApprovedCourseIds(studentId: string): Promise<string[]> {
    const docs = await EnrollmentModel.find({ estudianteId: studentId, estado: 'VALIDADA' });
    const courseIds = new Set<string>();
    for (const doc of docs) {
      for (const course of doc.cursosSeleccionados) {
        courseIds.add(course.cursoId.toString());
      }
    }
    return Array.from(courseIds);
  }

  async create(input: {
    studentId: string;
    periodId: string;
    selectedCourses: Array<{ courseId: string; courseName: string; credits: number }>;
    totalCredits: number;
  }): Promise<Enrollment> {
    const newDoc = new EnrollmentModel({
      estudianteId: input.studentId,
      periodoId: input.periodId,
      estado: 'PENDIENTE',
      cursosSeleccionados: input.selectedCourses.map((c) => ({
        cursoId: c.courseId,
        creditos: c.credits,
      })),
      creditosTotales: input.totalCredits,
    });
    const saved = await newDoc.save();
    return {
      id: saved._id.toString(),
      studentId: saved.estudianteId.toString(),
      periodId: saved.periodoId.toString(),
      status: saved.estado as any,
      selectedCourses: input.selectedCourses,
      totalCredits: saved.creditosTotales,
      createdAt: saved.createdAt.toISOString(),
    };
  }
}
