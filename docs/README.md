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

1. [Visión y Descripción del Proyecto](./Sprint_0/01-Vision-y-Descripcion.md) — Alcance, stakeholders, objetivos
2. [Arquitectura del Sistema](./Artefactos/02-Arquitectura-del-Sistema.md) — Diagrama, componentes, flujo principal
3. [Stack Tecnológico](./Artefactos/03-Stack-Tecnologico.md) — Justificación de cada tecnología
4. [Modelo de Datos MongoDB / MERN](./Artefactos/04-Modelo-de-Datos-Firestore.md) — Esquemas Mongoose, colecciones MongoDB
5. [Motor CSP](./Artefactos/05-Motor-CSP.md) — Algoritmo, heurísticas, pseudocódigo, complejidad
6. [Roles y Funcionalidades](./Artefactos/06-Roles-y-Funcionalidades.md) — RBAC, matrices de permisos, flujos por rol

### 📋 Requerimientos y Especificación

7. [Requerimientos Funcionales y No Funcionales](./Sprint_0/07-Requerimientos.md) — RF01–RF07, RNF01–RNF05, Backlog
8. [Instalación y Configuración](./Manuales/08-Instalacion-y-Configuracion.md) — Setup local, emuladores, variables de entorno
9. [Despliegue Firebase](./Manuales/09-Despliegue-Firebase.md) — Producción, CI/CD, hosting

### ✅ Calidad y Estándares (Quality Assurance)

10. [Estándares de Calidad Generales](./Pruebas/10-Estandares-Calidad.md) — Resumen inicial de normativas y estándares
11. [Anexo A: Calidad de Código (SonarQube)](./Pruebas/Anexo_A_SonarQube.md) — Análisis de vulnerabilidades estáticas y deuda técnica
12. [Anexo B: Seguridad Web (OWASP Top 10)](./Pruebas/Anexo_B_OWASP.md) — Matriz de mitigación (Helmet, Rate-Limit, Injection)
13. [Anexo C: Accesibilidad (WCAG 2.2 AA)](./Pruebas/Anexo_C_WCAG.md) — Validación de contraste y semántica
14. [Anexo D: Usabilidad (Escala SUS)](./Pruebas/Anexo_D_Usabilidad_SUS.md) — Medición empírica y aceptabilidad de la interfaz
15. [Anexo E: Impacto Ambiental y Green IT](./Pruebas/Anexo_E_Impacto_Ambiental_y_Green_IT.md) — Optimización de payload y métricas MERN
16. [Anexo F: Pruebas Frontend (Vitest)](./Pruebas/Anexo_F_Pruebas_Frontend_Vitest.md) — Reporte de pruebas unitarias y cobertura UI
17. [Anexo G: Pruebas Backend (Jest)](./Pruebas/Anexo_G_Pruebas_Backend_Jest.md) — Reporte de pruebas unitarias y middlewares
18. [Anexo H: Pruebas E2E (Motor CSP)](./Pruebas/Anexo_H_Pruebas_E2E_MotorCSP.md) — Validación funcional y algorítmica
19. [Informe Técnico Integral (QA)](./Pruebas/24-Informe-Tecnico-Integral.md) — Consolidado de la validación de software

### 🏁 Fase de Control y Cierre (PMBOK)

20. [Informe Final del Proyecto](./PFA/25-Informe-Final-Proyecto.md) — Resumen ejecutivo y desempeño del alcance, costo y calidad
21. [Informe Final de Lecciones Aprendidas](./PFA/26-Lecciones-Aprendidas.md) — Consolidado de retrospectivas y buenas prácticas
22. [Registro de Riesgos (Risk Register)](./PFA/27-Registro-Riesgos.md) — Evaluación final de riesgos y mitigaciones
23. [Registro de Incidentes (Issue Log)](./PFA/28-Registro-Incidentes.md) — Problemas reales, responsables y correcciones
24. [Registro de Impedimentos (Impediment Log)](./PFA/29-Registro-Impedimentos.md) — Obstáculos técnicos y organizacionales bloqueantes
25. [Registro de Defectos (Defect Log)](./PFA/30-Registro-Defectos.md) — Bugs detectados en QA, severidad y validación de arreglos
26. [Registro de Supuestos (Assumption Log)](./PFA/31-Registro-Supuestos.md) — Validación empírica de las hipótesis iniciales
27. [Acta de Constitución - Cierre](./PFA/32-Acta-Constitucion-Cierre.md) — Revisión final del cumplimiento de objetivos y criterios de éxito
28. [Declaración de Trabajo (SOW)](./PFA/33-Declaracion-Trabajo-SOW.md) — Validación contractual del alcance comprometido y entregables
29. [Documentación de Capacitación](./Manuales/34-Documentacion-Capacitacion.md) — Transferencia de conocimiento, manuales y guías operativas

### 👥 Equipo y Gestión

30. [Equipo del Proyecto](./Sprint_0/11-Equipo-del-Proyecto.md) — Roles Scrum, working agreements, ceremonias
31. [Historial de Sprints](./Planificacion/12-Historial-Sprints.md) — Sprint 0–4 con entregables, fechas y retrospectivas
32. [Métricas Ágiles](./Planificacion/13-Metricas-Agiles.md) — Burndown, Burnup, Velocidad, Gráfico de Control + análisis
33. [Presupuesto del Proyecto](./Sprint_0/14-Presupuesto-del-Proyecto.md) — RRHH, infra, costos por sprint, Green Software
34. [Gestión de Riesgos y Oportunidades](./Planificacion/15-Gestion-Riesgos-Oportunidades.md) — 8 riesgos + 4 oportunidades con análisis cuantitativo

### 📐 Spec-Driven Development

35. [Especificación Formal (SDD)](./Planificacion/16-Spec-Driven-Development.md) — Principios, entradas/salidas, reglas, casos límite, coherencia
36. [Trazabilidad y Repositorio](./Planificacion/17-Trazabilidad-y-Repositorio.md) — Git Flow, tabla backlog↔commits↔features, PR evidence

### 📖 Especificaciones Adicionales

37. [Especificación de Requisitos](./Sprint_0/1.-Especificacion-de-Requisitos.md) — Casos de uso, constraints CSP formales
38. [Arquitectura y Motor CSP (detalle)](./Artefactos/2.-Arquitectura-y-Motor-CSP.md) — Arquitectura hexagonal, MRV, Forward Checking
39. [Evidencia TDD y Pruebas](./Planificacion/3.-Evidencia-TDD-y-Pruebas.md) — Tests unitarios, Zod, Firestore Rules, CI pipeline

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
