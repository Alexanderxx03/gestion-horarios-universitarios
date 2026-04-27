<div align="center">

# 🎓 Sistema de Gestión de Horarios Universitarios

**Plataforma web inteligente que genera automáticamente horarios académicos óptimos mediante un motor de Satisfacción de Restricciones (CSP), garantizando cero conflictos entre docentes, aulas y estudiantes.**

[![Firebase](https://img.shields.io/badge/Firebase-Firestore_%7C_Hosting_%7C_Functions-FF6F00?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/)
[![React](https://img.shields.io/badge/React_+_Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://vitejs.dev/)
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
│   FIREBASE AUTH     │          │   FIREBASE CLOUD FUNCTIONS │
│  Google OAuth2      │          │        (Node.js)           │
│  Email/Password     │          │  ┌─────────────────────┐   │
└─────────────────────┘          │  │ Motor CSP           │   │
                                 │  │ (Backtracking+MRV)  │   │
       ┌─────────────────────────┤  ├─────────────────────┤   │
       │                         │  │ Validación Créditos │   │
       ▼                         │  ├─────────────────────┤   │
┌───────────────────────┐        │  │ Validación Prereqs  │   │
│   FIREBASE FIRESTORE  │◄───────┤  └─────────────────────┘   │
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

## 🛠️ Stack Tecnológico

| Componente               | Tecnología                                                     | Versión           |
| ------------------------ | -------------------------------------------------------------- | ----------------- |
| **Frontend**             | React + Vite                                                   | React 19 / Vite 6 |
| **Lenguaje**             | TypeScript                                                     | 5.x               |
| **Estilos**              | Vanilla CSS + CSS Variables                                    | —                 |
| **Estado Global**        | Zustand                                                        | 5.x               |
| **Base de Datos (M)**    | Firestore (Equivalente MongoDB)                                | v10               |
| **Backend / API (E, N)** | Cloud Functions Node.js (Equivalente Express/Node)             | Node.js 20        |
| **Hosting**              | Firebase Hosting                                               | —                 |
| **Motor CSP**            | Backtracking + MRV (TS nativo)                                 | —                 |
| **Metodología**          | Spec-Driven Development (Soportado por **Google Antigravity**) | TDD y Sprints     |

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

La documentación técnica completa ha sido generada siguiendo especificaciones TDD y CSP, y está disponible en la **Wiki del Repositorio**. Se han creado los siguientes documentos en la carpeta `wiki/`:

| Sección                                                                    | Descripción                                                 |
| -------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [🏠 Home](wiki/Home.md)                                                    | Portada, índice y tecnología base.                          |
| [📋 Especificación de Requisitos](wiki/1.-Especificacion-de-Requisitos.md) | Casos de uso y reglas duras/blandas (Spec-Driven).          |
| [🧠 Arquitectura y Motor CSP](wiki/2.-Arquitectura-y-Motor-CSP.md)         | Detalle del algoritmo Backtracking, MRV y Forward Checking. |
| [🧪 Evidencia TDD y Pruebas](wiki/3.-Evidencia-TDD-y-Pruebas.md)           | Pruebas unitarias, validaciones Zod y Firebase Rules.       |

### Documentación del Sprint 0 (`/docs`)

| Documento                                                            | Descripción                           |
| -------------------------------------------------------------------- | ------------------------------------- |
| [Enfoque del Proyecto](docs/1_Enfoque_del_Proyecto.md)               | Metodología Scrum y stack tecnológico |
| [Visión del Proyecto](docs/2_Vision_del_Proyecto.md)                 | Declaración de visión                 |
| [Project Charter](docs/3_Project_Charter.md)                         | Acta de constitución                  |
| [Supuestos y Restricciones](docs/4_Supuestos_y_Restricciones.md)     | Assumptions y constraints             |
| [Equipo del Proyecto](docs/5_Equipo_del_Proyecto.md)                 | Roles y responsabilidades             |
| [Análisis del Problema](docs/6_Analisis_del_Problema.md)             | Modelado CSP del problema             |
| [Requerimientos Preliminares](docs/7_Requerimientos_Preliminares.md) | RF y RNF del sistema                  |

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
