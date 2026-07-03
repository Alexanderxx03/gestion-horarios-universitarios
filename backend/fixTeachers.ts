import mongoose from 'mongoose';
import { CourseModel } from './src/infrastructure/database/mongoose/CourseModel';
import { TeacherModel } from './src/infrastructure/database/mongoose/TeacherModel';

async function fixTeachers() {
  await mongoose.connect('mongodb://127.0.0.1:27017/gestion-horarios');
  
  const cursos = await CourseModel.find();
  const profesores = await TeacherModel.find();

  console.log(`Cursos: ${cursos.length}, Profesores: ${profesores.length}`);
  
  // Limpiar habilitaciones previas para hacerlo de cero
  for (const profe of profesores) {
    profe.cursosHabilitados = [];
  }

  // Para cada curso, elegir 4 profesores al azar y asignarles este curso
  for (const curso of cursos) {
    const profesAsignar = [...profesores].sort(() => 0.5 - Math.random()).slice(0, 4);
    for (const profe of profesAsignar) {
      profe.cursosHabilitados.push(curso._id);
    }
  }

  // Guardar profesores
  let guardados = 0;
  for (const profe of profesores) {
    await profe.save();
    guardados++;
  }

  console.log(`Se actualizaron ${guardados} profesores. Ahora cada curso tiene 4 profesores habilitados al azar.`);
  process.exit(0);
}

fixTeachers().catch(console.error);
