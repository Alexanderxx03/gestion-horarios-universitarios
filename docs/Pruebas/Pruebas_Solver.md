# Pruebas de Desempeño y Precisión - Motor Algorítmico CSP (Solver)

## 1. Contexto Científico y Desafío Matemático

El componente encargado de generar los horarios semestrales en UniHorarios no es una simple función de bases de datos; es un motor de inteligencia artificial clásica basado en un árbol de decisión heurístico. Su función es mapear un conjunto de **Variables** (Cursos) a un conjunto de **Dominios** (Franjas horarias y Aulas), respetando estrictamente un conjunto de **Restricciones** (Constraints).

Dado que el problema de la programación de recursos bajo restricciones cruzadas se ubica teóricamente en la clase **NP-Hard**, una simple universidad con 20 aulas, 50 cursos y 15 franjas horarias posibles arroja billones de combinaciones permutables. Probar este algoritmo (Solver) requirió inyectar cargas masivas de datos y asegurar no solo que el resultado fuera válido (0 choques), sino que el tiempo de resolución estuviera dentro de un espectro humanamente tolerable.

---

## 2. Metodología de Pruebas de Estrés Computacional (Load & Stress Testing)

A diferencia del Frontend o Backend, donde se evalúan códigos HTTP y elementos del DOM, las pruebas del Solver son puramente matemáticas y temporales. Se utilizó **Jest** ejecutado en modo síncrono para inyectar *Datasets* (conjuntos de datos JSON masivos) directamente en las funciones puras del algoritmo.

### 2.1 Herramientas Empleadas
- **Mocker de Entidades:** Faker.js (Para generar aleatoriamente 1000 docentes y 5000 asignaturas de prueba).
- **Benchmarking Interno:** `performance.now()` inyectado al inicio y final del worker para medir los deltas temporales (milisegundos) de procesamiento.
- **Aserción de Validaciones Puras:** Recorrido cíclico (Bucle for) sobre el horario resultante generado por el algoritmo, buscando cualquier colisión residual. Si existe un solo choque de aula a la misma hora, el Test explota (Fails).

---

## 3. Catálogo de Casos Críticos (Heurísticas de Validación)

El algoritmo se rige por un marco de 7 Restricciones Inflexibles (Hard Constraints). El éxito del Solver dependió de pasar al 100% las siguientes aserciones.

| ID Benchmark | Condición de Borde Evaluada (Edge Case Constraint) | Set de Datos Forzado | Aserción Matemática (Jest Expect) | Tiempo Delta Promedio |
|:---:|:---|:---|:---|:---:|
| **SOL-01** | **Unicidad Espacial (Ley del Impenetrabilidad):** Dos objetos físicos no pueden ocupar la misma aula en el mismo momento. | Array de 5 Cursos intentando acomodarse simultáneamente el Lunes de 08:00 a 10:00 en un catálogo de solo 4 aulas. | El Motor debe rechazar la asignación del 5to curso y buscar un nuevo slot (Backtracking). Resultado validado libre de colisiones de ID Aula. | 45 ms |
| **SOL-02** | **Teletransportación de Docente (Clonación Prohibida):** El Profesor X no puede estar enseñando Física en el Edificio A y Álgebra en el Edificio B al mismo tiempo. | Se asigna intencionalmente el mismo ID de Docente a dos cursos distintos con altísima prioridad. | El Motor debe iterar los bloques hasta lograr que ambas asignaturas caigan en días/horas distintos para el Profesor X. | 110 ms |
| **SOL-03** | **Segregación de Aforo de Seguridad:** El límite del salón dicta la viabilidad del curso. | Un curso de "Introducción a Sistemas" con 50 inscritos teóricos. Todas las aulas grandes están ocupadas; solo queda libre el Aula Z (Aforo 20). | El Motor descarta instantáneamente el Aula Z (podando esa rama del árbol) y continúa buscando, dejando el curso "No Asignado" si es estrictamente necesario, antes que violar la restricción de aforo. | 25 ms |
| **SOL-04** | **Restricción Personalizada (Disponibilidad de Horario):** Un profesor adjunto solicita laborar estrictamente en horario nocturno (18:00 - 22:00). | Array de preferencias donde `allowedSlots = [18:00, 20:00]`. | Se verifica que los objetos de resultado (Cursos Asignados) del profesor caigan un 100% dentro del dominio de su disponibilidad. | 10 ms |
| **SOL-05** | **Bucle de Inanición (Loop Infinito):** Inyección de un problema matemáticamente imposible de resolver (Sobresaturación absoluta). | 100 cursos para 1 sola Aula y 1 solo Docente. | El motor lanza un evento de "Max Iterations Reached" o "Unfeasible Problem" en lugar de congelarse e impactar el servidor Node.js. | 3,500 ms (Timeout intencional) |

---

## 4. Estrategia de Paralelismo (Node.js Worker Threads)

### 4.1 El Problema (Event Loop Blocking)
Durante el Sprint 2, una versión temprana del algoritmo fue integrada en el endpoint de la API REST. Cuando se inyectaban pruebas E2E desde Postman, el algoritmo tomaba unos 4 segundos en resolver. Durante esos 4 segundos, el servidor Express rechazaba a todos los demás usuarios. Esto se debía a que Node.js es de un solo hilo; si ese hilo está ocupado haciendo multiplicaciones matriciales, no puede atender peticiones de red (I/O).

### 4.2 La Solución Multihilo
La prueba definitiva del Solver consistió en separar el algoritmo puro en un archivo esclavo y mandarlo a llamar utilizando `Worker Threads`. 

**Test de Integración Multihilo (`worker.test.ts`):**
1. El test principal arranca un servidor de pruebas.
2. Lanza una orden masiva de generación de horarios (Payload de carga pesada).
3. Inmediatamente lanza una petición secundaria `GET /api/status`.
4. **Aserción:** Si la API devuelve un código `200 OK` instantáneamente antes de que el horario termine de generarse, la prueba es exitosa (El hilo principal demostró no estar bloqueado).

---

## 5. Veredicto Final de Eficiencia (Profiling)

Las métricas arrojadas por la suite de pruebas del Motor CSP demostraron una escalabilidad excelente. Tras aplicar técnicas avanzadas de optimización (Elegir primero las variables más difíciles de asignar o "Minimum Remaining Values"), el algoritmo logra resolver esquemas universitarios completos (cientos de restricciones) en milisegundos. Queda certificado para entrar a la rama de producción sin arriesgar la estabilidad del servidor maestro.
