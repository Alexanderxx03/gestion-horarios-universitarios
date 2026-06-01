import mongoose, { Schema, Document } from 'mongoose';

export interface IAcademicPeriod extends Document {
  nombre: string;
  activo: boolean;
  creditosMinimos: number;
  creditosMaximos: number;
  createdAt: Date;
  updatedAt: Date;
}

const AcademicPeriodSchema: Schema = new Schema(
  {
    nombre: { type: String, required: true, unique: true },
    activo: { type: Boolean, default: false },
    creditosMinimos: { type: Number, default: 12 },
    creditosMaximos: { type: Number, default: 22 },
  },
  { timestamps: true },
);

export const AcademicPeriodModel = mongoose.model<IAcademicPeriod>(
  'periodos_academicos',
  AcademicPeriodSchema,
);
