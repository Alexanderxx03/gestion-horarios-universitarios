import mongoose, { Schema, Document } from 'mongoose';

export interface IRegistro extends Document {
  ejecucionId: string;
  paso: number;
  mensaje: string;
  fecha: Date;
  datos?: any;
}

const RegistroSchema: Schema = new Schema({
  ejecucionId: { type: String, required: true },
  paso: { type: Number, required: true },
  mensaje: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  datos: { type: Schema.Types.Mixed },
});

export default mongoose.model<IRegistro>('registros', RegistroSchema);
