import type { AcademicPeriod } from '../model/academicPeriod';
import type { Course } from '../model/course';
import type { Enrollment, SelectedCourse } from '../model/enrollment';

export interface CourseRepoPort {
  findByIds(ids: readonly string[]): Promise<Course[]>;
}

export interface AcademicPeriodRepoPort {
  findById(id: string): Promise<AcademicPeriod | null>;
}

export interface EnrollmentRepoPort {
  findApprovedCourseIds(studentId: string): Promise<string[]>;
  create(input: {
    studentId: string;
    periodId: string;
    selectedCourses: SelectedCourse[];
    totalCredits: number;
  }): Promise<Enrollment>;
}
