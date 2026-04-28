# 🎓 Gestión de Horarios Universitarios (UniHorarios)

Bienvenido a la Wiki oficial del proyecto **Gestión de Horarios Universitarios**.
Este proyecto ha sido desarrollado siguiendo estrictamente las mejores prácticas de **Clean Architecture**, **Spec-Driven Development (Soportado por Google Antigravity)** y **TDD (Test-Driven Development)**.

## 🚀 Sobre el Proyecto

UniHorarios es una plataforma inteligente impulsada por un **Motor de Restricciones CSP (Constraint Satisfaction Problem)** diseñado específicamente para resolver el problema NP-Hard de la asignación óptima de horarios y aulas en entornos universitarios, garantizando que no existan cruces (choques de horarios) y optimizando las preferencias de los docentes y estudiantes.

## 📚 Índice de la Wiki

Para facilitar la evaluación y comprensión del proyecto, hemos dividido la documentación técnica en las siguientes secciones detalladas:

1. [Especificación de Requisitos](1.-Especificacion-de-Requisitos): Casos de uso documentados y reglas de negocio formales (Hard/Soft constraints).
2. [Arquitectura y Motor CSP](2.-Arquitectura-y-Motor-CSP): Explicación teórica y práctica de la implementación de Backtracking, MRV y Forward Checking.
3. [Evidencia TDD y Pruebas](3.-Evidencia-TDD-y-Pruebas): Documentación de la cobertura de pruebas unitarias, validaciones de esquemas (Zod) y seguridad (Firebase Rules).

## 🛠️ Stack Tecnológico: MERN Serverless

El proyecto implementa una arquitectura **MERN evolucionada (Serverless MERN)** que garantiza máxima escalabilidad y tiempos de respuesta ultrarrápidos (< 2s).

- **M (MongoDB) -> Firestore (NoSQL):** Almacenamiento de colecciones ágil e indexado.
- **E (Express) -> Cloud Functions (HTTP Triggers):** Enrutamiento seguro y lógica de negocio.
- **R (React) -> React 19 + Vite:** SPA rápida con estado global atómico (Zustand) y UI Glassmorphism (Tailwind + GSAP).
- **N (Node.js) -> Node 20 (Runtime):** Entorno de ejecución en backend para el Motor CSP y validaciones de seguridad.
- **Infraestructura:** Firebase Hosting (Web), Github Actions (CI/CD propuesto).
