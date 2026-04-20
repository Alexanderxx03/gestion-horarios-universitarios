# 05 · Motor CSP – Algoritmo de Generación de Horarios

## Fundamentos Teóricos

### ¿Qué es un CSP?

Un **Problema de Satisfacción de Restricciones (Constraint Satisfaction Problem)** es un paradigma matemático donde un problema se define mediante tres elementos:

```
CSP = (V, D, C)

V = Conjunto de Variables   → ¿Qué asignamos?
D = Dominio de cada variable → ¿Qué valores puede tomar?
C = Conjunto de Restricciones → ¿Qué combinaciones son válidas?
```

La generación de horarios académicos es un CSP porque:
- Cada curso necesita ser asignado a un **docente + aula + franja horaria**
- Existen restricciones duras que nunca deben violarse
- El espacio de búsqueda es combinatoriamente explosivo

---

## Formulación del Problema

### Variables (V)

Cada variable representa **la asignación de un curso**:

```
X_i = Asignación del curso i
    = (docente_i, aula_i, día_i, hora_inicio_i, hora_fin_i)
```

Para `n` cursos, hay `n` variables en el problema.

### Dominio (D)

El dominio de cada variable `X_i` es el conjunto de todas las tuplas válidas:

```
D(X_i) = { (d, a, día, h_ini, h_fin) :
           d ∈ Docentes calificados para el curso i
           a ∈ Aulas con capacidad suficiente
           (d, día, h_ini, h_fin) ∈ Disponibilidad de d
           h_fin - h_ini >= horas_semanales del curso i
         }
```

### Restricciones (C)

#### Restricciones Duras (Hard Constraints) — nunca se violan

| ID | Restricción | Descripción |
|---|---|---|
| **HC1** | No solapamiento de docente | Un docente no puede dar 2 clases simultáneamente |
| **HC2** | No solapamiento de aula | Un aula no puede tener 2 cursos a la vez |
| **HC3** | No solapamiento de estudiante | Un estudiante no puede tener 2 materias en el mismo horario |
| **HC4** | Disponibilidad del docente | El docente debe estar disponible en el horario asignado |
| **HC5** | Capacidad del aula | El grupo no supera el aforo del espacio |
| **HC6** | Tipo de aula | Cursos con laboratorio deben estar en un lab |
| **HC7** | Límite de créditos | Máximo 20–22 créditos por estudiante por período |
| **HC8** | Prerrequisitos | Solo se matricula si cursos previos están aprobados |

#### Restricciones Blandas (Soft Constraints) — se optimizan

| ID | Restricción | Objetivo |
|---|---|---|
| **SC1** | Distribución de carga | Clases distribuidas a lo largo de la semana, no todas en un día |
| **SC2** | Equidad docente | Carga horaria balanceada entre todos los docentes |
| **SC3** | Minimizar huecos | Reducir horas vacías consecutivas para estudiantes |

---

## Algoritmo: Backtracking con Heurísticas

### Pseudocódigo

```typescript
function generateSchedule(courses: Course[], period: Period): Schedule | null {

  // 1. Inicializar asignación vacía
  const assignment: Assignment = {}

  // 2. Llamar al algoritmo recursivo
  return backtrack(assignment, courses, period)
}

function backtrack(
  assignment: Assignment,
  unassigned: Course[],
  period: Period
): Schedule | null {

  // Caso base: todas las variables asignadas → solución encontrada
  if (unassigned.length === 0) {
    return buildSchedule(assignment)
  }

  // 3. Seleccionar próxima variable usando heurística MRV
  const course = selectMRV(unassigned, assignment, period)

  // 4. Obtener valores ordenados (heurística Least Constraining Value)
  const values = getDomainValues(course, assignment, period)

  for (const value of values) {

    // 5. Verificar consistencia con restricciones duras
    if (isConsistent(course, value, assignment)) {

      // 6. Asignar
      assignment[course.id] = value

      // 7. Forward Checking: reducir dominios de variables vecinas
      const { reduced, domains } = forwardCheck(course, value, unassigned, assignment)

      if (!reduced.some(d => d.size === 0)) {
        // 8. Recurrir
        const result = backtrack(
          assignment,
          unassigned.filter(c => c.id !== course.id),
          period
        )
        if (result !== null) return result  // ← Solución encontrada
      }

      // 9. Backtrack: deshacer asignación
      delete assignment[course.id]
    }
  }

  return null  // ← No hay solución posible desde aquí
}
```

### Heurística MRV (Minimum Remaining Values)

Selecciona la variable (curso) con **menos valores posibles** en su dominio. Esto ataca primero las partes más restringidas del problema, encontrando conflictos más rápido y ahorrando tiempo.

```typescript
function selectMRV(
  unassigned: Course[],
  assignment: Assignment,
  period: Period
): Course {
  return unassigned.reduce((mostConstrained, course) => {
    const currentDomainSize = getDomainSize(course, assignment, period)
    const bestDomainSize = getDomainSize(mostConstrained, assignment, period)
    return currentDomainSize < bestDomainSize ? course : mostConstrained
  })
}
```

### Forward Checking

Al asignar un valor a una variable, **elimina inmediatamente** ese valor del dominio de otras variables que comparten restricción. Si algún dominio queda vacío, retrocede sin continuar.

```typescript
function forwardCheck(
  assigned: Course,
  value: Slot,
  remaining: Course[],
  assignment: Assignment
): { reduced: Set<Slot>[], domains: Map<string, Set<Slot>> } {
  const domains = new Map<string, Set<Slot>>()
  const reduced: Set<Slot>[] = []

  for (const course of remaining) {
    const domain = getDomainValues(course, assignment)
    // Eliminar valores que violarían HC1/HC2/HC3 con el valor recién asignado
    const filtered = new Set(
      [...domain].filter(slot => !conflictsWith(slot, value))
    )
    domains.set(course.id, filtered)
    reduced.push(filtered)
  }

  return { reduced, domains }
}
```

---

## Implementación en Cloud Functions

El motor CSP se ejecuta en **Firebase Cloud Functions** para:
1. No bloquear el navegador del usuario
2. Acceder directamente a Firestore con permisos de Admin
3. Poder registrar el progreso en tiempo real

```typescript
export const generateSchedule = onCall(async (request) => {
  // Verificar autenticación y rol COORDINATOR+
  if (!request.auth || request.auth.token.role !== 'COORDINATOR') {
    throw new HttpsError('permission-denied', 'Solo coordinadores pueden generar horarios')
  }

  const { periodId } = request.data

  // 1. Cargar datos de Firestore
  const [courses, teachers, classrooms, enrollments] = await Promise.all([
    getCourses(periodId),
    getTeachers(),
    getClassrooms(),
    getEnrollments(periodId)
  ])

  // 2. Construir el problem state
  const problem = buildCSPProblem(courses, teachers, classrooms, enrollments)

  // 3. Ejecutar el motor CSP
  const solution = backtrack({}, problem.courses, problem)

  if (!solution) {
    throw new HttpsError('not-found', 'No se encontró una asignación válida')
  }

  // 4. Guardar resultado en Firestore
  const scheduleRef = db.collection('schedules').doc()
  await scheduleRef.set({
    periodId,
    status: 'GENERATED',
    generatedAt: FieldValue.serverTimestamp(),
    assignments: solution.assignments,
    conflictsFound: 0
  })

  return { scheduleId: scheduleRef.id }
})
```

---

## Rendimiento Esperado

| Escenario | Tiempo Estimado |
|---|---|
| ≤10 cursos, ≤10 docentes, ≤10 aulas | < 1 segundo |
| ≤30 cursos, ≤20 docentes, ≤20 aulas | < 10 segundos |
| ≤50 cursos, ≤30 docentes, ≤30 aulas | ≤ 30 segundos |

> ⚠️ El motor incluye un **timeout de 540 segundos** (límite de Cloud Functions). Si supera ese tiempo, se reporta el estado `FAILED` y se sugiere reducir el alcance del período.

---

> 🔗 Anterior: [← Modelo de Datos](04-Modelo-de-Datos-Firestore) | Siguiente: [Roles y Funcionalidades →](06-Roles-y-Funcionalidades)
