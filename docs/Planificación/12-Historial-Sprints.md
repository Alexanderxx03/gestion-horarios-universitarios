# 12 · Historial de Sprints

## Cronograma General del Proyecto

| Sprint       | Período              | Objetivo                                   | Story Points | Estado         |
| ------------ | -------------------- | ------------------------------------------ | :----------: | -------------- |
| **Sprint 0** | 27 Mar – 10 Abr 2026 | Documentación formal y planificación       |      —       | ✅ Completado  |
| **Sprint 1** | 13 Abr – 24 Abr 2026 | Autenticación, CRUDs base, Firestore Rules |   22 → 19    | ✅ Completado  |
| **Sprint 2** | 27 Abr – 08 May 2026 | Motor CSP y Matrícula                      |   29 → 26    | ✅ Completado  |
| **Sprint 3** | 11 May – 29 May 2026 | UI Premium, Grilla visual, Exportación     |   21 → 21    | ✅ Completado  |
| **Sprint 4** | 01 Jun – 12 Jun 2026 | Testing, Optimización, Presentación        |   12 → 12    | 🔄 En progreso |

### Dependencias y Ruta Crítica

```
Sprint 0 (Documentación)
    └──► Sprint 1 (Auth + CRUDs)
              └──► Sprint 2 (Motor CSP + Matrícula)   ← RUTA CRÍTICA
                        └──► Sprint 3 (UI + Exportación)
                                  └──► Sprint 4 (Testing + Demo)

Nota: Sprint 2 es el cuello de botella de la ruta crítica.
Si el Motor CSP se retrasa, todos los sprints posteriores se ven afectados.
```

**Slack disponible (margen de flotación):**

- HU-10 (Exportación Excel): puede moverse de S3 a S4 sin impacto en el roadmap (+2 semanas de float)
- HU-11 (UI Premium): puede reducirse en alcance de 8→5 SP si hay retrasos en S3

---

## Sprint 0 — Documentación Inicial y Planificación

**Período:** 27 Mar – 10 Abr 2026  
**Objetivo:** Establecer las bases formales del proyecto: documentación de inicio, arquitectura, backlog inicial y repositorio configurado.  
**Estado:** ✅ Completado

### Entregables del Sprint 0

#### 📂 Documentación Formal

| Documento                   | Descripción                                                | Estado |
| --------------------------- | ---------------------------------------------------------- | ------ |
| Enfoque del Proyecto        | Metodología Scrum, enfoque Firebase, justificación técnica | ✅     |
| Visión del Proyecto         | Declaración de visión del sistema                          | ✅     |
| Project Charter             | Acta de constitución: objetivos, alcance, hitos            | ✅     |
| Supuestos y Restricciones   | Assumptions académicas y técnicas, constraints             | ✅     |
| Equipo del Proyecto         | Roles Scrum y normas de trabajo                            | ✅     |
| Análisis del Problema       | Modelado CSP: variables, dominios, restricciones           | ✅     |
| Requerimientos Preliminares | RF01–RF07 + RNF01–RNF05                                    | ✅     |

#### 🔥 Decisiones Arquitectónicas (ADR)

| Decisión          | Alternativas Evaluadas               | Resultado                                                         |
| ----------------- | ------------------------------------ | ----------------------------------------------------------------- |
| **Frontend**      | React vs. Vue vs. Angular            | React 19 + Vite 6 + TypeScript                                    |
| **Backend**       | Express propio vs. Cloud Functions   | Firebase Cloud Functions (serverless, menor mantenimiento)        |
| **Base de Datos** | MongoDB vs. PostgreSQL vs. Firestore | Cloud Firestore (integración nativa con Firebase Auth)            |
| **Autenticación** | JWT propio vs. Firebase Auth         | Firebase Auth (Google OAuth2 + Custom Claims sin servidor propio) |
| **Motor CSP**     | Python vs. TypeScript                | TypeScript (mismo lenguaje que el resto del backend)              |

#### 📋 Backlog Inicial

| ID    | Historia de Usuario                 | Story Points | Prioridad | Sprint |
| ----- | ----------------------------------- | :----------: | --------- | ------ |
| HU-01 | Login con Google OAuth2             |     3 SP     | 🔴 Alta   | S1     |
| HU-02 | CRUD de Cursos                      |     5 SP     | 🔴 Alta   | S1     |
| HU-03 | CRUD de Docentes + Disponibilidad   |     8 SP     | 🔴 Alta   | S2     |
| HU-04 | CRUD de Aulas                       |     3 SP     | 🔴 Alta   | S1     |
| HU-05 | Gestión de Períodos Académicos      |     3 SP     | 🟡 Media  | S1     |
| HU-06 | Matrícula con validación de prereqs |     8 SP     | 🔴 Alta   | S2     |
| HU-07 | Motor CSP – Generación de horarios  |    13 SP     | 🔴 Alta   | S2     |
| HU-08 | Grilla semanal de horarios          |     5 SP     | 🟡 Media  | S3     |
| HU-09 | Exportación a PDF                   |     5 SP     | 🟡 Media  | S3     |
| HU-10 | Exportación a Excel                 |     3 SP     | 🟢 Baja   | S3     |
| HU-11 | UI Premium completa + Responsiva    |     8 SP     | 🟡 Media  | S3     |

**Total:** 64 SP de funcionalidades + 20 SP de tareas técnicas = **84 SP**

### Retrospectiva Sprint 0

| 🟢 Bien                                    | 🔴 Mejorar                         | 💡 Acción                                |
| ------------------------------------------ | ---------------------------------- | ---------------------------------------- |
| Documentación completa en tiempo           | Estimación de SP pendiente para S1 | Hacer planning poker en el inicio del S1 |
| Arquitectura bien definida desde el inicio | ADRs no documentados formalmente   | Agregar sección ADR al Wiki              |
| Repositorio configurado con CI             | Sin ceremonias Scrum todavía       | Iniciar Daily Standup desde S1           |

---

## Sprint 1 — Configuración Firebase y Autenticación Base

**Período:** 13 Abr – 24 Abr 2026  
**Objetivo:** Configurar el proyecto Firebase, implementar autenticación y CRUD base.  
**Estado:** ✅ Completado | **Velocidad:** 19/22 SP (86%)

### Ítems del Sprint 1

| ID    | Historia de Usuario                   | SP Plan | SP Real | Estado         |
| ----- | ------------------------------------- | :-----: | :-----: | -------------- |
| HU-01 | Login con Google OAuth2               |    3    |    3    | ✅ Done        |
| HU-02 | CRUD de Cursos                        |    5    |    5    | ✅ Done        |
| HU-04 | CRUD de Aulas                         |    3    |    3    | ✅ Done        |
| HU-05 | Gestión de Períodos Académicos        |    3    |    3    | ✅ Done        |
| —     | Configuración Firebase completa       |    5    |    5    | ✅ Done        |
| —     | Reglas de seguridad Firestore por rol |    3    |    0    | ❌ Movido a S2 |

**Impedimentos:** Las Firestore Security Rules resultaron más complejas de lo estimado (Custom Claims + validación de roles anidados). Se movieron al inicio del Sprint 2.

### Criterios de Éxito Sprint 1 — Verificación

- ✅ Login con Google funciona en producción (Firebase Hosting)
- ✅ CRUD de cursos funcional con validaciones
- ✅ CRUD de aulas funcional
- ❌ Reglas Firestore → Movidas al Sprint 2
- ✅ Deploy inicial en Firebase Hosting exitoso

### Retrospectiva Sprint 1

| 🟢 Bien                                                     | 🔴 Mejorar                                     | 💡 Acción                                             |
| ----------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------- |
| Firebase Auth configurado correctamente desde el primer día | Subestimamos la complejidad de Firestore Rules | Dedicar 1 día de investigación antes de estimar en S2 |
| CI pipeline funcionando desde el inicio                     | Sin Daily Standup los primeros 3 días          | Establecer hora fija para Daily (09:00 AM)            |
| Commits semánticos bien aplicados                           | PR sin descripción detallada                   | Usar el template de PR definido en CONTRIBUTING.md    |

---

## Sprint 2 — Motor CSP y Matrícula

**Período:** 27 Abr – 08 May 2026  
**Objetivo:** Implementar el motor de generación CSP y el módulo de matrícula.  
**Estado:** ✅ Completado | **Velocidad:** 26/29 SP (90%)

### Ítems del Sprint 2

| ID    | Historia de Usuario                 | SP Plan | SP Real | Estado                |
| ----- | ----------------------------------- | :-----: | :-----: | --------------------- |
| HU-03 | CRUD de Docentes + Disponibilidad   |    8    |    8    | ✅ Done               |
| HU-06 | Matrícula con validación de prereqs |    8    |    8    | ✅ Done               |
| HU-07 | Motor CSP – Generación de horarios  |   13    |   10    | ⚠️ Parcial (HC3 bug)  |
| —     | Firestore Security Rules (deuda S1) |    3    |    3    | ✅ Done               |
| —     | Fix BUG-01: HC3 forward checking    |    —    |    —    | ✅ Resuelto en sprint |

**Incidente:** Bug crítico en `forwardCheck()` para restricción HC3. El motor retornaba `null` en instancias con ≥15 cursos cuando múltiples estudiantes compartían más de 2 cursos. Resuelto con rediseño de la función de conflicto (usar intersección de `Set<studentId>` en vez de comparación de `courseId`).

### Criterios de Éxito Sprint 2 — Verificación

- ✅ Motor CSP genera horarios sin solapamientos para el escenario básico (10 cursos)
- ✅ Motor CSP maneja correctamente las 8 restricciones duras
- ✅ Matrícula valida prerrequisitos correctamente
- ✅ Matrícula valida límite de créditos (12–22)
- ⚠️ Escenario de 30+ cursos: 3 SP de deuda técnica para Sprint 3

### Retrospectiva Sprint 2

| 🟢 Bien                                                   | 🔴 Mejorar                                         | 💡 Acción                                                     |
| --------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------- |
| Bug HC3 resuelto dentro del sprint sin impacto al roadmap | No teníamos tests para el escenario de ≥15 cursos  | Agregar fixture complejo al suite de tests en S3              |
| Pair programming en el Motor CSP fue muy efectivo         | El Daily fue cancelado 2 veces por carga académica | Definir política: Daily asincrónico si no se puede presencial |
| Firestore Rules correctamente testeadas con emuladores    | HC3 subestimado en complejidad                     | En S3, hacer spike antes de implementar HC6 (tipo de aula)    |

---

## Sprint 3 — UI Completa y Exportación

**Período:** 11 May – 29 May 2026  
**Objetivo:** Finalizar interfaz premium, grilla visual y exportación.  
**Estado:** ✅ Completado | **Velocidad:** 21/21 SP (100%)

### Ítems del Sprint 3

| ID    | Historia de Usuario              | SP Plan | SP Real | Estado  |
| ----- | -------------------------------- | :-----: | :-----: | ------- |
| HU-08 | Grilla semanal de horarios       |    5    |    5    | ✅ Done |
| HU-09 | Exportación a PDF                |    5    |    5    | ✅ Done |
| HU-10 | Exportación a Excel              |    3    |    3    | ✅ Done |
| HU-11 | UI Premium completa + Responsiva |    8    |    8    | ✅ Done |

### Retrospectiva Sprint 3

| 🟢 Bien                                                 | 🔴 Mejorar                                    | 💡 Acción                                            |
| ------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------- |
| Primera vez que se completa el 100% del sprint          | HU-11 tardó 9 días (outlier en Control Chart) | Descomponer HUs de UI en sub-tareas de ≤3 días en S4 |
| Design system CSS Variables bien recibido por el equipo | Tests de integración UI pendientes            | Agregar al menos 3 tests E2E en Sprint 4             |
| Exportación PDF funcionando correctamente               |                                               |                                                      |

---

## Sprint 4 — Pruebas, Validaciones y Presentación Final

**Período:** 01 Jun – 12 Jun 2026  
**Objetivo:** Testing completo, optimización de rendimiento y preparación de la presentación final.  
**Estado:** 🔄 En progreso | **Velocidad:** 12/12 SP (target)

### Ítems del Sprint 4

| Tarea                                              | SP  | Estado         |
| -------------------------------------------------- | :-: | -------------- |
| Tests de integración (flujo completo E2E)          |  3  | 🔄 En progreso |
| Pruebas del motor CSP con escenario de 30+ cursos  |  2  | 🔄 En progreso |
| Optimización Lighthouse (target: ≥ 85 Performance) |  2  | 🔄 En progreso |
| Auditoría de seguridad OWASP Top 10                |  2  | ⏳ Pendiente   |
| Demo y documentación final (Wiki + Video)          |  3  | ⏳ Pendiente   |

---

> 🔗 Anterior: [← Equipo del Proyecto](11-Equipo-del-Proyecto) | Siguiente: [Métricas Ágiles →](13-Metricas-Agiles)
