# 12 · Historial de Sprints

## Sprint 0 – Documentación Inicial y Planificación

**Período:** Inicio del proyecto — Abril 2026  
**Objetivo:** Establecer las bases formales del proyecto: documentación de inicio, arquitectura, backlog inicial y repositorio configurado.  
**Estado:** ✅ Completado

---

### Entregables del Sprint 0

#### 📂 Documentación Formal (`/docs`)

| Documento | Descripción | Estado |
|---|---|---|
| [1 – Enfoque del Proyecto](../docs/1_Enfoque_del_Proyecto.md) | Metodología Scrum, enfoque SPA + Firebase, justificación técnica | ✅ |
| [2 – Visión del Proyecto](../docs/2_Vision_del_Proyecto.md) | Declaración de visión del sistema | ✅ |
| [3 – Project Charter](../docs/3_Project_Charter.md) | Acta de constitución: objetivos, alcance, hitos | ✅ |
| [4 – Supuestos y Restricciones](../docs/4_Supuestos_y_Restricciones.md) | Assumptions académicas y técnicas, constraints | ✅ |
| [5 – Equipo del Proyecto](../docs/5_Equipo_del_Proyecto.md) | Roles Scrum y normas de trabajo | ✅ |
| [6 – Análisis del Problema](../docs/6_Analisis_del_Problema.md) | Modelado CSP: variables, dominios, restricciones | ✅ |
| [7 – Requerimientos Preliminares](../docs/7_Requerimientos_Preliminares.md) | RF01–RF04 + RNF01–RNF05 | ✅ |

#### 🔥 Arquitectura y Stack

| Decisión | Resultado |
|---|---|
| **Frontend** | React + Vite + TypeScript (SPA estática) |
| **Backend** | Firebase Cloud Functions (Node.js 20, serverless) |
| **Base de Datos** | Firebase Firestore (NoSQL documental) |
| **Autenticación** | Firebase Auth (Google OAuth2 + Email/Password) |
| **Hosting** | Firebase Hosting (CDN global + SSL automático) |
| **Motor CSP** | TypeScript nativo en Cloud Functions (Backtracking + MRV) |

#### 📋 Backlog Inicial

Product Backlog del Sprint 0 (priorizados por valor de negocio):

| ID | Historia de Usuario | Story Points | Prioridad |
|---|---|---|---|
| HU-01 | Login con Google OAuth2 | 3 | 🔴 Alta |
| HU-02 | CRUD de Cursos | 5 | 🔴 Alta |
| HU-03 | CRUD de Docentes + Disponibilidad | 8 | 🔴 Alta |
| HU-04 | CRUD de Aulas | 3 | 🔴 Alta |
| HU-05 | Gestión de Períodos Académicos | 3 | 🟡 Media |
| HU-06 | Matrícula con validación de prereqs | 8 | 🔴 Alta |
| HU-07 | Motor CSP – Generación de horarios | 13 | 🔴 Alta |
| HU-08 | Grilla semanal de horarios | 5 | 🟡 Media |
| HU-09 | Exportación a PDF | 5 | 🟡 Media |
| HU-10 | Exportación a Excel | 3 | 🟢 Baja |
| HU-11 | UI Premium completa + Responsiva | 8 | 🟡 Media |

#### 🌐 Repositorio y Documentación

| Entregable | Estado |
|---|---|
| Repositorio GitHub creado y configurado | ✅ |
| `.gitignore` configurado | ✅ |
| `README.md` profesional con badges | ✅ |
| Wiki de GitHub habilitada y completa | ✅ |
| Estructura de carpetas del proyecto definida | ✅ |

---

### Métricas del Sprint 0

| Métrica | Valor |
|---|---|
| Duración | 2 semanas |
| Documentos creados | 7 docs + Wiki (12 páginas) |
| Story Points planificados | — |
| Story Points completados | — (Sprint 0 es de documentación) |
| Impedimentos encontrados | 0 |

---

## Sprint 1 – Configuración Firebase y Autenticación Base

**Período:** Por definir  
**Objetivo:** Configurar el proyecto Firebase, implementar la autenticación y desarrollar el CRUD base de las entidades principales.  
**Estado:** ⏳ Planificado

---

### Ítems Planificados para Sprint 1

| ID | Historia de Usuario | Story Points | Responsable |
|---|---|---|---|
| HU-01 | Login con Google OAuth2 | 3 | Full-Stack Dev |
| HU-02 | CRUD de Cursos | 5 | Full-Stack Dev |
| HU-04 | CRUD de Aulas | 3 | Full-Stack Dev |
| HU-05 | Gestión de Períodos Académicos | 3 | Product Owner |
| — | Configuración Firebase (Auth, Firestore, Hosting, Functions) | 5 | Product Owner |
| — | Reglas de seguridad Firestore por rol | 3 | Arquitecto |

**Total planificado:** 22 Story Points

### Criterios de Éxito Sprint 1

- [ ] Login con Google funciona en producción (Firebase Hosting)
- [ ] CRUD de cursos funcional con validaciones
- [ ] CRUD de aulas funcional
- [ ] Reglas Firestore implementadas y testeadas
- [ ] Deploy inicial en Firebase Hosting exitoso

---

## Sprint 2 – Motor CSP y Matrícula

**Período:** Por definir  
**Objetivo:** Implementar el motor de generación de horarios CSP y el módulo de matrícula de estudiantes.  
**Estado:** ⏳ Planificado

---

### Ítems Planificados para Sprint 2

| ID | Historia de Usuario | Story Points |
|---|---|---|
| HU-03 | CRUD de Docentes + Disponibilidad | 8 |
| HU-06 | Matrícula con validación de prereqs | 8 |
| HU-07 | Motor CSP – Generación de horarios | 13 |

**Total planificado:** 29 Story Points

---

## Sprint 3 – UI Completa y Exportación

**Período:** Por definir  
**Objetivo:** Finalizar la interfaz de usuario premium, implementar la grilla de visualización y los módulos de exportación.  
**Estado:** ⏳ Planificado

---

### Ítems Planificados para Sprint 3

| ID | Historia de Usuario | Story Points |
|---|---|---|
| HU-08 | Grilla semanal de horarios | 5 |
| HU-09 | Exportación a PDF | 5 |
| HU-10 | Exportación a Excel | 3 |
| HU-11 | UI Premium completa + Responsiva | 8 |

**Total planificado:** 21 Story Points

---

## Sprint 4 – Pruebas, Validaciones y Presentación Final

**Período:** Por definir  
**Objetivo:** Testing completo, corrección de bugs, optimización de rendimiento y preparación del video de presentación final.  
**Estado:** ⏳ Planificado

---

### Ítems Planificados para Sprint 4

| Tarea | Descripción |
|---|---|
| Tests de integración | Pruebas end-to-end del flujo completo |
| Pruebas del motor CSP | Verificar correctitud para escenarios complejos |
| Optimización Lighthouse | Garantizar score ≥ 85 en Performance |
| Auditoría de seguridad | Revisión manual de OWASP Top 10 |
| Demo y documentación final | Video de presentación, actualización del Wiki |

---

> 🔗 Anterior: [← Equipo del Proyecto](11-Equipo-del-Proyecto) | [← Volver al Home](Home)
