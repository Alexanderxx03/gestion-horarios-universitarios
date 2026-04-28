# 04 · Modelo de Datos – MongoDB

## Diseño NoSQL

MongoDB almacena los datos en **colecciones de documentos (BSON)**. El modelo fue diseñado a partir del esquema del proyecto de referencia, adaptado a la naturaleza NoSQL con énfasis en:

- **Desnormalización selectiva:** Duplicar datos frecuentemente leídos juntos
- **Referencias entre documentos:** Para relaciones entre colecciones
- **Índices compuestos:** Para consultas de horarios con múltiples filtros

---

## Mapa de Colecciones

```
MongoDB Database
│
├── users                    ← Todos los usuarios del sistema
├── courses                  ← Catálogo de cursos/asignaturas
├── teachers                 ← Perfil docente (extensión de user)
├── classrooms               ← Aulas y laboratorios
├── academic_periods         ← Semestres / períodos académicos
├── enrollments              ← Matrículas de estudiantes
└── schedules                ← Horarios generados por el motor CSP
```

---

## Esquemas Detallados (Mongoose)

### `users`

```js
{
  _id: ObjectId,
  email: "estudiante@universidad.edu",
  passwordHash: "$2b$10$...",          // bcrypt hash
  fullName: "Ana García López",
  role: "STUDENT",                      // ADMIN | COORDINATOR | TEACHER | STUDENT
  isActive: true,
  avatarUrl: "https://...",
  profile: {
    dni: "1234567890",
    phone: "+51987654321",
    sex: "FEMALE",
    age: 21
  },
  createdAt: ISODate("2026-01-15T08:00:00Z"),
  updatedAt: ISODate("2026-04-10T10:30:00Z")
}
```

**Tipos de `role`:** `ADMIN` | `COORDINATOR` | `TEACHER` | `STUDENT`

---

### `courses`

```js
{
  _id: ObjectId,
  code: "ALG-201",
  name: "Algoritmos II",
  credits: 4,
  weeklyHours: 4,
  requiresLab: false,
  prerequisites: [ObjectId("..."), ObjectId("...")],   // refs a otros cursos
  maxCapacity: 30,
  isActive: true,
  careerId: ObjectId("..."),
  semester: 3,
  createdAt: ISODate("2026-01-01T00:00:00Z")
}
```

| Campo           | Tipo       | Descripción                             |
| --------------- | ---------- | --------------------------------------- |
| `code`          | string     | Código único de la asignatura           |
| `credits`       | number     | Créditos académicos (1–6 típico)        |
| `weeklyHours`   | number     | Horas de clase semanales                |
| `requiresLab`   | boolean    | Si necesita aula tipo laboratorio       |
| `prerequisites` | ObjectId[] | Refs a cursos que deben estar aprobados |

---

### `teachers`

```js
{
  _id: ObjectId,
  userId: ObjectId("..."),             // ref a users
  employeeCode: "DOC-0042",
  department: "Ciencias de la Computación",
  maxHoursPerWeek: 20,
  availability: [
    { dayOfWeek: 1, startTime: "08:00", endTime: "12:00" },
    { dayOfWeek: 1, startTime: "14:00", endTime: "18:00" },
    { dayOfWeek: 3, startTime: "08:00", endTime: "18:00" }
  ],
  qualifiedCourses: [ObjectId("..."), ObjectId("...")],
  updatedAt: ISODate("2026-04-01T00:00:00Z")
}
```

**`dayOfWeek`:** 1=Lunes, 2=Martes, 3=Miércoles, 4=Jueves, 5=Viernes, 6=Sábado

---

### `classrooms`

```js
{
  _id: ObjectId,
  name: "Laboratorio 301",
  building: "Bloque C",
  floor: 3,
  capacity: 30,
  isLab: true,
  hasProjector: true,
  isActive: true
}
```

---

### `academic_periods`

```js
{
  _id: ObjectId,
  name: "2026-I",
  displayName: "Primer Semestre 2026",
  startDate: ISODate("2026-03-01T00:00:00Z"),
  endDate: ISODate("2026-07-31T00:00:00Z"),
  isActive: true,
  maxCredits: 22,
  minCredits: 12
}
```

---

### `enrollments`

```js
{
  _id: ObjectId,
  studentId: ObjectId("..."),           // ref a users
  periodId: ObjectId("..."),            // ref a academic_periods
  status: "VALIDATED",                  // PENDING | VALIDATED | REJECTED
  selectedCourses: [
    { courseId: ObjectId("..."), courseName: "Algoritmos II", credits: 4 },
    { courseId: ObjectId("..."), courseName: "Bases de Datos", credits: 4 }
  ],
  totalCredits: 8,
  validatedAt: ISODate("2026-02-15T10:00:00Z"),
  createdAt: ISODate("2026-02-10T08:00:00Z")
}
```

**`status`:** `PENDING` | `VALIDATED` | `REJECTED`

---

### `schedules`

Resultado del motor CSP. Cada asignación mapea un curso con un docente, aula y franja horaria.

```js
{
  _id: ObjectId,
  periodId: ObjectId("..."),
  status: "GENERATED",                  // PENDING | IN_PROGRESS | GENERATED | FAILED
  generatedAt: ISODate("2026-02-20T15:30:00Z"),
  generationTimeMs: 12450,
  conflictsFound: 0,
  assignments: [
    {
      courseId: ObjectId("..."),
      courseName: "Algoritmos II",
      teacherId: ObjectId("..."),
      teacherName: "Dr. Carlos Mendoza",
      classroomId: ObjectId("..."),
      classroomName: "Laboratorio 301",
      dayOfWeek: 1,
      startTime: "08:00",
      endTime: "10:00",
      groupSize: 25
    }
  ]
}
```

---

## Índices Compuestos (Mongoose)

```js
// En enrollmentSchema
enrollmentSchema.index({ studentId: 1, periodId: 1 });

// En scheduleSchema
scheduleSchema.index({ periodId: 1, status: 1 });

// En teacherSchema
teacherSchema.index({ userId: 1 }, { unique: true });
```

---

## Middleware de Autorización (Express)

El acceso a los datos se controla mediante middleware en el servidor Express:

```ts
// Middleware de autenticación
app.use('/api', verifyJWT); // Requiere token válido
app.use('/api/admin', requireRole('ADMIN')); // Solo ADMIN
app.use('/api/coordinator', requireRole(['ADMIN', 'COORDINATOR'])); // ADMIN + COORDINATOR
```

---

> 🔗 Anterior: [← Stack Tecnológico](03-Stack-Tecnologico) | Siguiente: [Motor CSP →](05-Motor-CSP)
