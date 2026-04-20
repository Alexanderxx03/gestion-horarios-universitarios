# 11 · Equipo del Proyecto

## Contexto

Proyecto académico desarrollado en la asignatura **Taller de Proyectos 2**, con metodología **Scrum** y sprints de 1–2 semanas. Dado el entorno universitario, todos los miembros asumen roles cruzados y colaboran en todas las capas del sistema.

---

## Roles y Responsabilidades

### 🏃 Scrum Master / Analista

**Responsabilidades:**
- Facilitar las ceremonias Scrum: Sprint Planning, Daily Standup, Sprint Review, Retrospectiva
- Remover impedimentos que bloqueen el progreso del equipo
- Garantizar la correcta aplicación de la metodología ágil
- Mantener el repositorio GitHub organizado y documentado
- Gestionar el Wiki y la documentación técnica del proyecto

**Artefactos bajo su responsabilidad:**
- Product Backlog actualizado
- Sprint Burndown Charts
- Historial de impedimentos y resoluciones
- Wiki de GitHub (todas las páginas)

---

### 🎯 Product Owner / Arquitecto de Software

**Responsabilidades:**
- Definir y comunicar la visión del producto final
- Tomar decisiones tecnológicas y arquitectónicas (stack, structure, patterns)
- Priorizar el Product Backlog según valor de negocio académico
- Representar los intereses de los stakeholders (coordinadores, estudiantes)
- Diseñar la arquitectura Firebase del sistema

**Artefactos bajo su responsabilidad:**
- Product Backlog priorizado
- Decisiones de arquitectura documentadas
- ADRs (Architecture Decision Records)
- Definición del modelo de datos Firestore

---

### 💻 Software Engineer / Full-Stack Developer

**Responsabilidades:**
- Desarrollar la SPA (React + Vite + TypeScript)
- Implementar Cloud Functions (Node.js) para la lógica de negocio
- Diseñar y construir la UI Premium con CSS Variables y animaciones
- Configurar Firebase (Auth, Hosting, Functions)
- Aplicar principios OWASP y Clean Code en todo el código

**Artefactos bajo su responsabilidad:**
- Código fuente del frontend (`/frontend`)
- Cloud Functions (`/functions`)
- Configuración Firebase (`firebase.json`, `firestore.rules`)
- Tests unitarios

---

### 🧮 Algorithms Engineer (Especialista en Optimización)

**Responsabilidades:**
- Investigar y diseñar el motor CSP de asignación de horarios
- Implementar el algoritmo de Backtracking con heurísticas MRV y Forward Checking
- Optimizar el motor para garantizar el tiempo de ejecución ≤ 30 segundos
- Documentar matemáticamente las variables, dominios y restricciones
- Escribir pruebas de correctitud del motor (no solapamientos, validación de restricciones)

**Artefactos bajo su responsabilidad:**
- Motor CSP en TypeScript (`/functions/src/schedules/csp-solver.ts`)
- Tests de validación del algoritmo
- Documentación matemática del CSP (página 05 del Wiki)

---

## Normas de Trabajo (Working Agreements)

### Comunicación

1. Todo avance, rediseño o cambio arquitectónico se discute en la reunión de equipo antes de implementar
2. Los impedimentos se reportan en el Daily Standup (no se guardan hasta el Sprint Review)
3. El canal principal de comunicación es el repositorio GitHub (Issues, Projects, Wiki)

### Control de Versiones (Git Flow)

```
main          ← Rama de producción (deploy en Firebase)
  └── develop ← Rama de integración
        ├── feature/HU-01-autenticacion-google
        ├── feature/HU-02-crud-cursos
        ├── feature/HU-08-motor-csp
        └── fix/HU-06-validacion-creditos
```

**Convención de commits:**
```
feat(auth): implementar login con Google OAuth2
fix(csp): corregir forward checking en restricción HC3
docs(wiki): actualizar modelo de datos Firestore
test(csp): agregar tests de no solapamiento de docentes
refactor(frontend): extraer componente GrillaHoraria
chore(deps): actualizar Firebase SDK a v10.12
```

### Definición de Done (DoD)

Un ítem del Sprint Backlog está **terminado** cuando:
- [ ] Código implementado en la rama `feature/*` correspondiente
- [ ] Tests unitarios escritos y pasando
- [ ] Code review realizado por al menos un compañero
- [ ] PR mergeado a `develop`
- [ ] Funcionalidad validada en el emulador Firebase local
- [ ] Documentación actualizada si el cambio afecta la arquitectura o el Wiki
- [ ] Sin errores de linting (`npm run lint` limpio)

---

## Ceremonias Scrum del Proyecto

| Ceremonia | Frecuencia | Duración | Objetivo |
|---|---|---|---|
| **Sprint Planning** | Inicio de cada Sprint | 2 horas | Seleccionar y estimar ítems del Backlog |
| **Daily Standup** | Diario | 15 minutos | Sincronización y reporte de impedimentos |
| **Sprint Review** | Fin de Sprint | 1 hora | Demo de funcionalidades completadas |
| **Retrospectiva** | Fin de Sprint | 30 minutos | Mejora continua del proceso |
| **Backlog Refinement** | Mediados de Sprint | 1 hora | Preparar ítems para el próximo Sprint |

---

## Repositorio y Gestión del Proyecto

| Recurso | Enlace |
|---|---|
| **Repositorio** | github.com/Alexanderxx03/gestion-horarios-universitarios |
| **Issues / Backlog** | GitHub Issues |
| **Sprint Board** | GitHub Projects |
| **Wiki** | GitHub Wiki (este documento) |
| **CI/CD** | GitHub Actions → Firebase Hosting |

---

> 🔗 Anterior: [← Estándares de Calidad](10-Estandares-Calidad) | Siguiente: [Historial de Sprints →](12-Historial-Sprints)
