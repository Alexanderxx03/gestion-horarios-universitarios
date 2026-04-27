export class DomainError extends Error {
  constructor(
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = 'DomainError';
  }
}

export class CreditsExceededError extends DomainError {
  constructor(total: number, max: number) {
    super(
      'credits-exceeded',
      `Los créditos seleccionados (${total}) exceden el máximo permitido (${max}).`,
    );
  }
}

export class CreditsBelowMinimumError extends DomainError {
  constructor(total: number, min: number) {
    super(
      'credits-below-minimum',
      `Los créditos seleccionados (${total}) están por debajo del mínimo (${min}).`,
    );
  }
}

export class PrerequisiteNotMetError extends DomainError {
  constructor(courseId: string, missingPrereq: string) {
    super('prerequisite-not-met', `El curso ${courseId} requiere haber aprobado ${missingPrereq}.`);
  }
}

export class PeriodNotActiveError extends DomainError {
  constructor(periodId: string) {
    super('period-not-active', `El período ${periodId} no está activo.`);
  }
}

export class CourseNotFoundError extends DomainError {
  constructor(courseId: string) {
    super('course-not-found', `Curso no encontrado: ${courseId}.`);
  }
}

export class NoSolutionFoundError extends DomainError {
  constructor(reason?: string) {
    super(
      'no-solution-found',
      reason
        ? `No se encontró una asignación válida: ${reason}.`
        : 'No se encontró una asignación de horario válida con las restricciones actuales.',
    );
  }
}

export class ScheduleTimeoutError extends DomainError {
  constructor(elapsedMs: number, limitMs: number) {
    super(
      'schedule-timeout',
      `La generación de horarios superó el tiempo límite (${elapsedMs}ms / ${limitMs}ms). Intenta reducir la cantidad de cursos.`,
    );
  }
}

export class NoQualifiedTeacherError extends DomainError {
  constructor(courseId: string) {
    super(
      'no-qualified-teacher',
      `No hay docentes calificados disponibles para el curso ${courseId}.`,
    );
  }
}

export class ClassroomNotSuitableError extends DomainError {
  constructor(courseId: string, reason: string) {
    super(
      'classroom-not-suitable',
      `No se encontró un aula adecuada para el curso ${courseId}: ${reason}.`,
    );
  }
}
