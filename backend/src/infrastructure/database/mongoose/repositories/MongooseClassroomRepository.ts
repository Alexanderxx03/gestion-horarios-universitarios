import type { Classroom } from '../../../../domain/model/classroom';
import type { ClassroomRepoPort } from '../../../../domain/ports/ports';
import { ClassroomModel } from '../ClassroomModel';

export class MongooseClassroomRepository implements ClassroomRepoPort {
  async findAll(): Promise<Classroom[]> {
    const docs = await ClassroomModel.find().lean();
    return docs.map((doc) => this.mapToDomain(doc));
  }

  async findActive(): Promise<Classroom[]> {
    const docs = await ClassroomModel.find({ activo: true }).lean();
    return docs.map((doc) => this.mapToDomain(doc));
  }

  async findById(id: string): Promise<Classroom | null> {
    const doc = await ClassroomModel.findById(id).lean();
    if (!doc) return null;
    return this.mapToDomain(doc);
  }

  private mapToDomain(doc: any): Classroom {
    return {
      id: doc._id.toString(),
      name: doc.nombre,
      building: doc.pabellon,
      floor: doc.piso,
      capacity: doc.capacidad,
      isLab: doc.esLaboratorio,
      hasProjector: doc.tieneProyector,
      isActive: doc.activo,
    };
  }
}
