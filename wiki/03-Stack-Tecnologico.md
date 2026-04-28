# 03 · Stack Tecnológico

## Resumen Ejecutivo

El proyecto usa el stack **MERN (MongoDB, Express, React, Node.js)**. Se ha elegido este stack por su escalabilidad, gran ecosistema de desarrollo y rendimiento óptimo para aplicaciones Single Page Applications (SPA).

---

## Stack Completo

### Frontend

| Tecnología       | Versión | Propósito               | Justificación                                              |
| ---------------- | ------- | ----------------------- | ---------------------------------------------------------- |
| **React**        | 19.x    | UI library              | Ecosistema dominante, componentización, hooks modernos     |
| **Vite**         | 6.x     | Build tool + Dev server | Build estático optimizado, HMR ultrarrápido                |
| **TypeScript**   | 5.x     | Tipado estático         | Previene errores en tiempo de compilación, mejor DX        |
| **React Router** | 7.x     | Enrutamiento SPA        | Rutas protegidas por rol, navegación sin recarga           |
| **Zustand**      | 5.x     | Estado global           | Más simple que Redux, compatible con React 19              |
| **Vanilla CSS**  | —       | Estilos                 | CSS Variables, máxima flexibilidad, sin dependencias extra |

### Backend

| Tecnología     | Versión | Propósito            | Justificación                                                   |
| -------------- | ------- | -------------------- | --------------------------------------------------------------- |
| **Node.js**    | 20.x    | Entorno de ejecución | Motor rápido, unifica el lenguaje (JS/TS) en Frontend y Backend |
| **Express.js** | 4.x     | Framework Web API    | Enrutamiento eficiente, middleware para autenticación           |
| **Mongoose**   | 8.x     | ODM para MongoDB     | Modelado de datos estricto con validaciones                     |
| **TypeScript** | 5.x     | Lenguaje de API      | Mismo lenguaje que frontend, tipado compartido                  |

### Base de Datos y Autenticación

| Tecnología                | Propósito           | Justificación                                                   |
| ------------------------- | ------------------- | --------------------------------------------------------------- |
| **MongoDB**               | Base de datos NoSQL | Almacenamiento basado en documentos, ideal para el modelo JSON  |
| **JSON Web Tokens (JWT)** | Autenticación       | Manejo de sesiones sin estado (stateless), seguridad por tokens |

### Infraestructura

| Tecnología          | Propósito         | Justificación                                                      |
| ------------------- | ----------------- | ------------------------------------------------------------------ |
| **Vercel / Render** | Hosting Web & API | Despliegue continuo integrado con GitHub, escalabilidad automática |

### Motor CSP

| Componente         | Implementación                   | Descripción                                                    |
| ------------------ | -------------------------------- | -------------------------------------------------------------- |
| **Algoritmo base** | Backtracking Search              | Búsqueda exhaustiva con poda de ramas                          |
| **Heurística 1**   | MRV (Minimum Remaining Values)   | Prioriza variables con menos valores posibles en el dominio    |
| **Heurística 2**   | Forward Checking                 | Elimina valores inconsistentes de variables vecinas al asignar |
| **Lenguaje**       | TypeScript en el Backend Node.js | Ejecutado en el servidor para no bloquear el navegador         |

---

## Herramientas de Desarrollo

| Herramienta           | Propósito                               |
| --------------------- | --------------------------------------- |
| **Firebase CLI**      | Deploy, emuladores, gestión de proyecto |
| **ESLint + Prettier** | Calidad y formato del código            |
| **Git + GitHub**      | Control de versiones, ramas por feature |
| **GitHub Wiki**       | Documentación técnica del proyecto      |
| **VS Code**           | IDE principal recomendado               |

---

---

> 🔗 Anterior: [← Arquitectura](02-Arquitectura-del-Sistema) | Siguiente: [Modelo de Datos →](04-Modelo-de-Datos-Firestore)
