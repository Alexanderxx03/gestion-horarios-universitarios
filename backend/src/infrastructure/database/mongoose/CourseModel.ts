import mongoose, { Schema, Document } from 'mongoose';

export interface ICurso extends Document {
  codigo: string;
  nombre: string;
  creditos: number;
  horasSemanales: number;
  requiereLaboratorio: boolean;
  capacidadMaxima: number;
  prerrequisitos: mongoose.Types.ObjectId[];
  carreraId: mongoose.Types.ObjectId;
  semestre: number;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CursoSchema: Schema = new Schema(
  {
    codigo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    creditos: { type: Number, required: true },
    horasSemanales: { type: Number, required: true },
    requiereLaboratorio: { type: Boolean, default: false },
    capacidadMaxima: { type: Number, required: true },
    prerrequisitos: [{ type: Schema.Types.ObjectId, ref: 'cursos' }],
    carreraId: { type: Schema.Types.ObjectId, ref: 'carreras', required: true, index: true },
    semestre: { type: Number, required: true },
    activo: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

export const CourseModel = mongoose.model<ICurso>('cursos', CursoSchema);
