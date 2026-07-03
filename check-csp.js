import mongoose from 'mongoose';
import { CourseModel } from './backend/src/infrastructure/database/mongoose/CourseModel.js';
import { TeacherModel } from './backend/src/infrastructure/database/mongoose/TeacherModel.js';
import { CareerModel } from './backend/src/infrastructure/database/mongoose/CareerModel.js';
import { ClassroomModel } from './backend/src/infrastructure/database/mongoose/ClassroomModel.js';

async function check() {
  await mongoose.connect('mongodb://127.0.0.1:27017/gestion-horarios');
  
  const carrera = await CareerModel.findOne({ nombre: 'Medicina Humana' });
  const cursos = await CourseModel.find({ carreraId: carrera._id, semestre: 1 });
  
  console.log(`Cursos de Medicina Ciclo 1 (${cursos.length}):`);
  
  for (const curso of cursos) {
    const profes = await TeacherModel.find({ cursosHabilitados: curso._id });
    console.log(`- ${curso.nombre} (ReqLab: ${curso.requiereLaboratorio}, Cap: ${curso.capacidadMaxima}): ${profes.length} docentes habilitados`);
  }

  const laboratorios = await ClassroomModel.countDocuments({ esLaboratorio: true });
  const aulasNormales = await ClassroomModel.countDocuments({ esLaboratorio: false });
  const aulasCapacidad = await ClassroomModel.find({}, { capacidad: 1 }).sort({ capacidad: -1 }).limit(1);

  console.log(`\nLaboratorios: ${laboratorios}, Aulas Normales: ${aulasNormales}, Max Capacidad: ${aulasCapacidad[0]?.capacidad}`);

  process.exit(0);
}

check().catch(console.error);
