# 17 · Trazabilidad y Gestión del Repositorio

## Introducción

Este documento evidencia la gestión profesional del repositorio GitHub, la trazabilidad completa entre el Backlog del producto, los commits del código fuente y las funcionalidades implementadas, y el proceso de desarrollo colaborativo mediante Pull Requests con revisión.

---

## 1. Estrategia de Ramas — Git Flow

El proyecto implementa una variante del modelo **Git Flow** adaptada al contexto académico con sprints de 2 semanas:

```
main           ← Producción (deploy automático a Firebase Hosting)
  │
  └── develop  ← Integración (siempre compilable y funcional)
        │
        ├── feature/HU-01-autenticacion-google
        ├── feature/HU-02-crud-cursos
        ├── feature/HU-03-crud-docentes-disponibilidad
        ├── feature/HU-04-crud-aulas
        ├── feature/HU-05-gestion-periodos
        ├── feature/HU-06-matricula-validacion
        ├── feature/HU-07-motor-csp-backtracking
        ├── feature/HU-08-grilla-horaria-visual
        ├── feature/HU-09-exportacion-pdf
        ├── feature/HU-10-exportacion-excel
        ├── feature/HU-11-ui-premium-responsive
        ├── fix/HC3-forward-checking-conflicto-estudiantes
        ├── fix/grilla-horaria-datos-vacios
        └── docs/wiki-sprint-2-actualizacion
```

### Reglas del repositorio

| Regla                           | Descripción                                                       |
| ------------------------------- | ----------------------------------------------------------------- |
| **No push directo a `main`**    | Todo cambio requiere PR desde `develop` → `main`                  |
| **No push directo a `develop`** | Todo cambio requiere PR desde `feature/*` → `develop`             |
| **Al menos 1 reviewer**         | Todo PR debe tener code review antes del merge                    |
| **CI obligatorio**              | Los checks `ci-frontend`, `ci-functions` y `ci-rules` deben pasar |
| **Commits semánticos**          | Convención: `tipo(scope): descripción`                            |

---

## 2. Convención de Commits Semánticos

### Formato

```
<tipo>(<scope>): <descripción en inglés>

[cuerpo opcional]

[footer: referencia a issue/HU]
```

### Tipos permitidos

| Tipo       | Uso                                          |
| ---------- | -------------------------------------------- |
| `feat`     | Nueva funcionalidad                          |
| `fix`      | Corrección de bug                            |
| `refactor` | Refactorización sin cambio de comportamiento |
| `test`     | Agregar o modificar tests                    |
| `docs`     | Documentación (Wiki, README, comentarios)    |
| `chore`    | Tareas de mantenimiento (deps, configs, CI)  |
| `perf`     | Mejora de rendimiento                        |

### Ejemplos reales del proyecto

```bash
# Sprint 1
feat(auth): implement Google OAuth2 login with Firebase Auth
feat(courses): add CRUD operations for course catalog
feat(classrooms): implement classroom management with capacity validation
feat(auth): add custom claims role verification middleware
chore(firestore): configure security rules for RBAC by role

# Sprint 2
feat(teachers): implement teacher availability CRUD with time slots
feat(enrollment): add prerequisite validation for course enrollment
feat(csp): implement backtracking solver with MRV heuristic
feat(csp): add forward checking propagation for HC1 and HC2
fix(csp): correct forward checking for HC3 student conflict detection
test(csp): add constraint checker tests for all hard constraints
test(enrollment): add unit tests for prerequisite and credit validation

# Sprint 3
feat(ui): implement weekly schedule grid with CSS Grid layout
feat(export): add PDF export using jsPDF library
feat(ui): apply premium glassmorphism design with CSS Variables
refactor(frontend): extract GrillaHoraria as reusable component
perf(csp): optimize domain initialization with pre-indexed student map

# Sprint 4
test(rules): add Firestore security rules integration tests
docs(wiki): update sprint metrics and agile charts
chore(ci): configure GitHub Actions for Firebase deployment
perf(frontend): add route lazy loading with React.lazy
```

---

## 3. Tabla de Trazabilidad: Backlog → Rama → Commits → Feature

| HU ID     | Historia de Usuario            | Rama                                         | Commits Clave                                                          | Feature en Producción                       |
| --------- | ------------------------------ | -------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------- |
| **HU-01** | Login con Google OAuth2        | `feature/HU-01-autenticacion-google`         | `feat(auth): implement Google OAuth2 login`                            | ✅ Página `/login` con botón Google         |
| **HU-02** | CRUD de Cursos                 | `feature/HU-02-crud-cursos`                  | `feat(courses): add CRUD operations`                                   | ✅ `/coordinator/courses`                   |
| **HU-03** | CRUD Docentes + Disponibilidad | `feature/HU-03-crud-docentes-disponibilidad` | `feat(teachers): implement teacher availability`                       | ✅ `/coordinator/teachers`                  |
| **HU-04** | CRUD de Aulas                  | `feature/HU-04-crud-aulas`                   | `feat(classrooms): implement classroom management`                     | ✅ `/coordinator/classrooms`                |
| **HU-05** | Gestión de Períodos            | `feature/HU-05-gestion-periodos`             | `feat(periods): add academic period management`                        | ✅ `/admin/periods`                         |
| **HU-06** | Matrícula con validación       | `feature/HU-06-matricula-validacion`         | `feat(enrollment): add prerequisite validation`                        | ✅ `/student/enrollment`                    |
| **HU-07** | Motor CSP                      | `feature/HU-07-motor-csp-backtracking`       | `feat(csp): implement backtracking + MRV` + `fix(csp): HC3 correction` | ✅ Cloud Function `generateSchedule`        |
| **HU-08** | Grilla visual                  | `feature/HU-08-grilla-horaria-visual`        | `feat(ui): implement weekly schedule grid`                             | ✅ `/student/schedule`, `/teacher/schedule` |
| **HU-09** | Exportación PDF                | `feature/HU-09-exportacion-pdf`              | `feat(export): add PDF export using jsPDF`                             | ✅ Botón "Exportar PDF" en grilla           |
| **HU-10** | Exportación Excel              | `feature/HU-10-exportacion-excel`            | `feat(export): add Excel export with xlsx`                             | ✅ `/coordinator/schedules`                 |
| **HU-11** | UI Premium                     | `feature/HU-11-ui-premium-responsive`        | `feat(ui): apply glassmorphism design`                                 | ✅ Toda la interfaz del sistema             |

### Bugs Rastreados

| Bug ID     | Descripción                                               | Rama Fix                          | Commit                                            | Sprint   |
| ---------- | --------------------------------------------------------- | --------------------------------- | ------------------------------------------------- | -------- |
| **BUG-01** | HC3 forward checking incorrecto con múltiples estudiantes | `fix/HC3-forward-checking`        | `fix(csp): correct forward checking for HC3`      | Sprint 2 |
| **BUG-02** | Grilla horaria muestra vacío después de generación        | `fix/grilla-horaria-datos-vacios` | `fix(schedule): pass scheduleId via router state` | Sprint 2 |

---

## 4. Proceso de Pull Request con Code Review

### Flujo de PR

```
1. Developer crea branch: git checkout -b feature/HU-07-motor-csp
2. Developer trabaja + commitea semánticamente
3. Developer abre PR en GitHub: feature/HU-07 → develop
4. CI Pipeline se ejecuta automáticamente:
   ├── ci-frontend: npm run typecheck + npm run lint + npm run test
   ├── ci-functions: npm run build + npm run test
   └── ci-rules: npm run rules:test
5. Al menos 1 reviewer hace code review
6. Reviewer aprueba o solicita cambios
7. Developer corrige si hay comentarios
8. PR es mergeado a develop con Squash Merge
9. Branch feature es eliminada
```

### Ejemplo de Pull Request: HU-07 Motor CSP

**Título:** `feat(csp): implement backtracking CSP solver with MRV and Forward Checking`

**Descripción:**

```markdown
## Cambios

Implementa el motor de generación de horarios basado en CSP con:

- Algoritmo Backtracking recursivo
- Heurística MRV (Minimum Remaining Values) para selección de variable
- Forward Checking para propagación de restricciones HC1, HC2, HC3
- Validación de las 8 restricciones duras (HC1–HC8)
- Timeout interno de 30 segundos
- Estado FAILED con reporte de variables en conflicto

## Tests

- [x] `constraintChecker.test.ts` - 6 tests pasando
- [x] `generateSchedule.test.ts` - 4 tests pasando (escenario básico + backtracking)
- [x] `validateEnrollment.test.ts` - 5 tests pasando

## Relacionado con

Closes #7 (HU-07 Motor CSP – Generación de horarios)

## Checklist DoD

- [x] Código en rama feature/HU-07
- [x] Tests unitarios escritos y pasando
- [x] Code review realizado
- [x] Funcionalidad validada en emulador Firebase
- [x] Documentación wiki actualizada (05-Motor-CSP.md)
- [x] Sin errores de linting
```

**Comentarios de Code Review:**

```
Reviewer (Product Owner):
> "La función forwardCheck() en la línea 47 debería manejar el caso
> donde course.enrolledStudents está vacío (curso sin matrículas).
> ¿Qué devuelve en ese caso?"

Developer (Algorithms Engineer):
> "Buen punto. Si enrolledStudents = [], la intersección de conjuntos
> siempre es vacía → nunca hay conflicto HC3. Lo hago explícito con
> un early return para mayor claridad."
> [Commit: refactor(csp): make empty enrollment case explicit in HC3]
```

---

## 5. CI/CD Pipeline — GitHub Actions

### Workflows configurados

```yaml
# .github/workflows/ci.yml (simplificado)
name: CI Pipeline
on: [pull_request]
jobs:
  ci-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm install
      - run: npm -w frontend run typecheck
      - run: npm -w frontend run lint
      - run: npm -w frontend run test

  ci-functions:
    runs-on: ubuntu-latest
    steps:
      - run: npm -w functions run build
      - run: npm -w functions run test

  ci-rules:
    runs-on: ubuntu-latest
    steps:
      - run: npm run rules:test
```

### Deploy automático a Firebase (en merge a main)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Firebase
on:
  push:
    branches: [main]
jobs:
  deploy:
    steps:
      - run: npm -w frontend run build
      - run: npm -w functions run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
```

---

## 6. Evidencia de Desarrollo Incremental

El sistema se construyó incrementalmente sprint a sprint. Cada sprint entregó **valor funcional completo** (no solo código parcial):

| Sprint   | Feature Entregada                                      | Estado en Producción                 |
| -------- | ------------------------------------------------------ | ------------------------------------ |
| Sprint 0 | Repositorio + arquitectura + Wiki                      | ✅ Repositorio configurado           |
| Sprint 1 | Auth completa + CRUDs base + Firestore Rules           | ✅ Usuarios pueden loguearse         |
| Sprint 2 | Motor CSP operativo + Matrícula con validación         | ✅ Coordinador puede generar horario |
| Sprint 3 | UI Premium + Grilla visual + Exportación PDF/Excel     | ✅ Sistema completamente funcional   |
| Sprint 4 | Testing exhaustivo + Lighthouse ≥ 85 + Auditoría OWASP | ✅ Sistema auditado y optimizado     |

### Evidencia de colaboración real

El repositorio muestra contribuciones de todos los miembros del equipo distribuidas en múltiples sprints:

| Miembro         | Rol        | Áreas principales de contribución                        |
| --------------- | ---------- | -------------------------------------------------------- |
| Scrum Master    | Analista   | Wiki, CI/CD, coordinación de PRs, retrospectivas         |
| Product Owner   | Arquitecto | Firestore Rules, arquitectura hexagonal, ADRs            |
| Full-Stack Dev  | Developer  | Frontend SPA, Cloud Functions handlers, UI Premium       |
| Algorithms Eng. | Specialist | Motor CSP, tests del solver, documentación del algoritmo |

---

## 7. README del Repositorio

El `README.md` de la raíz del repositorio incluye:

- **Descripción del sistema** — qué hace, para quién, por qué es valioso
- **Badges de estado** — CI status, cobertura de tests, versión de Firebase
- **Arquitectura** — diagrama visual y descripción del stack
- **Instrucciones de instalación** — paso a paso para setup local
- **Instrucciones de desarrollo** — comandos del monorepo (`npm run dev`, `npm run emulators`)
- **Variables de entorno** — referencia a `.env.example`
- **Estructura del proyecto** — árbol de carpetas comentado
- **Contribución** — referencia a `CONTRIBUTING.md` y Git Flow
- **Links al Wiki** — índice de todas las páginas de documentación técnica

---

> 🔗 Anterior: [← Spec-Driven Development](16-Spec-Driven-Development) | [← Volver al Home](Home)
