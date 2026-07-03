# Registro Histórico de Defectos (Bug Log Tracker)

## 1. Definición del Tracker de Defectos en Scrum

En la filosofía de calidad del proyecto UniHorarios, la diferencia entre un "Incidente" y un "Defecto" (Bug) es crucial. Mientras que un *Incidente* es un problema macro a nivel de infraestructura, cronograma o equipo de trabajo (Ej. El servidor de base de datos se cayó), un **Defecto** es estrictamente un fallo de programación (El código no hace lo que los Criterios de Aceptación exigen).

Ningún software nace perfecto. La salud de un proyecto no se mide por la ausencia total de defectos en la fase de desarrollo inicial, sino por la disciplina y la velocidad con la que el equipo de *Quality Assurance* (QA) los detecta, los documenta y los desarrolladores los parchan, garantizando que jamás lleguen a la rama de producción `main`.

---

## 2. Matriz Consolidada de Corrección de Defectos (Bug Triage)

La siguiente bitácora documenta los 5 defectos más severos y complejos (Severidad Alta y Bloqueante) descubiertos mediante las pruebas End-to-End o los reportes de QA durante los entornos de Staging. 

| ID Defecto | Gravedad | Componente de Software | Descripción del Comportamiento Anómalo (Bug) | Entorno Hallado | Acción de Refactorización en Código (Fix) | Estado | Validado por |
|:---:|:---:|:---|:---|:---:|:---|:---:|:---|
| **DEF-101** | 🔴 Bloqueante | *Solver CSP (Backend)* | **Colisión Fantasma en Array:** Cuando un curso duraba 3 horas consecutivas, el motor generaba colisión matemática errónea al comparar el final del bloque (Ej. 10:00) con el inicio exacto del siguiente bloque (Ej. 10:00) de otro docente, marcándolo como cruce y dejando un aula sin usar por el resto del día. | Staging / Pruebas de Estrés | **Corrección de Lógica Discreta:** Se modificó el condicional de cruce temporal en TypeScript. En lugar de `startTime <= targetEnd`, se refactorizó con exclusión matemática de los límites `startTime < targetEnd`. | Resuelto | Jest Test Automático |
| **DEF-102** | 🟠 Alta | *React Router (Frontend)* | **Pérdida de Sesión Silenciosa:** Si un usuario navegaba directamente a `/dashboard` por URL escribiéndola en el navegador en lugar de loguearse por botones, el Contexto (Global State) no inyectaba el JWT en los Headers de Axios. La pantalla quedaba congelada en blanco esperando una ruta que exigía token. | Desarrollo (Sprint 2) | **Provider Asíncrono:** Se actualizó el componente `<AuthProvider>` para que lea asíncronamente el LocalStorage en el primer render (Mounting) y espere su resolución antes de inyectar las rutas protegidas a las capas inferiores. | Resuelto | Pruebas Cypress E2E |
| **DEF-103** | 🟠 Alta | *Mongoose Models* | **Violación de Integridad de Referencia:** Al borrar un "Docente", los "Cursos" que este docente tenía asignados en periodos históricos mantenían su `ObjectId`, generando reportes rotos o excepciones nulas al usar `.populate()` sobre un ID fantasma. | Testing de Integración | **Hook de Middleware Cascada:** Se inyectó un `Schema.pre('remove')` en Mongoose para asegurar que, antes de borrar físicamente al docente, el backend establezca en nulo las relaciones de sus cursos dictados, o alternativamente prohibir su borrado (Soft Delete). | Resuelto | Alexander (Lead Dev) |
| **DEF-104** | 🟡 Media | *UI/UX Calendar* | **Z-Index Roto en Calendario Modal:** Al abrir la pestaña desplegable de los detalles de un curso en la grilla visual, los botones subyacentes del mapa de calor resaltaban "por encima" de la ventana modal, ensuciando la interfaz. | Staging Visual | **Tailwind Config:** Se establecieron capas limpias utilizando la escala de Tailwind `z-50` para el modal y `z-0` para la base, aplicando una clase `backdrop-blur` para el fondo. | Resuelto | QA Funcional (Humano) |
| **DEF-105** | 🟡 Media | *Exportador de PDFs* | **Fuente Ilegible por Falta de Soporte Unicode:** Al exportar un horario a PDF, los caracteres especiales como "Álgebra" o "Diseño" (con eñes o tildes) se reemplazaban por recuadros negros (Mojibake). | Staging (Sprint 3) | **Inyección de Fuente Base:** Se forzó a la librería exportadora `jspdf` a cargar y empotrar (embed) la fuente `Roboto-Regular.ttf` (UTF-8) dentro de los assets compilados antes de renderizar el archivo plano. | Resuelto | Equipo Directivo UAT |

---

## 3. Conclusión de Estabilización

Al momento de la firma de este registro (Cierre de Proyecto), se emite un certificado de **Densidad de Defectos Críticos Cero (0)**. Todos los bugs descubiertos y priorizados como severidad Bloqueante (🔴), Alta (🟠) o Media (🟡) han sido mitigados. 

El código del Repositorio Máster es un *Release Candidate* (RC-1) estabilizado y aprobado. Eventuales defectos estéticos de Severidad Baja (🟢) que no impactan las lógicas matemáticas ni flujos de trabajo (Ej. El color de un botón de ayuda muy opaco) fueron migrados intencionalmente a la pila de *Backlog de Mantenimiento* (Technical Debt) para no retrasar el paso a Producción, en alineación con el principio de Pareto del Desarrollo de Software (MVP Viability).
