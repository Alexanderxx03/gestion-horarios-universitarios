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

## 🏗️ Arquitectura (MERN Serverless)

El proyecto está diseñado bajo una arquitectura **MERN Evolucionada (Serverless MERN)**, utilizando servicios gestionados en la nube para maximizar la escalabilidad y reducir el tiempo de respuesta a <2s.

| Capa MERN clásica | Equivalencia Serverless implementada | Función en el Proyecto                                          |
| ----------------- | ------------------------------------ | --------------------------------------------------------------- |
| **M**ongoDB       | **Firestore (NoSQL)**                | Almacenamiento ágil de colecciones (Cursos, Aulas, Logs CSP).   |
| **E**xpress       | **Cloud Functions (HTTP Triggers)**  | Enrutamiento de peticiones seguras desde el cliente.            |
| **R**eact         | **React 19 + Vite**                  | SPA rápida, asíncrona y con estado global manejado por Zustand. |
| **N**ode.js       | **Node.js 20 (Runtime)**             | Ejecución del motor CSP pesado (Backtracking) en el backend.    |

```
┌──────────────────────────────────────────────────────────────┐
│                   CLIENTE (Navegador Web)                    │
│              React + Vite SPA — TypeScript                   │
└───────────────────────────┬──────────────────────────────────┘
                            │ HTTPS
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                    FIREBASE HOSTING                          │
│         Servicio de archivos estáticos con CDN global        │
│              SPA routing via firebase.json                   │
└──────┬──────────────────────────────────────┬────────────────┘
       │ Firestore SDK (directo)              │ HTTPS (callable)
       ▼                                      ▼
┌─────────────────────┐          ┌────────────────────────────┐
│   AUTH (JWT)        │          │   BACKEND (NODE/EXPRESS)   │
│  Generación Tokens  │          │                            │
│  Validación         │          │  ┌─────────────────────┐   │
└─────────────────────┘          │  │ Motor CSP           │   │
                                 │  │ (Backtracking+MRV)  │   │
       ┌─────────────────────────┤  ├─────────────────────┤   │
       │                         │  │ Validación Créditos │   │
       ▼                         │  ├─────────────────────┤   │
┌───────────────────────┐        │  │ Validación Prereqs  │   │
│       MONGODB         │◄───────┤  └─────────────────────┘   │
│                       │        └────────────────────────────┘
│  users                │
│  courses              │
│  teachers             │
│  classrooms           │
│  enrollments          │
│  schedules            │
│  academic_periods     │
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
├── 📂 functions/                 # Cloud Functions Node.js
│   └── 📂 src/
│       ├── 📂 auth/              # onCreate user trigger
│       ├── 📂 schedules/         # generateSchedule(), validateSchedule()
│       ├── 📂 enrollments/       # validateEnrollment(), checkCredits()
│       └── 📂 shared/            # Tipos, constantes, helpers
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

### 2. Configurar Firebase

```bash
# Iniciar sesión en Firebase
firebase login

# Vincular al proyecto Firebase
firebase use --add
```

### 3. Instalar dependencias del Frontend

```bash
cd frontend
npm install
```

### 4. Instalar dependencias de Cloud Functions

```bash
cd ../functions
npm install
```

### 5. Configurar variables de entorno del Frontend

```bash
# Crear archivo de variables de entorno
cp frontend/.env.example frontend/.env.local
# Completar con los datos de tu proyecto Firebase
```

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### 6. Ejecutar en modo desarrollo

```bash
# Terminal 1 – Frontend
cd frontend && npm run dev

# Terminal 2 – Emuladores Firebase (Firestore + Functions + Auth)
firebase emulators:start
```

Acceder en: [http://localhost:5173](http://localhost:5173)

---

## 🔥 Despliegue en Firebase

### Build y Deploy Completo

```bash
# Build del frontend
cd frontend && npm run build

# Deploy de todo (hosting + functions + rules)
cd .. && firebase deploy

# Deploy solo del frontend
firebase deploy --only hosting

# Deploy solo de functions
firebase deploy --only functions

# Deploy solo de reglas Firestore
firebase deploy --only firestore:rules
```

### URLs del Proyecto

| Servicio                 | URL                                                                          |
| ------------------------ | ---------------------------------------------------------------------------- |
| **Hosting (Producción)** | [https://gestion-unihorarios.web.app/](https://gestion-unihorarios.web.app/) |
| **Firestore Console**    | [console.firebase.google.com](https://console.firebase.google.com/)          |
| **Functions Logs**       | `firebase functions:log`                                                     |

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
