# 04 · Modelo de Datos – Firebase Firestore

## Diseño NoSQL

Firestore organiza los datos en **colecciones de documentos**. El modelo fue diseñado a partir del esquema SQL del proyecto de referencia, adaptado a la naturaleza NoSQL con énfasis en:

- **Desnormalización selectiva:** Duplicar datos frecuentemente leídos juntos
- **Subcolecciones:** Para datos con relación 1:N fuerte
- **Referencias:** Para relaciones entre documentos de distintas colecciones

---

## Mapa de Colecciones

```
Firestore Database
│
├── /users/{userId}                    ← Todos los usuarios del sistema
├── /courses/{courseId}                ← Catálogo de cursos/asignaturas
├── /teachers/{teacherId}              ← Perfil docente (extensión de user)
├── /classrooms/{classroomId}          ← Aulas y laboratorios
├── /academic_periods/{periodId}       ← Semestres / períodos académicos
├── /enrollments/{enrollmentId}        ← Matrículas de estudiantes
└── /schedules/{scheduleId}            ← Horarios generados por el motor CSP
```

---

## Esquemas Detallados

### `/users/{userId}`

El `userId` es el mismo UID de Firebase Authentication.

```json
{
  "uid": "firebase-auth-uid-abc123",
  "email": "estudiante@universidad.edu",
  "fullName": "Ana García López",
  "role": "STUDENT",
  "isActive": true,
  "avatarUrl": "https://lh3.googleusercontent.com/...",
  "profile": {
    "dni": "1234567890",
    "phone": "+593987654321",
    "sex": "FEMALE",
    "age": 21
  },
  "createdAt": "2026-01-15T08:00:00Z",
  "updatedAt": "2026-04-10T10:30:00Z"
}
```

**Tipos de `role`:** `ADMIN` | `COORDINATOR` | `TEACHER` | `STUDENT`

---

### `/courses/{courseId}`

```json
{
  "id": "course-alg2-001",
  "code": "ALG-201",
  "name": "Algoritmos II",
  "credits": 4,
  "weeklyHours": 4,
  "requiresLab": false,
  "prerequisites": ["course-alg1-001", "course-ds-001"],
  "maxCapacity": 30,
  "isActive": true,
  "careerId": "career-sistemas-001",
  "semester": 3,
  "createdAt": "2026-01-01T00:00:00Z"
}
```

| Campo | Tipo | Descripción |
|---|---|---|
| `code` | string | Código único de la asignatura |
| `credits` | number | Créditos académicos (1–6 típico) |
| `weeklyHours` | number | Horas de clase semanales |
| `requiresLab` | boolean | Si necesita aula tipo laboratorio |
| `prerequisites` | string[] | IDs de cursos que deben estar aprobados |

---

### `/teachers/{teacherId}`

El `teacherId` es el mismo `userId` del docente en `/users`.

```json
{
  "userId": "firebase-auth-uid-docente",
  "employeeCode": "DOC-0042",
  "department": "Ciencias de la Computación",
  "maxHoursPerWeek": 20,
  "availability": [
    {
      "dayOfWeek": 1,
      "startTime": "08:00",
      "endTime": "12:00"
    },
    {
      "dayOfWeek": 1,
      "startTime": "14:00",
      "endTime": "18:00"
    },
    {
      "dayOfWeek": 3,
      "startTime": "08:00",
      "endTime": "18:00"
    }
  ],
  "qualifiedCourses": ["course-alg2-001", "course-bd-001"],
  "updatedAt": "2026-04-01T00:00:00Z"
}
```

**`dayOfWeek`:** 1=Lunes, 2=Martes, 3=Miércoles, 4=Jueves, 5=Viernes, 6=Sábado

---

### `/classrooms/{classroomId}`

```json
{
  "id": "classroom-lab301",
  "name": "Laboratorio 301",
  "building": "Bloque C",
  "floor": 3,
  "capacity": 30,
  "isLab": true,
  "hasProjector": true,
  "isActive": true
}
```

---

### `/academic_periods/{periodId}`

```json
{
  "id": "period-2026-I",
  "name": "2026-I",
  "displayName": "Primer Semestre 2026",
  "startDate": "2026-03-01T00:00:00Z",
  "endDate": "2026-07-31T00:00:00Z",
  "isActive": true,
  "maxCredits": 22,
  "minCredits": 12
}
```

---

### `/enrollments/{enrollmentId}`

```json
{
  "id": "enroll-ana-2026I",
  "studentId": "firebase-auth-uid-abc123",
  "periodId": "period-2026-I",
  "status": "VALIDATED",
  "selectedCourses": [
    {
      "courseId": "course-alg2-001",
      "courseName": "Algoritmos II",
      "credits": 4
    },
    {
      "courseId": "course-bd-001",
      "courseName": "Bases de Datos",
      "credits": 4
    }
  ],
  "totalCredits": 8,
  "validatedAt": "2026-02-15T10:00:00Z",
  "createdAt": "2026-02-10T08:00:00Z"
}
```

**`status`:** `PENDING` | `VALIDATED` | `REJECTED`

---

### `/schedules/{scheduleId}`

Resultado del motor CSP. Cada asignación mapea un curso con un docente, aula y franja horaria.

```json
{
  "id": "schedule-2026-I-v1",
  "periodId": "period-2026-I",
  "status": "GENERATED",
  "generatedAt": "2026-02-20T15:30:00Z",
  "generationTimeMs": 12450,
  "conflictsFound": 0,
  "assignments": [
    {
      "courseId": "course-alg2-001",
      "courseName": "Algoritmos II",
      "teacherId": "firebase-auth-uid-docente",
      "teacherName": "Dr. Carlos Mendoza",
      "classroomId": "classroom-lab301",
      "classroomName": "Laboratorio 301",
      "dayOfWeek": 1,
      "startTime": "08:00",
      "endTime": "10:00",
      "groupSize": 25
    },
    {
      "courseId": "course-bd-001",
      "courseName": "Bases de Datos",
      "teacherId": "firebase-auth-uid-docente2",
      "teacherName": "Ing. María Torres",
      "classroomId": "classroom-aula201",
      "classroomName": "Aula 201",
      "dayOfWeek": 2,
      "startTime": "10:00",
      "endTime": "12:00",
      "groupSize": 28
    }
  ]
}
```

**`status`:** `PENDING` | `IN_PROGRESS` | `GENERATED` | `FAILED`

---

## Reglas de Seguridad (Firestore Rules)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Función helper para verificar rol
    function hasRole(role) {
      return request.auth != null && request.auth.token.role == role;
    }

    function isAdmin() { return hasRole('ADMIN'); }
    function isCoordinator() { return hasRole('COORDINATOR') || isAdmin(); }
    function isAuthenticated() { return request.auth != null; }

    // /users: cada usuario lee su propio doc; ADMIN lee todos
    match /users/{userId} {
      allow read: if isAuthenticated() && (request.auth.uid == userId || isAdmin());
      allow write: if isAdmin();
      allow update: if request.auth.uid == userId &&
                       !('role' in request.resource.data);
    }

    // /courses: lectura pública autenticada; escritura solo COORDINATOR+
    match /courses/{courseId} {
      allow read: if isAuthenticated();
      allow write: if isCoordinator();
    }

    // /teachers: el docente lee su propio perfil; COORDINATOR gestiona
    match /teachers/{teacherId} {
      allow read: if isAuthenticated() &&
                     (request.auth.uid == teacherId || isCoordinator());
      allow write: if isCoordinator() ||
                      request.auth.uid == teacherId;
    }

    // /classrooms: lectura autenticada; escritura COORDINATOR+
    match /classrooms/{classroomId} {
      allow read: if isAuthenticated();
      allow write: if isCoordinator();
    }

    // /academic_periods: lectura pública; escritura solo ADMIN
    match /academic_periods/{periodId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }

    // /enrollments: estudiante gestiona la suya; COORDINATOR lee todas
    match /enrollments/{enrollmentId} {
      allow read: if isAuthenticated() &&
                     (resource.data.studentId == request.auth.uid || isCoordinator());
      allow create: if isAuthenticated() &&
                       request.resource.data.studentId == request.auth.uid;
      allow update: if isCoordinator();
    }

    // /schedules: lectura autenticada; escritura solo via Cloud Functions
    match /schedules/{scheduleId} {
      allow read: if isAuthenticated();
      allow write: if false; // Solo Cloud Functions pueden escribir
    }
  }
}
```

---

## Índices Compuestos

```json
{
  "indexes": [
    {
      "collectionGroup": "enrollments",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "studentId", "order": "ASCENDING" },
        { "fieldPath": "periodId", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "schedules",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "periodId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" }
      ]
    }
  ]
}
```

---

> 🔗 Anterior: [← Stack Tecnológico](03-Stack-Tecnologico) | Siguiente: [Motor CSP →](05-Motor-CSP)
