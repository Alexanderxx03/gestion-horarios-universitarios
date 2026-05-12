import mongoose, { Schema, Document } from 'mongoose';

export interface IClassroom extends Document {
  name: string;
  building: string;
  floor: number;
  capacity: number;
  isLab: boolean;
  hasProjector: boolean;
  isActive: boolean;
}

const ClassroomSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    building: { type: String, required: true },
    floor: { type: Number, required: true },
    capacity: { type: Number, required: true },
    isLab: { type: Boolean, default: false },
    hasProjector: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const ClassroomModel = mongoose.model<IClassroom>('Classroom', ClassroomSchema);
