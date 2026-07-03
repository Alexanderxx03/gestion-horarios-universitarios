# 15 · Gestión de Riesgos y Oportunidades

## Introducción

La gestión proactiva de riesgos es crítica en un sistema de complejidad NP-hard como la generación automática de horarios universitarios. Este documento presenta el registro formal de riesgos y oportunidades del proyecto, con análisis cuantitativo y estrategias alineadas a las restricciones del problema CSP, las limitaciones técnicas del equipo y las dependencias externas.

---

## 1. Metodología de Evaluación

### Escala de Probabilidad

| Nivel    | Valor | Descripción                               |
| -------- | :---: | ----------------------------------------- |
| Muy Baja |   1   | Evento poco probable (<10%)               |
| Baja     |   2   | Evento posible pero improbable (10–30%)   |
| Media    |   3   | Evento con probabilidad moderada (30–50%) |
| Alta     |   4   | Evento probable (50–70%)                  |
| Muy Alta |   5   | Evento casi seguro (>70%)                 |

### Escala de Impacto

| Nivel    | Valor | Descripción                                       |
| -------- | :---: | ------------------------------------------------- |
| Muy Bajo |   1   | Sin impacto en el cronograma o entregables        |
| Bajo     |   2   | Retraso < 1 día o calidad marginalmente afectada  |
| Moderado |   3   | Retraso de 1–3 días, funcionalidad degradada      |
| Alto     |   4   | Retraso > 3 días, funcionalidad crítica afectada  |
| Muy Alto |   5   | Entregable comprometido, rediseño mayor requerido |

### Clasificación del Riesgo

**Score = Probabilidad × Impacto**

| Score | Clasificación | Color |
| ----- | ------------- | ----- |
| 1–4   | Bajo          | 🟢    |
| 5–9   | Moderado      | 🟡    |
| 10–14 | Alto          | 🟠    |
| 15–25 | Crítico       | 🔴    |

---

## 2. Heatmap de Riesgo

```
        IMPACTO
        Bajo(1) Med(2) Alto(3) MuyA(4) Crít(5)
         ┌──────┬──────┬───────┬───────┬───────┐
MuyA (5) │  5🟡 │ 10🟠 │ 15🔴  │ 20🔴  │ 25🔴  │
Alta (4) │  4🟢 │  8🟡 │ 12🟠  │ 16🔴  │ 20🔴  │  R7●
Med  (3) │  3🟢 │  6🟡 │  9🟡  │ 12🟠  │ 15🔴  │
Baja (2) │  2🟢 │  4🟢 │  6🟡  │  8🟡  │ 10🟠  │  R4● R6● R8●
MuyB (1) │  1🟢 │  2🟢 │  3🟢  │  4🟢  │  5🟡  │     R1● R2● R3● R5●
         └──────┴──────┴───────┴───────┴───────┘
P
R
O
B
A
B
I
L
I
D
A
D
```

---

## 3. Registro de Riesgos

### R1 — Motor CSP sin solución para instancias complejas

| Atributo         | Detalle                                                                                                                                                                                                                                                                                                                                        |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descripción**  | El algoritmo de Backtracking + MRV puede no encontrar una solución válida (retorna `null`) para instancias con muchos cursos, pocas aulas y docentes con disponibilidad muy restringida.                                                                                                                                                       |
| **Causa raíz**   | El problema CSP de horarios académicos es NP-hard; para ciertas combinaciones de restricciones duras (HC1–HC8), el espacio de búsqueda puede ser infactible o explorado en tiempo mayor al timeout.                                                                                                                                            |
| **Relación CSP** | Directamente ligado a las restricciones duras HC1 (no solapamiento docente), HC2 (aula), HC4 (disponibilidad) y HC5 (capacidad).                                                                                                                                                                                                               |
| **Probabilidad** | 2 (Baja)                                                                                                                                                                                                                                                                                                                                       |
| **Impacto**      | 5 (Muy Alto)                                                                                                                                                                                                                                                                                                                                   |
| **Score**        | 🟠 **10**                                                                                                                                                                                                                                                                                                                                      |
| **Estrategia**   | **Mitigar:** (1) Implementar timeout de 30s con reporte de estado FAILED + variables en conflicto. (2) Validar pre-condiciones antes de ejecutar el motor: verificar que existan suficientes franjas horarias para cubrir todos los cursos. (3) Documentar en la UI qué combinaciones causaron el fallo para que el coordinador pueda ajustar. |
| **Estado**       | ✅ Mitigado — timeout implementado, UI reporta motivo del fallo                                                                                                                                                                                                                                                                                |

---

### R2 — Timeout de Cloud Functions antes de encontrar solución

| Atributo             | Detalle                                                                                                                                                                                                                                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descripción**      | Firebase Cloud Functions tiene un límite máximo de ejecución de 540 segundos (9 minutos). Para instancias muy grandes (>50 cursos), el motor CSP puede superar este límite.                                                                                                                                                 |
| **Causa raíz**       | La complejidad temporal del Backtracking sin poda suficiente es O(d^n), exponencial en el número de variables. Casos con alta conectividad de restricciones reducen la eficacia de las heurísticas.                                                                                                                         |
| **Relación técnica** | Limitación de la infraestructura Firebase Functions Gen 2; el motor no puede ser interrumpido y retomado (no hay estado persistido entre invocaciones).                                                                                                                                                                     |
| **Probabilidad**     | 2 (Baja)                                                                                                                                                                                                                                                                                                                    |
| **Impacto**          | 4 (Alto)                                                                                                                                                                                                                                                                                                                    |
| **Score**            | 🟡 **8**                                                                                                                                                                                                                                                                                                                    |
| **Estrategia**       | **Mitigar:** (1) Establecer timeout interno en el motor a 30s (bien por debajo del límite de Functions). (2) Guardar el estado parcial de la asignación en Firestore como "PARTIAL" para que el coordinador pueda analizar. (3) Recomendar reducir el alcance del período (menos cursos por semestre) si el timeout ocurre. |
| **Estado**           | ✅ Mitigado — timeout de 30s implementado internamente                                                                                                                                                                                                                                                                      |

---

### R3 — Dependencia de disponibilidad de Firebase (outage)

| Atributo                | Detalle                                                                                                                                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descripción**         | El sistema depende 100% de la disponibilidad de los servicios Firebase (Auth, Firestore, Functions, Hosting). Un outage de Google Cloud afectaría todas las funcionalidades.                          |
| **Causa raíz**          | Arquitectura 100% cloud sin fallback local; decisión de diseño aceptada para simplificar el stack del proyecto académico.                                                                             |
| **Dependencia externa** | Google Cloud Platform SLA: 99.95% de disponibilidad mensual (máximo ~4.4 horas de downtime/año).                                                                                                      |
| **Probabilidad**        | 1 (Muy Baja)                                                                                                                                                                                          |
| **Impacto**             | 5 (Muy Alto)                                                                                                                                                                                          |
| **Score**               | 🟡 **5**                                                                                                                                                                                              |
| **Estrategia**          | **Aceptar:** El SLA de Firebase (99.95%) es superior al de cualquier servidor universitario propio. El riesgo residual es aceptable para un contexto académico. Documentar el SLA en los entregables. |
| **Estado**              | ✅ Aceptado — SLA documentado; el sistema incluye mensajes de error descriptivos para el usuario                                                                                                      |

---

### R4 — Inconsistencia de datos en Firestore por escrituras concurrentes

| Atributo         | Detalle                                                                                                                                                                                                                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Descripción**  | Si dos coordinadores intentan generar el horario del mismo período simultáneamente, pueden producirse condiciones de carrera que corrompan el documento `schedules/{periodId}`.                                                                                                                              |
| **Causa raíz**   | Ausencia de locking distribuido en Firestore; las transacciones atómicas de Firestore previenen algunos casos pero no todos los escenarios de escritura concurrente del motor CSP.                                                                                                                           |
| **Relación CSP** | El motor lee los datos del período al inicio (cursos, docentes, aulas, matrículas) y escribe el resultado al final. Si los datos cambian durante la ejecución, el horario puede ser inválido.                                                                                                                |
| **Probabilidad** | 2 (Baja)                                                                                                                                                                                                                                                                                                     |
| **Impacto**      | 4 (Alto)                                                                                                                                                                                                                                                                                                     |
| **Score**        | 🟡 **8**                                                                                                                                                                                                                                                                                                     |
| **Estrategia**   | **Mitigar:** (1) Usar transacción atómica de Firestore para verificar que el período no tenga un horario en estado `IN_PROGRESS` antes de iniciar. (2) El estado `IN_PROGRESS` actúa como mutex distribuido. (3) Solo coordinadores y admins pueden disparar la generación (Firebase Rules + Custom Claims). |
| **Estado**       | ✅ Mitigado — estado IN_PROGRESS como mutex implementado en Cloud Function                                                                                                                                                                                                                                   |

---

### R5 — Curva de aprendizaje del equipo en algoritmos CSP

| Atributo         | Detalle                                                                                                                                                                                                                                                                                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descripción**  | El Motor CSP requiere conocimientos especializados en búsqueda heurística, propagación de restricciones y análisis de complejidad que el equipo no posee de forma previa.                                                                                                                                                                                       |
| **Causa raíz**   | Los algoritmos CSP no forman parte del currículo de todos los miembros; el Algorithms Engineer debe auto-estudiar antes de implementar.                                                                                                                                                                                                                         |
| **Probabilidad** | 1 (Muy Baja — ya superado)                                                                                                                                                                                                                                                                                                                                      |
| **Impacto**      | 5 (Muy Alto si no se gestiona)                                                                                                                                                                                                                                                                                                                                  |
| **Score**        | 🟡 **5**                                                                                                                                                                                                                                                                                                                                                        |
| **Estrategia**   | **Mitigar (ejecutado):** (1) Spike de investigación en Sprint 0: el Algorithms Engineer estudió los capítulos 6-7 de _Artificial Intelligence: A Modern Approach_ (Russell & Norvig). (2) Se documentó matemáticamente el CSP antes de codificar (Ver [05-Motor-CSP](05-Motor-CSP)). (3) Pseudocódigo revisado por el Product Owner antes de la implementación. |
| **Estado**       | ✅ Resuelto — documentación completa + implementación funcional                                                                                                                                                                                                                                                                                                 |

---

### R6 — Datos de prueba insuficientes para validar el motor CSP

| Atributo         | Detalle                                                                                                                                                                                                                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descripción**  | El motor CSP puede parecer funcionar con datos simples (5 cursos, 5 docentes) pero fallar en escenarios reales universitarios con 30+ cursos y restricciones complejas cruzadas.                                                                                                                     |
| **Causa raíz**   | Los fixtures de prueba requieren modelar la complejidad real del dominio (prerrequisitos en cadena, docentes con disponibilidad restringida, aulas con tipos específicos).                                                                                                                           |
| **Probabilidad** | 2 (Baja)                                                                                                                                                                                                                                                                                             |
| **Impacto**      | 4 (Alto)                                                                                                                                                                                                                                                                                             |
| **Score**        | 🟡 **8**                                                                                                                                                                                                                                                                                             |
| **Estrategia**   | **Mitigar:** (1) Definir al menos 3 escenarios de prueba: básico (10 cursos), intermedio (25 cursos) y complejo (50 cursos). (2) Incluir casos donde el motor debe hacer backtracking real (no solo asignación directa). (3) Agregar test específico para el bug HC3 encontrado durante el Sprint 2. |
| **Estado**       | ⚠️ En progreso — escenarios básico e intermedio cubiertos; escenario complejo pendiente                                                                                                                                                                                                              |

---

### R7 — Abandono o reducción del equipo

| Atributo         | Detalle                                                                                                                                                                                                                                                                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descripción**  | Uno o más miembros del equipo podría no poder continuar participando activamente (carga académica, trabajo, enfermedad) generando un cuello de botella en el Sprint 2 o 3.                                                                                                                                                                           |
| **Causa raíz**   | Contexto académico: los integrantes tienen otras materias y compromisos simultáneos; el Sprint 2 (Motor CSP) es el más intenso y coincide con exámenes de otras asignaturas.                                                                                                                                                                         |
| **Probabilidad** | 4 (Alta)                                                                                                                                                                                                                                                                                                                                             |
| **Impacto**      | 4 (Alto)                                                                                                                                                                                                                                                                                                                                             |
| **Score**        | 🔴 **16**                                                                                                                                                                                                                                                                                                                                            |
| **Estrategia**   | **Mitigar:** (1) Documentación exhaustiva del código (JSDoc + Wiki) para facilitar transferencia de conocimiento. (2) Pair programming en componentes críticos (Motor CSP) para que al menos 2 miembros entiendan el código. (3) Reducción de alcance del Sprint 2 si se detecta el riesgo: mover HU-03 (CRUD Docentes) al Sprint 3 si es necesario. |
| **Estado**       | ✅ Mitigado — pair programming aplicado en el Motor CSP; documentación actualizada en cada sprint                                                                                                                                                                                                                                                    |

---

### R8 — Cambio de requerimientos del evaluador durante el proyecto

| Atributo         | Detalle                                                                                                                                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descripción**  | El evaluador académico (cátedra) podría modificar los criterios de evaluación, agregar entregables o cambiar prioridades durante el desarrollo del proyecto.                                                                                |
| **Causa raíz**   | El contexto académico es dinámico; los PFA pueden recibir retroalimentación que cambie el alcance esperado.                                                                                                                                 |
| **Probabilidad** | 2 (Baja)                                                                                                                                                                                                                                    |
| **Impacto**      | 4 (Alto)                                                                                                                                                                                                                                    |
| **Score**        | 🟡 **8**                                                                                                                                                                                                                                    |
| **Estrategia**   | **Mitigar:** (1) Mantener buffer de 10% de la capacidad del Sprint para absorber cambios inesperados. (2) Wiki siempre actualizada para mostrar el estado real del proyecto. (3) Backlog abierto a re-priorización en cada Sprint Planning. |
| **Estado**       | ✅ Mitigado — backlog flexible, Wiki actualizada en tiempo real                                                                                                                                                                             |

---

## 4. Resumen del Registro de Riesgos

| ID  | Riesgo                                     |  P  |  I  | Score | Estrategia | Estado |
| --- | ------------------------------------------ | :-: | :-: | :---: | ---------- | ------ |
| R1  | CSP sin solución para instancias complejas |  2  |  5  | 🟠 10 | Mitigar    | ✅     |
| R2  | Timeout Cloud Functions                    |  2  |  4  | 🟡 8  | Mitigar    | ✅     |
| R3  | Outage de Firebase                         |  1  |  5  | 🟡 5  | Aceptar    | ✅     |
| R4  | Escrituras concurrentes en Firestore       |  2  |  4  | 🟡 8  | Mitigar    | ✅     |
| R5  | Curva de aprendizaje CSP                   |  1  |  5  | 🟡 5  | Mitigar    | ✅     |
| R6  | Datos de prueba insuficientes              |  2  |  4  | 🟡 8  | Mitigar    | ⚠️     |
| R7  | Abandono del equipo                        |  4  |  4  | 🔴 16 | Mitigar    | ✅     |
| R8  | Cambio de requerimientos                   |  2  |  4  | 🟡 8  | Mitigar    | ✅     |

**Riesgo residual más alto:** R7 (Abandono del equipo, Score 16) — mitigado con pair programming y documentación exhaustiva.

---

## 5. Registro de Oportunidades

### O1 — Reutilización del Motor CSP en otros contextos universitarios

| Atributo                          | Detalle                                                                                                                                                                                                                |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descripción**                   | El Motor CSP implementado en TypeScript puro (sin dependencias de Firebase) es un componente reutilizable que podría ser publicado como librería open-source o adaptado a otros contextos de scheduling universitario. |
| **Impacto positivo**              | Reducir el tiempo de desarrollo de futuros proyectos similares en un 60% (el motor es el componente más costoso de desarrollar). Posibilidad de contribución a la comunidad académica latinoamericana.                 |
| **Estrategia de aprovechamiento** | Publicar el motor CSP como paquete npm (`@unihorarios/csp-solver`) con documentación completa. Diseño de la arquitectura hexagonal facilita esta extracción (el motor ya está en `domain/` sin dependencias externas). |

---

### O2 — Experiencia en Firebase como ventaja profesional del equipo

| Atributo                          | Detalle                                                                                                                                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descripción**                   | El equipo adquiere experiencia práctica en Firebase (Auth, Firestore, Cloud Functions, Hosting, Security Rules) — un stack muy demandado en el mercado laboral 2026.                                          |
| **Impacto positivo**              | Valor curricular diferencial para todos los miembros. Firebase es utilizado por más de 2 millones de proyectos activos. La experiencia en Firestore Security Rules y Custom Claims es especialmente valorada. |
| **Estrategia de aprovechamiento** | Documentar el stack completo en el CV de cada integrante. Preparar un caso de estudio para portafolios profesionales basado en este proyecto.                                                                 |

---

### O3 — Extensión a sistema real de la universidad

| Atributo                          | Detalle                                                                                                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Descripción**                   | Si el sistema funciona correctamente, existe la oportunidad de presentarlo a las autoridades académicas de la institución como prototipo para su adopción o piloto real. |
| **Impacto positivo**              | Impacto institucional real + validación del sistema en condiciones de producción. Podría convertirse en un proyecto de extensión universitaria (investigación aplicada). |
| **Estrategia de aprovechamiento** | Presentar el sistema en la Jornada de Proyectos de la carrera. Preparar un caso de uso con datos reales anonimizados de la institución para demostrar la viabilidad.     |

---

### O4 — Mejora del motor CSP con técnicas avanzadas (investigación futura)

| Atributo                          | Detalle                                                                                                                                                                                                                                                    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descripción**                   | El motor actual (Backtracking + MRV + Forward Checking) puede extenderse con técnicas más avanzadas: Arc Consistency (AC-3), Constraint Learning, o enfoque de Búsqueda Local (Simulated Annealing) para mejorar la velocidad y calidad de las soluciones. |
| **Impacto positivo**              | Reducción del tiempo de generación en escenarios complejos. Soporte para optimización de restricciones blandas (mejor distribución de carga, menos huecos). Posibilidad de publicación académica.                                                          |
| **Estrategia de aprovechamiento** | Documentar las extensiones propuestas en el Wiki como roadmap de investigación. Si el tiempo lo permite en Sprint 4, implementar AC-3 como mejora al Forward Checking actual.                                                                              |

---

## 6. Análisis de Interdependencias

Los riesgos del proyecto no son independientes. Se identifican las siguientes cadenas de dependencia:

```
R5 (Curva aprendizaje CSP)
    └──► Si no se gestiona ──► R1 (CSP sin solución) + R2 (Timeout)
                                    └──► R6 (Datos insuficientes de prueba)

R7 (Abandono equipo)
    └──► Si ocurre ──► R2 (Timeout, por falta de optimización) + R6 (Pruebas incompletas)

R8 (Cambio requerimientos)
    └──► Si ocurre ──► R4 (Concurrencia, por nuevas funcionalidades no diseñadas)
```

Esta cadena de dependencias confirma que **R7 (abandono del equipo) es el riesgo maestro**: si se materializa, puede desencadenar múltiples riesgos secundarios. Por ello recibe la mayor inversión en mitigación (pair programming + documentación exhaustiva).

---

> 🔗 Anterior: [← Presupuesto](14-Presupuesto-del-Proyecto) | Siguiente: [Spec-Driven Development →](16-Spec-Driven-Development)
