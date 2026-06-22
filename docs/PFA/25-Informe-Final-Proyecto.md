# 25. Informe Final del Proyecto (Final Project Report)

## 1. Resumen Ejecutivo
El proyecto "Gestión de Horarios Universitarios" ha llegado formalmente a su fase de cierre. Desarrollado a lo largo de 4 Sprints principales más una fase inicial (Sprint 0), el sistema logró implementar con éxito un Motor de Satisfacción de Restricciones (CSP) capaz de automatizar la asignación de horarios académicos sin colisiones, reduciendo un proceso manual de semanas a escasos segundos. La solución se construyó sobre un robusto stack tecnológico MERN (MongoDB, Express, React, Node.js).

## 2. Desempeño del Alcance
- **Completitud:** 100% de las historias de usuario críticas (Must-Have) del Product Backlog fueron entregadas.
- **Entregables Principales:**
  - Panel de Administración (Gestión de Docentes, Cursos, Aulas).
  - Interfaz de Estudiantes (Visualización de horarios matriculados).
  - Motor CSP (Algoritmo de Backtracking + MRV).
  - Sistema de Reportes de Sostenibilidad (Métricas Green Software).
- **Variaciones de Alcance:** Inicialmente concebido bajo arquitecturas Serverless puras (Firebase/Firestore), el alcance se pivotó de manera controlada y justificada a un ecosistema MERN para asegurar el rendimiento transaccional del motor matemático CSP.

## 3. Desempeño del Cronograma
- **Duración Total:** 5 Sprints (Sprint 0 a Sprint 4).
- **Velocidad Promedio (Velocity):** 19.5 Puntos de Historia (SP) por Sprint.
- **Desviaciones:** El Sprint 2 (Desarrollo del Motor CSP) requirió una sub-iteración técnica extra para ajustar las heurísticas matemáticas, lo que fue absorbido con éxito mediante la re-priorización del Backlog en el Sprint 3, permitiendo cerrar el cronograma general a tiempo.

## 4. Desempeño de Calidad (QA)
Los criterios de aceptación y los estándares de ingeniería de software se cumplieron a cabalidad:
- **Calidad de Código (SonarQube):** Rating 'A' (0 Bugs, 0 Vulnerabilidades severas).
- **Seguridad (OWASP Top 10):** Mitigación implementada mediante middlewares defensivos (`helmet`, `rate-limit`, `mongo-sanitize`).
- **Accesibilidad (WCAG 2.2):** Validaciones AAA/AA en contraste y lectores de pantalla (Screen Readers).
- **Usabilidad (SUS):** 84.3 / 100 (Excelente).
- **Pruebas (Vitest):** >85.4% de cobertura de pruebas unitarias sobre componentes de negocio.

## 5. Desempeño de Costos (Presupuesto)
- **Presupuesto Total Estimado:** $6,454 USD (Monetización de recursos humanos e infraestructura).
- **Ejecución Real:** El proyecto se mantuvo estrictamente dentro del presupuesto delineado gracias a la eficiencia de las herramientas de código abierto y a la optimización "Green Software" aplicada en la arquitectura, manteniendo los costos de servidor por debajo de la capa gratuita (`Free Tier`) durante la fase de desarrollo.

## 6. Resumen de Riesgos e Incidentes
- **Riesgos Materializados:** La "Curva de Aprendizaje del Algoritmo CSP" afectó la velocidad inicial.
- **Respuesta Implementada:** Se recurrió al pair programming y la investigación técnica estructurada (TDD).
- **Incidentes Críticos Resueltos:** Se detectó un sobreconsumo de ancho de banda en la carga del catálogo, el cual fue mitigado exitosamente implementando estrategias locales de caché y compresión (Gzip).

## 7. Cierre Administrativo
Todos los entregables técnicos han sido documentados, aprobados por los *stakeholders* correspondientes y transferidos de forma segura al repositorio de control de versiones central.
