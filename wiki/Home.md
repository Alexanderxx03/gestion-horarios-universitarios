# 🎓 Gestión de Horarios Universitarios — Wiki Oficial

Bienvenido a la documentación técnica completa del proyecto **UniHorarios**, desarrollado como Proyecto de Fin de Asignatura (PFA) en la materia **Taller de Proyectos 2**.

## 🚀 Sobre el Proyecto

**UniHorarios** es una plataforma web que resuelve el problema NP-hard de la asignación óptima de horarios académicos universitarios mediante un **Motor CSP (Constraint Satisfaction Problem)** implementado con algoritmos de Backtracking + MRV + Forward Checking.

El sistema garantiza:

- ✅ **Zero conflictos** de horario (docentes, aulas, estudiantes)
- ✅ **Validación automática** de prerrequisitos y límite de créditos
- ✅ **Generación en ≤30 segundos** para el escenario base (50 cursos, 30 docentes)
- ✅ **Seguridad por roles** (ADMIN, COORDINATOR, TEACHER, STUDENT)

## 🛠️ Stack Tecnológico Real

| Capa              | Tecnología                                                     |
| ----------------- | -------------------------------------------------------------- |
| **Frontend**      | React 19 · Vite 6 · TypeScript strict · Zustand · Vanilla CSS  |
| **Backend**       | Firebase Cloud Functions (Node.js 20) · Arquitectura Hexagonal |
| **Base de Datos** | Cloud Firestore (NoSQL)                                        |
| **Autenticación** | Firebase Authentication · Custom Claims (`role`)               |
| **Hosting**       | Firebase Hosting (CDN global + SSL automático)                 |
| **Motor CSP**     | TypeScript nativo · Backtracking + MRV + Forward Checking      |
| **Validación**    | Zod schemas en Cloud Functions                                 |
| **CI/CD**         | GitHub Actions → Firebase Hosting                              |

---

## 📚 Índice Completo de la Wiki

### 🏗️ Arquitectura y Diseño

1. [Visión y Descripción del Proyecto](01-Vision-y-Descripcion) — Alcance, stakeholders, objetivos
2. [Arquitectura del Sistema](02-Arquitectura-del-Sistema) — Diagrama, componentes, flujo principal
3. [Stack Tecnológico](03-Stack-Tecnologico) — Justificación de cada tecnología
4. [Modelo de Datos Firestore](04-Modelo-de-Datos-Firestore) — Colecciones, esquemas, índices
5. [Motor CSP](05-Motor-CSP) — Algoritmo, heurísticas, pseudocódigo, complejidad
6. [Roles y Funcionalidades](06-Roles-y-Funcionalidades) — RBAC, matrices de permisos, flujos por rol

### 📋 Requerimientos y Especificación

7. [Requerimientos Funcionales y No Funcionales](07-Requerimientos) — RF01–RF07, RNF01–RNF05, Backlog
8. [Instalación y Configuración](08-Instalacion-y-Configuracion) — Setup local, emuladores, variables de entorno
9. [Despliegue Firebase](09-Despliegue-Firebase) — Producción, CI/CD, hosting

### ✅ Calidad y Estándares

10. [Estándares de Calidad](10-Estandares-Calidad) — OWASP Top 10, ISO 25010, WCAG 2.1 AA

### 👥 Equipo y Gestión

11. [Equipo del Proyecto](11-Equipo-del-Proyecto) — Roles Scrum, working agreements, ceremonias
12. [Historial de Sprints](12-Historial-Sprints) — Sprint 0–4 con entregables, fechas y retrospectivas
13. [Métricas Ágiles](13-Metricas-Agiles) — Burndown, Burnup, Velocidad, Gráfico de Control + análisis
14. [Presupuesto del Proyecto](14-Presupuesto-del-Proyecto) — RRHH, infra, costos por sprint, Green Software
15. [Gestión de Riesgos y Oportunidades](15-Gestion-Riesgos-Oportunidades) — 8 riesgos + 4 oportunidades con análisis cuantitativo

### 📐 Spec-Driven Development

16. [Especificación Formal (SDD)](16-Spec-Driven-Development) — Principios, entradas/salidas, reglas, casos límite, coherencia
17. [Trazabilidad y Repositorio](17-Trazabilidad-y-Repositorio) — Git Flow, tabla backlog↔commits↔features, PR evidence

### 📖 Especificaciones Adicionales

- [Especificación de Requisitos](1.-Especificacion-de-Requisitos) — Casos de uso, constraints CSP formales
- [Arquitectura y Motor CSP (detalle)](2.-Arquitectura-y-Motor-CSP) — Arquitectura hexagonal, MRV, Forward Checking
- [Evidencia TDD y Pruebas](3.-Evidencia-TDD-y-Pruebas) — Tests unitarios, Zod, Firestore Rules, CI pipeline

---

## 📊 Estado del Proyecto

| Métrica                        | Valor           |
| ------------------------------ | --------------- |
| Story Points totales           | 84 SP           |
| Story Points completados       | 78 SP (92.9%)   |
| Velocidad promedio             | 19.5 SP/Sprint  |
| Sprints ejecutados             | 4 (+ Sprint 0)  |
| Costo total del proyecto       | $6,454 USD      |
| Huella de carbono (infra)      | ~0.3 kg CO₂/mes |
| Cobertura de riesgos mitigados | 7/8 (87.5%)     |

---

> 🔗 Repositorio: [github.com/Alexanderxx03/gestion-horarios-universitarios](https://github.com/Alexanderxx03/gestion-horarios-universitarios)
