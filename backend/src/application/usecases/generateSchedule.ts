/**
 * Caso de uso: Generar horario académico.
 *
 * Orquesta el flujo completo:
 * 1. Carga datos del período activo
 * 2. Construye el problema CSP a partir de los datos
 * 3. Ejecuta el solver
 * 4. Guarda el resultado en el repositorio de horarios
 */
import type { CSPProblem, CSPVariable } from '../../domain/model/cspTypes';
import type { TimeSlot } from '../../domain/model/teacher';
import type { ScheduleAssignment } from '../../domain/model/schedule';
import type {
  CourseRepoPort,
  TeacherRepoPort,
  ClassroomRepoPort,
  ScheduleRepoPort,
  AcademicPeriodRepoPort,
} from '../../domain/ports/ports';
import { NoSolutionFoundError, PeriodNotActiveError } from '../../domain/errors';
import { CSPSolver } from './cspSolver';
import { Worker } from 'worker_threads';
import path from 'path';

/** Franjas horarias estándar del sistema académico (bloques de 2 horas) */
const SYSTEM_TIME_SLOTS: TimeSlot[] = [
  // Lunes
  { dayOfWeek: 1, startTime: '07:00', endTime: '09:00' },
  { dayOfWeek: 1, startTime: '09:00', endTime: '11:00' },
  { dayOfWeek: 1, startTime: '11:00', endTime: '13:00' },
  { dayOfWeek: 1, startTime: '14:00', endTime: '16:00' },
  { dayOfWeek: 1, startTime: '16:00', endTime: '18:00' },
  // Martes
  { dayOfWeek: 2, startTime: '07:00', endTime: '09:00' },
  { dayOfWeek: 2, startTime: '09:00', endTime: '11:00' },
  { dayOfWeek: 2, startTime: '11:00', endTime: '13:00' },
  { dayOfWeek: 2, startTime: '14:00', endTime: '16:00' },
  { dayOfWeek: 2, startTime: '16:00', endTime: '18:00' },
  // Miércoles
  { dayOfWeek: 3, startTime: '07:00', endTime: '09:00' },
  { dayOfWeek: 3, startTime: '09:00', endTime: '11:00' },
  { dayOfWeek: 3, startTime: '11:00', endTime: '13:00' },
  { dayOfWeek: 3, startTime: '14:00', endTime: '16:00' },
  { dayOfWeek: 3, startTime: '16:00', endTime: '18:00' },
  // Jueves
  { dayOfWeek: 4, startTime: '07:00', endTime: '09:00' },
  { dayOfWeek: 4, startTime: '09:00', endTime: '11:00' },
  { dayOfWeek: 4, startTime: '11:00', endTime: '13:00' },
  { dayOfWeek: 4, startTime: '14:00', endTime: '16:00' },
  { dayOfWeek: 4, startTime: '16:00', endTime: '18:00' },
  // Viernes
  { dayOfWeek: 5, startTime: '07:00', endTime: '09:00' },
  { dayOfWeek: 5, startTime: '09:00', endTime: '11:00' },
  { dayOfWeek: 5, startTime: '11:00', endTime: '13:00' },
  { dayOfWeek: 5, startTime: '14:00', endTime: '16:00' },
  { dayOfWeek: 5, startTime: '16:00', endTime: '18:00' },
  // Sábado (opcional)
  { dayOfWeek: 6, startTime: '08:00', endTime: '10:00' },
  { dayOfWeek: 6, startTime: '10:00', endTime: '12:00' },
];

export interface GenerateScheduleInput {
  periodId: string;
  carreraId?: string;
  ciclo?: number;
}

export interface GenerateScheduleDeps {
  courses: CourseRepoPort;
  teachers: TeacherRepoPort;
  classrooms: ClassroomRepoPort;
  schedules: ScheduleRepoPort;
  periods: AcademicPeriodRepoPort;
}

export interface GenerateScheduleOutput {
  scheduleId: string;
  assignmentCount: number;
  generationTimeMs: number;
  nodesExplored: number;
  backtracks: number;
}

/**
 * Genera un horario académico óptimo para un período dado.
 *
 * Pasos:
 * 1. Verifica que el período esté activo
 * 2. Carga cursos activos, docentes y aulas
 * 3. Construye el problema CSP
 * 4. Ejecuta el solver con Backtracking + MRV + Forward Checking
 * 5. Guarda el resultado en Firestore
 */
export async function generateSchedule(
  input: GenerateScheduleInput,
  deps: GenerateScheduleDeps,
): Promise<GenerateScheduleOutput> {
  // 1. Verificar período activo
  const period = await deps.periods.findById(input.periodId);
  if (!period || !period.isActive) {
    throw new PeriodNotActiveError(input.periodId);
  }

  // 2. Cargar datos en paralelo
  const [courses, teachers, classrooms] = await Promise.all([
    deps.courses.findAll(),
    deps.teachers.findAll(),
    deps.classrooms.findActive(),
  ]);

  let activeCourses = courses.filter((c) => c.isActive);

  if (input.carreraId) {
    activeCourses = activeCourses.filter((c) => c.careerId === input.carreraId);
  }
  
  if (input.ciclo) {
    // Note: Some models use strings for ciclo/semester. Coerce to string for comparison if needed
    activeCourses = activeCourses.filter((c) => c.semester.toString() === input.ciclo?.toString());
  }

  // 3. Construir problema CSP
  const problem = buildCSPProblem(activeCourses, teachers, classrooms);

  // 4. Ejecutar solver en un Worker Thread para no bloquear el Event Loop principal
  const workerFile = __filename.endsWith('.ts')
    ? path.join(__dirname, '../workers/cspWorker.ts')
    : path.join(__dirname, '../workers/cspWorker.js');

  const result: any = await new Promise((resolve, reject) => {
    // Si estamos en entorno de desarrollo con ts-node, inyectamos execArgv
    const workerOptions = __filename.endsWith('.ts') 
      ? { execArgv: ['-r', 'ts-node/register'] } 
      : {};

    const worker = new Worker(workerFile, workerOptions);
    
    worker.postMessage(problem);

    worker.on('message', (msg) => {
      if (msg.success) resolve(msg.result);
      else reject(new Error(msg.error));
    });

    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });

  if (!result.success) {
    // Guardar intento fallido
    await deps.schedules.create({
      periodId: input.periodId,
      status: 'FAILED',
      assignments: [],
      generationTimeMs: result.stats.totalTimeMs,
      conflictsFound: 0,
    });
    throw new NoSolutionFoundError(
      `Después de explorar ${result.stats.nodesExplored} nodos y ${result.stats.totalBacktracks} retrocesos en ${result.stats.totalTimeMs}ms`,
    );
  }

  // 5. Convertir asignaciones CSP a formato de dominio
  const assignments: ScheduleAssignment[] = result.assignments.map((a: any) => ({
    courseId: a.variable.courseId,
    courseName: a.variable.courseName,
    teacherId: a.value.teacherId,
    teacherName: a.value.teacherName,
    classroomId: a.value.classroomId,
    classroomName: a.value.classroomName,
    dayOfWeek: a.value.dayOfWeek,
    startTime: a.value.startTime,
    endTime: a.value.endTime,
    groupSize: a.variable.maxCapacity,
  }));

  // 6. Guardar horario generado
  const schedule = await deps.schedules.create({
    periodId: input.periodId,
    status: 'GENERATED',
    assignments,
    generationTimeMs: result.stats.totalTimeMs,
    conflictsFound: 0,
  });

  return {
    scheduleId: schedule.id,
    assignmentCount: assignments.length,
    generationTimeMs: result.stats.totalTimeMs,
    nodesExplored: result.stats.nodesExplored,
    backtracks: result.stats.totalBacktracks,
  };
}

/**
 * Construye un `CSPProblem` a partir de datos crudos de Firestore.
 */
function buildCSPProblem(
  courses: Array<{
    id: string;
    name: string;
    weeklyHours: number;
    requiresLab: boolean;
    maxCapacity: number;
  }>,
  teachers: Array<{
    id: string;
    userId: string;
    qualifiedCourses: string[];
    availability: TimeSlot[];
  }>,
  classrooms: Array<{ id: string; name: string; capacity: number; isLab: boolean }>,
): CSPProblem {
  // Mapa de docentes por curso calificado
  const teachersByCourse = new Map<string, string[]>();
  const teacherAvailability = new Map<string, TimeSlot[]>();
  const teacherNames = new Map<string, string>();

  for (const teacher of teachers) {
    teacherAvailability.set(teacher.id, teacher.availability);
    teacherNames.set(teacher.id, teacher.userId); // en prod esto sería el nombre

    for (const courseId of teacher.qualifiedCourses) {
      const existing = teachersByCourse.get(courseId) ?? [];
      existing.push(teacher.id);
      teachersByCourse.set(courseId, existing);
    }
  }

  // Mapa de aulas
  const classroomInfo = new Map<string, { name: string; capacity: number; isLab: boolean }>();
  for (const classroom of classrooms) {
    classroomInfo.set(classroom.id, {
      name: classroom.name,
      capacity: classroom.capacity,
      isLab: classroom.isLab,
    });
  }

  // Variables CSP: una por curso
  const variables: CSPVariable[] = courses.map((course) => ({
    courseId: course.id,
    courseName: course.name,
    weeklyHours: course.weeklyHours,
    requiresLab: course.requiresLab,
    maxCapacity: course.maxCapacity,
    qualifiedTeacherIds: teachersByCourse.get(course.id) ?? [],
  }));

  return {
    variables,
    teacherAvailability,
    teacherNames,
    classroomInfo,
    availableTimeSlots: SYSTEM_TIME_SLOTS,
  };
}
