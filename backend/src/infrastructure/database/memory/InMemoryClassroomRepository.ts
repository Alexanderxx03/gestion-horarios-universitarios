import type { Classroom } from '../../../domain/model/classroom';
import type { ClassroomRepoPort } from '../../../domain/ports/ports';
import { MOCK_CLASSROOMS } from './mockDb';

export class InMemoryClassroomRepository implements ClassroomRepoPort {
  async findAll(): Promise<Classroom[]> {
    return MOCK_CLASSROOMS;
  }

  async findActive(): Promise<Classroom[]> {
    return MOCK_CLASSROOMS.filter((r) => r.isActive);
  }

  async findById(id: string): Promise<Classroom | null> {
    return MOCK_CLASSROOMS.find((r) => r.id === id) || null;
  }
}
