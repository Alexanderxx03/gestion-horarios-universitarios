import type { Course } from '../../../domain/model/course';
import type { CourseRepoPort } from '../../../domain/ports/ports';
import { MOCK_COURSES } from './mockDb';

export class InMemoryCourseRepository implements CourseRepoPort {
  async findByIds(ids: readonly string[]): Promise<Course[]> {
    return MOCK_COURSES.filter((c) => ids.includes(c.id));
  }

  async findAll(): Promise<Course[]> {
    return MOCK_COURSES;
  }

  async findByPeriod(_periodId: string): Promise<Course[]> {
    return MOCK_COURSES.filter((c) => c.isActive);
  }
}
