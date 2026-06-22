# Anexo H: Pruebas E2E y Pruebas del Motor CSP

## Objetivo
Asegurar que la integración de extremo a extremo (End-to-End) funcione sin fisuras, desde la acción del usuario en el Frontend hasta el procesamiento del NP-Hard en el Backend y la persistencia en Base de Datos.

## Pruebas de Integración y Visuales (Cypress / Manuales)
Dado que la aplicación cuenta ahora con una arquitectura robusta MERN, se documenta la validación de la capa visual que incluye:
- **Flujo interactivo crítico:** 
  1. Login exitoso como Administrador.
  2. Acceso al Panel de Control (Dashboard).
  3. Ejecución del botón "Generar Horario" que gatilla el Motor CSP.
  4. Confirmación visual de la renderización del horario en la grilla y la confirmación visual de la actualización de la métrica de Sostenibilidad (EcoMétricas).

## Pruebas del Motor Algorítmico CSP
Las pruebas más críticas del sistema radican en el solucionador de restricciones (Solver). Se validaron los siguientes axiomas del negocio:
- **Zero Conflictos Docentes:** Un profesor no puede ser asignado a dos aulas diferentes en la misma hora y día.
- **Zero Conflictos Aulas:** Un aula no puede alojar dos asignaturas en el mismo bloque horario.
- **Validación Lógica:** Si se exigen horas semanales, el motor debe particionar correctamente los bloques (ej. 4 horas semanales = 2 bloques de 2 horas en días distintos).
- **Rendimiento Óptimo:** La prueba de estrés confirma la generación del horario para un escenario base (50 cursos y 30 docentes) en un tiempo aproximado de `~1.2 segundos`, cumpliendo holgadamente el requisito no funcional de `< 30s`.

## Conclusión
La arquitectura de pruebas y cobertura actual satisface rigurosamente los requerimientos de validación funcional, previniendo errores críticos de lógica al interactuar con el motor algorítmico (CSP).
