import { describe, expect, it } from 'vitest';
import { validateEnrollment } from '../src/application/usecases/validateEnrollment';
import {
  CourseNotFoundError,
  CreditsBelowMinimumError,
  CreditsExceededError,
  PeriodNotActiveError,
  PrerequisiteNotMetError,
} from '../src/domain/errors';
import type { AcademicPeriod } from '../src/domain/model/academicPeriod';
import type { Course } from '../src/domain/model/course';
import type { Enrollment } from '../src/domain/model/enrollment';
import type {
  AcademicPeriodRepoPort,
  CourseRepoPort,
  EnrollmentRepoPort,
} from '../src/domain/ports/ports';

function makeCourse(partial: Partial<Course> & Pick<Course, 'id' | 'credits'>): Course {
  return {
    code: partial.id,
    name: partial.id,
    weeklyHours: 4,
    requiresLab: false,
    prerequisites: [],
    maxCapacity: 30,
    isActive: true,
    careerId: 'car-1',
    semester: 1,
    ...partial,
  };
}

function makeDeps(overrides: {
  period?: AcademicPeriod | null;
  courses?: Course[];
  approved?: string[];
  onCreate?: (input: Parameters<EnrollmentRepoPort['create']>[0]) => Enrollment;
}) {
  const period: AcademicPeriod = overrides.period ?? {
    id: 'p-1',
    name: '2026-I',
    isActive: true,
    minCredits: 4,
    maxCredits: 22,
  };
  const courses = overrides.courses ?? [];
  const approved = overrides.approved ?? [];

  const coursesPort: CourseRepoPort = {
    findByIds: async (ids) => courses.filter((c) => ids.includes(c.id)),
  };
  const periodsPort: AcademicPeriodRepoPort = {
    findById: async (id) => (id === period.id ? period : null),
  };
  const enrollmentsPort: EnrollmentRepoPort = {
    findApprovedCourseIds: async () => approved,
    create: async (input) => {
      const fallback: Enrollment = {
        id: 'enroll-test',
        studentId: input.studentId,
        periodId: input.periodId,
        status: 'PENDING',
        selectedCourses: input.selectedCourses,
        totalCredits: input.totalCredits,
        createdAt: '2026-01-01T00:00:00Z',
      };
      return overrides.onCreate ? overrides.onCreate(input) : fallback;
    },
  };

  return { courses: coursesPort, periods: periodsPort, enrollments: enrollmentsPort };
}

describe('validateEnrollment', () => {
  it('rejects when the period is not active', async () => {
    const deps = makeDeps({
      period: { id: 'p-1', name: '2026-I', isActive: false, minCredits: 4, maxCredits: 22 },
      courses: [makeCourse({ id: 'c1', credits: 4 })],
    });
    await expect(
      validateEnrollment({ studentId: 's1', periodId: 'p-1', selectedCourseIds: ['c1'] }, deps),
    ).rejects.toBeInstanceOf(PeriodNotActiveError);
  });

  it('rejects when a selected course does not exist', async () => {
    const deps = makeDeps({ courses: [] });
    await expect(
      validateEnrollment({ studentId: 's1', periodId: 'p-1', selectedCourseIds: ['c1'] }, deps),
    ).rejects.toBeInstanceOf(CourseNotFoundError);
  });

  it('rejects when total credits exceed the period maximum', async () => {
    const deps = makeDeps({
      courses: [
        makeCourse({ id: 'c1', credits: 12 }),
        makeCourse({ id: 'c2', credits: 12 }),
      ],
    });
    await expect(
      validateEnrollment(
        { studentId: 's1', periodId: 'p-1', selectedCourseIds: ['c1', 'c2'] },
        deps,
      ),
    ).rejects.toBeInstanceOf(CreditsExceededError);
  });

  it('rejects when total credits are below the period minimum', async () => {
    const deps = makeDeps({
      period: { id: 'p-1', name: '2026-I', isActive: true, minCredits: 10, maxCredits: 22 },
      courses: [makeCourse({ id: 'c1', credits: 4 })],
    });
    await expect(
      validateEnrollment({ studentId: 's1', periodId: 'p-1', selectedCourseIds: ['c1'] }, deps),
    ).rejects.toBeInstanceOf(CreditsBelowMinimumError);
  });

  it('rejects when a prerequisite is missing', async () => {
    const deps = makeDeps({
      courses: [makeCourse({ id: 'c2', credits: 6, prerequisites: ['c1'] })],
      approved: [],
    });
    await expect(
      validateEnrollment({ studentId: 's1', periodId: 'p-1', selectedCourseIds: ['c2'] }, deps),
    ).rejects.toBeInstanceOf(PrerequisiteNotMetError);
  });

  it('creates a pending enrollment when all constraints are satisfied', async () => {
    const deps = makeDeps({
      courses: [
        makeCourse({ id: 'c1', credits: 6 }),
        makeCourse({ id: 'c2', credits: 6, prerequisites: ['c0'] }),
      ],
      approved: ['c0'],
    });
    const result = await validateEnrollment(
      { studentId: 's1', periodId: 'p-1', selectedCourseIds: ['c1', 'c2'] },
      deps,
    );
    expect(result.totalCredits).toBe(12);
    expect(result.selectedCourses).toHaveLength(2);
    expect(result.status).toBe('PENDING');
  });
});
