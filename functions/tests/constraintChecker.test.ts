import { describe, expect, it } from 'vitest';
import {
  timeSlotsOverlap,
  isTeacherAvailable,
  isClassroomSuitable,
  checkNoTeacherOverlap,
  checkNoClassroomOverlap,
} from '../src/application/usecases/constraintChecker';
import type { CSPAssignment, CSPValue, CSPVariable } from '../src/domain/model/cspTypes';
import type { TimeSlot } from '../src/domain/model/teacher';

// ============================================================
// Helpers para crear datos de prueba
// ============================================================

function makeValue(overrides: Partial<CSPValue> = {}): CSPValue {
  return {
    teacherId: 'teacher-1',
    teacherName: 'Dr. García',
    classroomId: 'aula-101',
    classroomName: 'Aula 101',
    dayOfWeek: 1,
    startTime: '08:00',
    endTime: '10:00',
    ...overrides,
  };
}

function makeVariable(overrides: Partial<CSPVariable> = {}): CSPVariable {
  return {
    courseId: 'curso-1',
    courseName: 'Algoritmos I',
    weeklyHours: 2,
    requiresLab: false,
    maxCapacity: 30,
    qualifiedTeacherIds: ['teacher-1'],
    ...overrides,
  };
}

function makeAssignment(
  varOverrides: Partial<CSPVariable> = {},
  valOverrides: Partial<CSPValue> = {},
): CSPAssignment {
  return {
    variable: makeVariable(varOverrides),
    value: makeValue(valOverrides),
  };
}

// ============================================================
// Tests de restricciones individuales
// ============================================================

describe('constraintChecker', () => {
  describe('timeSlotsOverlap — detección de solapamiento horario', () => {
    it('detecta solapamiento total (mismo horario)', () => {
      const a: TimeSlot = { dayOfWeek: 1, startTime: '08:00', endTime: '10:00' };
      const b: TimeSlot = { dayOfWeek: 1, startTime: '08:00', endTime: '10:00' };
      expect(timeSlotsOverlap(a, b)).toBe(true);
    });

    it('detecta solapamiento parcial', () => {
      const a: TimeSlot = { dayOfWeek: 1, startTime: '08:00', endTime: '10:00' };
      const b: TimeSlot = { dayOfWeek: 1, startTime: '09:00', endTime: '11:00' };
      expect(timeSlotsOverlap(a, b)).toBe(true);
    });

    it('NO hay solapamiento cuando las franjas son consecutivas', () => {
      const a: TimeSlot = { dayOfWeek: 1, startTime: '08:00', endTime: '10:00' };
      const b: TimeSlot = { dayOfWeek: 1, startTime: '10:00', endTime: '12:00' };
      expect(timeSlotsOverlap(a, b)).toBe(false);
    });

    it('NO hay solapamiento en días diferentes', () => {
      const a: TimeSlot = { dayOfWeek: 1, startTime: '08:00', endTime: '10:00' };
      const b: TimeSlot = { dayOfWeek: 2, startTime: '08:00', endTime: '10:00' };
      expect(timeSlotsOverlap(a, b)).toBe(false);
    });

    it('detecta cuando A contiene completamente a B', () => {
      const a: TimeSlot = { dayOfWeek: 3, startTime: '08:00', endTime: '12:00' };
      const b: TimeSlot = { dayOfWeek: 3, startTime: '09:00', endTime: '11:00' };
      expect(timeSlotsOverlap(a, b)).toBe(true);
    });
  });

  describe('HC1 — No solapamiento de docente', () => {
    it('rechaza cuando el mismo docente tiene dos clases simultáneas', () => {
      const existentes: CSPAssignment[] = [
        makeAssignment(
          {},
          { teacherId: 'doc-1', dayOfWeek: 1, startTime: '08:00', endTime: '10:00' },
        ),
      ];
      const nuevo = makeValue({
        teacherId: 'doc-1',
        dayOfWeek: 1,
        startTime: '09:00',
        endTime: '11:00',
      });
      expect(checkNoTeacherOverlap(nuevo, existentes)).toBe(false);
    });

    it('permite cuando el mismo docente tiene clases en horarios distintos', () => {
      const existentes: CSPAssignment[] = [
        makeAssignment(
          {},
          { teacherId: 'doc-1', dayOfWeek: 1, startTime: '08:00', endTime: '10:00' },
        ),
      ];
      const nuevo = makeValue({
        teacherId: 'doc-1',
        dayOfWeek: 1,
        startTime: '10:00',
        endTime: '12:00',
      });
      expect(checkNoTeacherOverlap(nuevo, existentes)).toBe(true);
    });

    it('permite cuando docentes diferentes tienen clases simultáneas', () => {
      const existentes: CSPAssignment[] = [
        makeAssignment(
          {},
          { teacherId: 'doc-1', dayOfWeek: 1, startTime: '08:00', endTime: '10:00' },
        ),
      ];
      const nuevo = makeValue({
        teacherId: 'doc-2',
        dayOfWeek: 1,
        startTime: '08:00',
        endTime: '10:00',
      });
      expect(checkNoTeacherOverlap(nuevo, existentes)).toBe(true);
    });
  });

  describe('HC2 — No solapamiento de aula', () => {
    it('rechaza cuando la misma aula tiene dos cursos simultáneos', () => {
      const existentes: CSPAssignment[] = [
        makeAssignment(
          {},
          { classroomId: 'aula-1', dayOfWeek: 2, startTime: '14:00', endTime: '16:00' },
        ),
      ];
      const nuevo = makeValue({
        classroomId: 'aula-1',
        dayOfWeek: 2,
        startTime: '15:00',
        endTime: '17:00',
      });
      expect(checkNoClassroomOverlap(nuevo, existentes)).toBe(false);
    });

    it('permite cuando la misma aula se usa en horarios distintos', () => {
      const existentes: CSPAssignment[] = [
        makeAssignment(
          {},
          { classroomId: 'aula-1', dayOfWeek: 2, startTime: '14:00', endTime: '16:00' },
        ),
      ];
      const nuevo = makeValue({
        classroomId: 'aula-1',
        dayOfWeek: 2,
        startTime: '16:00',
        endTime: '18:00',
      });
      expect(checkNoClassroomOverlap(nuevo, existentes)).toBe(true);
    });
  });

  describe('HC4 — Disponibilidad del docente', () => {
    it('acepta cuando el docente tiene disponibilidad en esa franja', () => {
      const disponibilidad: TimeSlot[] = [{ dayOfWeek: 1, startTime: '07:00', endTime: '13:00' }];
      const valor = makeValue({ dayOfWeek: 1, startTime: '08:00', endTime: '10:00' });
      expect(isTeacherAvailable(valor, disponibilidad)).toBe(true);
    });

    it('rechaza cuando el docente NO tiene disponibilidad en esa franja', () => {
      const disponibilidad: TimeSlot[] = [{ dayOfWeek: 1, startTime: '14:00', endTime: '18:00' }];
      const valor = makeValue({ dayOfWeek: 1, startTime: '08:00', endTime: '10:00' });
      expect(isTeacherAvailable(valor, disponibilidad)).toBe(false);
    });

    it('rechaza cuando el docente tiene disponibilidad parcial', () => {
      const disponibilidad: TimeSlot[] = [{ dayOfWeek: 1, startTime: '09:00', endTime: '12:00' }];
      const valor = makeValue({ dayOfWeek: 1, startTime: '08:00', endTime: '10:00' });
      expect(isTeacherAvailable(valor, disponibilidad)).toBe(false);
    });
  });

  describe('HC5/HC6 — Capacidad y tipo de aula', () => {
    it('acepta aula con capacidad suficiente y tipo correcto', () => {
      expect(isClassroomSuitable(30, false, 35, false)).toBe(true);
    });

    it('rechaza aula con capacidad insuficiente', () => {
      expect(isClassroomSuitable(30, false, 20, false)).toBe(false);
    });

    it('rechaza aula normal cuando se requiere laboratorio', () => {
      expect(isClassroomSuitable(30, true, 35, false)).toBe(false);
    });

    it('acepta laboratorio cuando se requiere laboratorio', () => {
      expect(isClassroomSuitable(30, true, 35, true)).toBe(true);
    });

    it('acepta laboratorio para cursos que no requieren laboratorio', () => {
      expect(isClassroomSuitable(30, false, 35, true)).toBe(true);
    });
  });
});
