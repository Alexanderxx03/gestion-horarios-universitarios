import type { Teacher } from '../../../../domain/model/teacher';
import type { TeacherRepoPort } from '../../../../domain/ports/ports';
import { TeacherModel } from '../TeacherModel';

export class MongooseTeacherRepository implements TeacherRepoPort {
  async findAll(): Promise<Teacher[]> {
    const docs = await TeacherModel.find().lean();
    return docs.map((doc) => this.mapToDomain(doc));
  }

  async findById(id: string): Promise<Teacher | null> {
    const doc = await TeacherModel.findById(id).lean();
    if (!doc) return null;
    return this.mapToDomain(doc);
  }

  async findByQualifiedCourse(courseId: string): Promise<Teacher[]> {
    const docs = await TeacherModel.find({ cursosHabilitados: courseId }).lean();
    return docs.map((doc) => this.mapToDomain(doc));
  }

  private mapToDomain(doc: any): Teacher {
    return {
      id: doc._id.toString(),
      userId: doc.usuarioId.toString(),
      employeeCode: doc.codigoEmpleado,
      department: doc.departamento,
      maxHoursPerWeek: doc.horasMaximasSemanales,
      availability: doc.disponibilidad.map((d: any) => ({
        dayOfWeek: d.diaSemana,
        startTime: d.horaInicio,
        endTime: d.horaFin,
      })),
      qualifiedCourses: doc.cursosHabilitados.map((c: any) => c.toString()),
    };
  }
}
