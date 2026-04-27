/**
 * Franja horaria que representa un bloque de disponibilidad.
 * Se usa tanto para la disponibilidad del docente como para
 * las asignaciones del motor CSP.
 */
export interface TimeSlot {
  /** 1=Lunes, 2=Martes, 3=Miércoles, 4=Jueves, 5=Viernes, 6=Sábado */
  dayOfWeek: number;
  /** Formato "HH:mm", ej: "08:00" */
  startTime: string;
  /** Formato "HH:mm", ej: "12:00" */
  endTime: string;
}

/**
 * Perfil docente — extensión del usuario base.
 * El `id` coincide con el `userId` del docente en `/users`.
 */
export interface Teacher {
  id: string;
  userId: string;
  employeeCode: string;
  department: string;
  maxHoursPerWeek: number;
  /** Bloques de tiempo en los que el docente está disponible */
  availability: TimeSlot[];
  /** IDs de cursos que el docente está calificado para dictar */
  qualifiedCourses: string[];
}
