<p align="center">
  <img src="https://img.shields.io/badge/Estado-En%20Desarrollo-yellow?style=for-the-badge" alt="Estado"/>
  <img src="https://img.shields.io/badge/Versi%C3%B3n-1.0.0-blue?style=for-the-badge" alt="Versión"/>
  <img src="https://img.shields.io/badge/Licencia-MIT-green?style=for-the-badge" alt="Licencia"/>
</p>

<h1 align="center">
  🎓 UniHorarios
</h1>

<p align="center">
  <strong>Sistema de Generación Óptima de Horarios Académicos</strong>
</p>

<p align="center">
  Plataforma web inteligente que genera automáticamente horarios académicos óptimos<br/>
  considerando restricciones académicas, operativas y contextuales,<br/>
  mediante modelado de restricciones <strong>(CSP)</strong> y técnicas de optimización combinatoria.
</p>

---

## 📑 Tabla de Contenidos

- [👥 Equipo](#-equipo)
- [📌 Descripción](#-descripción)
- [🛠 Tecnologías (MERN)](#-tecnologías-mern)
- [🧠 Motor de Generación de Horarios (CSP)](#-motor-de-generación-de-horarios-csp)
- [🏗 Arquitectura Hexagonal](#-arquitectura-hexagonal)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [⚙️ Instalación](#️-instalación)
- [▶️ Uso](#️-uso)
- [🔌 API & Swagger](#-api--swagger)
- [🤝 Contribución](#-contribución)
- [❓ FAQ](#-faq)
- [📚 Documentación del Proyecto](#-documentación-del-proyecto)
- [📄 Licencia](#-licencia)

---

## 👥 Equipo

<table align="center">
  <tr>
    <td align="center" width="220">
      <strong>Jheyson Paul Paytan Huaman</strong>
      <br/>
      <sub>🎯 Product Owner / Arquitecto</sub>
      <br/>
      <sub>Visión del producto, decisiones técnicas, Backlog</sub>
    </td>
    <td align="center" width="220">
      <strong>Jack Alexander Rojas Lara</strong>
      <br/>
      <sub>⚙️ Algoritmos Engineer</sub>
      <br/>
      <sub>Diseño e implementación del motor CSP (Backtracking + MRV)</sub>
    </td>
  </tr>
</table>

---

## 📌 Descripción

**UniHorarios** es un sistema web diseñado para estudiantes, docentes y coordinadores académicos que enfrentan dificultades en la planificación de horarios debido a múltiples restricciones y conflictos de disponibilidad.

### Problema que resuelve

La planificación manual de horarios académicos universitarios es un proceso **altamente complejo** (NP-Difícil) que involucra:
- 🔴 Solapamiento de docentes, aulas y estudiantes
- 🔴 Conflictos de prerrequisitos académicos no verificados
- 🔴 Violaciones al límite de créditos permitidos (20–22)
- 🔴 Uso ineficiente de la infraestructura disponible

### Solución

UniHorarios automatiza la generación de horarios mediante un **motor basado en Constraint Satisfaction Problem (CSP)** y heurísticas de Inteligencia Artificial (MRV, Forward Checking), garantizando:

- ✅ **Cero solapamientos** de docentes, aulas y estudiantes
- ✅ **Cumplimiento de prerrequisitos** académicos
- ✅ **Respeto de límites de créditos** (20-22 créditos por período)
- ✅ **Disponibilidad de docentes** según su registro
- ✅ **Capacidad de aulas** no excedida

### Alcance del Sistema

| Funcionalidad | Descripción |
|:---|:---|
| **Gestión CRUD** | Estudiantes, docentes, cursos y aulas |
| **Generación automática** | Asignación curso-docente-aula-franja sin conflictos |
| **Matrícula** | Los estudiantes se matriculan verificando prerrequisitos |
| **Seguridad** | Autenticación robusta con JWT y control de acceso por roles |

### Roles del Sistema

| Rol | Permisos |
|:---|:---|
| **ADMIN** | Gestión completa global |
| **COORDINATOR** | CRUD de recursos y ejecución del Motor CSP |
| **TEACHER** | Visualización de horario asignado y registro de disponibilidad |
| **STUDENT** | Matrícula de cursos y visualización de horario personal |

---

## 🛠 Tecnologías (MERN)

<table align="center">
  <tr>
    <td align="center" width="140">
      <a href="https://react.dev/">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="50" height="50" alt="React"/>
      </a>
      <br/><strong>React (Vite)</strong>
      <br/><sub>Frontend SPA</sub>
    </td>
    <td align="center" width="140">
      <a href="https://nodejs.org/">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="50" height="50" alt="Node.js"/>
      </a>
      <br/><strong>Node.js</strong>
      <br/><sub>Backend & CSP Worker</sub>
    </td>
    <td align="center" width="140">
      <a href="https://expressjs.com/">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="50" height="50" alt="Express"/>
      </a>
      <br/><strong>Express.js</strong>
      <br/><sub>API REST</sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.mongodb.com/">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="50" height="50" alt="MongoDB"/>
      </a>
      <br/><strong>MongoDB</strong>
      <br/><sub>Base de Datos</sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.typescriptlang.org/">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="50" height="50" alt="TypeScript"/>
      </a>
      <br/><strong>TypeScript</strong>
      <br/><sub>Tipado Estricto</sub>
    </td>
  </tr>
</table>

### Stack Detallado

| Capa | Tecnología | Descripción |
|:---|:---|:---|
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | SPA renderizada en cliente impulsada por Vite |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white) | API REST escalable con Express y Arquitectura Hexagonal |
| **Motor CSP** | ![Worker Threads](https://img.shields.io/badge/Worker_Threads-339933?style=flat-square&logo=nodedotjs&logoColor=white) | Hilos nativos (Worker Threads) para aislamiento de CPU intensivo |
| **Base de Datos** | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white) | BD NoSQL con Mongoose para validación de esquemas |
| **Caché & Logs** | ![NodeCache](https://img.shields.io/badge/Node--Cache-F7DF1E?style=flat-square) ![Winston](https://img.shields.io/badge/Winston-000000?style=flat-square) | Caché in-memory sub-milisegundo y logs corporativos |
| **Autenticación** | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) | Tokens JWT stateless y Bcrypt para hashing de contraseñas |

---

## 🧠 Motor de Generación de Horarios (CSP)

El corazón de UniHorarios es su motor de **Constraint Satisfaction Problem (CSP)**. Ejecutado en su propio hilo (*Worker Thread*) para evitar bloquear la API, resuelve un problema **NP-difícil**.

### Restricciones Hard (Obligatorias)
1. **Sin solapamiento docente**
2. **Sin solapamiento de aula**
3. **Sin solapamiento estudiantil**
4. **Prerrequisitos académicos**
5. **Límite de créditos** (20-22)
6. **Disponibilidad docente**
7. **Capacidad de aula**

---

## 🏗 Arquitectura Hexagonal

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE                              │
│                   React + Vite SPA                          │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS / REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND (Node.js + Express)                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │   📦 Capa de Infraestructura (HTTP, Mongoose)         │  │
│  │   ┌─────────────────────┐   ┌───────────────────┐     │  │
│  │   │     Controllers     │   │     Repositories  │     │  │
│  │   └─────────────────────┘   └───────────────────┘     │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │   🧠 Capa de Aplicación (Casos de Uso)                │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │   🏢 Capa de Dominio (Entidades y Reglas de Negocio)  │  │
│  └────────────────────────┬──────────────────────────────┘  │
└───────────────────────────┼─────────────────────────────────┘
                            │ Worker Threads (Aislamiento)
                            ▼
               ┌──────────────────────────┐
               │    MOTOR CSP ALGORITHM   │
               │   (Backtracking + MRV)   │
               └──────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```
gestion-horarios-universitarios/
├── 📄 README.md
├── 📂 frontend/                  # App React + Vite
│   ├── 📂 src/
│   │   ├── 📂 pages/             # Login, Dashboard, etc.
│   │   ├── 📂 components/        # Componentes UI reutilizables
│   │   ├── 📂 services/          # Llamadas a la API Backend
│   │   └── 📂 stores/            # Estado global (Zustand)
│
├── 📂 backend/                   # Backend Node.js Express Hexagonal
│   ├── 📂 src/
│   │   ├── 📂 domain/            # Entidades y reglas de negocio
│   │   ├── 📂 application/       # Motor CSP y Worker Threads
│   │   ├── 📂 infrastructure/    # Rutas HTTP, Mongoose y Caché
│   │   └── 📂 shared/            # Validadores (Zod), Logs (Winston)
│
└── 📂 docs/                      # Documentación Técnica
    ├── 📂 Artefactos/            # Diagramas y Arquitectura
    ├── 📂 Manuales/              # Guías de Uso
    ├── 📂 PFA/                   # Informes de Cierre
    ├── 📂 Planificacion/         # Scrum y Sprints
    └── 📂 Pruebas/               # QA (SonarQube, OWASP, WCAG)
```

---

## ⚙️ Instalación

### Prerrequisitos

- [Node.js 20+](https://nodejs.org/)
- [MongoDB Local o Atlas URI](https://www.mongodb.com/)

### 1. Clonar el repositorio
```bash
git clone https://github.com/Alexanderxx03/gestion-horarios-universitarios.git
cd gestion-horarios-universitarios
```

### 2. Configurar Variables de Entorno
Crea un archivo `.env` en la carpeta `backend/`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/unihorarios
JWT_SECRET=tu_secreto_super_seguro
```

### 3. Ejecutar el Backend
```bash
cd backend
npm install
npm run dev
```

### 4. Ejecutar el Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🔌 API & Swagger

Nuestra API REST está documentada interactivamente usando **Swagger**.

Con el backend en ejecución, accede a:
👉 `http://localhost:5000/api/docs`

| Método | Endpoint | Descripción | Rol Requerido |
|:---:|:---|:---|:---|
| `POST` | `/api/auth/login` | Iniciar sesión y obtener JWT | Público |
| `GET` | `/api/students` | Listar estudiantes con caché | Admin |
| `POST` | `/api/schedules/generate` | Ejecutar Motor CSP (Worker Thread) | Coordinator |

---

## 📚 Documentación del Proyecto

Toda la documentación está estructurada bajo estándares PMBOK y se encuentra en `docs/`:

- 🚀 **[Sprint 0 (Visión y Requerimientos)](docs/Sprint_0/)**
- 🏗️ **[Artefactos y Arquitectura](docs/Artefactos/)**
- 📋 **[Planificación y Sprints](docs/Planificacion/)**
- ✅ **[Pruebas y Calidad QA](docs/Pruebas/)** *(OWASP, WCAG, Green IT)*
- 🏁 **[Proyecto Final de Asignatura (PFA)](docs/PFA/)**
- ⚙️ **[Manuales de Instalación](docs/Manuales/)**

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**.

<div align="center">
  Hecho con ❤️ — Taller de Proyectos 2, 2026
</div>
