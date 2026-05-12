import type { AcademicPeriod } from '../model/academicPeriod';
import type { Classroom } from '../model/classroom';
import type { Course } from '../model/course';
import type { Enrollment, SelectedCourse } from '../model/enrollment';
import type { Schedule, ScheduleAssignment } from '../model/schedule';
import type { Teacher } from '../model/teacher';

/** Puerto para acceder al catálogo de cursos */
export interface CourseRepoPort {
  findByIds(ids: readonly string[]): Promise<Course[]>;
  findAll(): Promise<Course[]>;
  findByPeriod(periodId: string): Promise<Course[]>;
}

/** Puerto para acceder a los períodos académicos */
export interface AcademicPeriodRepoPort {
  findById(id: string): Promise<AcademicPeriod | null>;
}

/** Puerto para gestionar matrículas */
export interface EnrollmentRepoPort {
  findApprovedCourseIds(studentId: string): Promise<string[]>;
  create(input: {
    studentId: string;
    periodId: string;
    selectedCourses: SelectedCourse[];
    totalCredits: number;
  }): Promise<Enrollment>;
}

/** Puerto para acceder a los docentes */
export interface TeacherRepoPort {
  findAll(): Promise<Teacher[]>;
  findById(id: string): Promise<Teacher | null>;
  findByQualifiedCourse(courseId: string): Promise<Teacher[]>;
}

/** Puerto para acceder a las aulas */
export interface ClassroomRepoPort {
  findAll(): Promise<Classroom[]>;
  findActive(): Promise<Classroom[]>;
  findById(id: string): Promise<Classroom | null>;
}

/** Puerto para gestionar horarios generados */
export interface ScheduleRepoPort {
  findById(id: string): Promise<Schedule | null>;
  findByPeriod(periodId: string): Promise<Schedule[]>;
  create(input: {
    periodId: string;
    status: Schedule['status'];
    assignments: ScheduleAssignment[];
    generationTimeMs: number;
    conflictsFound: number;
  }): Promise<Schedule>;
  updateStatus(id: string, status: Schedule['status']): Promise<void>;
}
