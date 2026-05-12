import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import scheduleRoutes from './infrastructure/http/routes/schedule.routes';
import courseRoutes from './infrastructure/http/routes/course.routes';
import enrollmentRoutes from './infrastructure/http/routes/enrollment.routes';
import authRoutes from './infrastructure/http/routes/auth.routes';
import logRoutes from './infrastructure/http/routes/log.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/logs', logRoutes);

// Conexión a MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gestion-horarios';
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('📦 Conectado a MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error conectando a MongoDB:', error);
  });
