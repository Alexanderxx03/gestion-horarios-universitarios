import mongoose, { Schema, Document } from 'mongoose';

export interface ISchedule extends Document {
  periodId: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'GENERATED' | 'FAILED';
  generationTimeMs: number;
  conflictsFound: number;
  assignments: {
    courseId: mongoose.Types.ObjectId;
    teacherId: mongoose.Types.ObjectId;
    classroomId: mongoose.Types.ObjectId;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }[];
}

const ScheduleSchema: Schema = new Schema(
  {
    periodId: { type: String, required: true },
    status: {
      type: String,
      enum: ['PENDING', 'IN_PROGRESS', 'GENERATED', 'FAILED'],
      required: true,
    },
    generationTimeMs: { type: Number, required: true },
    conflictsFound: { type: Number, required: true },
    assignments: [
      {
        courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
        teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher' },
        classroomId: { type: Schema.Types.ObjectId, ref: 'Classroom' },
        dayOfWeek: { type: Number, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

export const ScheduleModel = mongoose.model<ISchedule>('Schedule', ScheduleSchema);
