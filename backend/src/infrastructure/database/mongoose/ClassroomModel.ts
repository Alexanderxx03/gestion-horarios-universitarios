import mongoose, { Schema, Document } from 'mongoose';

export interface IAula extends Document {
  nombre: string;
  pabellon: string;
  piso: number;
  capacidad: number;
  esLaboratorio: boolean;
  tieneProyector: boolean;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AulaSchema: Schema = new Schema(
  {
    nombre: { type: String, required: true },
    pabellon: { type: String, required: true },
    piso: { type: Number, required: true },
    capacidad: { type: Number, required: true },
    esLaboratorio: { type: Boolean, default: false },
    tieneProyector: { type: Boolean, default: true },
    activo: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

export const ClassroomModel = mongoose.model<IAula>('aulas', AulaSchema);
