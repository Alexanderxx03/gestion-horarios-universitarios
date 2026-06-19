# 27. Registro de Riesgos (Risk Register)

Este documento centraliza los eventos de riesgo identificados a lo largo del proyecto "Gestión de Horarios Universitarios". Muestra la trazabilidad desde su concepción, evaluación de impacto y la respuesta definitiva aplicada en la fase de control y cierre.

| ID | Riesgo | Categoría | Prob. | Impacto | Respuesta Planificada (Estrategia) | Estado Final y Mitigación Aplicada |
| :-- | :-- | :-- | :--: | :--: | :-- | :-- |
| **R01** | Curva de aprendizaje técnica del equipo con el algoritmo CSP (Backtracking y MRV). | Técnico | Alta | Crítico | **Mitigar:** Capacitación temprana (Sprint 0) y uso de Desarrollo Orientado a Pruebas (TDD). | **Cerrado.** Se aplicó *pair programming* y las pruebas de regresión aseguraron la funcionalidad del motor CSP sin retrasos críticos en el cronograma. |
| **R02** | Exceder la capa gratuita (Free Tier) del proveedor de Base de Datos (MongoDB) debido a consultas masivas. | Financiero | Media | Alto | **Evitar / Mitigar:** Implementar estrategias estrictas de almacenamiento en caché en el Backend y Zustand en el Frontend. | **Cerrado.** Se reestructuró la API en el Sprint 3 con memoria Caché y Gzip. El consumo de red disminuyó un 90%, manteniéndose el costo en $0. |
| **R03** | Conflictos y sobreescrituras de código debido al trabajo colaborativo simultáneo en la misma base. | Organizacional | Media | Medio | **Mitigar:** Uso riguroso de Git Flow, Pull Requests obligatorios y separación del entorno en un Monorepo MERN. | **Cerrado.** El uso de Workspaces y la rama `main` protegida previno rupturas en el código principal. La integración fue fluida. |
| **R04** | Vulnerabilidades de seguridad en despliegue (Inyecciones de datos y ataques de denegación de servicio). | Seguridad | Baja | Crítico | **Mitigar:** Implementación temprana de estándares OWASP Top 10 en la fase de control. | **Cerrado.** Se instalaron defensas estáticas (`helmet`, `express-rate-limit`, `mongo-sanitize`), validadas a través del rating "A" en SonarQube. |
| **R05** | Rechazo del usuario final (administradores) por falta de intuitividad de la interfaz. | Usabilidad | Baja | Alto | **Mitigar:** Aplicar diseño minimalista, validar contraste según WCAG 2.2, y levantar encuestas de aceptabilidad. | **Cerrado.** La interfaz obtuvo un puntaje excelente de 84.3/100 en la prueba empírica SUS, validando su usabilidad. |

---
**Responsable de Mantenimiento:** Scrum Master / Project Manager  
**Última Actualización:** Fase de Cierre del Proyecto.
