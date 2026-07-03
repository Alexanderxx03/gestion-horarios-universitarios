import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import scheduleRoutes from './infrastructure/http/routes/schedule.routes';
import courseRoutes from './infrastructure/http/routes/course.routes';
import enrollmentRoutes from './infrastructure/http/routes/enrollment.routes';
import authRoutes from './infrastructure/http/routes/auth.routes';
import logRoutes from './infrastructure/http/routes/log.routes';
import teacherRoutes from './infrastructure/http/routes/teacher.routes';
import classroomRoutes from './infrastructure/http/routes/classroom.routes';
import { careerRoutes } from './infrastructure/http/routes/career.routes';
import dotenv from 'dotenv';
import { logger } from './shared/logger';
import { setupSwagger } from './shared/swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares de Seguridad OWASP Top 10
app.use(helmet());
app.use(mongoSanitize());

// Límite de peticiones (Rate Limiting) para evitar fuerza bruta y DDoS
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas peticiones desde esta IP, por favor intente de nuevo tras 15 minutos',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(compression());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/careers', careerRoutes);

// Documentación de API (Swagger)
setupSwagger(app);

// Conexión a MongoDB (Local / Compass)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gestion-horarios';
mongoose
  .connect(MONGO_URI)
  .then(() => {
    logger.info('📦 Conectado exitosamente a MongoDB');
    app.listen(PORT, () => {
      logger.info(`🚀 Servidor backend MERN corriendo en http://localhost:${PORT}`);
      logger.info(`📄 Documentación Swagger: http://localhost:${PORT}/api/docs`);
    });
  })
  .catch((error) => {
    logger.error(`❌ Error conectando a MongoDB: ${error.message}`);
  });
