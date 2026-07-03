import mongoose, { Schema, Document } from 'mongoose';

export interface IEstudiante extends Document {
  usuarioId: mongoose.Types.ObjectId;
  carreraId: mongoose.Types.ObjectId;
  ciclo: number;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EstudianteSchema: Schema = new Schema(
  {
    usuarioId: { type: Schema.Types.ObjectId, ref: 'usuarios', required: true, index: true },
    carreraId: { type: Schema.Types.ObjectId, ref: 'carreras', required: true, index: true },
    ciclo: { type: Number, required: true, min: 1, max: 10 },
    activo: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

export const StudentModel = mongoose.model<IEstudiante>('estudiantes', EstudianteSchema);
