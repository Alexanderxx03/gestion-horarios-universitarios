# Selección del Enfoque de Proyecto (Ciclo de Vida del Software)

## 1. El Dilema Inicial: Cascada vs. Ágil (Waterfall vs. Agile)

Todo proyecto de software en su etapa de concepción (Sprint 0) debe definir bajo qué reglas de juego se va a construir. Para el desarrollo del Motor CSP de UniHorarios, la mesa técnica y directiva debatió dos paradigmas dominantes:

1. **Enfoque Predictivo (Waterfall/Cascada):** Donde se invierten 3 meses documentando UMLs perfectos y 3 meses programando a ciegas sin mostrarle nada al cliente hasta el día del lanzamiento final.
2. **Enfoque Adaptativo (Agile/Scrum):** Donde se construye iterativamente, mostrando piezas del software funcional cada 2 semanas y corrigiendo el rumbo en base al *Feedback* constante.

---

## 2. Análisis del Nivel de Incertidumbre Técnica y de Requisitos

La Matriz de Stacey (Herramienta gerencial de complejidad) ayudó a tomar la decisión. Evaluamos dos variables:
- **Incertidumbre de Requisitos (El Qué):** Alta. Los coordinadores no estaban 100% seguros de todas las reglas de negocio. (Ej. ¿Se debe priorizar al docente de mayor edad o al aula más grande?). Estas reglas iban a mutar durante el desarrollo.
- **Incertidumbre Tecnológica (El Cómo):** Muy Alta. El equipo dominaba React y Mongoose, pero el núcleo algorítmico CSP para resolver el "Timetabling Problem" en Node.js era terreno inexplorado (Riesgo de explosión combinatoria, *Deadlocks*, *Stack Overflows*).

**Veredicto de la Matriz:** El proyecto se ubica en el cuadrante "Complejo" (Bordeando el Caos). Aplicar Waterfall aquí sería suicida; si el algoritmo fallaba en el mes 5, el proyecto quebraba. 

---

## 3. Decisión Estratégica: Adopción del Framework SCRUM

Se decidió oficialmente utilizar el marco de trabajo **SCRUM**, un framework empírico basado en iteraciones cortas llamadas *Sprints*. Esto proporciona tres pilares fundamentales que salvan la vida de los proyectos algorítmicos:
1. **Transparencia:** Todo el código y los problemas se hacen visibles diariamente.
2. **Inspección:** El cliente (Coordinador) verá y probará una interfaz funcional cada 14 días.
3. **Adaptación:** Si el Motor CSP se demuestra inviable matemáticamente en el Sprint 2, pivotaremos inmediatamente hacia algoritmos genéticos en lugar de esperar al Sprint final para lamentarlo.

---

## 4. Cadencia y Parámetros del Ciclo de Vida SCRUM adoptado

Para que el framework funcione, se establecieron "Reglas de Hierro" inquebrantables durante todo el ciclo de vida de desarrollo de UniHorarios:

### 4.1 Longitud del Iterativo (Sprint Duration)
- **Time-Box (Duración):** 2 semanas exactas (10 días laborables).
- *Justificación:* Un mes es demasiado tiempo sin feedback, y 1 semana es muy poco tiempo para lograr resolver problemas algorítmicos profundos. 14 días es el punto óptimo (Sweet Spot).

### 4.2 Definición de Terminado (DoD - Definition of Done)
En UniHorarios, una historia de usuario NO se considera "Terminada" cuando el programador dice "Funciona en mi máquina". Se considera terminada ÚNICAMENTE si cumple este *Checklist*:
1. El código fue subido a la rama `develop` mediante un Pull Request.
2. El código está cubierto por pruebas unitarias en Jest (> 70% Coverage).
3. No posee advertencias *Code Smell* de nivel Crítico en el reporte de SonarQube.
4. El Product Owner revisó la pantalla y firmó la aceptación funcional.

### 4.3 Rituales Obligatorios (Ceremonias Scrum)
- **Sprint Planning (Planificación):** 4 horas, el primer lunes de cada Sprint. El equipo decide a qué historias se compromete leyendo el Backlog.
- **Daily Scrum (La Diaria):** 15 minutos, todos los días a las 09:00 AM. 3 Preguntas de rigor: ¿Qué hice ayer? ¿Qué haré hoy? ¿Qué me bloquea?
- **Sprint Review (Revisión):** 2 horas, el último viernes del Sprint. Se invita a los Decanos a ver el software corriendo en vivo (Demo). Prohibidas las diapositivas; solo código real.
- **Sprint Retrospective (Retrospectiva):** 1.5 horas, el último viernes (Solo el equipo técnico). Reunión privada para hacer catarsis, discutir por qué falló el despliegue y cómo mejorar en el siguiente Sprint sin buscar culpables.

---

## 5. El Rol Crítico del *Technical Spike* en la Algoritmia

En Scrum, cuando hay una historia de usuario tan misteriosa y compleja que el equipo no sabe ni cuántas horas tomará (Ej. *Crear el Solver Matemático CSP*), no se estima de inmediato. 

El Enfoque de este proyecto dictaminó que se utilizarán **Spikes (Incursiones Técnicas)**. Un Spike es una investigación pura; el programador tiene, por ejemplo, 3 días (Time-boxed) para encerrarse a leer *Papers* académicos sobre heurísticas y desarrollar un prototipo sucio. Una vez descartada la incertidumbre, el conocimiento regresa al Backlog para ser estimado y programado propiamente con arquitectura limpia.
