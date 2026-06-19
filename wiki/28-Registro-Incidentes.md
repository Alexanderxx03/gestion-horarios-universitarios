# 28. Registro de Incidentes o Problemas (Issue Log)

A diferencia de los riesgos (eventos probabilísticos), los incidentes (*Issues*) documentados en esta tabla corresponden a problemas **reales** que sucedieron durante la ejecución del proyecto y las acciones correctivas aplicadas.

| ID | Incidente / Problema | Fecha Reporte | Prioridad | Responsable | Acciones Correctivas Aplicadas | Estado |
| :-- | :-- | :--: | :-- | :-- | :-- | :--: |
| **INC-01** | **Degradación de rendimiento en renderizado Frontend:** Al navegar rápidamente entre el catálogo de cursos y el panel de horarios, la aplicación se congelaba momentáneamente (cuellos de botella del DOM virtual). | Sprint 2 | Alta | Development Team | Refactorización utilizando Memoización (`useMemo` de React) y transición al manejador de estado global robusto (`zustand`) eliminando re-renders innecesarios. | Cerrado |
| **INC-02** | **Agotamiento del Plan Gratuito (Bandwidth):** Las lecturas excesivas hacia la base de datos para recuperar perfiles de docentes casi sobrepasan la cuota del proveedor de nube. | Sprint 3 | Crítica | Product Owner / Dev Team | Modificación inmediata del backend para habilitar almacenamiento en memoria Caché local y compresión de carga Gzip (`compression`). | Cerrado |
| **INC-03** | **Dependencias Deprecadas (Vulnerabilidades npm):** Durante los procesos de integración, los auditores reportaron librerías Node obsoletas con exposición de seguridad (Risk High). | Sprint 4 | Alta | Scrum Master | Se realizó un `npm audit fix --force` unificando versiones y parcheando vulnerabilidades secundarias, validadas a través de SonarQube. | Cerrado |
| **INC-04** | **Fallos de Contraste en Modo Día:** Se detectó durante la evaluación inicial de control que el modo día de la plataforma hacía imperceptible el botón de "Login", violando los estándares WCAG 2.2. | Cierre | Media | UI/UX Developer | Se incrementó la luminosidad de los botones primarios a `#2563eb` contra el fondo blanco, alcanzando el ratio AAA. | Cerrado |

---
**Responsable de Mantenimiento:** Scrum Master  
**Última Actualización:** Fase de Cierre del Proyecto.
