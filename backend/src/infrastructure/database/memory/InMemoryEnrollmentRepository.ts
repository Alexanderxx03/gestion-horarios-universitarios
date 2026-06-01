import type { Enrollment } from '../../../domain/model/enrollment';
import type { EnrollmentRepoPort } from '../../../domain/ports/ports';
import { MOCK_ENROLLMENTS } from './mockDb';

export class InMemoryEnrollmentRepository implements EnrollmentRepoPort {
  async findApprovedCourseIds(studentId: string): Promise<string[]> {
    // Para simplificar en memoria, consideramos que el estudiante
    // tiene aprobados todos los prerrequisitos.
    return ['c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  }

  async create(input: {
    studentId: string;
    periodId: string;
    selectedCourses: Array<{ courseId: string; courseName: string; credits: number }>;
    totalCredits: number;
  }): Promise<Enrollment> {
    const newDoc: Enrollment = {
      id: `enroll-${Date.now()}`,
      studentId: input.studentId,
      periodId: input.periodId,
      status: 'PENDING',
      selectedCourses: input.selectedCourses,
      totalCredits: input.totalCredits,
      createdAt: new Date().toISOString(),
    };
    MOCK_ENROLLMENTS.push(newDoc);
    return newDoc;
  }
}
