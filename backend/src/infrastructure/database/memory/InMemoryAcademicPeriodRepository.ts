import type { AcademicPeriod } from '../../../domain/model/academicPeriod';
import type { AcademicPeriodRepoPort } from '../../../domain/ports/ports';
import { MOCK_PERIODS } from './mockDb';

export class InMemoryAcademicPeriodRepository implements AcademicPeriodRepoPort {
  async findById(id: string): Promise<AcademicPeriod | null> {
    return MOCK_PERIODS.find((p) => p.id === id || p.name === id) || null;
  }

  async findActive(): Promise<AcademicPeriod | null> {
    return MOCK_PERIODS.find((p) => p.isActive) || null;
  }
}
