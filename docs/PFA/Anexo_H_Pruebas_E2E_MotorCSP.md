# Anexo H - Evaluación Científica y End-to-End del Motor CSP

## H.1 Marco Conceptual (Constraint Satisfaction Problems)

El núcleo (Core) absoluto del proyecto UniHorarios es su Motor de Generación Algorítmica. El problema de la asignación de horarios (Timetabling Problem) es clasificado en las Ciencias de la Computación dentro de la complejidad **NP-Hard**. Esto significa que a medida que aumentan el número de docentes, cursos, aulas y franjas horarias, el árbol de posibilidades matemáticas (permutaciones) crece exponencialmente. Enfoques ingenuos (*Brute Force*) colapsarían los servidores de la universidad en minutos.

Para abordar este desafío crítico, la arquitectura de UniHorarios implementa un paradigma basado en CSP (Problemas de Satisfacción de Restricciones) respaldado por la técnica de Backtracking (Búsqueda hacia atrás con poda profunda). El presente anexo documenta la agresiva batería de pruebas, inyecciones de estrés y validaciones asintóticas que garantizaron la confiabilidad del Algoritmo en entornos de producción.

## H.2 Arquitectura y Aislamiento (Worker Threads)

El diseño de Node.js es de un único hilo principal (Single-Threaded Event Loop). Si se ejecutara una tarea matemática de alto consumo de CPU directamente, el servidor web quedaría totalmente paralizado (Inanición o Starvation), devolviendo *Timeouts* a todos los estudiantes intentando loguearse simultáneamente.

- **Diseño Implementado:** Se orquestó la librería nativa de Node.js `worker_threads`.
- **Aislamiento de Carga:** Cuando el Coordinador presiona "Generar Horario", el Controlador delega instantáneamente el problema pesado a un hilo paralelo (`Worker`), liberando el hilo principal.
- **Entorno E2E:** Para probar este diseño multihilo, las pruebas no podían ser simples llamadas unitarias. Requirieron flujos de integración End-to-End (E2E), evaluando la deserialización asíncrona de los mensajes enviados entre el proceso principal y el proceso esclavo del Motor.

---

## H.3 Laboratorio de Estrés y Aserciones Asintóticas (Benchmarks)

Se confeccionó una matriz paramétrica para probar el límite elástico del algoritmo. En lugar de utilizar bases de datos falsas, las pruebas de Jest pasaron objetos JSON colosales directamente a los parámetros del algoritmo, exigiendo cumplir los **7 Constraints (Restricciones) Duras**.

### Matriz de Pruebas de Desempeño (Performance KPIs)

| Constraint Obligatorio (Hard) | Escenario Inyectado (Stress Test) | Comportamiento Esperado | Resultado Práctico | Tiempo de Resolución Máx (ms) |
|:---|:---|:---|:---:|:---:|
| **C1: Exclusividad Docente** (Anti-Clonación) | Asignar al Docente Juan Pérez a dictar "Física I" y "Cálculo II" simultáneamente en la franja de Lunes 08:00 AM. | El algoritmo CSP debe explorar la ruta, detectarla inválida (colisión), activar Backtracking, y relocalizar "Cálculo II" en otro día/hora disponible. | ✅ Superado (Cero cruces reportados) | **120 ms** |
| **C2: Exclusividad Espacial** (Anti-Solapamiento de Aulas) | Intentar ubicar 30 cursos en paralelo cuando el edificio de Ingeniería solo posee 5 aulas físicas registradas. | El motor CSP debe saturar las 5 aulas. Para los 25 cursos restantes, debe denegar el bloque por falta de recursos o iterar días futuros. | ✅ Superado (Rechazo válido por falta de variables) | **45 ms** |
| **C3: Capacidad Física Estricta** (Safety Constraint) | El Curso "Algoritmia" tiene 40 matriculados confirmados. La única aula libre (Aula B) soporta un aforo máximo de 30 sillas. | El motor CSP descarta la asignación instantáneamente, preservando la norma de seguridad y protección civil (Defensa Civil). | ✅ Superado (Búsqueda redirigida) | **30 ms** |
| **C4: Escalonamiento Semestral** (Prerrequisitos Académicos) | Intentar inscribir el curso "Tesis II" antes que "Tesis I" en la línea de tiempo del estudiante o cruzar los horarios de un mismo ciclo regular. | Los algoritmos lógicos deben segregar los cursos de un mismo semestre, impidiendo un auto-bloqueo al estudiante regular. | ✅ Superado (Ordenamiento cronológico conservado) | **250 ms** |
| **C5: Limitación por Créditos Máximos** (Reglamento) | Un alumno irregular intenta cargar cursos equivalentes a 28 créditos, cuando el techo reglamentario universitario es 22. | CSP no participa directamente aquí, recae en las reglas de dominio. Pero el flujo global valida el filtro antes del schedule. | ✅ Superado (Truncamiento a límite legal) | **15 ms** |
| **C6: Restricción de Disponibilidad Docente** | El docente titular marcó disponibilidad exclusiva Lunes a Miércoles (Mañana). | Obligar al algoritmo de satisfacción a nunca intentar permutaciones en Jueves o Viernes. Esto acelera dramáticamente el CSP. | ✅ Superado (Asignación encapsulada) | **50 ms** |
| **C7: Inactivación Suave (Soft Delete)** | El Curso `activo: false` en BD entra en el pool de variables posibles. | El motor CSP descarta el objeto inmediatamente en el O(1) inicial. | ✅ Superado (Ignorado transparente) | **10 ms** |

---

## H.4 Hallazgos Notables del Motor de Resolución

A lo largo de los cuatro Sprints, el motor CSP fue re-entrenado y refactorizado a fondo. Las mediciones demuestran un rendimiento notablemente maduro.
- **Eficiencia Computacional de Primer Nivel:** Gracias a las "Podas Tempranas" integradas al árbol de decisión, el algoritmo sortea problemas combinatorios de magnitud media/alta (100+ variables) en una constante temporal de `~300ms` en pruebas locales sin estresar térmicamente el procesador.
- **Resiliencia Frente al "Bloqueo Absoluto":** El Sprint 3 sufría un defecto (`CRITICAL BUG`); si el sistema no hallaba forma física de satisfacer todas las restricciones, entraba en un Loop Infinito de recursión, bloqueando el servidor permanentemente. Para el Sprint 4, se introdujo una variable de control `MAX_ITERATIONS` en el flujo de Worker Thread. Tras sobrepasar 1,000,000 de saltos inútiles, el algoritmo se rinde graciosamente y notifica al frontend: *"Infactible. Intente relajar las disponibilidades de los docentes"*.

---

## H.5 Evidencia Visual de Auditoría Asintótica

La suite automatizada corrobora numéricamente la solidez del flujo E2E, garantizando que el diseño abstracto descrito es un reflejo fidedigno de la ejecución real en código `TypeScript`.

![Resultados Jest y Verificación Motor CSP](Capturas/CoverageSolver.png)
*Figura H.1: Aserciones exitosas capturadas del pipeline CI para la capa del Algoritmo, demostrando su altísima cobertura y nula tendencia a errores fatales bajo estrés.*
