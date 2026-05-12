/**
 * Estados posibles de un horario generado.
 *
 * - PENDING:     solicitud recibida, aún no procesada
 * - IN_PROGRESS: el motor CSP está ejecutándose
 * - GENERATED:   se encontró solución sin conflictos
 * - FAILED:      no se encontró solución válida
 */
export type ScheduleStatus = 'PENDING' | 'IN_PROGRESS' | 'GENERATED' | 'FAILED';

/**
 * Una asignación individual dentro del horario:
 * un curso asignado a un docente, aula y franja horaria.
 */
export interface ScheduleAssignment {
  courseId: string;
  courseName: string;
  teacherId: string;
  teacherName: string;
  classroomId: string;
  classroomName: string;
  /** 1=Lunes … 6=Sábado */
  dayOfWeek: number;
  /** Formato "HH:mm" */
  startTime: string;
  /** Formato "HH:mm" */
  endTime: string;
  /** Cantidad de estudiantes en el grupo */
  groupSize: number;
}

/**
 * Resultado completo de la generación de horarios por el motor CSP.
 * Se almacena en `/schedules/{scheduleId}` y solo puede ser
 * escrito por Cloud Functions (Admin SDK).
 */
export interface Schedule {
  id: string;
  periodId: string;
  status: ScheduleStatus;
  generatedAt: string;
  /** Milisegundos que tardó el motor en generar el horario */
  generationTimeMs: number;
  /** Cantidad de conflictos detectados (debería ser 0 en GENERATED) */
  conflictsFound: number;
  assignments: ScheduleAssignment[];
}
