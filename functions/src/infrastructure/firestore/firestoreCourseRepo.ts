import type { CourseRepoPort } from '../../domain/ports/ports';
import type { Course } from '../../domain/model/course';
import { adminDb } from './admin';

interface CourseDoc {
  code?: unknown;
  name?: unknown;
  credits?: unknown;
  weeklyHours?: unknown;
  requiresLab?: unknown;
  prerequisites?: unknown;
  maxCapacity?: unknown;
  isActive?: unknown;
  careerId?: unknown;
  semester?: unknown;
}

function hydrate(id: string, data: CourseDoc): Course {
  return {
    id,
    code: typeof data.code === 'string' ? data.code : '',
    name: typeof data.name === 'string' ? data.name : '',
    credits: typeof data.credits === 'number' ? data.credits : 0,
    weeklyHours: typeof data.weeklyHours === 'number' ? data.weeklyHours : 0,
    requiresLab: data.requiresLab === true,
    prerequisites: Array.isArray(data.prerequisites)
      ? data.prerequisites.filter((p): p is string => typeof p === 'string')
      : [],
    maxCapacity: typeof data.maxCapacity === 'number' ? data.maxCapacity : 0,
    isActive: data.isActive !== false,
    careerId: typeof data.careerId === 'string' ? data.careerId : '',
    semester: typeof data.semester === 'number' ? data.semester : 0,
  };
}

export class FirestoreCourseRepo implements CourseRepoPort {
  async findByIds(ids: readonly string[]): Promise<Course[]> {
    if (ids.length === 0) return [];
    const db = adminDb();
    const snapshots = await Promise.all(ids.map((id) => db.collection('courses').doc(id).get()));
    return snapshots
      .filter((snap) => snap.exists)
      .map((snap) => hydrate(snap.id, snap.data() as CourseDoc));
  }
}
