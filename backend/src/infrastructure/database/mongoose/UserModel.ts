import mongoose, { Schema, Document } from 'mongoose';

export interface IUsuario extends Document {
  correo: string;
  hashContrasena: string;
  nombreCompleto: string;
  rol: 'ADMIN' | 'COORDINATOR' | 'TEACHER' | 'STUDENT';
  activo: boolean;
  urlAvatar?: string;
  perfil?: {
    dni?: string;
    telefono?: string;
    sexo?: 'MASCULINO' | 'FEMENINO' | 'OTRO';
    edad?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UsuarioSchema: Schema = new Schema(
  {
    correo: { type: String, required: true, unique: true },
    hashContrasena: { type: String, required: true },
    nombreCompleto: { type: String, required: true },
    rol: {
      type: String,
      enum: ['ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT'],
      default: 'STUDENT',
    },
    activo: { type: Boolean, default: true },
    urlAvatar: { type: String },
    perfil: {
      dni: { type: String },
      telefono: { type: String },
      sexo: { type: String, enum: ['MASCULINO', 'FEMENINO', 'OTRO'] },
      edad: { type: Number },
    },
  },
  { timestamps: true },
);

export const UsuarioModel = mongoose.model<IUsuario>('usuarios', UsuarioSchema);
