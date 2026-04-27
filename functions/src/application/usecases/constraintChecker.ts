/**
 * Verificador de restricciones para el motor CSP.
 *
 * Contiene las funciones puras que evalúan cada restricción dura (HC1–HC6).
 * No tiene dependencias de Firebase ni de infraestructura.
 */
import type { CSPAssignment, CSPValue } from '../../domain/model/cspTypes';
import type { TimeSlot } from '../../domain/model/teacher';

// ============================================================
// Utilidades de tiempo
// ============================================================

/**
 * Convierte una hora en formato "HH:mm" a minutos desde medianoche.
 * Ejemplo: "08:30" → 510
 */
export function timeToMinutes(time: string): number {
  const parts = time.split(':').map(Number);
  return (parts[0] ?? 0) * 60 + (parts[1] ?? 0);
}

/**
 * Verifica si dos franjas horarias se solapan.
 * Dos franjas se solapan si están en el mismo día Y sus rangos de tiempo se cruzan.
 * Franjas consecutivas (10:00-12:00 y 12:00-14:00) NO se solapan.
 */
export function timeSlotsOverlap(a: TimeSlot, b: TimeSlot): boolean {
  if (a.dayOfWeek !== b.dayOfWeek) return false;

  const aStart = timeToMinutes(a.startTime);
  const aEnd = timeToMinutes(a.endTime);
  const bStart = timeToMinutes(b.startTime);
  const bEnd = timeToMinutes(b.endTime);

  // Solapamiento: A empieza antes de que B termine Y B empieza antes de que A termine
  return aStart < bEnd && bStart < aEnd;
}

// ============================================================
// Restricciones duras (Hard Constraints)
// ============================================================

/**
 * HC1 — No solapamiento de docente.
 * Un docente no puede dictar dos clases al mismo tiempo.
 *
 * @returns `true` si el nuevo valor NO genera conflicto con las asignaciones existentes.
 */
export function checkNoTeacherOverlap(
  newValue: CSPValue,
  existingAssignments: CSPAssignment[],
): boolean {
  for (const existing of existingAssignments) {
    const ev = existing.value;
    if (ev.teacherId !== newValue.teacherId) continue;

    if (
      timeSlotsOverlap(
        { dayOfWeek: ev.dayOfWeek, startTime: ev.startTime, endTime: ev.endTime },
        { dayOfWeek: newValue.dayOfWeek, startTime: newValue.startTime, endTime: newValue.endTime },
      )
    ) {
      return false;
    }
  }
  return true;
}

/**
 * HC2 — No solapamiento de aula.
 * Un aula no puede tener dos cursos al mismo tiempo.
 *
 * @returns `true` si el nuevo valor NO genera conflicto con las asignaciones existentes.
 */
export function checkNoClassroomOverlap(
  newValue: CSPValue,
  existingAssignments: CSPAssignment[],
): boolean {
  for (const existing of existingAssignments) {
    const ev = existing.value;
    if (ev.classroomId !== newValue.classroomId) continue;

    if (
      timeSlotsOverlap(
        { dayOfWeek: ev.dayOfWeek, startTime: ev.startTime, endTime: ev.endTime },
        { dayOfWeek: newValue.dayOfWeek, startTime: newValue.startTime, endTime: newValue.endTime },
      )
    ) {
      return false;
    }
  }
  return true;
}

/**
 * HC4 — Disponibilidad del docente.
 * La franja asignada debe estar completamente contenida dentro de
 * alguna franja de disponibilidad del docente.
 *
 * @returns `true` si el docente está disponible en la franja indicada.
 */
export function isTeacherAvailable(value: CSPValue, availability: TimeSlot[]): boolean {
  const slotStart = timeToMinutes(value.startTime);
  const slotEnd = timeToMinutes(value.endTime);

  for (const avail of availability) {
    if (avail.dayOfWeek !== value.dayOfWeek) continue;

    const availStart = timeToMinutes(avail.startTime);
    const availEnd = timeToMinutes(avail.endTime);

    // La franja del curso debe estar completamente dentro de la disponibilidad
    if (slotStart >= availStart && slotEnd <= availEnd) {
      return true;
    }
  }
  return false;
}

/**
 * HC5 + HC6 — Capacidad y tipo de aula.
 * - El aula debe tener capacidad suficiente para el grupo.
 * - Si el curso requiere laboratorio, el aula debe ser un laboratorio.
 *
 * @returns `true` si el aula es adecuada para el curso.
 */
export function isClassroomSuitable(
  groupSize: number,
  requiresLab: boolean,
  classroomCapacity: number,
  isLab: boolean,
): boolean {
  if (classroomCapacity < groupSize) return false;
  if (requiresLab && !isLab) return false;
  return true;
}
