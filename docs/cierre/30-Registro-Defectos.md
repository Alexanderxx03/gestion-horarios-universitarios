# 30. Registro de Defectos (Defect Log)

Documento técnico que consolida los *Bugs* de software detectados en la fase de control de calidad (QA Testing) y pruebas E2E, detallando su clasificación técnica, severidad, corrección y evidencia de validación para garantizar la trazabilidad exigida.

| Defecto ID | Descripción del Bug / Defecto | Severidad | Causa Raíz (RCA) | Corrección Aplicada en Código | Validación de QA | Estado |
|:---:|---|:---:|---|---|---|:---:|
| **BUG-01** | El sistema permitía a un profesor registrar disponibilidad en horas superpuestas (ej. 10:00-12:00 y 11:00-13:00). | **Alta** | Falta de validación temporal en el DTO de entrada. | Se añadió un middleware de intersección de rangos horarios basado en algoritmos de barrido (Sweep Line) en Node.js. | Test unitario "Prevent Overlap" ✅ Pasó | **Corregido** |
| **BUG-02** | Contraste de botones primarios frente al fondo oscuro violaba la norma WCAG 2.2 AA. | **Baja** | Relación de contraste 2.5:1. | Se modificaron los tokens CSS de Vanilla, aumentando el contraste a 4.5:1. | Lighthouse Accessibility Report ✅ 100% | **Corregido** |
| **BUG-03** | Error "Uncaught TypeError" si el estudiante intentaba matricular un curso sin prerrequisitos cargados en BD. | **Media** | Null pointer en la lectura del array de `prerequisites`. | Uso de *Optional Chaining* (`?.`) y validación Zod en el esquema de MongoDB. | Test manual y de cobertura de borde ✅ | **Corregido** |
| **BUG-04** | Payload de red al cargar el dashboard excedía los 2MB de JS no minimizado. | **Media** | Falta de *Code Splitting* en React Router. | Implementación de carga diferida (React.lazy + Suspense) para los componentes pesados. | Bundle Size Analyst ✅ < 300kb | **Corregido** |

*El 100% de los defectos clasificados como Severidad Alta o Crítica fueron erradicados antes del Release Candidate (RC).*
