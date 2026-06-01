import type { Teacher } from '../../../domain/model/teacher';
import type { TeacherRepoPort } from '../../../domain/ports/ports';
import { MOCK_TEACHERS } from './mockDb';

export class InMemoryTeacherRepository implements TeacherRepoPort {
  async findAll(): Promise<Teacher[]> {
    return MOCK_TEACHERS;
  }

  async findById(id: string): Promise<Teacher | null> {
    return MOCK_TEACHERS.find((t) => t.id === id) || null;
  }

  async findByQualifiedCourse(courseId: string): Promise<Teacher[]> {
    return MOCK_TEACHERS.filter((t) => t.qualifiedCourses.includes(courseId));
  }
}
