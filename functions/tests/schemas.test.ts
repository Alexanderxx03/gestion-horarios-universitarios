import { describe, expect, it } from 'vitest';
import { CreateEnrollmentSchema } from '../src/shared/schemas/enrollment';

describe('CreateEnrollmentSchema', () => {
  it('accepts a valid payload', () => {
    const result = CreateEnrollmentSchema.safeParse({
      periodId: 'p-1',
      selectedCourses: [
        { courseId: 'c1', courseName: 'Álgebra', credits: 4 },
        { courseId: 'c2', courseName: 'Cálculo', credits: 5 },
      ],
    });
    expect(result.success).toBe(true);
  });

  it('rejects an empty selectedCourses array', () => {
    const result = CreateEnrollmentSchema.safeParse({
      periodId: 'p-1',
      selectedCourses: [],
    });
    expect(result.success).toBe(false);
  });

  it('rejects credits outside of [1, 10]', () => {
    const result = CreateEnrollmentSchema.safeParse({
      periodId: 'p-1',
      selectedCourses: [{ courseId: 'c1', courseName: 'X', credits: 99 }],
    });
    expect(result.success).toBe(false);
  });

  it('rejects non-string courseId', () => {
    const result = CreateEnrollmentSchema.safeParse({
      periodId: 'p-1',
      selectedCourses: [{ courseId: 123, courseName: 'X', credits: 4 }],
    });
    expect(result.success).toBe(false);
  });
});
