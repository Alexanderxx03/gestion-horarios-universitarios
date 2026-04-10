# Project Charter (Acta de Constitución del Proyecto)

## 1. Información General
* **Nombre del Proyecto:** Sistema Inteligente de Generación Óptima de Horarios Académicos.
* **Ámbito:** Entornos universitarios de currículo flexible.
* **Metodología de Gestión:** Scrum.

## 2. Propósito y Justificación
Las instituciones de educación superior sufren de ineficiencias críticas al armar calendarios estudiantiles debido a la variabilidad de cursos, cruce de asignaturas, disponibilidades fluctuantes y requerimientos regulatorios. Se requiere automatizar este cálculo probabilístico y transformarlo en un proceso lógico eficiente, mitigando errores humanos y democratizando el acceso a las aulas usando prácticas de diseño de software e interfaces limpias.

## 3. Objetivos (Criterios de Éxito)
* **Objetivo de Negocio/Académico:** Implementar un modelo funcional basado en el Problema de Satisfacción de Restricciones (CSP) capaz de generar horarios sin solapamiento para un conjunto controlado de cursos operando bajo un entorno de prueba en tiempo razonable.
* **Objetivos Técnicos:** 
  1. Desarrollar un producto SPA + API REST 100% funcional.
  2. Implementar los principios ISO/IEC 25010 (calidad del software).
  3. Prevenir las brechas de seguridad listadas en OWASP Top 10.

## 4. Alcance de Alto Nivel
**INCLUYE:**
* Gestor y mantenimiento de parámetros (Cursos, Docentes, Estudiantes, Infraestructura).
* Validador de prelaciones y límite de créditos máximos (20-22).
* Módulo algorítmico CSP que evalúe y encuentre soluciones viables.
* Interfaz gráfica (Calendario) para visualización e impresión.

**NO INCLUYE:**
* Pasarela de pagos ni enrolamiento financiero.
* Inteligencia de negocios y minería de datos de matrículas pasadas.

## 5. Hitos Iniciales (Milestones)
- **Hito 1 (Sprint 0):** Documentación formal inicial, definición del algoritmo base y repositorio.
- **Hito 2:** Construcción del Backend y abstracción del problema matemático hacia el motor CSP.
- **Hito 3:** Desarrollo de aplicación Frontend e integraciones.
- **Hito 4:** Fase final de validaciones, documentación técnica, pruebas y presentación del Video.
