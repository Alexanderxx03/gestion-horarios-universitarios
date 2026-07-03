<p align="center">
  <img src="https://img.shields.io/badge/Estado-En%20Desarrollo-yellow?style=for-the-badge" alt="Estado"/>
  <img src="https://img.shields.io/badge/Versi%C3%B3n-1.0.0-blue?style=for-the-badge" alt="Versión"/>
  <img src="https://img.shields.io/badge/Licencia-MIT-green?style=for-the-badge" alt="Licencia"/>
</p>

<h1 align="center">
  🎓 UniHorarios (Planner UC)
</h1>

<p align="center">
  <strong>Sistema de Generación Óptima de Horarios Académicos</strong>
</p>

<p align="center">
  Sistema web inteligente que genera automáticamente horarios académicos óptimos<br/>
  considerando restricciones académicas, operativas y contextuales,<br/>
  mediante modelado de restricciones <strong>(CSP)</strong> y técnicas de optimización combinatoria.
</p>

---

## 📑 Tabla de Contenidos

- [👥 Equipo](#-equipo)
- [📌 Descripción](#-descripción)
- [🎬 Video del sistema](#-video-del-sistema)
- [🛠 Tecnologías](#-tecnologías)
- [🧠 Motor de Generación de Horarios (CSP)](#-motor-de-generación-de-horarios-csp)
- [🏗 Arquitectura](#-arquitectura)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [⚙️ Instalación](#️-instalación)
- [▶️ Uso](#️-uso)
- [🔌 API](#-api)
- [🤝 Contribución](#-contribución)
- [❓ FAQ](#-faq)
- [📚 Documentación del Proyecto](#-documentación-del-proyecto)
- [📄 Licencia](#-licencia)

---

## 👥 Equipo

<table align="center">
  <tr>
    <td align="center" width="250">
      <strong>Jheyson Paul Paytan Huaman</strong>
      <br/>
      <sub>🎯 Product Owner / Arquitecto</sub>
      <br/>
      <sub>Visión del producto, decisiones técnicas, Backlog</sub>
    </td>
    <td align="center" width="250">
      <strong>Jack Alexander Rojas Lara</strong>
      <br/>
      <sub>⚙️ Algoritmos Engineer / Full Stack</sub>
      <br/>
      <sub>Diseño e implementación del motor CSP, UI/UX</sub>
    </td>
  </tr>
</table>

---

## 📌 Descripción

**UniHorarios** es un sistema web diseñado para estudiantes, docentes y coordinadores académicos que enfrentan dificultades en la planificación de horarios debido a múltiples restricciones y conflictos de disponibilidad.

### Problema que resuelve

La creación manual de horarios académicos es un proceso tedioso, propenso a errores y que consume una cantidad significativa de tiempo. Los conflictos de disponibilidad entre docentes, la capacidad de aulas, los prerrequisitos de cursos y las restricciones de créditos hacen que este proceso sea altamente complejo.

### Solución

UniHorarios automatiza la generación de horarios mediante un **motor basado en Constraint Satisfaction Problem (CSP)**, garantizando:

- ✅ **Cero solapamientos** de docentes, aulas y estudiantes
- ✅ **Cumplimiento de prerrequisitos** académicos
- ✅ **Respeto de límites de créditos** (20-22 créditos por período)
- ✅ **Disponibilidad de docentes** según su registro
- ✅ **Capacidad de aulas** no excedida
- ✅ **Distribución equilibrada** de carga horaria

### Alcance del PMV

| Funcionalidad | Descripción |
|:---|:---|
| **Gestión CRUD** | Estudiantes, docentes, cursos y aulas |
| **Generación automática** | Asignación curso-docente-aula-franja sin conflictos |
| **Construcción manual** | Con validación en tiempo real |
| **Visualización** | Grilla semanal por estudiante, docente y general |
| **Seguridad** | Autenticación robusta y control de acceso por roles |

---

## 🎬 Video del sistema

Demostración en video de las funcionalidades principales de UniHorarios:

**[▶ Ver video del sistema (YouTube) - 5 minutos](https://youtube.com/tu-enlace-aqui)**

> Asegúrate de configurar la calidad en 1080p para visualizar la interfaz gráfica correctamente.

---

## 🛠 Tecnologías

<table align="center">
  <tr>
    <td align="center" width="140">
      <a href="https://reactjs.org/">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="50" height="50" alt="React"/>
      </a>
      <br/><strong>React</strong>
      <br/><sub>Frontend</sub>
    </td>
    <td align="center" width="140">
      <a href="https://nodejs.org/">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="50" height="50" alt="Node.js"/>
      </a>
      <br/><strong>Node.js</strong>
      <br/><sub>Backend</sub>
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
      <br/><sub>Lenguaje</sub>
    </td>
  </tr>
</table>

### Stack Detallado

| Capa | Tecnología | Descripción |
|:---|:---|:---|
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | SPA renderizada en cliente impulsada por Vite |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white) | API REST escalable con Express.js y TypeScript |
| **Motor CSP** | ![Worker Threads](https://img.shields.io/badge/Worker_Threads-339933?style=flat-square&logo=nodedotjs&logoColor=white) | Hilos nativos para aislamiento de CPU intensivo |
| **Base de Datos**| ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white) | Base de datos NoSQL con Mongoose |
| **Autenticación** | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) | Login con JSON Web Tokens y Bcrypt |
| **Control de Versiones** | ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) | GitHub como repositorio central |

---

## 🧠 Motor de Generación de Horarios (CSP)

El corazón de UniHorarios es su **motor de optimización basado en Constraint Satisfaction Problem (CSP)**, un problema clasificado como **NP-difícil**.

### Variables del Problema

```
┌──────────────────────────────────────────────────────────┐
│                    VARIABLES CSP                         │
├──────────────┬───────────────────────────────────────────┤
│  C (Cursos)  │ Asignaturas disponibles en el período     │
│  D (Docentes)│ Profesores asignables a cursos            │
│  E (Estudian)│ Usuarios que seleccionan cursos           │
│  A (Aulas)   │ Espacios físicos disponibles              │
│  H (Franjas) │ Bloques de tiempo semanales (mín. 2 hrs)  │
└──────────────┴───────────────────────────────────────────┘
```

### Restricciones Hard (Obligatorias)

| # | Restricción | Descripción |
|:---:|:---|:---|
| 1 | **Sin solapamiento docente** | Un docente no puede estar en dos lugares al mismo tiempo |
| 2 | **Sin solapamiento de aula** | Un aula no puede tener dos cursos simultáneamente |
| 3 | **Sin solapamiento estudiantil** | Un estudiante no puede tener dos cursos al mismo tiempo |
| 4 | **Prerrequisitos académicos** | Se deben cumplir los prerrequisitos de cada curso |
| 5 | **Límite de créditos** | Máximo 20-22 créditos por período |
| 6 | **Disponibilidad docente** | Respetar la disponibilidad registrada |
| 7 | **Capacidad de aula** | No exceder la capacidad máxima del aula |

### Restricciones Soft (Optimización)

- 📊 Distribución coherente de carga a lo largo de la semana
- ⚖️ Equidad de carga horaria entre docentes

### Rendimiento Esperado

| Operación | Tiempo Máximo | Escenario |
|:---|:---:|:---|
| Generación horario masivo | **≤ 30s** | Escenarios complejos con múltiples cruces |
| Validaciones en tiempo real | **≤ 1s** | Construcción manual de horario |
| Operaciones CRUD | **≤ 2s** | Consulta, registro, edición, visualización |

---

## 🏗 Arquitectura

El backend implementa una **Arquitectura Hexagonal (Puertos y Adaptadores)** para separar la lógica de negocio de las dependencias externas (Base de datos, HTTP).

```text
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE WEB                          │
│             React + Vite SPA (Axios, Zustand)               │
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
│  │   🧠 Capa de Aplicación (Casos de Uso, Autenticación) │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │   🏢 Capa de Dominio (Entidades y Motor CSP)          │  │
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
├── 📄 package.json                # Monorepo y scripts generales
├── 📄 readme.md                   # Documentación principal
│
├── 📂 frontend/                   # Aplicación React (Vite)
│   ├── 📂 src/
│   │   ├── 📂 components/         # Componentes UI reutilizables
│   │   ├── 📂 pages/              # Vistas de la aplicación
│   │   ├── 📂 context/            # Estado global (Context API / Zustand)
│   │   └── 📂 services/           # Llamadas a la API REST
│   └── 📄 package.json
│
├── 📂 backend/                    # Aplicación Node.js/Express
│   ├── 📄 .env                    # Variables de entorno
│   ├── 📂 src/
│   │   ├── 📂 controllers/        # Controladores HTTP
│   │   ├── 📂 models/             # Esquemas Mongoose
│   │   ├── 📂 routes/             # Rutas API
│   │   ├── 📂 csp/                # Motor Constraint Satisfaction Problem
│   │   └── 📂 config/             # Configuración de base de datos
│   └── 📄 package.json
│
├── 📂 scripts/                    # Scripts de poblado de BD y pruebas
└── 📂 docs/                       # Documentación estructurada PMBOK
```

---

## ⚙️ Instalación

### Prerrequisitos

| Herramienta | Versión Mínima |
|:---|:---|
| ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white) | 18.x o superior |
| ![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-4EA94B?style=flat-square&logo=mongodb&logoColor=white) | 6.0 o superior (Local o Atlas) |
| ![Git](https://img.shields.io/badge/Git-2.30+-F05032?style=flat-square&logo=git&logoColor=white) | 2.30 o superior |

### 1. Clonar el repositorio

```bash
git clone https://github.com/Alexanderxx03/gestion-horarios-universitarios.git
cd gestion-horarios-universitarios
```

### 2. Configurar el Backend

```bash
cd backend
npm install
```
Crea un archivo `.env` en la carpeta `backend/` con lo siguiente:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/gestion-horarios
JWT_SECRET=secreto_seguro_para_jwt
```

### 3. Configurar el Frontend

```bash
cd ../frontend
npm install
```

---

## ▶️ Uso

### Iniciar el entorno de desarrollo

```bash
# Terminal 1: Levantar el Backend
cd backend
npm run dev

# Terminal 2: Levantar el Frontend
cd frontend
npm run dev
```

### Flujo Principal

```
1. 🔐 Iniciar sesión con credenciales de prueba o registrarse
2. 📋 Registrar entidades (estudiantes, docentes, cursos, aulas) si está vacío
3. 🧠 Ejecutar el motor de generación de horarios en el módulo correspondiente
4. 👁️ Visualizar el horario generado en la grilla y filtros interactivos
```

---

## 🔌 API

La API REST sigue los estándares RESTful con autenticación JWT.

### Endpoints Principales

| Método | Endpoint | Descripción | Rol Requerido |
|:---:|:---|:---|:---|
| `POST` | `/api/auth/login` | Iniciar sesión | Público |
| `POST` | `/api/auth/register` | Registrar nuevo usuario | Público |
| `GET` | `/api/students` | Listar estudiantes | Autenticado |
| `GET` | `/api/teachers` | Listar docentes | Autenticado |
| `GET` | `/api/courses` | Listar cursos | Autenticado |
| `GET` | `/api/classrooms` | Listar aulas | Autenticado |
| `POST` | `/api/schedules/generate` | Generar horario automático | Autenticado |
| `GET` | `/api/enrollments` | Visualizar matrículas y cruces | Autenticado |

---

## 🤝 Contribución

### Flujo de Trabajo

```bash
# 1. Crear rama desde main
git checkout -b feature/nombre-funcionalidad main

# 2. Desarrollar y hacer commits
git commit -m "feat(module): descripción del cambio"

# 3. Push de la rama
git push origin feature/nombre-funcionalidad

# 4. Crear Pull Request
```

### Convención de Commits

| Prefijo | Uso |
|:---|:---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Documentación |
| `refactor` | Refactorización de código existente |
| `chore` | Tareas de mantenimiento (npm, configuraciones) |

---

## ❓ FAQ

<details>
<summary><strong>¿Qué es CSP y por qué se usa para generar horarios?</strong></summary>

CSP (Constraint Satisfaction Problem) es un paradigma de modelado matemático donde un problema se define mediante variables, dominios y restricciones. Es ideal para la generación de horarios porque permite expresar restricciones complejas (solapamientos, disponibilidad, capacidades) de forma natural y aplicar técnicas de búsqueda inteligente (backtracking con heurísticas) para encontrar soluciones válidas.
</details>

<details>
<summary><strong>¿Cuánto tiempo tarda en generar un horario?</strong></summary>

Para un escenario base con cruces complejos, el algoritmo que corre en hilos de Node.js (Worker Threads) resuelve el problema en **≤ 30 segundos**.
</details>

<details>
<summary><strong>¿Qué navegadores son compatibles?</strong></summary>

Chrome, Firefox, Safari y Edge en sus versiones actuales. La interfaz es moderna y adaptativa.
</details>

---

## 📊 Métricas de Calidad

| Atributo | Métrica | Objetivo |
|:---|:---|:---:|
| **Rendimiento** | Operaciones generales (P95) | ≤ 3s |
| **Escalabilidad** | Nueva entidad/regla sin reestructuración | ✅ |
| **Usabilidad** | Diseño intuitivo y limpio | ✅ |
| **Concurrencia** | Worker Threads evitan bloqueo del Event Loop | ✅ |

---

## 📚 Documentación del Proyecto

Toda la documentación está estructurada bajo estándares PMBOK en la carpeta `docs/`.

- 🚀 **[Inicio](docs/inicio/)**: Visión, requerimientos, equipo.
- 📋 **[Planificación](docs/planificacion/)**: Sprints, presupuestos, riesgos.
- 🏗️ **[Ejecución](docs/ejecucion/)**: Arquitectura detallada, modelos de base de datos.
- ✅ **[Seguimiento y Control](docs/seguimiento_control/)**: Pruebas, calidad, usabilidad.
- 🏁 **[Cierre](docs/cierre/)**: Informes finales, lecciones aprendidas, acta de constitución.

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**.

```
MIT License

Copyright (c) 2026 UniHorarios (Planner UC) Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<p align="center">
  Hecho con ❤️ por el equipo <strong>UniHorarios</strong> — Taller de Proyectos 2, 2026
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
</p>
