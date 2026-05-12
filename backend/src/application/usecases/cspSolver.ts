/**
 * Motor CSP (Constraint Satisfaction Problem) para la generación
 * de horarios académicos.
 *
 * Implementa:
 * - Backtracking recursivo
 * - Heurística MRV (Minimum Remaining Values)
 * - Forward Checking (poda de dominios)
 *
 * Es una clase pura sin dependencias de infraestructura.
 * Toda la información necesaria llega a través de `CSPProblem`.
 */
import type {
  CSPAssignment,
  CSPProblem,
  CSPResult,
  CSPValue,
  CSPVariable,
} from '../../domain/model/cspTypes';
import {
  checkNoTeacherOverlap,
  checkNoClassroomOverlap,
  isTeacherAvailable,
  isClassroomSuitable,
} from './constraintChecker';

/** Mapa de dominios: courseId → valores posibles */
type DomainMap = Map<string, CSPValue[]>;

/** Tiempo máximo de ejecución por defecto: 60 segundos */
const DEFAULT_TIMEOUT_MS = 60_000;

export class CSPSolver {
  private backtracks = 0;
  private nodesExplored = 0;
  private startTime = 0;
  private timeoutMs: number;

  constructor(timeoutMs: number = DEFAULT_TIMEOUT_MS) {
    this.timeoutMs = timeoutMs;
  }

  /**
   * Resuelve el problema CSP y retorna el resultado con estadísticas.
   */
  solve(problem: CSPProblem): CSPResult {
    this.backtracks = 0;
    this.nodesExplored = 0;
    this.startTime = Date.now();

    // Construir dominios iniciales para cada variable
    const domains = this.buildInitialDomains(problem);

    // Ejecutar backtracking
    const assignments = this.backtrack([], problem.variables.slice(), domains, problem);

    const totalTimeMs = Date.now() - this.startTime;

    if (assignments === null) {
      return {
        success: false,
        assignments: [],
        stats: {
          totalBacktracks: this.backtracks,
          totalTimeMs,
          nodesExplored: this.nodesExplored,
        },
      };
    }

    return {
      success: true,
      assignments,
      stats: {
        totalBacktracks: this.backtracks,
        totalTimeMs,
        nodesExplored: this.nodesExplored,
      },
    };
  }

  /**
   * Construye los dominios iniciales para cada variable.
   * El dominio de una variable es el conjunto de todas las combinaciones
   * posibles (docente × aula × franja) que cumplen restricciones unarias.
   */
  private buildInitialDomains(problem: CSPProblem): DomainMap {
    const domains: DomainMap = new Map();

    for (const variable of problem.variables) {
      const values: CSPValue[] = [];

      // Para cada docente calificado
      for (const teacherId of variable.qualifiedTeacherIds) {
        const availability = problem.teacherAvailability.get(teacherId);
        if (!availability) continue;

        const teacherName = problem.teacherNames.get(teacherId) ?? teacherId;

        // Para cada aula
        for (const [classroomId, classroomData] of problem.classroomInfo) {
          // HC5 + HC6: verificar capacidad y tipo de aula
          if (
            !isClassroomSuitable(
              variable.maxCapacity,
              variable.requiresLab,
              classroomData.capacity,
              classroomData.isLab,
            )
          ) {
            continue;
          }

          // Para cada franja horaria disponible
          for (const slot of problem.availableTimeSlots) {
            const candidateValue: CSPValue = {
              teacherId,
              teacherName,
              classroomId,
              classroomName: classroomData.name,
              dayOfWeek: slot.dayOfWeek,
              startTime: slot.startTime,
              endTime: slot.endTime,
            };

            // HC4: verificar disponibilidad del docente
            if (isTeacherAvailable(candidateValue, availability)) {
              values.push(candidateValue);
            }
          }
        }
      }

      domains.set(variable.courseId, values);
    }

    return domains;
  }

  /**
   * Algoritmo de backtracking recursivo.
   *
   * @returns Lista de asignaciones si se encuentra solución, `null` si no.
   */
  private backtrack(
    assignments: CSPAssignment[],
    unassigned: CSPVariable[],
    domains: DomainMap,
    problem: CSPProblem,
  ): CSPAssignment[] | null {
    // Verificar timeout
    if (Date.now() - this.startTime > this.timeoutMs) {
      return null;
    }

    // Caso base: todas las variables asignadas → solución encontrada
    if (unassigned.length === 0) {
      return assignments;
    }

    this.nodesExplored++;

    // Heurística MRV: seleccionar variable con menor dominio
    const variable = this.selectVariableMRV(unassigned, domains);

    // Obtener dominio de la variable seleccionada
    const domain = domains.get(variable.courseId) ?? [];

    for (const value of domain) {
      // Verificar consistencia con restricciones duras
      if (!this.isConsistent(value, assignments)) {
        continue;
      }

      // Asignar
      const newAssignment: CSPAssignment = { variable, value };
      const updatedAssignments = [...assignments, newAssignment];
      const remainingVars = unassigned.filter((v) => v.courseId !== variable.courseId);

      // Forward Checking: podar dominios de variables no asignadas
      const prunedDomains = this.forwardCheck(value, remainingVars, domains, updatedAssignments);

      if (prunedDomains !== null) {
        // Ningún dominio quedó vacío → recurrir
        const result = this.backtrack(updatedAssignments, remainingVars, prunedDomains, problem);
        if (result !== null) {
          return result; // ¡Solución encontrada!
        }
      }

      // Backtrack: deshacer
      this.backtracks++;
    }

    return null; // No hay solución desde aquí
  }

  /**
   * Heurística MRV (Minimum Remaining Values).
   * Selecciona la variable con el dominio más pequeño.
   * Esto ataca primero las partes más restringidas del problema,
   * detectando conflictos más rápido.
   */
  private selectVariableMRV(unassigned: CSPVariable[], domains: DomainMap): CSPVariable {
    let bestIdx = 0;
    let bestSize = domains.get(unassigned[0]!.courseId)?.length ?? Infinity;

    for (let i = 1; i < unassigned.length; i++) {
      const size = domains.get(unassigned[i]!.courseId)?.length ?? Infinity;
      if (size < bestSize) {
        bestIdx = i;
        bestSize = size;
      }
    }

    return unassigned[bestIdx]!;
  }

  /**
   * Verifica que un valor candidato sea consistente con todas
   * las asignaciones existentes.
   *
   * Revisa:
   * - HC1: No solapamiento de docente
   * - HC2: No solapamiento de aula
   */
  private isConsistent(value: CSPValue, assignments: CSPAssignment[]): boolean {
    // HC1: no solapamiento de docente
    if (!checkNoTeacherOverlap(value, assignments)) return false;

    // HC2: no solapamiento de aula
    if (!checkNoClassroomOverlap(value, assignments)) return false;

    return true;
  }

  /**
   * Forward Checking: después de asignar un valor, poda los dominios
   * de las variables restantes eliminando valores que serían inconsistentes.
   *
   * @returns Dominios podados, o `null` si algún dominio quedó vacío (dead end).
   */
  private forwardCheck(
    _assignedValue: CSPValue,
    remainingVars: CSPVariable[],
    currentDomains: DomainMap,
    currentAssignments: CSPAssignment[],
  ): DomainMap | null {
    const newDomains: DomainMap = new Map();

    for (const variable of remainingVars) {
      const domain = currentDomains.get(variable.courseId) ?? [];
      const filteredDomain = domain.filter((candidateValue) => {
        // Eliminar valores que violarían HC1 o HC2 con la asignación actual
        return this.isConsistent(candidateValue, currentAssignments);
      });

      if (filteredDomain.length === 0) {
        return null; // Dominio vacío → dead end
      }

      newDomains.set(variable.courseId, filteredDomain);
    }

    return newDomains;
  }
}
