import {
  CourseNotFoundError,
  CreditsBelowMinimumError,
  CreditsExceededError,
  PeriodNotActiveError,
  PrerequisiteNotMetError,
} from '../../domain/errors';
import type {
  AcademicPeriodRepoPort,
  CourseRepoPort,
  EnrollmentRepoPort,
} from '../../domain/ports/ports';
import type { Enrollment, SelectedCourse } from '../../domain/model/enrollment';

export interface ValidateEnrollmentInput {
  studentId: string;
  periodId: string;
  selectedCourseIds: readonly string[];
}

export interface ValidateEnrollmentDeps {
  courses: CourseRepoPort;
  periods: AcademicPeriodRepoPort;
  enrollments: EnrollmentRepoPort;
}

/**
 * Core CSP-precondition check before the schedule solver runs:
 * - period is active,
 * - credits stay within [min, max],
 * - every prerequisite of every selected course has been approved.
 *
 * Fully pure — depends only on ports, never on Firebase.
 */
export async function validateEnrollment(
  input: ValidateEnrollmentInput,
  deps: ValidateEnrollmentDeps,
): Promise<Enrollment> {
  const period = await deps.periods.findById(input.periodId);
  if (!period || !period.isActive) {
    throw new PeriodNotActiveError(input.periodId);
  }

  const courses = await deps.courses.findByIds(input.selectedCourseIds);
  if (courses.length !== input.selectedCourseIds.length) {
    const found = new Set(courses.map((c) => c.id));
    const missing = input.selectedCourseIds.find((id) => !found.has(id));
    throw new CourseNotFoundError(missing ?? 'unknown');
  }

  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  if (totalCredits > period.maxCredits) {
    throw new CreditsExceededError(totalCredits, period.maxCredits);
  }
  if (totalCredits < period.minCredits) {
    throw new CreditsBelowMinimumError(totalCredits, period.minCredits);
  }

  const approvedIds = new Set(await deps.enrollments.findApprovedCourseIds(input.studentId));
  for (const course of courses) {
    for (const prereq of course.prerequisites) {
      if (!approvedIds.has(prereq)) {
        throw new PrerequisiteNotMetError(course.id, prereq);
      }
    }
  }

  const selected: SelectedCourse[] = courses.map((c) => ({
    courseId: c.id,
    courseName: c.name,
    credits: c.credits,
  }));

  return deps.enrollments.create({
    studentId: input.studentId,
    periodId: input.periodId,
    selectedCourses: selected,
    totalCredits,
  });
}
