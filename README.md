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
  Plataforma web inteligente que genera automáticamente horarios académicos óptimos<br/>
  considerando restricciones académicas, operativas y contextuales,<br/>
  mediante modelado de restricciones <strong>(CSP)</strong> y técnicas de optimización combinatoria.
</p>

---

## 📑 5.2. Tabla de Contenidos

- [5.1. Nombre del proyecto](#51-nombre-del-proyecto)
- [5.3. Integrantes del equipo](#53-integrantes-del-equipo)
- [5.4. Problemática abordada](#54-problemática-abordada)
- [5.5. Justificación del PMV](#55-justificación-del-pmv)
- [5.6. Tecnologías utilizadas](#56-tecnologías-utilizadas)
- [5.7. Arquitectura del sistema](#57-arquitectura-del-sistema)
- [5.8. Instrucciones de instalación](#58-instrucciones-de-instalación)
- [5.9. Instrucciones de build y despliegue](#59-instrucciones-de-build-y-despliegue)
- [Documentación Técnica (docs/)](#c-enlaces-a-la-documentación-carpeta-docs)

---

## 5.1. Nombre del proyecto
**UniHorarios (Planner UC)** - Proyecto de Fin de Asignatura (PFA) para Taller de Proyectos 2.

---

## 5.3. Integrantes del equipo

<table align="center">
  <tr>
    <td align="center" width="300">
      <strong>Jheyson Paul Paytan Huaman</strong><br/>
      <sub>🎯 Product Owner / Arquitecto</sub><br/>
      <sub>Visión del producto, decisiones técnicas, Backlog</sub>
    </td>
    <td align="center" width="300">
      <strong>Jack Alexander Rojas Lara</strong><br/>
      <sub>⚙️ Algoritmos Engineer / Full Stack</sub><br/>
      <sub>Diseño e implementación del motor CSP, UI/UX</sub>
    </td>
  </tr>
</table>

---

## 5.4. Problemática abordada

La planificación manual de horarios académicos universitarios es un proceso **altamente complejo** que consume una cantidad significativa de tiempo y es muy propenso a errores humanos. Las instituciones enfrentan los siguientes problemas críticos:

- 🔴 **Solapamiento de recursos:** Cruces de horarios para docentes, aulas y estudiantes.
- 🔴 **Conflictos académicos:** Estudiantes matriculándose en cursos sin cumplir los prerrequisitos.
- 🔴 **Violaciones de créditos:** Exceso o déficit del límite de créditos permitidos (20–22 por período).
- 🔴 **Uso ineficiente de infraestructura:** Aulas subutilizadas o sobrepobladas superando su aforo máximo.
- 🔴 **Insatisfacción docente:** Horarios fragmentados que no respetan la disponibilidad real de los profesores.

---

## 5.5. Justificación del PMV

El **Producto Mínimo Viable (PMV)** desarrollado se justifica porque proporciona una solución automatizada e inmediata al problema NP-Difícil de la asignación de horarios. Al implementar un motor de **Constraint Satisfaction Problem (CSP)** con heurísticas de Inteligencia Artificial (MRV y Forward Checking), el PMV:

1. **Reduce el tiempo de planificación** de semanas a escasos segundos (≤30 seg para escenarios complejos).
2. **Elimina los errores humanos**, garantizando matemáticamente cero solapamientos y 100% de cumplimiento de reglas académicas.
3. **Agrega valor inmediato** a los coordinadores, quienes pueden regenerar horarios dinámicamente si un docente cambia su disponibilidad.
4. **Valida la viabilidad técnica** del modelo lógico en un entorno web escalable, estableciendo las bases para futuras integraciones con el ERP de la universidad.

---

## 5.6. Tecnologías utilizadas

El proyecto está construido sobre un stack **MERN Moderno**, optimizado para alto rendimiento y escalabilidad:

| Capa | Tecnología | Descripción |
|:---|:---|:---|
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | SPA renderizada en cliente impulsada por **Vite**, **TypeScript** y **Zustand** para el estado. |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white) | API REST escalable con **Express.js** y **TypeScript**. |
| **Motor CSP** | ![Worker Threads](https://img.shields.io/badge/Worker_Threads-339933?style=flat-square&logo=nodedotjs&logoColor=white) | Hilos nativos para aislamiento de CPU intensivo, evitando bloqueos en la API principal. |
| **Base de Datos**| ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white) | Base de datos NoSQL con **Mongoose** para validación estricta de esquemas. |
| **Seguridad** | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) | Autenticación robusta con JSON Web Tokens y encriptación **Bcrypt**. |

---

## 5.7. Arquitectura del sistema

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

## 5.8. Instrucciones de instalación

### Prerrequisitos
- [Node.js 20+](https://nodejs.org/)
- [MongoDB Local](https://www.mongodb.com/try/download/community) corriendo en el puerto `27017`

### Pasos
1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Alexanderxx03/gestion-horarios-universitarios.git
   cd gestion-horarios-universitarios
   ```

2. **Configurar el Backend:**
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

3. **Configurar el Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

---

## 5.9. Instrucciones de build y despliegue

### a. Instrucciones de despliegue
Para generar los archivos de producción (build) listos para ser desplegados en un servidor (ej. Vercel, Render o Firebase Hosting):

**Build del Frontend:**
```bash
cd frontend
npm run build
# Los archivos estáticos se generarán en la carpeta frontend/dist/
```

**Build del Backend (Transpilación de TypeScript a JS):**
```bash
cd backend
npm run build
# El código transpilado se generará en backend/dist/
npm start # Para ejecutar en producción
```

### b. Enlace a video explicativo
🎬 **[Ver Video Explicativo del PMV (YouTube) - 5 minutos](https://youtube.com/tu-enlace-aqui)**

### c. Enlaces a la documentación (Carpeta `docs/`)
Toda la documentación está estructurada bajo estándares PMBOK en la carpeta `docs/`. Aquí tienes los accesos directos:

- 🚀 **[Inicio](docs/inicio/)**: Visión, requerimientos, equipo.
- 📋 **[Planificación](docs/planificacion/)**: Sprints, presupuestos, riesgos.
- 🏗️ **[Ejecución](docs/ejecucion/)**: Arquitectura detallada, modelos de base de datos.
- ✅ **[Seguimiento y Control](docs/seguimiento_control/)**: Pruebas, calidad (SonarQube, OWASP), usabilidad.
- 🏁 **[Cierre](docs/cierre/)**: Informes finales, lecciones aprendidas, acta de constitución.

---
> Proyecto desarrollado por Jheyson Paul Paytan Huaman y Jack Alexander Rojas Lara - 2026.
