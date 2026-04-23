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
    super(
      'prerequisite-not-met',
      `El curso ${courseId} requiere haber aprobado ${missingPrereq}.`,
    );
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
