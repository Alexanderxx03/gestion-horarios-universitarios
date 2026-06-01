import type { Schedule, ScheduleAssignment } from '../../../../domain/model/schedule';
import type { ScheduleRepoPort } from '../../../../domain/ports/ports';
import { ScheduleModel } from '../ScheduleModel';
import { TeacherModel } from '../TeacherModel';
import { UsuarioModel } from '../UserModel';
import { CourseModel } from '../CourseModel';
import { ClassroomModel } from '../ClassroomModel';

console.log('🔄 Registrando esquemas de Mongoose para ScheduleRepository:', [
  TeacherModel.modelName,
  UsuarioModel.modelName,
  CourseModel.modelName,
  ClassroomModel.modelName,
]);

export class MongooseScheduleRepository implements ScheduleRepoPort {
  async findById(id: string): Promise<Schedule | null> {
    const doc = await ScheduleModel.findById(id)
      .populate('asignaciones.cursoId')
      .populate('asignaciones.aulaId')
      .populate({
        path: 'asignaciones.docenteId',
        populate: {
          path: 'usuarioId',
        },
      });
    if (!doc) return null;
    return this.mapToDomain(doc);
  }

  async findByPeriod(periodId: string): Promise<Schedule[]> {
    const docs = await ScheduleModel.find({ periodoId: periodId })
      .populate('asignaciones.cursoId')
      .populate('asignaciones.aulaId')
      .populate({
        path: 'asignaciones.docenteId',
        populate: {
          path: 'usuarioId',
        },
      });
    return docs.map((doc) => this.mapToDomain(doc));
  }

  private statusToDb(status: Schedule['status']): string {
    switch (status) {
      case 'PENDING':
        return 'PENDIENTE';
      case 'IN_PROGRESS':
        return 'EN_PROGRESO';
      case 'GENERATED':
        return 'GENERADO';
      case 'FAILED':
        return 'FALLIDO';
      default:
        return 'PENDIENTE';
    }
  }

  private statusToDomain(estado: string): Schedule['status'] {
    switch (estado) {
      case 'PENDIENTE':
        return 'PENDING';
      case 'EN_PROGRESO':
        return 'IN_PROGRESS';
      case 'GENERADO':
        return 'GENERATED';
      case 'FALLIDO':
        return 'FAILED';
      default:
        return 'PENDING';
    }
  }

  async create(input: {
    periodId: string;
    status: Schedule['status'];
    assignments: ScheduleAssignment[];
    generationTimeMs: number;
    conflictsFound: number;
  }): Promise<Schedule> {
    const newDoc = new ScheduleModel({
      periodoId: input.periodId,
      estado: this.statusToDb(input.status),
      tiempoGeneracionMs: input.generationTimeMs,
      conflictosEncontrados: input.conflictsFound,
      asignaciones: input.assignments.map((a) => ({
        cursoId: a.courseId,
        docenteId: a.teacherId,
        aulaId: a.classroomId,
        diaSemana: a.dayOfWeek,
        horaInicio: a.startTime,
        horaFin: a.endTime,
      })),
    });
    const saved = await newDoc.save();

    return {
      id: saved._id.toString(),
      periodId: saved.periodoId.toString(),
      status: this.statusToDomain(saved.estado),
      generatedAt: saved.createdAt ? saved.createdAt.toISOString() : new Date().toISOString(),
      generationTimeMs: saved.tiempoGeneracionMs,
      conflictsFound: saved.conflictosEncontrados,
      assignments: input.assignments,
    };
  }

  async updateStatus(id: string, status: Schedule['status']): Promise<void> {
    await ScheduleModel.updateOne({ _id: id }, { estado: this.statusToDb(status) });
  }

  private mapToDomain(doc: any): Schedule {
    return {
      id: doc._id.toString(),
      periodId: doc.periodoId.toString(),
      status: this.statusToDomain(doc.estado),
      generatedAt: doc.createdAt ? doc.createdAt.toISOString() : new Date().toISOString(),
      generationTimeMs: doc.tiempoGeneracionMs,
      conflictsFound: doc.conflictosEncontrados,
      assignments: doc.asignaciones.map((a: any) => ({
        courseId: a.cursoId ? (a.cursoId._id || a.cursoId).toString() : '',
        courseName: a.cursoId ? a.cursoId.nombre || '' : '',
        teacherId: a.docenteId ? (a.docenteId._id || a.docenteId).toString() : '',
        teacherName:
          a.docenteId && a.docenteId.usuarioId
            ? a.docenteId.usuarioId.nombreCompleto || a.docenteId.usuarioId.toString()
            : '',
        classroomId: a.aulaId ? (a.aulaId._id || a.aulaId).toString() : '',
        classroomName: a.aulaId ? a.aulaId.nombre || '' : '',
        dayOfWeek: a.diaSemana,
        startTime: a.horaInicio,
        endTime: a.horaFin,
        groupSize: a.cursoId ? a.cursoId.capacidadMaxima || 0 : 0,
      })),
    };
  }
}
