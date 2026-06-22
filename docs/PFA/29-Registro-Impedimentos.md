# 29. Registro de Impedimentos (Impediment Log)

Este documento identifica de manera transparente los obstáculos organizacionales, técnicos o del entorno que frenaron el progreso diario del equipo, así como el análisis de su impacto y la resolución efectiva por parte del Scrum Master.

| ID | Descripción del Impedimento | Impacto en el Proyecto | Fecha Detección | Acción de Mitigación / Resolución | Estado |
|:---:|---|---|:---:|---|:---:|
| **IMP-01** | Retraso de 1 semana en la entrega de la matriz de prerrequisitos de cursos reales por parte de la Facultad. | Bloqueo en la construcción de los Seeders de Base de datos (Sprint 1). | Semana 2 | **Resolución:** Se generaron *Mocks* y datos sintéticos estructuralmente equivalentes usando la librería `faker.js` para continuar el desarrollo, inyectando datos reales después. | Resuelto |
| **IMP-02** | Falta de hardware de servidor local para pruebas de concurrencia de carga CSP. | Imposibilidad de correr Test de Estrés físicos en el Sprint 3. | Semana 6 | **Resolución:** Creación de instancias de micro-prueba utilizando contenedores Docker (`docker-compose`) limitados artificialmente en CPU/RAM para simular entornos restringidos. | Resuelto |
| **IMP-03** | Enfermedad (Descanso Médico) del Ingeniero Frontend por 4 días. | Riesgo crítico en la velocidad (Burn-down) del Sprint 4. | Semana 8 | **Resolución:** El Scrum Master y Arquitecto absorbieron temporalmente tareas Frontend priorizando funciones Core (Swarming de tareas). | Resuelto |

El registro continuo de estos impedimentos permitió proteger la autonomía técnica del equipo, demostrando una gestión ágil y activa frente a la volatilidad del proyecto.
