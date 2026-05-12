import mongoose, { Schema, Document } from 'mongoose';

export interface ILog extends Document {
  executionId: string;
  step: number;
  message: string;
  timestamp: Date;
  data?: any;
}

const LogSchema: Schema = new Schema({
  executionId: { type: String, required: true },
  step: { type: Number, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  data: { type: Schema.Types.Mixed },
});

export default mongoose.model<ILog>('Log', LogSchema);
