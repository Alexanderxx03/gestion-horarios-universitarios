import type { Schedule, ScheduleAssignment } from '../../../domain/model/schedule';
import type { ScheduleRepoPort } from '../../../domain/ports/ports';
import { MOCK_SCHEDULES } from './mockDb';

export class InMemoryScheduleRepository implements ScheduleRepoPort {
  async findById(id: string): Promise<Schedule | null> {
    return MOCK_SCHEDULES.find((s) => s.id === id) || null;
  }

  async findByPeriod(periodId: string): Promise<Schedule[]> {
    return MOCK_SCHEDULES.filter((s) => s.periodId === periodId);
  }

  async create(input: {
    periodId: string;
    status: Schedule['status'];
    assignments: ScheduleAssignment[];
    generationTimeMs: number;
    conflictsFound: number;
  }): Promise<Schedule> {
    const newSchedule: Schedule = {
      id: `schedule-${Date.now()}`,
      periodId: input.periodId,
      status: input.status,
      generatedAt: new Date().toISOString(),
      generationTimeMs: input.generationTimeMs,
      conflictsFound: input.conflictsFound,
      assignments: input.assignments,
    };
    MOCK_SCHEDULES.push(newSchedule);
    return newSchedule;
  }

  async updateStatus(id: string, status: Schedule['status']): Promise<void> {
    const idx = MOCK_SCHEDULES.findIndex((s) => s.id === id);
    if (idx !== -1 && MOCK_SCHEDULES[idx]) {
      MOCK_SCHEDULES[idx].status = status;
    }
  }
}
