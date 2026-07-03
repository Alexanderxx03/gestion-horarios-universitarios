import mongoose, { Schema, Document } from 'mongoose';

export interface ICarrera extends Document {
  nombre: string;
  facultad: string;
  totalSemestres: number;
}

const CarreraSchema: Schema = new Schema(
  {
    nombre: { type: String, required: true, unique: true },
    facultad: { type: String, required: true },
    totalSemestres: { type: Number, required: true, default: 10 },
  },
  { timestamps: false },
);

export const CareerModel = mongoose.model<ICarrera>('carreras', CarreraSchema);
