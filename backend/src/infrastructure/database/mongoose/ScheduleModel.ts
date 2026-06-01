import mongoose, { Schema, Document } from 'mongoose';

export interface IHorario extends Document {
  periodoId: mongoose.Types.ObjectId;
  estado: 'PENDIENTE' | 'EN_PROGRESO' | 'GENERADO' | 'FALLIDO';
  tiempoGeneracionMs: number;
  conflictosEncontrados: number;
  asignaciones: {
    cursoId: mongoose.Types.ObjectId;
    docenteId: mongoose.Types.ObjectId;
    aulaId: mongoose.Types.ObjectId;
    diaSemana: number;
    horaInicio: string;
    horaFin: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const HorarioSchema: Schema = new Schema(
  {
    periodoId: {
      type: Schema.Types.ObjectId,
      ref: 'periodos_academicos',
      required: true,
      index: true,
    },
    estado: {
      type: String,
      enum: ['PENDIENTE', 'EN_PROGRESO', 'GENERADO', 'FALLIDO'],
      required: true,
    },
    tiempoGeneracionMs: { type: Number, required: true },
    conflictosEncontrados: { type: Number, required: true },
    asignaciones: [
      {
        cursoId: { type: Schema.Types.ObjectId, ref: 'cursos' },
        docenteId: { type: Schema.Types.ObjectId, ref: 'docentes' },
        aulaId: { type: Schema.Types.ObjectId, ref: 'aulas' },
        diaSemana: { type: Number, required: true },
        horaInicio: { type: String, required: true },
        horaFin: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

export const ScheduleModel = mongoose.model<IHorario>('horarios', HorarioSchema);
