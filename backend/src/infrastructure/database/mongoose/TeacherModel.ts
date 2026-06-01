import mongoose, { Schema, Document } from 'mongoose';

export interface IDocente extends Document {
  usuarioId: mongoose.Types.ObjectId;
  codigoEmpleado: string;
  departamento: string;
  horasMaximasSemanales: number;
  cursosHabilitados: mongoose.Types.ObjectId[];
  disponibilidad: {
    diaSemana: number;
    horaInicio: string;
    horaFin: string;
  }[];
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DocenteSchema: Schema = new Schema(
  {
    usuarioId: { type: Schema.Types.ObjectId, ref: 'usuarios', required: true, index: true },
    codigoEmpleado: { type: String, required: true, unique: true },
    departamento: { type: String, required: true },
    horasMaximasSemanales: { type: Number, required: true },
    cursosHabilitados: [{ type: Schema.Types.ObjectId, ref: 'cursos' }],
    disponibilidad: [
      {
        diaSemana: { type: Number, required: true },
        horaInicio: { type: String, required: true },
        horaFin: { type: String, required: true },
      },
    ],
    activo: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

export const TeacherModel = mongoose.model<IDocente>('docentes', DocenteSchema);
