import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  code: string;
  name: string;
  credits: number;
  weeklyHours: number;
  requiresLab: boolean;
  maxCapacity: number;
}

const CourseSchema: Schema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    credits: { type: Number, required: true },
    weeklyHours: { type: Number, required: true },
    requiresLab: { type: Boolean, default: false },
    maxCapacity: { type: Number, required: true },
  },
  { timestamps: true },
);

export const CourseModel = mongoose.model<ICourse>('Course', CourseSchema);
