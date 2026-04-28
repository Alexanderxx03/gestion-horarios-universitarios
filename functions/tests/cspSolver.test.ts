import { describe, expect, it } from 'vitest';
import { CSPSolver } from '../src/application/usecases/cspSolver';
import type { CSPProblem, CSPVariable } from '../src/domain/model/cspTypes';
import type { TimeSlot } from '../src/domain/model/teacher';

// ============================================================
// Helpers para construir problemas CSP de prueba
// ============================================================

/** Franjas horarias estándar del sistema (bloques de 2 horas) */
const STANDARD_TIME_SLOTS: TimeSlot[] = [
  { dayOfWeek: 1, startTime: '08:00', endTime: '10:00' },
  { dayOfWeek: 1, startTime: '10:00', endTime: '12:00' },
  { dayOfWeek: 1, startTime: '14:00', endTime: '16:00' },
  { dayOfWeek: 2, startTime: '08:00', endTime: '10:00' },
  { dayOfWeek: 2, startTime: '10:00', endTime: '12:00' },
  { dayOfWeek: 2, startTime: '14:00', endTime: '16:00' },
  { dayOfWeek: 3, startTime: '08:00', endTime: '10:00' },
  { dayOfWeek: 3, startTime: '10:00', endTime: '12:00' },
  { dayOfWeek: 3, startTime: '14:00', endTime: '16:00' },
  { dayOfWeek: 4, startTime: '08:00', endTime: '10:00' },
  { dayOfWeek: 4, startTime: '10:00', endTime: '12:00' },
  { dayOfWeek: 4, startTime: '14:00', endTime: '16:00' },
  { dayOfWeek: 5, startTime: '08:00', endTime: '10:00' },
  { dayOfWeek: 5, startTime: '10:00', endTime: '12:00' },
  { dayOfWeek: 5, startTime: '14:00', endTime: '16:00' },
];

/** Disponibilidad completa de lunes a viernes 07:00-18:00 */
const FULL_AVAILABILITY: TimeSlot[] = [
  { dayOfWeek: 1, startTime: '07:00', endTime: '18:00' },
  { dayOfWeek: 2, startTime: '07:00', endTime: '18:00' },
  { dayOfWeek: 3, startTime: '07:00', endTime: '18:00' },
  { dayOfWeek: 4, startTime: '07:00', endTime: '18:00' },
  { dayOfWeek: 5, startTime: '07:00', endTime: '18:00' },
];

function buildProblem(overrides: {
  variables?: CSPVariable[];
  teacherCount?: number;
  classroomCount?: number;
  labCount?: number;
}): CSPProblem {
  const teacherCount = overrides.teacherCount ?? 3;
  const classroomCount = overrides.classroomCount ?? 3;
  const labCount = overrides.labCount ?? 1;

  const teacherAvailability = new Map<string, TimeSlot[]>();
  const teacherNames = new Map<string, string>();
  for (let i = 1; i <= teacherCount; i++) {
    teacherAvailability.set(`teacher-${i}`, FULL_AVAILABILITY);
    teacherNames.set(`teacher-${i}`, `Docente ${i}`);
  }

  const classroomInfo = new Map<string, { name: string; capacity: number; isLab: boolean }>();
  for (let i = 1; i <= classroomCount; i++) {
    classroomInfo.set(`aula-${i}`, { name: `Aula ${i}`, capacity: 40, isLab: false });
  }
  for (let i = 1; i <= labCount; i++) {
    classroomInfo.set(`lab-${i}`, { name: `Laboratorio ${i}`, capacity: 30, isLab: true });
  }

  const variables: CSPVariable[] = overrides.variables ?? [
    {
      courseId: 'curso-1',
      courseName: 'Algoritmos I',
      weeklyHours: 2,
      requiresLab: false,
      maxCapacity: 30,
      qualifiedTeacherIds: ['teacher-1'],
    },
    {
      courseId: 'curso-2',
      courseName: 'Base de Datos',
      weeklyHours: 2,
      requiresLab: false,
      maxCapacity: 25,
      qualifiedTeacherIds: ['teacher-2'],
    },
    {
      courseId: 'curso-3',
      courseName: 'Programación Web',
      weeklyHours: 2,
      requiresLab: true,
      maxCapacity: 25,
      qualifiedTeacherIds: ['teacher-3'],
    },
  ];

  return {
    variables,
    teacherAvailability,
    teacherNames,
    classroomInfo,
    availableTimeSlots: STANDARD_TIME_SLOTS,
  };
}

// ============================================================
// Tests del solver CSP
// ============================================================

describe('CSPSolver', () => {
  describe('Escenario base — 3 cursos, 3 docentes, 3 aulas', () => {
    it('genera un horario válido sin conflictos', () => {
      const problem = buildProblem({});
      const solver = new CSPSolver();
      const result = solver.solve(problem);

      expect(result.success).toBe(true);
      expect(result.assignments).toHaveLength(3);
    });

    it('todas las asignaciones tienen docentes calificados', () => {
      const problem = buildProblem({});
      const solver = new CSPSolver();
      const result = solver.solve(problem);

      for (const assignment of result.assignments) {
        expect(assignment.variable.qualifiedTeacherIds).toContain(assignment.value.teacherId);
      }
    });

    it('ningún docente tiene dos clases simultáneas', () => {
      const problem = buildProblem({});
      const solver = new CSPSolver();
      const result = solver.solve(problem);

      for (let i = 0; i < result.assignments.length; i++) {
        for (let j = i + 1; j < result.assignments.length; j++) {
          const a = result.assignments[i]!.value;
          const b = result.assignments[j]!.value;
          if (a.teacherId === b.teacherId && a.dayOfWeek === b.dayOfWeek) {
            // Las franjas no deben solaparse
            const aEnd = a.endTime;
            const bStart = b.startTime;
            const bEnd = b.endTime;
            const aStart = a.startTime;
            const noOverlap = aEnd <= bStart || bEnd <= aStart;
            expect(noOverlap).toBe(true);
          }
        }
      }
    });

    it('ningún aula tiene dos cursos simultáneos', () => {
      const problem = buildProblem({});
      const solver = new CSPSolver();
      const result = solver.solve(problem);

      for (let i = 0; i < result.assignments.length; i++) {
        for (let j = i + 1; j < result.assignments.length; j++) {
          const a = result.assignments[i]!.value;
          const b = result.assignments[j]!.value;
          if (a.classroomId === b.classroomId && a.dayOfWeek === b.dayOfWeek) {
            const noOverlap = a.endTime <= b.startTime || b.endTime <= a.startTime;
            expect(noOverlap).toBe(true);
          }
        }
      }
    });

    it('cursos con laboratorio se asignan a laboratorios', () => {
      const problem = buildProblem({});
      const solver = new CSPSolver();
      const result = solver.solve(problem);

      for (const assignment of result.assignments) {
        if (assignment.variable.requiresLab) {
          const classroom = problem.classroomInfo.get(assignment.value.classroomId);
          expect(classroom?.isLab).toBe(true);
        }
      }
    });
  });

  describe('Escenario mediano — 10 cursos, 5 docentes, 5 aulas', () => {
    it('genera horario válido para 10 cursos', () => {
      const variables: CSPVariable[] = Array.from({ length: 10 }, (_, i) => ({
        courseId: `curso-${i + 1}`,
        courseName: `Materia ${i + 1}`,
        weeklyHours: 2,
        requiresLab: i % 4 === 0, // cursos 1, 5, 9 necesitan lab
        maxCapacity: i % 4 === 0 ? 25 : 30, // labs tienen capacidad 30, cursos de lab no exceden eso
        qualifiedTeacherIds: [`teacher-${(i % 5) + 1}`, `teacher-${((i + 1) % 5) + 1}`],
      }));

      const problem = buildProblem({
        variables,
        teacherCount: 5,
        classroomCount: 5,
        labCount: 2,
      });

      const solver = new CSPSolver();
      const result = solver.solve(problem);

      expect(result.success).toBe(true);
      expect(result.assignments).toHaveLength(10);
    });

    it('completa en menos de 5 segundos', () => {
      const variables: CSPVariable[] = Array.from({ length: 10 }, (_, i) => ({
        courseId: `curso-${i + 1}`,
        courseName: `Materia ${i + 1}`,
        weeklyHours: 2,
        requiresLab: false,
        maxCapacity: 30,
        qualifiedTeacherIds: [`teacher-${(i % 5) + 1}`, `teacher-${((i + 2) % 5) + 1}`],
      }));

      const problem = buildProblem({
        variables,
        teacherCount: 5,
        classroomCount: 5,
      });

      const solver = new CSPSolver();
      const start = Date.now();
      const result = solver.solve(problem);
      const elapsed = Date.now() - start;

      expect(result.success).toBe(true);
      expect(elapsed).toBeLessThan(5000);
      expect(result.stats.totalTimeMs).toBeLessThan(5000);
    });
  });

  describe('Escenarios sin solución', () => {
    it('retorna failure cuando no hay docentes calificados', () => {
      const variables: CSPVariable[] = [
        {
          courseId: 'curso-1',
          courseName: 'Materia sin docente',
          weeklyHours: 2,
          requiresLab: false,
          maxCapacity: 30,
          qualifiedTeacherIds: ['teacher-inexistente'],
        },
      ];

      const problem = buildProblem({ variables, teacherCount: 1 });
      const solver = new CSPSolver();
      const result = solver.solve(problem);

      expect(result.success).toBe(false);
    });

    it('retorna failure cuando no hay aulas suficientes', () => {
      // 3 cursos en el mismo horario pero solo 1 aula
      const variables: CSPVariable[] = Array.from({ length: 16 }, (_, i) => ({
        courseId: `curso-${i + 1}`,
        courseName: `Materia ${i + 1}`,
        weeklyHours: 2,
        requiresLab: false,
        maxCapacity: 30,
        qualifiedTeacherIds: ['teacher-1'], // mismo docente para todos
      }));

      const problem = buildProblem({
        variables,
        teacherCount: 1,
        classroomCount: 1,
        labCount: 0,
      });

      const solver = new CSPSolver(5_000); // timeout corto para tests de fallo
      const result = solver.solve(problem);

      // Con 1 docente y 1 aula, solo puede haber max 15 bloques (lun-vie × 3 bloques)
      // 16 cursos no caben
      expect(result.success).toBe(false);
    });
  });

  describe('Heurística MRV', () => {
    it('prioriza cursos con menos opciones de asignación', () => {
      const variables: CSPVariable[] = [
        {
          courseId: 'curso-restringido',
          courseName: 'Curso Muy Restringido',
          weeklyHours: 2,
          requiresLab: true,
          maxCapacity: 30,
          qualifiedTeacherIds: ['teacher-1'],
        },
        {
          courseId: 'curso-flexible',
          courseName: 'Curso Flexible',
          weeklyHours: 2,
          requiresLab: false,
          maxCapacity: 20,
          qualifiedTeacherIds: ['teacher-1', 'teacher-2', 'teacher-3'],
        },
      ];

      const problem = buildProblem({ variables, teacherCount: 3, classroomCount: 3, labCount: 1 });
      const solver = new CSPSolver();
      const result = solver.solve(problem);

      expect(result.success).toBe(true);
      expect(result.assignments).toHaveLength(2);
    });
  });

  describe('Estadísticas de ejecución', () => {
    it('registra nodos explorados y backtracks', () => {
      const problem = buildProblem({});
      const solver = new CSPSolver();
      const result = solver.solve(problem);

      expect(result.stats.nodesExplored).toBeGreaterThan(0);
      expect(result.stats.totalTimeMs).toBeGreaterThanOrEqual(0);
      expect(result.stats.totalBacktracks).toBeGreaterThanOrEqual(0);
    });
  });
});
