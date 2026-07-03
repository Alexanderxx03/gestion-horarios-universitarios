const mongoose = require('mongoose');

const NOMBRES = ["Alejandro", "María", "José", "Lucía", "Carlos", "Sofía", "Juan", "Martina", "Diego", "Paula", "Luis", "Valeria", "Miguel", "Fernanda", "Javier", "Camila", "Andrés", "Daniela", "Mateo", "Valentina", "David", "Isabella", "Fernando", "Mariana", "Sebastián", "Victoria", "Jorge", "Gabriela", "Ricardo", "Elena"];
const APELLIDOS = ["García", "Rodríguez", "González", "Fernández", "López", "Martínez", "Sánchez", "Pérez", "Gómez", "Martín", "Ruiz", "Hernández", "Díaz", "Moreno", "Muñoz", "Álvarez", "Romero", "Alonso", "Gutiérrez", "Navarro", "Torres", "Domínguez", "Vázquez", "Ramos", "Gil", "Ramírez", "Serrano", "Blanco", "Molina", "Morales"];

function getRandomName() {
  const n1 = NOMBRES[Math.floor(Math.random() * NOMBRES.length)];
  const n2 = NOMBRES[Math.floor(Math.random() * NOMBRES.length)];
  const a1 = APELLIDOS[Math.floor(Math.random() * APELLIDOS.length)];
  const a2 = APELLIDOS[Math.floor(Math.random() * APELLIDOS.length)];
  return `${n1} ${n2} ${a1} ${a2}`;
}

async function run() {
  console.log("Conectando a MongoDB...");
  await mongoose.connect('mongodb://127.0.0.1:27017/gestion-horarios');
  console.log("Conectado.");

  const db = mongoose.connection.db;

  console.log("Limpiando datos de estudiantes existentes...");
  await db.collection('usuarios').deleteMany({ rol: 'STUDENT' });
  await db.collection('estudiantes').deleteMany({});
  await db.collection('matriculas').deleteMany({});

  const carreras = await db.collection('carreras').find({}).toArray();
  const cursos = await db.collection('cursos').find({}).toArray();
  const periodos = await db.collection('periodos_academicos').find({ activo: true }).toArray();

  if (periodos.length === 0) {
    console.error("No hay periodo activo. Saliendo.");
    process.exit(1);
  }
  const periodoId = periodos[0]._id;

  console.log(`Encontradas ${carreras.length} carreras y ${cursos.length} cursos.`);

  const usuariosBatch = [];
  const estudiantesBatch = [];
  const matriculasBatch = [];

  let userIdCounter = 10000;

  for (const carrera of carreras) {
    for (let ciclo = 1; ciclo <= 10; ciclo++) {
      // Cursos de esta carrera y ciclo
      const cursosCiclo = cursos.filter(c => c.carreraId.toString() === carrera._id.toString() && c.semestre === ciclo);
      
      let creditosTotales = 0;
      const cursosSeleccionados = cursosCiclo.map(c => {
        creditosTotales += c.creditos || 0;
        return {
          cursoId: c._id,
          creditos: c.creditos || 0
        };
      });

      for (let i = 0; i < 15; i++) {
        userIdCounter++;
        const userId = new mongoose.Types.ObjectId();
        const estudianteId = new mongoose.Types.ObjectId();
        
        usuariosBatch.push({
          _id: userId,
          correo: `estudiante${userIdCounter}@unihorarios.edu.pe`,
          authProvider: 'local',
          nombreCompleto: getRandomName(),
          rol: 'STUDENT',
          activo: true,
          createdAt: new Date(),
          updatedAt: new Date()
        });

        estudiantesBatch.push({
          _id: estudianteId,
          usuarioId: userId,
          carreraId: carrera._id,
          ciclo: ciclo,
          activo: true,
          createdAt: new Date(),
          updatedAt: new Date()
        });

        matriculasBatch.push({
          estudianteId: userId, // EnrollmentModel usa usuarioId para el populate
          periodoId: periodoId,
          estado: 'VALIDADA',
          cursosSeleccionados: cursosSeleccionados,
          creditosTotales: creditosTotales,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }
  }

  console.log("Insertando usuarios...");
  await db.collection('usuarios').insertMany(usuariosBatch);
  console.log("Insertando estudiantes...");
  await db.collection('estudiantes').insertMany(estudiantesBatch);
  console.log("Insertando matriculas...");
  await db.collection('matriculas').insertMany(matriculasBatch);

  console.log("¡Datos generados con éxito!");
  await mongoose.disconnect();
}

run().catch(console.error);
