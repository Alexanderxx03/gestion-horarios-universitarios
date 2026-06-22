# 27. Registro de Riesgos (Risk Register)

Este registro documenta de manera estructurada los eventos de incertidumbre detectados, evaluados y mitigados durante todo el ciclo de vida del proyecto, garantizando una trazabilidad verificable.

## Matriz y Estado Final de Riesgos

*Probabilidad (P) e Impacto (I) se evalúan en una escala de 1 a 5. Severidad (S) = P x I.*

| ID | Riesgo Identificado | P | I | S | Estrategia | Respuesta Aplicada (Mitigación real) | Estado Final |
|:---:|---|:---:|:---:|:---:|---|---|---|
| **R01** | El algoritmo CSP no converge en un tiempo razonable debido a complejidad combinatoria. | 4 | 5 | **20** | **Mitigar** | Se reemplazó el backtracking puro por heurísticas **MRV** y *Degree Heuristic*. | ✅ **Controlado** (Genera en < 30s) |
| **R02** | Exceso de límite de cuotas en base de datos en la nube (Firestore Free Tier). | 3 | 4 | **12** | **Evitar** | Migración estratégica a **MongoDB Mongoose** con despliegue local/Docker para desarrollo. | ✅ **Evitado** |
| **R03** | Incompatibilidad de horarios de los miembros del equipo reduciendo la Velocity. | 4 | 3 | **12** | **Aceptar** | Gestión asíncrona robusta, pair programming en fines de semana y Daily Scrums escritos vía Slack/Discord. | ✅ **Mitigado** |
| **R04** | Vulnerabilidades de inyección en endpoints del Motor CSP. | 2 | 5 | **10** | **Evitar** | Implementación estricta de validadores de esquemas con **Zod** y sanitización de MongoDB. | ✅ **Evitado** |
| **R05** | Fallo en la adaptación de la interfaz a dispositivos móviles (Responsive). | 3 | 3 | **9** | **Mitigar** | Enfoque *Mobile-First* con Vanilla CSS Flexbox/Grid y validación de Lighthouse en Sprint 3. | ✅ **Controlado** |

## Conclusión del Monitoreo
La gestión activa y temprana de riesgos, especialmente la re-arquitectura del algoritmo (R01), fue el factor decisivo que evitó el fracaso técnico del proyecto y permitió entregar valor según los estándares de ingeniería de software.
