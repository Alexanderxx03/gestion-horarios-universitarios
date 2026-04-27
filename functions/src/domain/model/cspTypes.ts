import type { TimeSlot } from './teacher';

/**
 * Variable del CSP: representa un curso que necesita ser asignado
 * a un docente + aula + franja horaria.
 */
export interface CSPVariable {
  courseId: string;
  courseName: string;
  /** Horas semanales que requiere el curso */
  weeklyHours: number;
  /** Si el curso necesita un laboratorio */
  requiresLab: boolean;
  /** Aforo máximo del curso */
  maxCapacity: number;
  /** IDs de docentes calificados para dictar este curso */
  qualifiedTeacherIds: string[];
}

/**
 * Valor del dominio: una posible asignación concreta
 * (docente + aula + día + horario).
 */
export interface CSPValue {
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
}

/**
 * Asignación resuelta: una variable emparejada con su valor.
 */
export interface CSPAssignment {
  variable: CSPVariable;
  value: CSPValue;
}

/**
 * Definición completa del problema CSP listo para el solver.
 */
export interface CSPProblem {
  variables: CSPVariable[];
  /** Mapa de docente ID → franjas de disponibilidad */
  teacherAvailability: Map<string, TimeSlot[]>;
  /** Mapa de docente ID → nombre completo */
  teacherNames: Map<string, string>;
  /** Mapa de aula ID → { nombre, capacidad, esLab } */
  classroomInfo: Map<string, { name: string; capacity: number; isLab: boolean }>;
  /** Franjas horarias base del sistema (ej: 07:00-09:00, 09:00-11:00, etc.) */
  availableTimeSlots: TimeSlot[];
}

/**
 * Resultado de la ejecución del solver CSP.
 */
export interface CSPResult {
  success: boolean;
  assignments: CSPAssignment[];
  stats: {
    /** Cantidad de veces que el algoritmo retrocedió */
    totalBacktracks: number;
    /** Tiempo total de ejecución en milisegundos */
    totalTimeMs: number;
    /** Nodos del árbol de búsqueda explorados */
    nodesExplored: number;
  };
}
