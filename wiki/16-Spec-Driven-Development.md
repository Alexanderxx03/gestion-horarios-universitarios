# 16 · Spec-Driven Development (SDD)

## Introducción

Este documento formaliza la especificación del sistema **Gestión de Horarios Universitarios** siguiendo el enfoque **Spec-Driven Development (SDD)**. En SDD, el sistema se especifica formalmente _antes_ de su implementación, reduciendo la ambigüedad de requerimientos y anticipando conflictos técnicos.

La especificación sirve como contrato entre:

- El **equipo de desarrollo** y los **stakeholders académicos**
- El **motor CSP** y la **interfaz de usuario**
- La **especificación** y las **pruebas de aceptación**

---

## 1. Principios del Sistema (Constitution)

Los siguientes principios son invariables y tienen prioridad sobre cualquier decisión de implementación:

### P1 — Correctitud sobre Velocidad

> Un horario generado debe cumplir **el 100% de las restricciones duras** (HC1–HC8). Ninguna optimización de velocidad puede sacrificar la correctitud. Si no existe solución válida, el sistema reporta FAILED; nunca entrega un horario con conflictos.

### P2 — Seguridad por Diseño

> Toda lógica crítica (generación de horarios, validación de prerrequisitos, gestión de créditos) reside **exclusivamente en Cloud Functions**. El cliente solo muestra datos; nunca calcula, valida ni escribe directamente en Firestore sin pasar por una Function.

### P3 — Roles como Primera Clase

> El sistema conoce en todo momento el rol del usuario autenticado (`ADMIN`, `COORDINATOR`, `TEACHER`, `STUDENT`). Ninguna operación de escritura ocurre sin verificación de rol en: (1) Firebase Security Rules y (2) Cloud Function handler.

### P4 — Fallo Explícito

> El sistema nunca falla silenciosamente. Si una operación falla (timeout del CSP, Firestore error, validación fallida), el sistema reporta al usuario un mensaje descriptivo en español con el motivo del fallo y los pasos sugeridos.

### P5 — Separación de Responsabilidades

> La arquitectura hexagonal garantiza que el dominio (Motor CSP, tipos, restricciones) no conoce a Firebase. El Motor CSP es una función pura: mismas entradas → misma salida. Esto hace el motor testeable de forma aislada.

---

## 2. Reglas Globales

### 2.1 Restricciones Duras del Sistema (Hard Constraints)

Las siguientes reglas nunca pueden ser violadas. Si lo son, el resultado es matemáticamente inválido:

| ID      | Nombre                        | Definición Formal                                                                            |
| ------- | ----------------------------- | -------------------------------------------------------------------------------------------- |
| **HC1** | No solapamiento de docente    | ∀ asignaciones a₁, a₂ ∈ S: si a₁.teacherId = a₂.teacherId → NO overlap(a₁.slot, a₂.slot)     |
| **HC2** | No solapamiento de aula       | ∀ asignaciones a₁, a₂ ∈ S: si a₁.classroomId = a₂.classroomId → NO overlap(a₁.slot, a₂.slot) |
| **HC3** | No solapamiento de estudiante | ∀ estudiante e, cursos c₁, c₂ matriculados por e: NO overlap(slot(c₁), slot(c₂))             |
| **HC4** | Disponibilidad del docente    | slot(asignación) ⊆ disponibilidad(docente)                                                   |
| **HC5** | Capacidad del aula            | grupo(curso) ≤ capacidad(aula)                                                               |
| **HC6** | Tipo de aula                  | si curso.requiresLab = true → aula.isLab = true                                              |
| **HC7** | Límite de créditos            | ∑créditos(matrículaEstudiante) ∈ [minCredits, maxCredits] del período activo                 |
| **HC8** | Prerrequisitos                | ∀ curso c en matrícula: ∀ prereq p de c: p ∈ cursosAprobados(estudiante)                     |

**Definición de overlap(s₁, s₂):**

```
overlap(s₁, s₂) = s₁.dayOfWeek = s₂.dayOfWeek
                  AND s₁.startTime < s₂.endTime
                  AND s₂.startTime < s₁.endTime
```

### 2.2 Restricciones Blandas del Sistema (Soft Constraints)

El sistema optimiza estas restricciones cuando existe margen en el espacio de búsqueda:

| ID      | Nombre                            | Función de Optimización                                                                     |
| ------- | --------------------------------- | ------------------------------------------------------------------------------------------- |
| **SC1** | Distribución de carga docente     | Minimizar: max(horasSemana(d)) − min(horasSemana(d)) para todos los docentes d              |
| **SC2** | Reducción de huecos estudiantiles | Minimizar: ∑ huecosConsecutivos(estudiante) para todos los estudiantes                      |
| **SC3** | Distribución semanal de cursos    | Maximizar: distribución uniforme de clases Lunes–Viernes (evitar concentración en 1–2 días) |

---

## 3. Especificación Formal del Sistema

### 3.1 Módulo: Generación de Horarios (Motor CSP)

#### ENTRADAS

| Parámetro                | Tipo TypeScript            | Validación               | Descripción                                   |
| ------------------------ | -------------------------- | ------------------------ | --------------------------------------------- |
| `periodId`               | `string`                   | Zod: `z.string().min(1)` | ID del período académico activo en Firestore  |
| `requestAuth.uid`        | `string`                   | Firebase Auth: no nulo   | UID del coordinador que dispara la generación |
| `requestAuth.token.role` | `'COORDINATOR' \| 'ADMIN'` | Custom Claim verificado  | Solo coordinadores y admins pueden generar    |

**Datos cargados por la Function desde Firestore:**

```typescript
interface CSPInput {
  courses: Course[]; // Catálogo de cursos del período
  teachers: Teacher[]; // Docentes con su disponibilidad horaria
  classrooms: Classroom[]; // Aulas con capacidad y tipo
  enrollments: Enrollment[]; // Matrículas validadas del período
  period: AcademicPeriod; // Configuración del período (minCredits, maxCredits)
}
```

#### SALIDAS

**Caso éxito:**

```typescript
interface ScheduleResult {
  scheduleId: string; // ID del documento creado en Firestore
  status: 'GENERATED';
  generatedAt: Timestamp;
  generationTimeMs: number; // Tiempo de ejecución del motor
  assignments: Assignment[]; // Lista de asignaciones curso→docente→aula→slot
  conflictsFound: 0; // Siempre 0 si status = GENERATED
}

interface Assignment {
  courseId: string;
  courseName: string;
  teacherId: string;
  teacherName: string;
  classroomId: string;
  classroomName: string;
  dayOfWeek: 1 | 2 | 3 | 4 | 5 | 6; // 1=Lunes ... 6=Sábado
  startTime: string; // Formato "HH:MM" (24h)
  endTime: string; // Formato "HH:MM" (24h)
  groupSize: number;
}
```

**Caso fallo:**

```typescript
interface ScheduleFailure {
  scheduleId: string;
  status: 'FAILED';
  failureReason: 'NO_SOLUTION' | 'TIMEOUT' | 'INSUFFICIENT_DATA';
  conflictingVariables?: string[]; // Cursos que no pudieron ser asignados
  message: string; // Mensaje descriptivo en español para el usuario
}
```

#### REGLAS DE NEGOCIO

1. Solo puede existir **un horario activo por período**. Si ya existe uno en estado `GENERATED`, debe ser explícitamente archivado antes de generar uno nuevo.
2. El sistema verifica **pre-condiciones antes de ejecutar el motor**:
   - Existen al menos 1 curso matriculado en el período
   - Existen al menos 1 docente con disponibilidad registrada
   - Existen al menos 1 aula disponible
3. El motor establece un **timeout interno de 30 segundos**. Si se supera, retorna `FAILED` con `failureReason: 'TIMEOUT'`.
4. El estado del horario evoluciona: `PENDING` → `IN_PROGRESS` → `GENERATED | FAILED`. El estado `IN_PROGRESS` actúa como mutex distribuido para prevenir generaciones concurrentes.

---

### 3.2 Módulo: Validación de Matrícula

#### ENTRADAS

```typescript
interface EnrollmentInput {
  studentId: string; // UID del estudiante (del token Firebase Auth)
  periodId: string; // ID del período activo
  courseIds: string[]; // IDs de los cursos a matricular (1–10 cursos)
}
```

**Validación Zod:**

```typescript
const EnrollmentSchema = z.object({
  studentId: z.string().min(1),
  periodId: z.string().min(1),
  courseIds: z.array(z.string().min(1)).min(1).max(10),
});
```

#### SALIDAS

```typescript
interface EnrollmentResult {
  success: boolean;
  enrollmentId?: string; // Si success = true
  totalCredits?: number; // Créditos acumulados
  errors?: EnrollmentError[]; // Si success = false
}

interface EnrollmentError {
  courseId: string;
  courseName: string;
  errorType: 'MISSING_PREREQ' | 'CREDITS_EXCEEDED' | 'CREDITS_BELOW_MIN' | 'ALREADY_ENROLLED';
  detail: string; // Mensaje descriptivo en español
}
```

#### REGLAS DE NEGOCIO

1. **HC8 — Prerrequisitos:** Para cada curso c en `courseIds`, se verifica que todos los cursos en `c.prerequisites` estén en `cursosAprobados(estudiante)`.
2. **HC7 — Límite de créditos:** La suma de créditos de los cursos seleccionados debe estar en `[period.minCredits, period.maxCredits]`.
3. La matrícula es **atómica**: o todos los cursos se matriculan, o ninguno. No se aceptan matrículas parciales.
4. Un estudiante no puede matricularse dos veces en el mismo curso en el mismo período.

---

### 3.3 Módulo: Autenticación y Roles

#### REGLAS DE NEGOCIO

1. Los **Custom Claims** (`role`) se asignan exclusivamente desde una Cloud Function protegida por rol `ADMIN`. El cliente no puede escribir Custom Claims.
2. Un usuario nuevo registrado tiene rol `STUDENT` por defecto hasta que un `ADMIN` le asigne otro rol.
3. Al cambiar el rol de un usuario, la Cloud Function revoca todos sus tokens activos (Firebase Auth Token Revocation) para forzar re-autenticación.
4. Las rutas de React verifican el rol del token local; las Cloud Functions verifican el rol del token de servidor — ambas capas son obligatorias.

---

## 4. Casos Límite (Edge Cases)

Los siguientes escenarios fueron identificados durante el análisis del CSP y deben ser manejados explícitamente:

| ID        | Caso Límite                               | Comportamiento Esperado                                                                                                                            |
| --------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **EL-01** | Período sin matrículas                    | Motor retorna FAILED con razón `INSUFFICIENT_DATA`: "No hay matrículas validadas en este período."                                                 |
| **EL-02** | 0 aulas disponibles                       | Pre-condición detectada antes de ejecutar el motor: "No existen aulas disponibles. Agregue aulas al catálogo."                                     |
| **EL-03** | Docente sin disponibilidad                | El dominio de todos sus cursos calificados = vacío. Motor lo detecta en Forward Checking y hace backtrack inmediato.                               |
| **EL-04** | Curso sin docente calificado              | El dominio de ese curso = vacío desde el inicio. Motor retorna FAILED indicando el courseId.                                                       |
| **EL-05** | Aula con capacidad 0                      | Validado en CRUD: `capacity` debe ser ≥ 1. Si el dato existe en Firestore, es ignorado por el motor (capacidad insuficiente para cualquier grupo). |
| **EL-06** | Prerrequisito circular                    | Detectado en el CRUD de Cursos: al agregar prereq, se verifica que no se forme un ciclo en el grafo de dependencias.                               |
| **EL-07** | Estudiante con 0 créditos matriculados    | Validado en HC7: `totalCredits < period.minCredits`. El sistema sugiere agregar más cursos.                                                        |
| **EL-08** | Generación durante otra en curso          | El estado `IN_PROGRESS` actúa como mutex. La nueva solicitud retorna error: "Ya existe una generación en progreso."                                |
| **EL-09** | Token JWT expirado durante generación CSP | La Function ya tiene los datos cargados; el token solo se valida al inicio. La generación continúa normalmente.                                    |
| **EL-10** | Timeout del motor a los 30 segundos       | Retorna FAILED con `failureReason: 'TIMEOUT'` y lista de cursos no asignados hasta ese momento.                                                    |

---

## 5. Matriz de Coherencia SDD

La siguiente tabla verifica la alineación entre la especificación, el código implementado y las pruebas:

| Especificación                  | Código                                                              | Tests                                                                       |
| ------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| HC1: No solapamiento docente    | `constraintChecker.ts`: `checkTeacherConflict()`                    | `constraintChecker.test.ts`: "rechaza docente con 2 cursos simultáneos"     |
| HC2: No solapamiento aula       | `constraintChecker.ts`: `checkClassroomConflict()`                  | `constraintChecker.test.ts`: "rechaza aula ocupada en mismo slot"           |
| HC3: No solapamiento estudiante | `constraintChecker.ts`: `checkStudentConflict()`                    | `constraintChecker.test.ts`: "rechaza conflicto de estudiantes compartidos" |
| HC4: Disponibilidad docente     | `generateSchedule.ts`: `getDomainValues()`                          | `generateSchedule.test.ts`: "excluye slots fuera de disponibilidad"         |
| HC5: Capacidad aula             | `generateSchedule.ts`: `getDomainValues()`                          | `generateSchedule.test.ts`: "excluye aulas con capacidad insuficiente"      |
| HC7: Límite créditos            | `validateEnrollment.ts`: `checkCreditLimit()`                       | `validateEnrollment.test.ts`: "rechaza matrícula que excede 22 créditos"    |
| HC8: Prerrequisitos             | `validateEnrollment.ts`: `checkPrerequisites()`                     | `validateEnrollment.test.ts`: "rechaza matrícula sin prerrequisitos"        |
| EL-08: Mutex IN_PROGRESS        | `generateSchedule.ts`: verificación de estado previo                | `generateSchedule.test.ts`: "rechaza segunda generación concurrente"        |
| Roles: Solo COORDINATOR genera  | `generateSchedule.ts`: `authz.requireRole(['COORDINATOR','ADMIN'])` | `auth.test.ts`: "rechaza llamada sin rol adecuado"                          |

---

## 6. Anticipación de Conflictos

El análisis SDD reveló los siguientes conflictos potenciales antes de la implementación, permitiendo resolverlos en el diseño:

### Conflicto 1: HC3 es más complejo que HC1 y HC2

**Detección:** Al modelar formalmente HC3, se identificó que comparar solapamiento de estudiantes requiere intersección de conjuntos de `studentIds` entre dos cursos, no solo comparar IDs de cursos. La función de conflicto `conflictsWith(s1, s2)` necesita acceso al mapa de estudiantes por curso.

**Resolución en diseño:** El `CSPState` incluye un índice `studentCourseMap: Map<studentId, Set<courseId>>` construido al inicio de la búsqueda, permitiendo verificar HC3 en O(1) amortizado durante Forward Checking.

### Conflicto 2: HC6 vs. HC5 pueden ser incompatibles

**Detección:** Si el único laboratorio disponible tiene capacidad 20 y el curso que requiere lab tiene 25 estudiantes, ni HC5 ni HC6 pueden satisfacerse simultáneamente.

**Resolución en diseño:** El motor detecta dominio vacío para ese curso en la fase de inicialización (antes del backtracking) y reporta `FAILED` con detalle: "Curso X requiere laboratorio con capacidad ≥ 25; ningún laboratorio disponible cumple los requisitos."

### Conflicto 3: SC1 puede contradecir HC1

**Detección:** Optimizar la distribución equitativa de carga docente (SC1) puede requerir asignar a un docente horas adicionales, entrando en conflicto con su disponibilidad declarada (HC4).

**Resolución en diseño:** HC1–HC8 tienen prioridad absoluta sobre SC1–SC3. La optimización de restricciones blandas solo se aplica después de encontrar una solución válida que cumpla todas las restricciones duras. Las restricciones blandas guían la selección del valor en `getLCV()` (Least Constraining Value), no el backtracking.

---

> 🔗 Anterior: [← Riesgos](15-Gestion-Riesgos-Oportunidades) | Siguiente: [Trazabilidad →](17-Trazabilidad-y-Repositorio)
