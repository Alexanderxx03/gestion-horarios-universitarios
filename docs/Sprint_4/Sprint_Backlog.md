# Sprint Backlog - Sprint 4 (Exportación, Estética y Despliegue Final)

**Duración:** 14 Días (2 Semanas)
**Meta del Sprint (Sprint Goal):** Traducir los datos abstractos (JSON) arrojados por el Motor CSP en una hermosa grilla visual (React-Big-Calendar) exportable a PDF, y auditar íntegramente la plataforma en materia de Seguridad y Accesibilidad para autorizar el paso a Producción.

## 1. User Stories Seleccionadas (El Cierre del MVP)

Este Sprint abandona la algoritmia pesada para centrarse de lleno en UX/UI, QA y DevOps (Pasaje a Producción).

| ID Ticket | Épica (Categoría) | Título de la Historia de Usuario | Story Points (Esfuerzo) | Desarrollador | Estado de Cierre |
|:---:|:---|:---|:---:|:---:|:---:|
| **US-401** | Visualización | Instalar y configurar `react-big-calendar`. Mapear la respuesta del motor (Días, Horas, Asignaturas) a los Eventos del calendario visual. | 8 | Roberto (Front) | ✅ Completado |
| **US-402** | Exportación Reportes | Integrar `jspdf` o `html2canvas` para agregar un botón "Descargar PDF" que convierta la grilla visual de la semana en un documento A4 imprimible. | 5 | Roberto (Front) | ✅ Completado |
| **US-403** | Auditoría Calidad (PFA) | Ejecutar análisis estático con SonarQube. Eliminar todos los *Code Smells* y subir el *Coverage* de Jest al 80%. | 5 | QA / Equipo | ✅ Completado |
| **US-404** | Ciberseguridad (PFA) | Realizar Pentesting ligero con OWASP ZAP. Implementar `helmet` y limitadores de tasa (Rate Limit) contra ataques de fuerza bruta en el backend de Node.js. | 5 | Alexander (Back) | ✅ Completado |
| **US-405** | UI (Feature del Review 3) | Aplicar colores dinámicos al Calendario: Azul para clases Teóricas, Naranja para Laboratorios Prácticos. | 3 | Roberto (Front) | ✅ Completado |
| **US-406** | Producción DevOps | Migrar variables de entorno `.env` de Staging a Producción (MongoDB Prod, JWT Secret fuerte). Compilar y lanzar en dominio de Producción oficial (Vercel/Render). | 2 | Alexander (Scrum Master) | ✅ Completado |

## 2. Restricciones Especiales del Sprint Final

1. **Code Freeze (Congelamiento de Código):** Se detiene todo desarrollo de nuevas características el Martes de la Semana 2. Los días Miércoles, Jueves y Viernes están reservados EXCLUSIVAMENTE para matar Bugs (Defectos).
2. **Elaboración de Documentación (Cierre):** El Scrum Master invertirá 8 horas elaborando las Actas de Cierre y los Anexos PFA exigidos por la institución para la sustentación final.

## 3. Métricas de Velocidad Planificada
- **Velocidad Estimada para el Sprint 4:** 28 Story Points. (Velocidad de estabilización, sin picos de riesgo cognitivo).

*Firma de Inicio de Sprint: Equipo de Desarrollo UniHorarios - ¡Último Tramo!*
