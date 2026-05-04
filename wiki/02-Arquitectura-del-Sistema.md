# 02 · Arquitectura del Sistema

## Visión General

El sistema adopta una arquitectura **Firebase Serverless** con frontend SPA desacoplado del backend. El frontend es una aplicación React estática desplegada en **Firebase Hosting**, y toda la lógica de negocio pesada (incluyendo el motor CSP) se ejecuta en **Cloud Functions (Node.js 20)** con arquitectura hexagonal interna. La persistencia es **Cloud Firestore** y la autenticación es **Firebase Authentication** con Custom Claims.

### Decisión Arquitectónica: ¿Por qué Firebase sobre un backend Express propio?

| Criterio               | Firebase Cloud Functions                      | Express propio (Render/Railway)                      |
| ---------------------- | --------------------------------------------- | ---------------------------------------------------- |
| **Infraestructura**    | Serverless: sin servidor que administrar      | Servidor siempre activo (mayor costo)                |
| **Escalabilidad**      | Automática, sin configuración                 | Manual (auto-scaling requiere configuración)         |
| **Autenticación**      | Firebase Auth integrado nativo                | JWT propio: más complejidad, más riesgos             |
| **Seguridad de datos** | Firestore Rules como primera línea de defensa | Todo en middleware Express (single point of failure) |
| **Costo**              | $0 en free tier para el escenario académico   | ~$7/mes mínimo para servidor idle                    |
| **Green Software**     | ~0.3 kg CO₂/mes (serverless)                  | ~64 kg CO₂/mes (VPS dedicado)                        |
| **Trade-off**          | Cold starts de Functions (~1s inicial)        | Latencia consistente pero mayor costo                |

**Decisión:** Firebase. Los cold starts son aceptables (1–2s de latencia extra en la primera invocación). La eliminación de infraestructura propia reduce el costo a $0 y el impacto ambiental en ~98%.

---

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                      CLIENTE (Navegador)                        │
│       React 19 + Vite SPA — TypeScript — Vanilla CSS            │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │    Páginas   │  │ Componentes  │  │   Estado Global      │  │
│  │ (React       │  │ (GrillaHora  │  │   (Zustand stores)   │  │
│  │  Router v7)  │  │  ria, Cards) │  │   auth, schedule     │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │ HTTPS (Firebase SDK v10)
                            │
          ┌─────────────────┼──────────────────────┐
          │                 │                       │
          ▼                 ▼                       ▼
┌─────────────────┐ ┌──────────────────┐ ┌──────────────────────┐
│ FIREBASE HOSTING│ │  FIREBASE AUTH   │ │  CLOUD FUNCTIONS     │
│                 │ │                  │ │  (Node.js 20)        │
│ Sirve la SPA    │ │ Google OAuth2    │ │                      │
│ estática con    │ │ Email/Password   │ │ ┌──────────────────┐ │
│ CDN global y    │ │                  │ │ │generateSchedule()│ │
│ SSL automático  │ │ Custom Claims:   │ │ │ Motor CSP        │ │
│                 │ │ { role: 'COORD' }│ │ │ Backtracking+MRV │ │
└─────────────────┘ └──────────────────┘ │ ├──────────────────┤ │
                                         │ │validateEnrollment│ │
                                         │ │ Prereqs + crédits│ │
                                         │ ├──────────────────┤ │
                                         │ │ setUserRole()    │ │
                                         │ │ Asigna Claims    │ │
                                         │ └──────────────────┘ │
                                         └──────────┬───────────┘
                                                    │ Admin SDK
                                                    ▼
                            ┌─────────────────────────────────────┐
                            │         CLOUD FIRESTORE             │
                            │                                     │
                            │  users          courses             │
                            │  teachers       classrooms          │
                            │  enrollments    schedules           │
                            │  academic_periods                   │
                            │                                     │
                            │  Security Rules por rol             │
                            │  Índices compuestos                 │
                            └─────────────────────────────────────┘
```

---

## Componentes del Sistema

### 1. Frontend — React + Vite SPA (Firebase Hosting)

| Componente         | Descripción                                         | Tecnología           |
| ------------------ | --------------------------------------------------- | -------------------- |
| **App Shell**      | Layout principal con sidebar y navegación           | React Router v7      |
| **Páginas**        | Login, Dashboard, Cursos, Docentes, Aulas, Horarios | React 19             |
| **Grilla Horaria** | Visualización semana × horas del horario generado   | CSS Grid + React     |
| **Estado Global**  | Auth state, filtros, horario actual                 | Zustand 5            |
| **Firebase SDK**   | Llamadas a Auth + Firestore + Functions             | Firebase v10 modular |

**Rutas por Rol:**

```
/login                         → Pública
/dashboard                     → Todos los roles autenticados
/admin/users                   → Solo ADMIN
/admin/periods                 → Solo ADMIN
/coordinator/courses           → ADMIN + COORDINATOR
/coordinator/teachers          → ADMIN + COORDINATOR
/coordinator/classrooms        → ADMIN + COORDINATOR
/coordinator/schedules         → ADMIN + COORDINATOR
/teacher/profile               → TEACHER
/teacher/availability          → TEACHER
/teacher/schedule              → TEACHER
/student/enrollment            → STUDENT
/student/schedule              → STUDENT
```

### 2. Cloud Functions — Lógica de Negocio

| Función              | Trigger  | Descripción                                             |
| -------------------- | -------- | ------------------------------------------------------- |
| `generateSchedule`   | `onCall` | Ejecuta el motor CSP y guarda el horario en Firestore   |
| `validateEnrollment` | `onCall` | Verifica prerrequisitos y límite de créditos            |
| `setUserRole`        | `onCall` | Asigna Custom Claims de rol (solo ADMIN puede llamarla) |

**Arquitectura hexagonal interna de Functions:**

```
functions/src/
├── domain/          # Tipos puros, errores, interfaces (sin Firebase)
├── application/     # Motor CSP y casos de uso (orquestación)
├── infrastructure/  # Adapters Firestore, handlers onCall
└── shared/          # Zod schemas, authz helpers, logger
```

### 3. Cloud Firestore — Base de Datos

| Colección          | Descripción                     | Control de Acceso                                            |
| ------------------ | ------------------------------- | ------------------------------------------------------------ |
| `users`            | Perfiles de todos los usuarios  | `request.auth.uid == resource.data.uid`                      |
| `courses`          | Catálogo de cursos              | Lectura: autenticado; Escritura: COORDINATOR+                |
| `teachers`         | Perfil y disponibilidad docente | Lectura: autenticado; Escritura: COORDINATOR+ o propio       |
| `classrooms`       | Aulas y laboratorios            | Lectura: autenticado; Escritura: COORDINATOR+                |
| `academic_periods` | Semestres activos               | Lectura: autenticado; Escritura: ADMIN                       |
| `enrollments`      | Matrículas validadas            | Lectura: propio o COORDINATOR+; Escritura: via Function      |
| `schedules`        | Horarios generados por el CSP   | Lectura: autenticado; Escritura: via Function exclusivamente |

### 4. Firebase Authentication + Custom Claims

```typescript
// Custom Claim asignado por Cloud Function setUserRole()
{ role: 'ADMIN' | 'COORDINATOR' | 'TEACHER' | 'STUDENT' }

// Verificación en Firestore Rules:
allow write: if request.auth.token.role == 'COORDINATOR'
             || request.auth.token.role == 'ADMIN';

// Verificación en Cloud Function handler:
if (!['ADMIN', 'COORDINATOR'].includes(request.auth.token.role)) {
  throw new HttpsError('permission-denied', 'Sin permisos para esta acción')
}
```

---

## Flujo Principal: Generación de Horario

```
Coordinator            Frontend              Cloud Function          Firestore
     │                    │                       │                      │
     │── Click Generar ──►│                       │                      │
     │                    │── onCall() + token ──►│                      │
     │                    │                       │── Verificar rol ─────►│
     │                    │                       │◄─ Custom Claim ───────│
     │                    │                       │                      │
     │                    │                       │── Leer datos ────────►│
     │                    │                       │◄─ courses, teachers ──│
     │                    │                       │   classrooms, enroll. │
     │                    │                       │                      │
     │                    │                       │ [Motor CSP]          │
     │                    │                       │ Backtracking + MRV   │
     │                    │                       │ Forward Checking     │
     │                    │                       │ (≤30 segundos)       │
     │                    │                       │                      │
     │                    │                       │── Guardar resultado ─►│
     │                    │                       │   schedules/{id}      │
     │                    │◄── { scheduleId } ────│                      │
     │                    │                       │                      │
     │◄── Vista grilla ───│                       │                      │
     │    generada        │◄── Leer schedule ─────┤◄── Datos horario ────│
     │                    │                       │                      │
```

---

## Seguridad

| Capa                     | Mecanismo                                              | Cobertura OWASP             |
| ------------------------ | ------------------------------------------------------ | --------------------------- |
| **Autenticación**        | Firebase Auth (Google OAuth2 + Email/Password)         | A07: Auth Failures          |
| **Custom Claims**        | Rol verificado en todos los endpoints y Rules          | A01: Broken Access Control  |
| **Firestore Rules**      | Primera línea de defensa; sin bypass posible           | A01: Broken Access Control  |
| **Cloud Functions**      | Segunda verificación de token y rol antes de lógica    | A01: Broken Access Control  |
| **Validación de inputs** | Zod schemas en Functions antes de tocar Firestore      | A03: Injection              |
| **HTTPS**                | Firebase Hosting fuerza HTTPS en todos los endpoints   | A02: Cryptographic Failures |
| **Variables de entorno** | Claves nunca en el código; `defineSecret` de Functions | A02: Cryptographic Failures |

---

> 🔗 Anterior: [← Visión y Descripción](01-Vision-y-Descripcion) | Siguiente: [Stack Tecnológico →](03-Stack-Tecnologico)
