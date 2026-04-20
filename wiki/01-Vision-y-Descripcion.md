# 01 · Visión y Descripción del Proyecto

## Declaración de la Visión

> *"Liderar la transformación digital en la planificación académica universitaria, ofreciendo un sistema estándar para la generación automatizada, equitativa y eficiente de horarios en entornos de currículos flexibles."*

El sistema aspira a ser una aplicación web de alto impacto que no solo resuelva la complejidad operativa de las administraciones universitarias, sino que optimice el uso de recursos institucionales, asegure trayectorias académicas ininterrumpidas para los estudiantes y respete las restricciones de docentes e infraestructura.

---

## 🎯 Propósito y Justificación

Las instituciones de educación superior enfrentan **ineficiencias críticas** al construir calendarios estudiantiles debido a:

- **Variabilidad de cursos:** Currículos flexibles con múltiples combinaciones posibles
- **Cruce de asignaturas:** Prerequisitos en constante revisión y actualización
- **Disponibilidades fluctuantes:** Docentes con restricciones horarias cambiantes
- **Requerimientos regulatorios:** Límites de créditos y normativas académicas

### ¿Por qué es un problema complejo?

El sistema de horarios académicos es un **Problema de Satisfacción de Restricciones (CSP)** con características de complejidad NP-difícil:

| Característica | Descripción |
|---|---|
| **Sin solución trivial** | No calculable directamente; exige modelado abstracto y decisiones heurísticas |
| **Ambigüedades naturales** | Prerrequisitos en discusión, normativas implícitas, excepciones |
| **Interdependencia alta** | Cambiar un horario de docente genera colisiones en toda la malla |
| **Escala exponencial** | Con 50 estudiantes, 20 docentes, 30 cursos y 20 aulas, las combinaciones superan billones |

---

## 📊 Alcance del Sistema

### ✅ INCLUYE (In Scope)

- Gestión del catálogo de entidades: Cursos, Docentes, Estudiantes, Aulas
- Validador de prerrequisitos académicos y límites de créditos (20–22)
- Motor algorítmico CSP para generación automática de horarios
- Interfaz gráfica tipo grilla semanal para visualización e impresión
- Exportación a PDF y Excel
- Autenticación segura con Google OAuth2 y Email/Password

### ❌ NO INCLUYE (Out of Scope)

- Pasarela de pagos ni matrícula financiera
- Inteligencia de negocios y minería de datos histórica
- Soporte multi-institución o multi-sede
- Aplicación móvil nativa

---

## 👥 Actores Identificados (Stakeholders)

### Usuarios Primarios del Sistema

| Actor | Rol | Necesidad Principal |
|---|---|---|
| **Estudiante** | Usuario final | Ver su horario generado, matricularse en cursos sin conflictos |
| **Docente** | Usuario condicional | Registrar disponibilidad, consultar sus asignaciones |
| **Coordinador Académico** | Operador | Gestionar catálogo, lanzar generación, supervisar resultado |
| **Administrador** | Superusuario | Configuración global, gestión de usuarios y períodos |

### Stakeholders Externos

| Stakeholder | Relación |
|---|---|
| **Institución Universitaria** | Beneficiario institucional del sistema |
| **Cátedra del Taller de Proyectos 2** | Evaluador académico del proyecto |
| **Entes Reguladores** | Normativas de créditos y prerrequisitos |

---

## 🎯 Objetivos del Proyecto

### Objetivo de Negocio / Académico

Implementar un modelo funcional basado en CSP capaz de generar horarios sin solapamiento para un conjunto controlado de cursos, operando en tiempo razonable (≤30 segundos para ≤50 estudiantes, ≤20 docentes, ≤30 cursos).

### Objetivos Técnicos

1. Desarrollar una SPA (React + Vite) con backend serverless 100% Firebase
2. Implementar los principios **ISO/IEC 25010** (calidad del software)
3. Prevenir las brechas de seguridad del **OWASP Top 10**
4. Cumplir criterios de accesibilidad **WCAG 2.1 Nivel AA**

---

## 🏁 Hitos Principales (Milestones)

| Hito | Sprint | Entregable |
|---|---|---|
| **Hito 0** | Sprint 0 | Documentación formal completa, Project Charter, repositorio |
| **Hito 1** | Sprint 1 | Proyecto Firebase configurado, Auth funcional, CRUD base |
| **Hito 2** | Sprint 2 | Motor CSP implementado, generación de horarios funcional |
| **Hito 3** | Sprint 3 | UI completa, exportación, validaciones, pruebas |
| **Hito 4** | Sprint 4 | Despliegue final en Firebase, documentación técnica, video |

---

> 🔗 Siguiente: [Arquitectura del Sistema →](02-Arquitectura-del-Sistema)
