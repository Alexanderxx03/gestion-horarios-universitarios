# 🎓 Gestión de Horarios Universitarios — Wiki Oficial

Bienvenido a la documentación técnica completa del proyecto **UniHorarios**, desarrollado como Proyecto de Fin de Asignatura (PFA) en la materia **Taller de Proyectos 2**.

## 🚀 Sobre el Proyecto

**UniHorarios** es una plataforma web que resuelve el problema NP-hard de la asignación óptima de horarios académicos universitarios mediante un **Motor CSP (Constraint Satisfaction Problem)** implementado con algoritmos de Backtracking + MRV + Forward Checking.

El sistema garantiza:

- ✅ **Zero conflictos** de horario (docentes, aulas, estudiantes)
- ✅ **Validación automática** de prerrequisitos y límite de créditos
- ✅ **Generación en ≤30 segundos** para el escenario base (50 cursos, 30 docentes)
- ✅ **Seguridad por roles** (ADMIN, COORDINATOR, TEACHER, STUDENT)

## 🛠️ Stack Tecnológico Real (Activo)

| Capa              | Tecnología                                                     |
| ----------------- | -------------------------------------------------------------- |
| **Frontend**      | React 19 · Vite 6 · TypeScript strict · Zustand · Vanilla CSS  |
| **Backend**       | Node.js 20 · Express · TypeScript · Arquitectura Hexagonal     |
| **Base de Datos** | MongoDB · Mongoose (ODM)                                        |
| **Autenticación** | JSON Web Tokens (JWT) con encriptación bcrypt en el Backend    |
| **Hosting (Prod)**| Firebase Hosting (Frontend) · Render / Contenedores (Backend)  |
| **Motor CSP**     | TypeScript nativo · Backtracking + MRV + Forward Checking      |
| **Validación**    | Zod schemas en el Backend                                      |
| **CI/CD**         | GitHub Actions para chequeo estático y builds                  |

### 📜 Evolución de la Arquitectura (Trazabilidad)

> [!NOTE]
> **Historial de Migración:** Inicialmente, el proyecto fue planificado sobre un entorno serverless utilizando **Firebase Cloud Functions** y **Cloud Firestore**. Para mejorar el control de transacciones de matrícula, simplificar las pruebas locales sin emuladores propietarios, y optimizar el rendimiento de las consultas y relaciones en el motor CSP, el sistema fue migrado a una arquitectura **MERN Mosaico (MongoDB + Express + React + Node.js)**. Se mantiene la compatibilidad de interfaces en el cliente a través de un adaptador de datos (Anti-Corruption Layer) y se preserva el despliegue del frontend en Firebase Hosting.


---

## 📚 Índice Completo de la Wiki

### 🏗️ Arquitectura y Diseño

1. [Visión y Descripción del Proyecto](01-Vision-y-Descripcion) — Alcance, stakeholders, objetivos
2. [Arquitectura del Sistema](02-Arquitectura-del-Sistema) — Diagrama, componentes, flujo principal
3. [Stack Tecnológico](03-Stack-Tecnologico) — Justificación de cada tecnología
4. [Modelo de Datos MongoDB / MERN](04-Modelo-de-Datos-Firestore) — Esquemas Mongoose, colecciones MongoDB
5. [Motor CSP](05-Motor-CSP) — Algoritmo, heurísticas, pseudocódigo, complejidad
6. [Roles y Funcionalidades](06-Roles-y-Funcionalidades) — RBAC, matrices de permisos, flujos por rol

### 📋 Requerimientos y Especificación

7. [Requerimientos Funcionales y No Funcionales](07-Requerimientos) — RF01–RF07, RNF01–RNF05, Backlog
8. [Instalación y Configuración](08-Instalacion-y-Configuracion) — Setup local, emuladores, variables de entorno
9. [Despliegue Firebase](09-Despliegue-Firebase) — Producción, CI/CD, hosting

### ✅ Calidad y Estándares (Quality Assurance)

56. [Estándares de Calidad Generales](10-Estandares-Calidad) — Resumen inicial de normativas y estándares
57. [Desarrollo Web Responsable (Green Software)](18-Desarrollo-Web-Responsable) — Optimización de payload y métricas MERN
58. [Calidad de Código (SonarQube)](19-SonarQube-Calidad-Codigo) — Análisis de vulnerabilidades estáticas y deuda técnica
59. [Seguridad Web (OWASP Top 10)](20-Seguridad-OWASP) — Matriz de mitigación (Helmet, Rate-Limit, Injection)
60. [Accesibilidad Universal (WCAG 2.2 AA)](21-Accesibilidad-WCAG) — Validación de contraste y semántica
61. [Usabilidad y Experiencia (Escala SUS)](22-Usabilidad-SUS) — Medición empírica y aceptabilidad de la interfaz
62. [Pruebas Automatizadas (Testing)](23-Testing-Automatizado) — Reporte de pruebas unitarias y cobertura en Vitest
63. [Informe Técnico Integral (QA)](24-Informe-Tecnico-Integral) — Consolidado de la validación de software

### 🏁 Fase de Control y Cierre (PMBOK)

64. [Informe Final del Proyecto](25-Informe-Final-Proyecto) — Resumen ejecutivo y desempeño del alcance, costo y calidad
65. [Informe Final de Lecciones Aprendidas](26-Lecciones-Aprendidas) — Consolidado de retrospectivas y buenas prácticas
66. [Registro de Riesgos (Risk Register)](27-Registro-Riesgos) — Evaluación final de riesgos y mitigaciones
67. [Registro de Incidentes (Issue Log)](28-Registro-Incidentes) — Problemas reales, responsables y correcciones
68. [Registro de Impedimentos (Impediment Log)](29-Registro-Impedimentos) — Obstáculos técnicos y organizacionales bloqueantes
69. [Registro de Defectos (Defect Log)](30-Registro-Defectos) — Bugs detectados en QA, severidad y validación de arreglos
70. [Registro de Supuestos (Assumption Log)](31-Registro-Supuestos) — Validación empírica de las hipótesis iniciales
71. [Acta de Constitución - Cierre](32-Acta-Constitucion-Cierre) — Revisión final del cumplimiento de objetivos y criterios de éxito
72. [Declaración de Trabajo (SOW)](33-Declaracion-Trabajo-SOW) — Validación contractual del alcance comprometido y entregables
73. [Documentación de Capacitación](34-Documentacion-Capacitacion) — Transferencia de conocimiento, manuales y guías operativas

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
