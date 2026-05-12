| Nombre                     | DNI      |
| -------------------------- | -------- |
| Jheyson Paul Paytan Huaman | 72503013 |
| Jack Alexander Rojas Lara  | 75888144 |

<div align="center">

# 🎓 Sistema de Gestión de Horarios Universitarios

**Plataforma web inteligente que genera automáticamente horarios académicos óptimos mediante un motor de Satisfacción de Restricciones (CSP), garantizando cero conflictos entre docentes, aulas y estudiantes.**

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React_+_Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Scrum](https://img.shields.io/badge/Metodología-Scrum-6DB33F?style=for-the-badge)](https://scrum.org/)
[![License](https://img.shields.io/badge/Licencia-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## 📑 Tabla de Contenidos

- [📌 Descripción](#-descripción)
- [🧠 Motor de Horarios (CSP)](#-motor-de-horarios-csp)
- [🏗️ Arquitectura](#️-arquitectura)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [⚙️ Instalación Local](#️-instalación-local)
- [🔥 Despliegue en Firebase](#-despliegue-en-firebase)
- [👥 Roles del Sistema](#-roles-del-sistema)
- [📚 Documentación Completa](#-documentación-completa)
- [👨‍💻 Equipo](#-equipo)
- [📄 Licencia](#-licencia)

---

## 📌 Descripción

### Problema que Resuelve

La planificación manual de horarios académicos universitarios es un proceso **altamente complejo** que involucra múltiples variables simultáneas:

- 🔴 Solapamiento de docentes, aulas y estudiantes
- 🔴 Conflictos de prerrequisitos académicos no verificados
- 🔴 Violaciones al límite de créditos permitidos (20–22)
- 🔴 Uso ineficiente de la infraestructura disponible
- 🔴 Horas y días de trabajo de los docentes no respetados

### Solución

Este sistema automatiza completamente la generación de horarios mediante algoritmos de **Backtracking con heurísticas MRV (Minimum Remaining Values)** y **Forward Checking**, garantizando:

| Garantía                        | Descripción                                                          |
| ------------------------------- | -------------------------------------------------------------------- |
| ✅ **Cero solapamientos**       | Ningún docente, aula o estudiante ocupa dos espacios al mismo tiempo |
| ✅ **Prerrequisitos validados** | La matrícula verifica automáticamente la cadena de cursos aprobados  |
| ✅ **Créditos controlados**     | Límite de 20–22 créditos por período académico por estudiante        |
| ✅ **Disponibilidad respetada** | Los docentes solo son asignados en sus ventanas horarias registradas |
| ✅ **Capacidad de aula**        | Ningún grupo supera el aforo del espacio asignado                    |

---

## 🧠 Motor de Horarios (CSP)

El corazón del sistema es un motor de **Constraint Satisfaction Problem (CSP)**, un problema clasificado como **NP-difícil**.

### Variables del Problema

```
┌─────────────────────────────────────────────────────────┐
│                    VARIABLES CSP                        │
├──────────────┬──────────────────────────────────────────┤
│ C (Cursos)   │ Asignaturas disponibles en el período    │
│ D (Docentes) │ Profesores asignables a cursos           │
│ E (Estudian) │ Usuarios que seleccionan cursos          │
│ A (Aulas)    │ Espacios físicos disponibles             │
│ H (Franjas)  │ Bloques de tiempo semanales (mín. 2 hrs) │
└──────────────┴──────────────────────────────────────────┘
```

### Restricciones

**Duras (no negociables):**

- Un docente no puede dictar dos clases simultáneamente
- Un aula no puede ser usada por dos cursos a la vez
- Un estudiante no puede tener dos materias en el mismo horario
- Máximo 20–22 créditos por estudiante por período

**Blandas (optimización):**

- Distribución coherente de carga horaria a lo largo de la semana
- Equidad de carga entre docentes

---

## 🏗️ Arquitectura (MERN)

El proyecto está diseñado bajo una arquitectura **MERN (MongoDB, Express, React, Node.js)**, utilizando contenedores Docker para maximizar la escalabilidad.

| Capa MERN   | Implementación           | Función en el Proyecto                                          |
| ----------- | ------------------------ | --------------------------------------------------------------- |
| **M**ongoDB | **MongoDB + Mongoose**   | Almacenamiento ágil de colecciones (Cursos, Aulas, Logs CSP).   |
| **E**xpress | **Express.js API REST**  | Enrutamiento de peticiones seguras desde el cliente con JWT.    |
| **R**eact   | **React 19 + Vite**      | SPA rápida, asíncrona y con estado global manejado por Zustand. |
| **N**ode.js | **Node.js 20 (Runtime)** | Ejecución del motor CSP pesado (Backtracking) en el backend.    |

```
┌──────────────────────────────────────────────────────────────┐
│                   CLIENTE (Navegador Web)                    │
│              React + Vite SPA — TypeScript                   │
└───────────────────────────┬──────────────────────────────────┘
                            │ REST API (JSON)
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                   BACKEND (Node.js + Express)                │
│                                                              │
│  ┌─────────────────────┐      ┌───────────────────────────┐  │
│  │ AUTH (JWT)          │      │ Motor CSP                 │  │
│  │ Middlewares         │      │ (Backtracking+MRV)        │  │
│  └─────────────────────┘      └───────────────────────────┘  │
└──────┬───────────────────────────────────────────────────────┘
       │ Mongoose Driver
       ▼
┌───────────────────────┐
│       MONGODB         │
│                       │
│  users                │
│  courses              │
│  teachers             │
│  classrooms           │
│  enrollments          │
│  schedules            │
│  logs                 │
└───────────────────────┘
```

---

## 🔥 Stack Resumido (MERN)

| Capa          | Tecnología                             |
| ------------- | -------------------------------------- |
| Frontend      | React + Vite + TypeScript              |
| Base de Datos | MongoDB                                |
| Autenticación | JSON Web Tokens (JWT)                  |
| Backend       | Node.js + Express                      |
| Hosting       | Vercel / Render                        |
| Motor CSP     | Backtracking + MRV (TypeScript nativo) |

---

## 📁 Estructura del Proyecto

```
gestion-horarios-universitarios/
│
├── 📄 README.md
├── 📄 firebase.json              # Config hosting + functions
├── 📄 .firebaserc                # Proyecto Firebase
├── 📄 firestore.rules            # Reglas de seguridad
├── 📄 firestore.indexes.json     # Índices compuestos
│
├── 📂 frontend/                  # App React + Vite
│   ├── 📄 vite.config.ts
│   ├── 📄 index.html
│   └── 📂 src/
│       ├── 📂 pages/             # Login, Dashboard, Admin, Horarios
│       ├── 📂 components/        # UI: Grilla, Cards, Modales
│       ├── 📂 services/          # Firestore + Functions calls
│       ├── 📂 hooks/             # useAuth, useSchedule, useEnrollment
│       ├── 📂 stores/            # Zustand stores
│       └── 📂 lib/               # firebase.ts, csp.ts, utils.ts
│
├── 📂 backend/                  # Backend Node.js Express MERN
│   ├── 📄 package.json
│   ├── 📄 Dockerfile
│   └── 📂 src/
│       ├── 📂 domain/            # Modelos, puertos y errores
│       ├── 📂 application/       # Motor CSP (Backtracking)
│       ├── 📂 infrastructure/    # Rutas HTTP y BD Mongoose
│       └── 📂 shared/            # Zod schemas y utils
│
└── 📂 docs/                      # Documentación Sprint 0
    ├── 1_Enfoque_del_Proyecto.md
    ├── 2_Vision_del_Proyecto.md
    ├── 3_Project_Charter.md
    ├── 4_Supuestos_y_Restricciones.md
    ├── 5_Equipo_del_Proyecto.md
    ├── 6_Analisis_del_Problema.md
    └── 7_Requerimientos_Preliminares.md
```

---

## ⚙️ Instalación Local

### Prerrequisitos

- [Node.js 20+](https://nodejs.org/)
- [Firebase CLI](https://firebase.google.com/docs/cli): `npm install -g firebase-tools`
- Cuenta de Firebase con un proyecto creado

### 1. Clonar el repositorio

```bash
git clone https://github.com/Alexanderxx03/gestion-horarios-universitarios.git
cd gestion-horarios-universitarios
```

### 2. Instalar dependencias (Monorepo)

```bash
npm install
```

### 3. Ejecutar backend y MongoDB con Docker

```bash
docker-compose up -d
```

### 4. Configurar variables de entorno del Frontend

```bash
# Crear archivo de variables de entorno
cp frontend/.env.example frontend/.env.local
```

### 5. Ejecutar Frontend en modo desarrollo

```bash
cd frontend && npm run dev
```

Acceder en: [http://localhost:5173](http://localhost:5173)

---

## 🔥 Despliegue en Firebase

### Build y Deploy Frontend

```bash
# Build del frontend
cd frontend && npm run build

# Deploy del frontend a Firebase Hosting
cd .. && firebase deploy --only hosting
```

### URLs del Proyecto

| Servicio                 | URL                                                                          |
| ------------------------ | ---------------------------------------------------------------------------- |
| **Hosting (Producción)** | [https://gestion-unihorarios.web.app/](https://gestion-unihorarios.web.app/) |
| **Backend API (MERN)**   | `http://localhost:5000/api`                                                  |

---

## 👥 Roles del Sistema

| Rol             | Permisos                                                        |
| --------------- | --------------------------------------------------------------- |
| **ADMIN**       | Gestión completa: usuarios, períodos, configuración global      |
| **COORDINATOR** | CRUD de cursos, docentes, aulas; activar generación de horarios |
| **TEACHER**     | Ver su horario asignado, registrar disponibilidad               |
| **STUDENT**     | Matrícula de cursos, visualizar horario personal generado       |

---

## 📚 Documentación Completa

La documentación técnica completa está disponible en la **[Wiki oficial del repositorio](https://github.com/Alexanderxx03/gestion-horarios-universitarios/wiki)**:

| Sección                                                                                                                                | Descripción                                   |
| -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| [🏠 Home](https://github.com/Alexanderxx03/gestion-horarios-universitarios/wiki)                                                       | Portada, índice y stack MERN.                 |
| [📌 Visión y Descripción](https://github.com/Alexanderxx03/gestion-horarios-universitarios/wiki/01-Vision-y-Descripcion)               | Propósito, alcance y stakeholders.            |
| [🏗️ Arquitectura del Sistema](https://github.com/Alexanderxx03/gestion-horarios-universitarios/wiki/02-Arquitectura-del-Sistema)       | Diagrama MERN, componentes y flujo principal. |
| [🔥 Stack Tecnológico](https://github.com/Alexanderxx03/gestion-horarios-universitarios/wiki/03-Stack-Tecnologico)                     | MongoDB, Express, React, Node.js detallado.   |
| [🗄️ Modelo de Datos](https://github.com/Alexanderxx03/gestion-horarios-universitarios/wiki/04-Modelo-de-Datos-Firestore)               | Esquemas Mongoose y colecciones MongoDB.      |
| [🧠 Motor CSP](https://github.com/Alexanderxx03/gestion-horarios-universitarios/wiki/05-Motor-CSP)                                     | Backtracking, MRV, Forward Checking.          |
| [👥 Roles y Funcionalidades](https://github.com/Alexanderxx03/gestion-horarios-universitarios/wiki/06-Roles-y-Funcionalidades)         | Permisos por rol del sistema.                 |
| [📋 Requerimientos](https://github.com/Alexanderxx03/gestion-horarios-universitarios/wiki/07-Requerimientos)                           | RF y RNF del sistema.                         |
| [⚙️ Instalación y Configuración](https://github.com/Alexanderxx03/gestion-horarios-universitarios/wiki/08-Instalacion-y-Configuracion) | Guía de instalación local con MongoDB.        |
| [🚀 Despliegue](https://github.com/Alexanderxx03/gestion-horarios-universitarios/wiki/09-Despliegue-Firebase)                          | Deploy en Vercel + Render + MongoDB Atlas.    |
| [✅ Estándares de Calidad](https://github.com/Alexanderxx03/gestion-horarios-universitarios/wiki/10-Estandares-Calidad)                | ISO 25010, OWASP, WCAG 2.1.                   |
| [👨‍💻 Equipo](https://github.com/Alexanderxx03/gestion-horarios-universitarios/wiki/11-Equipo-del-Proyecto)                              | Roles y responsabilidades del equipo.         |
| [📅 Historial de Sprints](https://github.com/Alexanderxx03/gestion-horarios-universitarios/wiki/12-Historial-Sprints)                  | Progreso por sprint.                          |

---

## 👨‍💻 Equipo

| Rol                            | Responsabilidad                                            |
| ------------------------------ | ---------------------------------------------------------- |
| **Scrum Master / Analista**    | Metodología ágil, documentación, GitHub                    |
| **Product Owner / Arquitecto** | Visión del producto, decisiones técnicas, Backlog          |
| **Full-Stack Developer**       | Frontend React + Firebase Functions + UI Premium           |
| **Algoritmos Engineer**        | Diseño e implementación del motor CSP (Backtracking + MRV) |

> _Proyecto académico — Taller de Proyectos 2, 2026_

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**.

```
MIT License — Copyright (c) 2026 Equipo Gestión de Horarios Universitarios
```

---

<div align="center">

**Hecho con ❤️ — Taller de Proyectos 2, 2026**

[![Firebase Hosting](https://img.shields.io/badge/Deployed_on-Firebase_Hosting-FF6F00?style=flat-square&logo=firebase)](https://firebase.google.com/docs/hosting)

</div>
