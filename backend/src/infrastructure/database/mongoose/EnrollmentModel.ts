import mongoose, { Schema, Document } from 'mongoose';

export interface IEnrollment extends Document {
  studentId: string;
  periodId: string;
  status: 'PENDING' | 'VALIDATED' | 'REJECTED';
  selectedCourses: {
    courseId: mongoose.Types.ObjectId;
    credits: number;
  }[];
  totalCredits: number;
}

const EnrollmentSchema: Schema = new Schema(
  {
    studentId: { type: String, required: true },
    periodId: { type: String, required: true },
    status: { type: String, enum: ['PENDING', 'VALIDATED', 'REJECTED'], default: 'PENDING' },
    selectedCourses: [
      {
        courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        credits: { type: Number, required: true },
      },
    ],
    totalCredits: { type: Number, required: true },
  },
  { timestamps: true },
);

export const EnrollmentModel = mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);
