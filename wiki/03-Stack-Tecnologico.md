# 03 · Stack Tecnológico

## Resumen Ejecutivo

El proyecto usa un stack **100% Firebase + React + Vite**, seleccionado por su compatibilidad nativa, zero DevOps overhead y tier gratuito suficiente para el alcance académico del proyecto.

---

## Stack Completo

### Frontend

| Tecnología | Versión | Propósito | Justificación |
|---|---|---|---|
| **React** | 19.x | UI library | Ecosistema dominante, componentización, hooks modernos |
| **Vite** | 6.x | Build tool + Dev server | Build estático optimizado para Firebase Hosting, HMR ultrarrápido |
| **TypeScript** | 5.x | Tipado estático | Previene errores en tiempo de compilación, mejor DX |
| **React Router** | 7.x | Enrutamiento SPA | Rutas protegidas por rol, navegación sin recarga |
| **Zustand** | 5.x | Estado global | Más simple que Redux, compatible con React 19 |
| **Vanilla CSS** | — | Estilos | CSS Variables, máxima flexibilidad, sin dependencias extra |
| **Firebase SDK** | v10 (modular) | Conexión a Firebase | SDK modular: tree-shaking, menor bundle size |

### Backend (Serverless)

| Tecnología | Versión | Propósito | Justificación |
|---|---|---|---|
| **Firebase Cloud Functions** | Node.js 20 | Lógica de negocio | Serverless, pago por uso, integrado nativamente con Firestore/Auth |
| **Firebase Admin SDK** | 12.x | Acceso Firestore desde Functions | Acceso privilegiado con permisos de admin |
| **TypeScript** | 5.x | Lenguaje de Functions | Mismo lenguaje que frontend, tipado compartido |

### Base de Datos y Autenticación

| Tecnología | Plan | Propósito | Justificación |
|---|---|---|---|
| **Firebase Firestore** | Spark (Gratuito) | Base de datos NoSQL | Sin servidor que gestionar, tiempo real, SDK directo desde cliente |
| **Firebase Authentication** | Spark (Gratuito) | Autenticación | Google OAuth2 nativo, JWT automático, 10K usuarios/mes gratis |

### Hosting e Infraestructura

| Tecnología | Plan | Propósito | Justificación |
|---|---|---|---|
| **Firebase Hosting** | Spark (Gratuito) | Hosting SPA | CDN global, SSL automático, 10GB almacenamiento, 360MB/día transferencia gratis |
| **Firebase Emulator Suite** | Gratuito | Desarrollo local | Emula Firestore, Auth y Functions localmente sin costo |

### Motor CSP

| Componente | Implementación | Descripción |
|---|---|---|
| **Algoritmo base** | Backtracking Search | Búsqueda exhaustiva con poda de ramas |
| **Heurística 1** | MRV (Minimum Remaining Values) | Prioriza variables con menos valores posibles en el dominio |
| **Heurística 2** | Forward Checking | Elimina valores inconsistentes de variables vecinas al asignar |
| **Lenguaje** | TypeScript en Cloud Functions | Ejecutado server-side para no bloquear el navegador |

---

## Herramientas de Desarrollo

| Herramienta | Propósito |
|---|---|
| **Firebase CLI** | Deploy, emuladores, gestión de proyecto |
| **ESLint + Prettier** | Calidad y formato del código |
| **Git + GitHub** | Control de versiones, ramas por feature |
| **GitHub Wiki** | Documentación técnica del proyecto |
| **VS Code** | IDE principal recomendado |

---

## Límites del Plan Gratuito (Firebase Spark)

Para el alcance académico del proyecto, el plan gratuito es suficiente:

| Recurso | Límite Gratuito | Uso Estimado |
|---|---|---|
| **Firestore lecturas** | 50.000/día | ~5.000/día |
| **Firestore escrituras** | 20.000/día | ~2.000/día |
| **Functions invocaciones** | 2M/mes | ~10K/mes |
| **Hosting almacenamiento** | 10 GB | ~50 MB |
| **Auth usuarios** | 10.000/mes | ~100 usuarios |

> ⚠️ **Nota:** El plan Spark no permite Functions con llamadas externas (HTTP externas). Todo el procesamiento CSP es interno y no requiere llamadas externas, por lo que no hay limitación.

---

## Comparativa: ¿Por qué React + Vite y no Next.js?

| Criterio | React + Vite | Next.js |
|---|---|---|
| **Compatibilidad Firebase Hosting** | ✅ Nativa (SPA estática) | ⚠️ Requiere Cloud Run para SSR |
| **Complejidad de configuración** | ✅ Simple | ⚠️ Mayor overhead |
| **Costo de hosting** | ✅ Gratis (estático) | 💰 Cloud Run tiene costo |
| **Tiempo de build** | ✅ Muy rápido (Vite) | ⚠️ Más lento |
| **SSR necesario** | ❌ No requerido para este proyecto | — |
| **Adecuado para el proyecto** | ✅ Perfecto | ⚠️ Sobredimensionado |

---

> 🔗 Anterior: [← Arquitectura](02-Arquitectura-del-Sistema) | Siguiente: [Modelo de Datos →](04-Modelo-de-Datos-Firestore)
