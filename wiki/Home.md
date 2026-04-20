# 🎓 Gestión de Horarios Universitarios — Wiki

Bienvenido a la documentación oficial del proyecto **Sistema de Gestión de Horarios Universitarios**. Esta wiki contiene toda la información técnica, funcional y de gestión del proyecto.

---

## 🚀 ¿Qué es este sistema?

Un sistema web inteligente que **genera automáticamente horarios académicos óptimos** para entornos universitarios con currícula flexible, resolviendo un **Problema de Satisfacción de Restricciones (CSP)** sin solapamientos de aulas, docentes ni estudiantes.

---

## 📚 Índice de la Wiki

| # | Página | Descripción |
|---|---|---|
| 🏠 | **[Home](Home)** | Esta página |
| 01 | **[Visión y Descripción](01-Vision-y-Descripcion)** | Propósito del proyecto, problema y stakeholders |
| 02 | **[Arquitectura del Sistema](02-Arquitectura-del-Sistema)** | Diagrama de componentes y flujo Firebase |
| 03 | **[Stack Tecnológico](03-Stack-Tecnologico)** | Tecnologías, versiones y justificación |
| 04 | **[Modelo de Datos – Firestore](04-Modelo-de-Datos-Firestore)** | Colecciones, esquemas y ejemplos JSON |
| 05 | **[Motor CSP](05-Motor-CSP)** | Algoritmo, variables, dominios y restricciones |
| 06 | **[Roles y Funcionalidades](06-Roles-y-Funcionalidades)** | Matriz de permisos por rol |
| 07 | **[Requerimientos](07-Requerimientos)** | RF y RNF con criterios de aceptación |
| 08 | **[Instalación y Configuración](08-Instalacion-y-Configuracion)** | Setup local paso a paso |
| 09 | **[Despliegue en Firebase](09-Despliegue-Firebase)** | Deploy, rules, CI/CD |
| 10 | **[Estándares de Calidad](10-Estandares-Calidad)** | OWASP Top 10, ISO 25010, WCAG 2.1 |
| 11 | **[Equipo del Proyecto](11-Equipo-del-Proyecto)** | Roles Scrum y normas de trabajo |
| 12 | **[Historial de Sprints](12-Historial-Sprints)** | Sprint 0 completo, Sprint 1 planificado |

---

## ⚡ Inicio Rápido

```bash
# 1. Clonar el repositorio
git clone https://github.com/Alexanderxx03/gestion-horarios-universitarios.git

# 2. Instalar dependencias
cd frontend && npm install
cd ../functions && npm install

# 3. Levantar emuladores Firebase
firebase emulators:start

# 4. Iniciar el frontend
cd frontend && npm run dev
```

---

## 🔥 Stack Resumido

| Capa | Tecnología |
|---|---|
| Frontend | React + Vite + TypeScript |
| Base de Datos | Firebase Firestore |
| Autenticación | Firebase Authentication |
| Backend | Firebase Cloud Functions (Node.js 20) |
| Hosting | Firebase Hosting |
| Motor CSP | Backtracking + MRV (TypeScript nativo) |

---

## 📋 Estado del Proyecto

| Sprint | Estado | Entregable |
|---|---|---|
| Sprint 0 | ✅ Completado | Documentación inicial, Project Charter, Backlog |
| Sprint 1 | 🔄 En progreso | Configuración Firebase, Autenticación, CRUD base |
| Sprint 2 | ⏳ Planificado | Motor CSP, Generación de horarios |
| Sprint 3 | ⏳ Planificado | UI completa, exportación PDF/Excel |

---

> 📌 **Nota:** Esta wiki es un documento vivo que se actualiza con cada Sprint. Última actualización: Abril 2026.
