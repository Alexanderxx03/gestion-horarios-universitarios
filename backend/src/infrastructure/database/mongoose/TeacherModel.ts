import mongoose, { Schema, Document } from 'mongoose';

export interface ITeacher extends Document {
  userId: string;
  employeeCode: string;
  department: string;
  maxHoursPerWeek: number;
  qualifiedCourses: mongoose.Types.ObjectId[];
  availability: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }[];
}

const TeacherSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    employeeCode: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    maxHoursPerWeek: { type: Number, required: true },
    qualifiedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    availability: [
      {
        dayOfWeek: { type: Number, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

export const TeacherModel = mongoose.model<ITeacher>('Teacher', TeacherSchema);
