# 24. Informe Técnico Integral de Aseguramiento de la Calidad (QA)

Este documento centraliza los resultados y entregables técnicos del proceso de validación y aseguramiento de la calidad (*Quality Assurance*) implementado en el sistema "Gestión de Horarios Universitarios".

El proyecto fue sometido a un proceso completo de validación técnica siguiendo estándares de la industria.

## Resumen Ejecutivo de la Evaluación

| Dominio Evaluado | Estándar / Herramienta | Resultado Principal | Ver Evidencia Detallada |
| :--- | :--- | :--- | :--- |
| **Calidad de Código y Mantenibilidad** | SonarQube | 0 Bugs, 0 Vulnerabilidades críticas, Rating de Deuda Técnica: **A**. | [Ver Reporte de SonarQube](19-SonarQube-Calidad-Codigo.md) |
| **Seguridad de la Información** | OWASP Top 10 (2025) | Implementación exitosa de middlewares preventivos (Helmet, MongoSanitize, Rate-Limit). Riesgo residual clasificado como bajo. | [Ver Reporte OWASP Top 10](20-Seguridad-OWASP.md) |
| **Accesibilidad Universal e Inclusión** | WCAG 2.2 (AA) | Cumplimiento del umbral AAA en contraste. Navegabilidad íntegra por teclado y compatibilidad optimizada con lectores de pantalla mediante etiquetas `aria-label`. | [Ver Checklist y Evidencia WCAG](21-Accesibilidad-WCAG.md) |
| **Experiencia de Usuario y Usabilidad** | Escala SUS (System Usability Scale) | Puntuación global de **84.3 / 100**, lo que califica a la interfaz como **Excelente** (Grado B+) en términos de facilidad de adopción. | [Ver Datos Cuantitativos SUS](22-Usabilidad-SUS.md) |
| **Integridad Estructural Funcional** | Vitest (Pruebas Automatizadas) | Suites superadas exitosamente con **>85.4%** de cobertura en componentes lógicos y servicios (`callable.ts`, `ui.store.ts`). | [Ver Informe de Pruebas](23-Testing-Automatizado.md) |

## Conclusión Integral
La aplicación Web Full Stack ha demostrado ser no solo innovadora en su modelo de resolución matemática de horarios (Motor CSP), sino también sumamente resiliente.

Al asegurar la sanidad de los datos de entrada (OWASP), diseñar interfaces inclusivas sin barreras cognitivas o visuales (WCAG), certificar su intuitividad empírica (SUS), y certificar la limpieza de su código fuente estático (SonarQube), el sistema cumple rigurosamente con los requisitos para considerarse un producto de software a nivel empresarial, listo para su adopción formal por entidades universitarias y la consiguiente escalabilidad.

---
**Autor de la revisión:** Equipo de Ingeniería y Arquitectura  
**Versión del informe:** 1.0.0
