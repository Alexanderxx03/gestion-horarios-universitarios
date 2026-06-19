# 01 · Visión y Descripción del Proyecto

## Declaración de la Visión

> _"Liderar la transformación digital en la planificación académica universitaria, ofreciendo un sistema estándar para la generación automatizada, equitativa y eficiente de horarios en entornos de currículos flexibles."_

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

| Característica             | Descripción                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------- |
| **Sin solución trivial**   | No calculable directamente; exige modelado abstracto y decisiones heurísticas             |
| **Ambigüedades naturales** | Prerrequisitos en discusión, normativas implícitas, excepciones                           |
| **Interdependencia alta**  | Cambiar un horario de docente genera colisiones en toda la malla                          |
| **Escala exponencial**     | Con 50 estudiantes, 20 docentes, 30 cursos y 20 aulas, las combinaciones superan billones |

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

| Actor                     | Rol                 | Necesidad Principal                                            |
| ------------------------- | ------------------- | -------------------------------------------------------------- |
| **Estudiante**            | Usuario final       | Ver su horario generado, matricularse en cursos sin conflictos |
| **Docente**               | Usuario condicional | Registrar disponibilidad, consultar sus asignaciones           |
| **Coordinador Académico** | Operador            | Gestionar catálogo, lanzar generación, supervisar resultado    |
| **Administrador**         | Superusuario        | Configuración global, gestión de usuarios y períodos           |

### Stakeholders Externos

| Stakeholder                           | Relación                                |
| ------------------------------------- | --------------------------------------- |
| **Institución Universitaria**         | Beneficiario institucional del sistema  |
| **Cátedra del Taller de Proyectos 2** | Evaluador académico del proyecto        |
| **Entes Reguladores**                 | Normativas de créditos y prerrequisitos |

---

## 🎯 Objetivos del Proyecto

### Objetivo de Negocio / Académico

Implementar un modelo funcional basado en CSP capaz de generar horarios sin solapamiento para un conjunto controlado de cursos, operando en tiempo razonable (≤30 segundos para ≤50 estudiantes, ≤20 docentes, ≤30 cursos).

### Objetivos Técnicos

1. Desarrollar una SPA (React + Vite) con backend en **Node.js + Express + MongoDB** (stack MERN)
2. Implementar los principios **ISO/IEC 25010** (calidad del software)
3. Prevenir las brechas de seguridad del **OWASP Top 10**
4. Cumplir criterios de accesibilidad **WCAG 2.1 Nivel AA**

---

## 🏫 El Proceso de Planificación Académica y Toma de Decisiones

La asignación de horarios académicos no es una tarea aislada, sino el núcleo del **Proceso de Planificación y Gestión Académica Institucional**. Este proceso mayor involucra tres fases clave:
1. **Fase Pre-operativa (Proyección de la Demanda):** Los estudiantes seleccionan su intención de cursos en la matrícula, y el sistema consolida los totales de créditos y prerrequisitos requeridos mediante validaciones atómicas en tiempo real (RF04).
2. **Fase de Optimización (Generación del Horario):** Se ejecuta el motor CSP para mapear la demanda (cursos) contra la disponibilidad física y de personal, resolviendo la alta interdependencia de variables (HC1-HC6).
3. **Fase de Toma de Decisiones Operativas:** Los resultados del motor permiten a las autoridades académicas tomar decisiones estratégicas fundamentadas, tales como:
   - Dividir secciones si la demanda supera la capacidad física de las aulas.
   - Contratar personal docente adicional si las ventanas horarias de disponibilidad entran en conflicto irresoluble.
   - Optimizar el uso de laboratorios y recursos especiales reduciendo tiempos muertos.

---

## 📊 Indicadores Clave de Éxito de la Optimización

Para medir de manera científica la efectividad del motor CSP implementado, se definen los siguientes indicadores clave de éxito (KPIs) cuantitativos y verificables:

| Indicador | Fórmula / Métrica | Criterio de Éxito | Justificación Técnica |
| --------- | ----------------- | ----------------- | --------------------- |
| **Cero Solapamientos (Conflictos)** | `Conflictos de tiempo = 0` | 100% de éxito | Ningún docente, aula o alumno puede ser asignado a dos espacios concurrentes. |
| **Tiempo de Generación (Speed)** | `Tiempo total (t) ≤ 30.000 ms` | Escenario base (30 cursos) | Asegura la interactividad de la interfaz y evita bloqueos o timeouts del servidor. |
| **Tasa de Asignación (Coverage)** | `(Cursos asignados / Cursos totales) * 100` | 100% (o indicar fallados) | Garantiza que todo el catálogo de asignaturas activas sea programado de forma integral. |
| **Uso de Capacidad de Aula (Aforo)** | `(Tamaño de grupo / Capacidad de aula) ≥ 70%` | Optimización de espacios | Evita asignar grupos pequeños en aulas magnas o laboratorios de alta capacidad. |
| **Distribución de Carga Docente** | `Desviación estándar de horas semanales ≤ 4h` | Carga equitativa (SC2) | Balancea equitativamente las horas de dictado asignadas a profesores calificados. |

---

## 💻 Finalidad y Justificación de la GUI

La **Interfaz Gráfica de Usuario (GUI)** del sistema no es solo una capa visual, sino el **centro de validación operativa y control de la optimización**. Su diseño responde a los siguientes pilares de Experiencia de Usuario (UX) y Requerimientos:

1. **Facilitación de Interacción y Parametrización:**
   Permite a los coordinadores gestionar de forma intuitiva los catálogos de recursos (aulas, cursos, docentes) con retroalimentación inmediata, evitando la manipulación directa de bases de datos complejas.
2. **Visualización de Resultados Complejos:**
   Traduce una matriz multidimensional de asignaciones CSP (tiempo, espacio, rol) a una **grilla semanal intuitiva tipo calendario** (RF06). Los colores y bloques facilitan a los estudiantes y docentes entender su jornada semanal de un vistazo.
3. **Monitoreo en Tiempo Real del Algoritmo:**
   Muestra loaders dinámicos y estadísticas de rendimiento del motor (nodos explorados, retrocesos, tiempo transcurrido en milisegundos). Si el problema no tiene solución, la GUI ayuda en la **toma de decisiones operativas** informando con precisión qué cursos causaron el conflicto de restricciones.
4. **Seguridad y Coherencia de Datos por Roles (RBAC):**
   Garantiza que cada actor interactúe únicamente con las vistas autorizadas (ej. el estudiante solo accede a su carrito de matrícula y su horario personal, mientras el coordinador accede a los controles de generación global).

---

## 🏁 Hitos Principales (Milestones)

| Hito       | Sprint   | Entregable                                                                |
| ---------- | -------- | ------------------------------------------------------------------------- |
| **Hito 0** | Sprint 0 | Documentación formal completa, Project Charter, repositorio               |
| **Hito 1** | Sprint 1 | Servidor Express + MongoDB configurado, Auth funcional con JWT, CRUD base |
| **Hito 2** | Sprint 2 | Motor CSP implementado, generación de horarios funcional                  |
| **Hito 3** | Sprint 3 | UI completa, exportación, validaciones, pruebas                           |
| **Hito 4** | Sprint 4 | Despliegue final en Vercel/Render, documentación técnica, video           |

---

> 🔗 Siguiente: [Arquitectura del Sistema →](02-Arquitectura-del-Sistema)
