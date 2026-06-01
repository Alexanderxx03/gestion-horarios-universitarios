import type { AcademicPeriod } from '../../../../domain/model/academicPeriod';
import type { AcademicPeriodRepoPort } from '../../../../domain/ports/ports';
import { AcademicPeriodModel } from '../AcademicPeriodModel';

export class MongooseAcademicPeriodRepository implements AcademicPeriodRepoPort {
  async findById(id: string): Promise<AcademicPeriod | null> {
    // Si el ID tiene un formato de Mongoose ObjectId válido, buscamos por ID,
    // de lo contrario intentamos buscar por el campo "nombre" (ej: "2026-I").
    const query = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { nombre: id };
    const doc = await AcademicPeriodModel.findOne(query);
    if (!doc) return null;
    return this.mapToDomain(doc);
  }

  async findActive(): Promise<AcademicPeriod | null> {
    const doc = await AcademicPeriodModel.findOne({ activo: true });
    if (!doc) return null;
    return this.mapToDomain(doc);
  }

  private mapToDomain(doc: any): AcademicPeriod {
    return {
      id: doc._id.toString(),
      name: doc.nombre,
      isActive: doc.activo,
      minCredits: doc.creditosMinimos,
      maxCredits: doc.creditosMaximos,
    };
  }
}
