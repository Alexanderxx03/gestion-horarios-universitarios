# 03 · Stack Tecnológico

## Resumen Ejecutivo

El proyecto usa el stack **Firebase + React** (también denominado **FERN**: Firebase, Express-less, React, Node.js), elegido por su ecosistema serverless, la eliminación de infraestructura propia y el costo operativo de $0 en el período académico.

---

## Stack Completo

### Frontend

| Tecnología          | Versión | Propósito                 | Justificación                                              |
| ------------------- | ------- | ------------------------- | ---------------------------------------------------------- |
| **React**           | 19.x    | UI library                | Ecosistema dominante, componentización, hooks modernos     |
| **Vite**            | 6.x     | Build tool + Dev server   | Build estático optimizado, HMR ultrarrápido                |
| **TypeScript**      | 5.x     | Tipado estático           | Previene errores en compilación; TypeScript strict mode    |
| **React Router**    | 7.x     | Enrutamiento SPA          | Rutas protegidas por rol, navegación sin recarga           |
| **Zustand**         | 5.x     | Estado global             | Más simple que Redux, compatible con React 19              |
| **Vanilla CSS**     | —       | Estilos                   | CSS Variables, máxima flexibilidad, sin dependencias extra |
| **React Hook Form** | 7.x     | Formularios               | Validación performante sin re-renders innecesarios         |
| **Zod** (frontend)  | 3.x     | Validación de formularios | Tipos compartidos entre frontend y backend                 |

### Backend — Cloud Functions

| Tecnología                   | Versión | Propósito              | Justificación                                                |
| ---------------------------- | ------- | ---------------------- | ------------------------------------------------------------ |
| **Firebase Cloud Functions** | Gen 2   | Serverless backend     | Sin servidor propio; escala automáticamente; $0 en free tier |
| **Node.js**                  | 20.x    | Entorno de ejecución   | Mismo lenguaje que frontend (TypeScript); LTS 2026           |
| **TypeScript**               | 5.x     | Lenguaje del backend   | Tipos compartidos, strict mode, sin `any`                    |
| **Zod**                      | 3.x     | Validación de inputs   | Valida payloads antes de cualquier operación en Firestore    |
| **Arquitectura Hexagonal**   | —       | Estructura del backend | Separa dominio (Motor CSP) de infraestructura (Firebase)     |

### Base de Datos y Autenticación

| Tecnología                  | Propósito           | Justificación                                                             |
| --------------------------- | ------------------- | ------------------------------------------------------------------------- |
| **Cloud Firestore**         | Base de datos NoSQL | Integración nativa con Firebase Auth; Security Rules como primera defensa |
| **Firebase Authentication** | Auth completa       | Google OAuth2 + Email/Password; Custom Claims para roles                  |
| **Custom Claims**           | Gestión de roles    | Rol del usuario incluido en el token JWT; verificado en Rules + Functions |

### Infraestructura

| Tecnología             | Propósito            | Justificación                                                  |
| ---------------------- | -------------------- | -------------------------------------------------------------- |
| **Firebase Hosting**   | Hosting SPA estático | CDN global, SSL automático, deploy con Firebase CLI            |
| **Firebase Emulators** | Desarrollo local     | Auth + Firestore + Functions sin costo, sin afectar producción |
| **GitHub Actions**     | CI/CD                | Deploy automático a Firebase Hosting en merge a `main`         |

### Motor CSP

| Componente         | Implementación                         | Descripción                                                    |
| ------------------ | -------------------------------------- | -------------------------------------------------------------- |
| **Algoritmo base** | Backtracking recursivo                 | Búsqueda exhaustiva con poda de ramas                          |
| **Heurística 1**   | MRV (Minimum Remaining Values)         | Prioriza variables con menos valores posibles en el dominio    |
| **Heurística 2**   | Forward Checking                       | Elimina valores inconsistentes de variables vecinas al asignar |
| **Lenguaje**       | TypeScript puro (sin deps de Firebase) | Ejecutado en Cloud Function; testeable de forma aislada        |
| **Ubicación**      | `functions/src/application/usecases/`  | Capa de aplicación de la arquitectura hexagonal                |

---

## Herramientas de Desarrollo

| Herramienta           | Propósito                                        |
| --------------------- | ------------------------------------------------ |
| **Firebase CLI**      | Deploy, emuladores, gestión de proyecto          |
| **ESLint + Prettier** | Calidad y formato del código                     |
| **Husky**             | Git hooks: lint + typecheck antes de cada commit |
| **Vitest / Jest**     | Tests unitarios de Functions y motor CSP         |
| **Git + GitHub**      | Control de versiones, ramas por feature          |
| **GitHub Wiki**       | Documentación técnica del proyecto               |
| **VS Code**           | IDE principal recomendado                        |

---

## Justificación de Decisiones Técnicas (Trade-offs)

### ¿Por qué Vanilla CSS y no TailwindCSS?

El `AGENTS.md` del proyecto establece Vanilla CSS como estándar. Las razones técnicas:

- **Máximo control**: CSS Variables permiten el sistema de diseño (tokens de color, espaciado, tipografía) sin framework
- **Sin purge en build**: Vite con Vanilla CSS no requiere configuración de purging de clases
- **Portabilidad**: El código CSS es estándar W3C; no hay dependencia de un framework de terceros
- **Trade-off**: Más verboso que Tailwind para diseños complejos → mitigado con el sistema de CSS Variables

### ¿Por qué Firestore y no PostgreSQL/MongoDB?

- **Security Rules nativas**: Firestore es el único sistema que combina base de datos + reglas de acceso en una sola capa; PostgreSQL requiere Row-Level Security adicional
- **Tiempo real**: Firestore permite suscripciones en tiempo real (el estado `IN_PROGRESS` del motor CSP se refleja automáticamente en el frontend)
- **Sin ORM**: No se necesita Mongoose ni Prisma; los documentos son JSON nativos
- **Trade-off**: Consultas menos flexibles que SQL (sin JOINs complejos) → mitigado con desnormalización selectiva y índices compuestos

### ¿Por qué TypeScript strict mode?

El `AGENTS.md` prohíbe el uso de `any`. Las razones:

- **El Motor CSP es lógica crítica**: Un error de tipo en las comparaciones de slots puede producir solapamientos no detectados
- **Mantenibilidad**: El equipo puede modificar cualquier componente con confianza; el compilador detecta regresiones
- **Contratos entre capas**: Los tipos de `domain/model/` actúan como contratos entre el Motor CSP, los handlers de Functions y el frontend

---

> 🔗 Anterior: [← Arquitectura](02-Arquitectura-del-Sistema) | Siguiente: [Modelo de Datos →](04-Modelo-de-Datos-Firestore)
