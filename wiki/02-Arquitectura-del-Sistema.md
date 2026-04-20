# 02 · Arquitectura del Sistema

## Visión General

El sistema adopta una arquitectura **100% serverless basada en Firebase**, eliminando la necesidad de servidores propios. El frontend es una **SPA estática** desplegada en Firebase Hosting, y toda la lógica de negocio pesada (incluyendo el motor CSP) se ejecuta en **Firebase Cloud Functions**.

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
                            │ HTTPS / Firebase SDK v10
                            │
          ┌─────────────────┼────────────────────────┐
          │                 │                        │
          ▼                 ▼                        ▼
┌─────────────────┐ ┌────────────────┐ ┌─────────────────────────┐
│ FIREBASE HOSTING│ │ FIREBASE AUTH  │ │  FIREBASE CLOUD         │
│                 │ │                │ │  FUNCTIONS (Node.js 20) │
│ Sirve la SPA    │ │ Google OAuth2  │ │                         │
│ estática con    │ │ Email/Password │ │ ┌─────────────────────┐ │
│ CDN global y    │ │                │ │ │ generateSchedule()  │ │
│ SSL automático  │ │ JWT Tokens     │ │ │ Motor CSP           │ │
│                 │ │ gestionados    │ │ │ Backtracking + MRV  │ │
│ Routing SPA via │ │ por Firebase   │ │ ├─────────────────────┤ │
│ firebase.json   │ │                │ │ │ validateEnrollment()│ │
└─────────────────┘ └────────────────┘ │ │ Verificar prereqs   │ │
                                       │ │ y límite créditos   │ │
                                       │ ├─────────────────────┤ │
                                       │ │ Triggers Auth       │ │
                                       │ │ onCreate → crea doc  │ │
                                       │ │ en /users           │ │
                                       │ └─────────────────────┘ │
                                       └──────────┬──────────────┘
                                                  │ Admin SDK
                                                  ▼
                            ┌─────────────────────────────────────┐
                            │        FIREBASE FIRESTORE           │
                            │                                     │
                            │  /users          /courses           │
                            │  /teachers       /classrooms        │
                            │  /enrollments    /schedules         │
                            │  /academic_periods                  │
                            │                                     │
                            │  Reglas de seguridad granulares     │
                            │  por rol (ADMIN, COORDINATOR,       │
                            │  TEACHER, STUDENT)                  │
                            └─────────────────────────────────────┘
```

---

## Componentes del Sistema

### 1. Frontend — React + Vite SPA

| Componente | Descripción | Tecnología |
|---|---|---|
| **App Shell** | Layout principal con sidebar y navegación | React Router v7 |
| **Páginas** | Login, Dashboard, Cursos, Docentes, Aulas, Horarios | React |
| **Grilla Horaria** | Visualización semana × horas del horario | CSS Grid + React |
| **Estado Global** | Auth state, filtros, horario actual | Zustand |
| **Servicios Firebase** | Wrappers sobre SDK Firestore + Functions | TypeScript |

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

### 2. Firebase Cloud Functions — Backend Serverless

| Función | Tipo | Descripción |
|---|---|---|
| `generateSchedule` | Callable HTTPS | Dispara el motor CSP y guarda el resultado en Firestore |
| `validateEnrollment` | Callable HTTPS | Verifica prerrequisitos y límite de créditos antes de matricular |
| `onUserCreated` | Auth Trigger | Crea automáticamente el documento en `/users` al registrarse |
| `exportSchedulePDF` | Callable HTTPS | Genera y devuelve el horario en formato PDF |
| `exportScheduleExcel` | Callable HTTPS | Genera y devuelve el horario en formato Excel |

### 3. Firebase Firestore — Base de Datos

Base de datos NoSQL en tiempo real. Las reglas de seguridad garantizan que:
- **ADMIN** puede leer/escribir todo
- **COORDINATOR** gestiona el catálogo académico
- **TEACHER** solo lee su propia disponibilidad e horario
- **STUDENT** solo lee su matrícula y horario personal

Ver detalles del modelo en: [Modelo de Datos – Firestore →](04-Modelo-de-Datos-Firestore)

### 4. Firebase Authentication

- **Google OAuth2:** Login con cuenta institucional Google
- **Email/Password:** Para usuarios sin Google Workspace
- **JWT Tokens:** Gestionados automáticamente por Firebase SDK
- **Custom Claims:** El rol del usuario (ADMIN, COORDINATOR, etc.) se almacena como Custom Claim para ser verificado en las reglas de Firestore y en Functions

---

## Flujo Principal: Generación de Horario

```
Coordinator                Frontend              Cloud Function          Firestore
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
     │                        │                       │     /schedules/{id}  │
     │                        │◄─── { scheduleId } ───│                      │
     │                        │                       │                      │
     │◄── Vista grilla ───────│                       │                      │
     │    generada en tiempo  │◄──── onSnapshot() ────┤◄─── Realtime ────────│
     │    real                │                       │                      │
```

---

## Seguridad

| Capa | Mecanismo |
|---|---|
| **Autenticación** | Firebase Auth (JWT verificado en cada request) |
| **Autorización** | Custom Claims + Firestore Security Rules |
| **API Rules** | Functions verifican el token antes de ejecutar lógica |
| **HTTPS** | Firebase Hosting fuerza HTTPS en todos los endpoints |
| **OWASP** | Validación de inputs en Functions, sin SQL injection posible (NoSQL) |

---

> 🔗 Anterior: [← Visión y Descripción](01-Vision-y-Descripcion) | Siguiente: [Stack Tecnológico →](03-Stack-Tecnologico)
