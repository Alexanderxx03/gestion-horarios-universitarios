# 02 · Arquitectura del Sistema

## Visión General

El sistema adopta una arquitectura **MERN** (MongoDB, Express, React, Node.js), eliminando la necesidad de servidores propios mediante el uso de servicios cloud. El frontend es una **SPA estática** desplegada en Vercel, y toda la lógica de negocio pesada (incluyendo el motor CSP) se ejecuta en un backend **Node.js + Express** desplegado en Render.

---

## Diagrama de Arquitectura

```
┌───────────────────────────────────────────────────────────────────┐
│                        CLIENTE (Navegador)                        │
│         React + Vite SPA — TypeScript — Vanilla CSS               │
│                                                                   │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────────┐   │
│  │   Páginas   │  │  Componentes │  │   Estado Global       │   │
│  │  (React     │  │   (Grilla,   │  │   (Zustand stores)    │   │
│  │   Router)   │  │   Cards, UI) │  │                       │   │
│  └─────────────┘  └──────────────┘  └───────────────────────┘   │
└───────────────────────────┬───────────────────────────────────────┘
                            │ HTTPS / REST API
                            │
          ┌─────────────────┼────────────────────────┐
          │                 │                        │
          ▼                 ▼                        ▼
┌─────────────────┐ ┌────────────────┐ ┌─────────────────────────┐
│  VERCEL HOSTING │ │   AUTH (JWT)   │ │   BACKEND NODE.JS       │
│                 │ │                │ │   (Express REST API)    │
│ Sirve la SPA    │ │ Tokens JWT     │ │                         │
│ estática con    │ │ firmados con   │ │ ┌─────────────────────┐ │
│ CDN global y    │ │ secret propio  │ │ │ generateSchedule()  │ │
│ SSL automático  │ │                │ │ │ Motor CSP           │ │
│                 │ │ bcrypt para    │ │ │ Backtracking + MRV  │ │
│                 │ │ hash passwords │ │ ├─────────────────────┤ │
└─────────────────┘ └────────────────┘ │ │ validateEnrollment()│ │
                                       │ │ Verificar prereqs   │ │
                                       │ │ y límite créditos   │ │
                                       │ ├─────────────────────┤ │
                                       │ │ Middleware Auth JWT │ │
                                       │ │ Protege todas las   │ │
                                       │ │ rutas privadas      │ │
                                       │ └─────────────────────┘ │
                                       └──────────┬──────────────┘
                                                  │ Mongoose ODM
                                                  ▼
                            ┌─────────────────────────────────────┐
                            │           MONGODB ATLAS             │
                            │                                     │
                            │  users          courses             │
                            │  teachers       classrooms          │
                            │  enrollments    schedules           │
                            │  academic_periods                   │
                            │                                     │
                            │  Índices compuestos para            │
                            │  búsquedas de horarios              │
                            └─────────────────────────────────────┘
```

---

## Componentes del Sistema

### 1. Frontend — React + Vite SPA

| Componente         | Descripción                                         | Tecnología       |
| ------------------ | --------------------------------------------------- | ---------------- |
| **App Shell**      | Layout principal con sidebar y navegación           | React Router v7  |
| **Páginas**        | Login, Dashboard, Cursos, Docentes, Aulas, Horarios | React            |
| **Grilla Horaria** | Visualización semana × horas del horario            | CSS Grid + React |
| **Estado Global**  | Auth state, filtros, horario actual                 | Zustand          |
| **Servicios API**  | Wrappers sobre REST API Express                     | TypeScript       |

**Páginas por Rol:**

```
/login                    → Pública
/dashboard                → Todos los roles autenticados
/admin/*                  → Solo ADMIN
/coordinator/*            → ADMIN + COORDINATOR
/teacher/schedule         → TEACHER
/student/enrollment       → STUDENT
/student/schedule         → STUDENT
```

### 2. Backend Node.js + Express — API REST

| Endpoint                        | Método | Descripción                                         |
| ------------------------------- | ------ | --------------------------------------------------- |
| `POST /api/schedule/generate`   | POST   | Ejecuta el motor CSP y guarda el horario en MongoDB |
| `POST /api/enrollment/validate` | POST   | Verifica prerrequisitos y límite de créditos        |
| `POST /api/auth/register`       | POST   | Crea usuario y genera JWT                           |
| `POST /api/export/pdf`          | POST   | Genera y devuelve el horario en formato PDF         |
| `POST /api/export/excel`        | POST   | Genera y devuelve el horario en formato Excel       |

### 3. MongoDB — Base de Datos NoSQL

Base de datos basada en documentos (BSON). Los permisos de acceso se validan en el backend mediante middleware Express y tokens JWT:

- **ADMIN** puede leer/escribir todo
- **COORDINATOR** gestiona el catálogo académico
- **TEACHER** solo lee su propia disponibilidad e horario
- **STUDENT** solo lee su matrícula y horario personal

Ver detalles del modelo en: [Modelo de Datos – MongoDB →](04-Modelo-de-Datos-Firestore)

### 4. Autenticación JWT

- **Email/Password:** Autenticación con bcrypt para hash de contraseñas
- **JWT Tokens:** Firmados con secret propio y validados en cada request
- **Middleware Express:** Protege todas las rutas privadas (`/api/*`)
- **Roles:** El rol del usuario se incluye en el payload del JWT y se verifica en el backend

---

## Flujo Principal: Generación de Horario

```
Coordinator                Frontend              Backend Express         MongoDB
     │                        │                       │                      │
     │──── Click "Generar" ───►│                       │                      │
     │                        │──── Token JWT ────────►│                      │
     │                        │                       │──── Leer datos ──────►│
     │                        │                       │◄─── cursos, docentes ─│
     │                        │                       │     aulas, franjas    │
     │                        │                       │                      │
     │                        │                       │ [Motor CSP]          │
     │                        │                       │ Backtracking + MRV   │
     │                        │                       │ (≤30 segundos)       │
     │                        │                       │                      │
     │                        │                       │──── Guardar ─────────►│
     │                        │                       │     schedules         │
     │                        │◄─── { scheduleId } ───│                      │
     │                        │                       │                      │
     │◄── Vista grilla ───────│                       │                      │
     │    generada            │◄──── GET schedule ────┤◄─── REST Response ───│
     │                        │                       │                      │
```

---

## Seguridad

| Capa              | Mecanismo                                                               |
| ----------------- | ----------------------------------------------------------------------- |
| **Autenticación** | JWT (JSON Web Tokens) firmados con secret propio                        |
| **Autorización**  | Middleware Express que verifica el payload del JWT                      |
| **API Rules**     | Cada endpoint valida el token y el rol antes de ejecutar lógica         |
| **HTTPS**         | Vercel y Render fuerzan HTTPS en todos los endpoints                    |
| **OWASP**         | Validación de inputs con Zod, sin SQL injection posible (NoSQL MongoDB) |

---

> 🔗 Anterior: [← Visión y Descripción](01-Vision-y-Descripcion) | Siguiente: [Stack Tecnológico →](03-Stack-Tecnologico)
