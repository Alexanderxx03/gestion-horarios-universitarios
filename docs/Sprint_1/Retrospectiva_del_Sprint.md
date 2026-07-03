# Retrospectiva del Equipo - Sprint 1 (Scrum Retrospective)

**Fecha de Ejecución:** Viernes en la tarde de la Semana 2 del Sprint 1 (Post-Review).  
**Asistentes Habilitados:** Exclusivamente el Equipo de Desarrollo (Development Team) y el Scrum Master.  
*Nota Metodológica:* El Product Owner (Decano/Coordinador) tiene estrictamente prohibido asistir a esta reunión. Este es un espacio seguro (Safe Space) para que los programadores debatan fracasos técnicos sin presiones gerenciales ni represalias.

---

## 1. Naturaleza de la Retrospectiva (Inspect & Adapt)

La pregunta fundamental de esta sesión no es "¿Qué software construimos?" (Eso se discute en la Review), sino **"¿CÓMO lo construimos, y cómo podemos construirlo mejor y con menos fricción el próximo lunes?"**. Se aplicó la técnica de facilitación ágil: *Keep, Drop, Start* (Mantener, Descartar, Iniciar).

---

## 2. Análisis del Desempeño Operativo del Equipo

### 🟢 ¿Qué hicimos muy bien y debemos MANTENER (Keep)?
- **Acierto de Infraestructura:** La decisión (tomada por Alexander en el Sprint 0) de usar **Vite** en lugar de Webpack (Create-React-App) fue un éxito total. Los tiempos de compilación local (Hot Reloading) demoraban milisegundos, lo cual mantuvo a los desarrolladores del Frontend sin interrupciones. Mantendremos Vite como estándar sagrado.
- **Disciplina en Git:** Se respetó la política de ramas (Git Flow ligero). Nadie subió código roto a `main`. Todo entró por *Pull Requests* revisados por pares.

### 🔴 ¿En qué fracasamos y debemos DESCARTAR (Drop)?
- **Dolor en la Validación de Tipos:** El desarrollador Backend (Alexander) escribía los esquemas de Mongoose con ciertas reglas, pero el desarrollador Frontend (Jack Rojas) no se enteraba y enviaba JSONs al revés, causando errores 500 y horas de depuración en llamadas post-man.
  - *Medida de Mitigación:* Se descarta la técnica de "Hablar por Slack" para acordar el formato de JSON. Se declara ineficiente.

### 🟡 ¿Qué nueva práctica técnica debemos INICIAR (Start) en el Sprint 2?
- **Implementación de Fronteras de Tipado Duro:** Para arreglar el problema anterior, el equipo acordó utilizar un repositorio compartido (Shared Monorepo Folder) donde residirán las **Interfaces TypeScript**. Tanto el Frontend como el Backend importarán de ese mismo archivo. Si la interfaz cambia, el compilador de TS gritará un error automáticamente, previniendo bugs en producción.
- **Uso de Zod en Frontend:** Jack Rojas propuso comenzar a parsear la data de los formularios visuales con la librería `Zod` antes de enviarla a la API, para garantizar que un número viaje como número y no como cadena (String), aliviando la carga al Backend.

---

## 3. Salud Emocional y *Burnout*

El Scrum Master realizó un sondeo anónimo de energía mental (Clima Laboral):
- **Resultado:** El equipo reporta un nivel de fatiga Medio-Bajo (2/5). El ritmo es sostenible. No hubo necesidad de trabajar fines de semana ("Crunch Time"). La asignación de 29 Story Points demostró ser matemáticamente perfecta para nuestra capacidad real.

## 4. Firma del Acuerdo de Mejora Continua
El *Scrum Master* (Alexander) se compromete a supervisar que las medidas correctivas aquí descritas sean aplicadas en el Día 1 del **Sprint 2**. La reunión se da por concluida en 40 minutos exactos.
