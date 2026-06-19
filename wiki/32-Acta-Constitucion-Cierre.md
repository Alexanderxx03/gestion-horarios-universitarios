# 32. Acta de Constitución del Proyecto (Project Charter) - Revisión Final

El **Project Charter** o Acta de Constitución representa el documento originario que autorizó la existencia del proyecto. En esta fase de cierre, utilizamos este documento de referencia para constatar oficialmente si los compromisos de alto nivel fueron cumplidos.

## 1. Información General
- **Nombre del Proyecto:** Plataforma Web de Gestión de Horarios Universitarios (UniHorarios)
- **Patrocinador Ejecutivo:** Universidad / Facultad de Ingeniería de Sistemas e Informática
- **Director del Proyecto:** Alexander (Scrum Master / Lead Architect)

## 2. Revisión de Objetivos de Alto Nivel
| Objetivo Original | Métrica de Éxito Definida | Resultado Final (Cierre) | Estado |
| :-- | :-- | :-- | :--: |
| Automatizar la asignación de horarios para evitar solapamientos. | Generar un horario de prueba base (50 cursos, 30 docentes, 10 aulas) sin choques. | Se desarrolló un Motor CSP (Backtracking y MRV) que genera horarios 100% libres de conflictos lógicos. | **Logrado** ✅ |
| Optimizar el tiempo de generación de semanas a minutos. | Tiempo de ejecución del algoritmo menor a 2 minutos. | El algoritmo desarrollado en TypeScript transacciona y retorna el horario en un promedio de **~2 segundos**. | **Logrado** ✅ |
| Interfaz de gestión segura y usable. | Plataforma Web operativa en nube con roles segregados. | Entorno MERN desplegado (Render/Firebase) con seguridad OWASP y diseño validado con 84.3/100 en SUS. | **Logrado** ✅ |

## 3. Revisión de Requisitos de Alto Nivel
1. **[CUMPLIDO]** Gestión CRUD de Docentes, Aulas y Cursos.
2. **[CUMPLIDO]** Algoritmo paramétrico (restricciones de turno, exclusividad, tope de créditos).
3. **[CUMPLIDO]** Visualización gráfica (Calendario) del Horario Generado.
4. **[CUMPLIDO]** Acceso y visualización de perfil para el Rol Estudiante.
5. **[CUMPLIDO]** Arquitectura web moderna, segura y accesible (WCAG 2.2).

## 4. Firmas de Cierre y Aceptación
Por medio de la presente acta de revisión, el equipo certifica que los criterios de éxito fundacionales que autorizaron la financiación (presupuestada en $6,454 USD) y ejecución del proyecto han sido alcanzados satisfactoriamente, dando luz verde al cierre administrativo.

*Documento revisado y sellado electrónicamente al cierre del Taller de Proyectos 2.*
