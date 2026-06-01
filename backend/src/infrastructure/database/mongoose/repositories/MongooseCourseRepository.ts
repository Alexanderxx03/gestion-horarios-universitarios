import type { Course } from '../../../../domain/model/course';
import type { CourseRepoPort } from '../../../../domain/ports/ports';
import { CourseModel } from '../CourseModel';

export class MongooseCourseRepository implements CourseRepoPort {
  async findByIds(ids: readonly string[]): Promise<Course[]> {
    const docs = await CourseModel.find({ _id: { $in: ids } }).lean();
    return docs.map((doc) => this.mapToDomain(doc));
  }

  async findAll(): Promise<Course[]> {
    const docs = await CourseModel.find().lean();
    return docs.map((doc) => this.mapToDomain(doc));
  }

  async findByPeriod(_periodId: string): Promise<Course[]> {
    // Para simplificar, devolvemos todos los cursos activos ya que no están
    // particionados por período en el esquema de Mongoose actual.
    const docs = await CourseModel.find({ activo: true }).lean();
    return docs.map((doc) => this.mapToDomain(doc));
  }

  private mapToDomain(doc: any): Course {
    return {
      id: doc._id.toString(),
      code: doc.codigo,
      name: doc.nombre,
      credits: doc.creditos,
      weeklyHours: doc.horasSemanales,
      requiresLab: doc.requiereLaboratorio,
      prerequisites: doc.prerrequisitos.map((p: any) => p.toString()),
      maxCapacity: doc.capacidadMaxima,
      isActive: doc.activo,
      careerId: doc.carreraId ? doc.carreraId.toString() : '',
      semester: doc.semestre,
    };
  }
}
