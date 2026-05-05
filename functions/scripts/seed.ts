import * as admin from 'firebase-admin';

// Descomentar para conectar a los emuladores locales si existen
// process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
// process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';

admin.initializeApp();
const db = admin.firestore();

async function seed() {
  console.log('🌱 Sembrando base de datos con datos de prueba para CSP...');

  // 1. Período Académico
  console.log('Añadiendo período académico...');
  await db.collection('academicPeriods').doc('2026-1').set({
    name: 'Período 2026-1',
    isActive: true,
    minCredits: 10,
    maxCredits: 22,
  });

  // 2. Aulas
  console.log('Añadiendo aulas...');
  const classrooms = [
    {
      id: 'aula-101',
      name: 'Aula 101',
      building: 'Pabellón A',
      floor: 1,
      capacity: 40,
      isLab: false,
      hasProjector: true,
      isActive: true,
    },
    {
      id: 'lab-A',
      name: 'Laboratorio A',
      building: 'Pabellón B',
      floor: 2,
      capacity: 25,
      isLab: true,
      hasProjector: true,
      isActive: true,
    },
  ];
  for (const c of classrooms) {
    await db.collection('classrooms').doc(c.id).set(c);
  }

  // 3. Cursos
  console.log('Añadiendo cursos...');
  const courses = [
    {
      id: 'course-mat',
      code: 'MAT101',
      name: 'Matemáticas I',
      credits: 4,
      weeklyHours: 4,
      requiresLab: false,
      prerequisites: [],
      maxCapacity: 40,
      isActive: true,
      careerId: 'SIS',
      semester: 1,
    },
    {
      id: 'course-prog',
      code: 'PROG101',
      name: 'Programación Básica',
      credits: 4,
      weeklyHours: 4,
      requiresLab: true,
      prerequisites: [],
      maxCapacity: 25,
      isActive: true,
      careerId: 'SIS',
      semester: 1,
    },
    {
      id: 'course-arq',
      code: 'ARQ201',
      name: 'Arquitectura de Software',
      credits: 4,
      weeklyHours: 4,
      requiresLab: false,
      prerequisites: ['course-prog'],
      maxCapacity: 40,
      isActive: true,
      careerId: 'SIS',
      semester: 2,
    },
  ];
  for (const c of courses) {
    await db.collection('courses').doc(c.id).set(c);
  }

  // 4. Usuarios en Auth y Teachers
  console.log('Añadiendo usuarios y profesores...');
  const teacherUsers = [
    {
      uid: 'uid-jheyson',
      email: 'jheyson@universidad.edu.pe',
      displayName: 'Jheyson Paul Paytan Huaman',
      role: 'TEACHER',
    },
    {
      uid: 'uid-jack',
      email: 'jack@universidad.edu.pe',
      displayName: 'Jack Alexander Rojas Lara',
      role: 'ADMIN',
    }, // Admin también puede enseñar
  ];

  for (const u of teacherUsers) {
    try {
      await admin
        .auth()
        .createUser({
          uid: u.uid,
          email: u.email,
          displayName: u.displayName,
          password: 'password123',
        });
    } catch (e: any) {
      if (e.code !== 'auth/uid-already-exists') throw e;
    }
    await admin.auth().setCustomUserClaims(u.uid, { role: u.role });
    // Guardar en 'users' base
    await db
      .collection('users')
      .doc(u.uid)
      .set({ email: u.email, displayName: u.displayName, role: u.role });
  }

  // Profesor Jheyson (Enseña Mate y Arq)
  await db
    .collection('teachers')
    .doc('teacher-jheyson')
    .set({
      userId: 'uid-jheyson',
      employeeCode: 'T-001',
      department: 'Ciencias Básicas',
      maxHoursPerWeek: 20,
      availability: [
        { dayOfWeek: 1, startTime: '08:00', endTime: '12:00' }, // Lunes mañana
        { dayOfWeek: 2, startTime: '14:00', endTime: '18:00' }, // Martes tarde
      ],
      qualifiedCourses: ['course-mat', 'course-arq'],
    });

  // Profesor Jack (Enseña Programación)
  await db
    .collection('teachers')
    .doc('teacher-jack')
    .set({
      userId: 'uid-jack',
      employeeCode: 'T-002',
      department: 'Sistemas',
      maxHoursPerWeek: 20,
      availability: [
        { dayOfWeek: 3, startTime: '08:00', endTime: '12:00' }, // Miércoles mañana
        { dayOfWeek: 4, startTime: '08:00', endTime: '12:00' }, // Jueves mañana
      ],
      qualifiedCourses: ['course-prog'],
    });

  // 5. Estudiante
  console.log('Añadiendo estudiante y matrícula...');
  const studentUid = 'uid-estudiante1';
  try {
    await admin
      .auth()
      .createUser({
        uid: studentUid,
        email: 'estudiante@universidad.edu.pe',
        displayName: 'Estudiante Prueba',
        password: 'password123',
      });
  } catch (e: any) {
    if (e.code !== 'auth/uid-already-exists') throw e;
  }
  await admin.auth().setCustomUserClaims(studentUid, { role: 'STUDENT' });
  await db
    .collection('users')
    .doc(studentUid)
    .set({
      email: 'estudiante@universidad.edu.pe',
      displayName: 'Estudiante Prueba',
      role: 'STUDENT',
    });
  await db.collection('students').doc(studentUid).set({
    userId: studentUid,
    studentCode: 'S-001',
    careerId: 'SIS',
    approvedCourses: [], // Primer ciclo
  });

  // Matrícula
  await db
    .collection('enrollments')
    .doc('enr-1')
    .set({
      studentId: studentUid,
      periodId: '2026-1',
      status: 'VALIDATED',
      selectedCourses: [
        { courseId: 'course-mat', courseName: 'Matemáticas I', credits: 4 },
        { courseId: 'course-prog', courseName: 'Programación Básica', credits: 4 },
      ],
      totalCredits: 8, // Simplificado, minCredits es 10 pero para CSP servirá
      createdAt: new Date().toISOString(),
    });

  console.log('✅ Semilla insertada correctamente.');
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error sembrando BD:', err);
    process.exit(1);
  });
