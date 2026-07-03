# 03 · Stack Tecnológico

## Resumen Ejecutivo

El proyecto utiliza el stack **MERN (MongoDB, Express, React, Node.js)**, elegido por su flexibilidad, escalabilidad mediante ecosistemas serverless y el costo operativo de S/ 0 en el período académico al aprovechar las ventajas de las capas de Free Tier.

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

### Backend — API REST

| Tecnología                 | Versión | Propósito              | Justificación                                                    |
| -------------------------- | ------- | ---------------------- | ---------------------------------------------------------------- |
| **Node.js**                | 20.x    | Entorno de ejecución   | Mismo lenguaje que frontend (TypeScript); LTS 2026               |
| **Express**                | 4.x     | Framework Web          | Rutas de API REST escalables, middlewares de seguridad           |
| **TypeScript**             | 5.x     | Lenguaje del backend   | Tipos compartidos, strict mode, sin `any`                        |
| **Zod**                    | 3.x     | Validación de inputs   | Valida payloads antes de cualquier operación en la Base de Datos |
| **Arquitectura Hexagonal** | —       | Estructura del backend | Separa dominio (Motor CSP) de infraestructura (Express/Mongo)    |

### Base de Datos y Autenticación

| Tecnología                | Propósito           | Justificación                                                              |
| ------------------------- | ------------------- | -------------------------------------------------------------------------- |
| **MongoDB Atlas**         | Base de datos NoSQL | Almacenamiento JSON nativo, ideal para la estructura MERN, Free Tier       |
| **Mongoose**              | ODM                 | Esquemas rígidos, validación pre-inserción y facilidad de operaciones CRUD |
| **JWT (JSON Web Tokens)** | Autenticación       | Gestión de sesiones sin estado (stateless), ideal para APIs REST           |
| **Bcrypt**                | Seguridad           | Encriptación de contraseñas de usuarios almacenadas en MongoDB             |

### Infraestructura

| Tecnología           | Propósito            | Justificación                                                     |
| -------------------- | -------------------- | ----------------------------------------------------------------- |
| **Vercel / Netlify** | Hosting SPA estático | CDN global, SSL automático, build rápido                          |
| **Render / Heroku**  | Hosting Backend API  | Soporte nativo para Node/Express, escalado a cero (scale-to-zero) |
| **GitHub Actions**   | CI/CD                | Deploy automático en merge a `main`                               |

### Motor CSP

| Componente         | Implementación                      | Descripción                                                    |
| ------------------ | ----------------------------------- | -------------------------------------------------------------- |
| **Algoritmo base** | Backtracking recursivo              | Búsqueda exhaustiva con poda de ramas                          |
| **Heurística 1**   | MRV (Minimum Remaining Values)      | Prioriza variables con menos valores posibles en el dominio    |
| **Heurística 2**   | Forward Checking                    | Elimina valores inconsistentes de variables vecinas al asignar |
| **Lenguaje**       | TypeScript puro (sin deps de Mongo) | Ejecutado en el entorno Node.js; testeable de forma aislada    |
| **Ubicación**      | `backend/src/application/usecases/` | Capa de aplicación de la arquitectura hexagonal                |

---

## Herramientas de Desarrollo

| Herramienta            | Propósito                                        |
| ---------------------- | ------------------------------------------------ |
| **Postman / Insomnia** | Pruebas de API REST (Endpoints)                  |
| **ESLint + Prettier**  | Calidad y formato del código                     |
| **Husky**              | Git hooks: lint + typecheck antes de cada commit |
| **Vitest / Jest**      | Tests unitarios de controladores y motor CSP     |
| **Git + GitHub**       | Control de versiones, ramas por feature          |
| **GitHub Wiki**        | Documentación técnica del proyecto               |
| **VS Code**            | IDE principal recomendado                        |

---

## Justificación de Decisiones Técnicas (Trade-offs)

### ¿Por qué Vanilla CSS y no TailwindCSS?

El `AGENTS.md` del proyecto establece Vanilla CSS como estándar. Las razones técnicas:

- **Máximo control**: CSS Variables permiten el sistema de diseño (tokens de color, espaciado, tipografía) sin framework
- **Sin purge en build**: Vite con Vanilla CSS no requiere configuración de purging de clases
- **Portabilidad**: El código CSS es estándar W3C; no hay dependencia de un framework de terceros
- **Trade-off**: Más verboso que Tailwind para diseños complejos → mitigado con el sistema de CSS Variables

### ¿Por qué MongoDB y no PostgreSQL?

- **Documentos JSON**: MongoDB utiliza un almacenamiento nativo JSON (BSON) que encaja perfectamente con JavaScript en el stack MERN.
- **Esquemas flexibles pero controlables**: Permite evoluciones rápidas del modelo de datos sin migraciones SQL estrictas, aunque Mongoose garantiza seguridad estructural.
- **Sin ORM complejo**: Mongoose es un ODM intuitivo que se adapta rápidamente a los tipos de TypeScript.
- **Trade-off**: Consultas menos rígidas que SQL → mitigado con esquemas de validación Zod y Mongoose antes de grabar.

### ¿Por qué TypeScript strict mode?

El `AGENTS.md` prohíbe el uso de `any`. Las razones:

- **El Motor CSP es lógica crítica**: Un error de tipo en las comparaciones de slots puede producir solapamientos no detectados
- **Mantenibilidad**: El equipo puede modificar cualquier componente con confianza; el compilador detecta regresiones
- **Contratos entre capas**: Los tipos de `domain/model/` actúan como contratos entre el Motor CSP, los handlers de Express y el frontend

---

> 🔗 Anterior: [← Arquitectura](02-Arquitectura-del-Sistema) | Siguiente: [Modelo de Datos →](04-Modelo-de-Datos)
