# Informe de Estado del Proyecto - Cierre Sprint 3

**Fecha de Corte (Status Date):** Viernes de la Semana 2 del Sprint 3  
**Preparado por:** Alexander (Scrum Master / Lead Dev)  
**Audiencia (To):** Patrocinadores y Equipo de Desarrollo

## 1. Resumen Ejecutivo de Avance (Executive Summary)

El Sprint 3 fue calificado desde su inicio como el "Punto de Falla Crítica". Se logró vencer el obstáculo matemático más grande de todo el proyecto: El Algoritmo Heurístico CSP (*Constraint Satisfaction Problem*). A partir de hoy, UniHorarios ya no es un simple CRUD de base de datos, sino un motor de inteligencia artificial operativa.

**El Proyecto se encuentra en estado VERDE MENTA (Saludable, con advertencias menores de estrés).**

- **Velocidad Lograda (Burned Points):** 34/34 Story Points. (Sobreesfuerzo).
- **Salud del Equipo:** Nivel de Fatiga Alto. El programador Backend invirtió ciclos cognitivos profundos para refactorizar la lógica algorítmica tras el descubrimiento del Incidente INC-001 (Colapso del Event Loop).

---

## 2. Logros Técnicos y Bloqueadores Vencidos (La Batalla del Worker)

El hito central del proyecto se completó tras sortear desafíos de infraestructura masivos.

1. **El Motor CSP (Núcleo Terminado):** El algoritmo es capaz de analizar disponibilidad docente, aforo de aulas, cruce de mallas curriculares y restricciones de teoría/práctica de manera simultánea.
2. **Mitigación del Bloqueador (Incident-001):** Durante el día 4, al intentar probar el motor con los datos de 50 aulas (1200 alumnos), el servidor de Node.js se congeló (Time-out de 60 segundos). La API dejó de responderle a todos los usuarios del sistema por estrangulamiento de CPU (Event Loop Blocking).
   - *Solución Definitiva:* Alexander orquestó una refactorización de hilos (Threading). Envolvió la función del CSP utilizando el módulo nativo `worker_threads` de Node. Ahora, el hilo principal de la web atiende requests instantáneamente (10ms) mientras un Hilo Hijo silencioso mastica los números matemáticos en el fondo y envía un mensaje al terminar.
3. **Poda Heurística MRV:** Para evitar que el hilo hijo se quedara horas calculando, se implementó la heurística *Minimum Remaining Values*. El motor procesa primero a los docentes con MENOS tiempo disponible, llenando las celdas más críticas, reduciendo el tiempo de cálculo de 2 minutos a un promedio brutal de **1.2 Segundos**.
4. **Drag & Drop (Frontend):** Jack Rojas terminó la grilla interactiva. Los profesores ya pueden ingresar desde sus móviles y "pintar" arrastrando el dedo para indicar las horas en las que aceptan dictar clases.

---

## 3. Pruebas de Calidad E2E (El Cruce de la Muerte)

Ayer Jueves por la madrugada, el equipo técnico simuló en la base de datos de Staging una situación límite (*Edge Case*): Forzamos a que 3 profesores dicten la misma asignatura en la misma hora, con un aforo de 100 estudiantes y solo habilitamos aulas de 30 sillas.
- **Resultado del Test:** En lugar de colapsar o intentar inventar clases superpuestas (Bugs catastróficos), el sistema arrojó cortésmente un código de error controlado: `"Status 409 Conflict: Infactibilidad Matemática. Faltan 70 sillas físicas en la Sede A en la franja horaria demandada"`.
- **Conclusión de Calidad:** La confiabilidad matemática del sistema (Cero colisiones permitidas) superó el Criterio de Éxito de los OKR.

---

## 4. Proyección hacia el Sprint 4 (El Sprint Final)

Habiendo domado a la bestia (CSP), el Sprint 4 será un paseo de estabilización y pulido estético.
Nos concentraremos en conectar los resultados brutos JSON del backend a la hermosa grilla visual `React-Big-Calendar`, y activaremos la funcionalidad de Exportación a PDF (Cerrando la historia de la secretaria académica). Asimismo, se auditarán las vulnerabilidades de SonarQube para lograr el pase oficial a Producción.
