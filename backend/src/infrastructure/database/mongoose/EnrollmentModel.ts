import mongoose, { Schema, Document } from 'mongoose';

export interface IMatricula extends Document {
  estudianteId: mongoose.Types.ObjectId;
  periodoId: mongoose.Types.ObjectId;
  estado: 'PENDIENTE' | 'VALIDADA' | 'RECHAZADA';
  cursosSeleccionados: {
    cursoId: mongoose.Types.ObjectId;
    creditos: number;
  }[];
  creditosTotales: number;
  createdAt: Date;
  updatedAt: Date;
}

const MatriculaSchema: Schema = new Schema(
  {
    estudianteId: { type: Schema.Types.ObjectId, ref: 'usuarios', required: true },
    periodoId: { type: Schema.Types.ObjectId, ref: 'periodos_academicos', required: true },
    estado: { type: String, enum: ['PENDIENTE', 'VALIDADA', 'RECHAZADA'], default: 'PENDIENTE' },
    cursosSeleccionados: [
      {
        cursoId: { type: Schema.Types.ObjectId, ref: 'cursos', required: true },
        creditos: { type: Number, required: true },
      },
    ],
    creditosTotales: { type: Number, required: true },
  },
  { timestamps: true },
);

export const EnrollmentModel = mongoose.model<IMatricula>('matriculas', MatriculaSchema);
