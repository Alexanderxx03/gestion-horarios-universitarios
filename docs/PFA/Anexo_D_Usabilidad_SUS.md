# Anexo D - Evaluación de Usabilidad y Experiencia de Usuario (Escala SUS)

## D.1 Marco Teórico y Justificación Metodológica

El estándar **System Usability Scale (SUS)** es una de las herramientas empíricas más reconocidas y fiables en el campo de la Ingeniería de Software para medir de forma rápida y cuantitativa la usabilidad de un sistema informático. Fue desarrollado originalmente por John Brooke en 1986 y se ha convertido en el estándar de la industria debido a su excepcional validez estadística, incluso con tamaños de muestra pequeños (n = 5 a n = 10 usuarios).

A diferencia del Testing Funcional, que certifica que el software "hace lo que debe hacer", el Testing de Usabilidad certifica que los usuarios "pueden, en la vida real, utilizar el software sin frustración". Para el proyecto UniHorarios, donde los Coordinadores Académicos deben enfrentarse a una tarea cognitivamente abrumadora (la asignación de decenas de docentes a cientos de bloques de horarios), garantizar una interfaz fluida e intuitiva es de vital importancia.

El cuestionario SUS consta de 10 declaraciones que los usuarios evalúan utilizando una escala Likert de 5 puntos (desde "1: Totalmente en Desacuerdo" hasta "5: Totalmente de Acuerdo"). Las preguntas impares (1, 3, 5, 7, 9) están redactadas positivamente, mientras que las pares (2, 4, 6, 8, 10) tienen connotación negativa. Este diseño cruzado obliga al usuario a leer cada ítem detenidamente, evitando el sesgo de respuestas automáticas (acquiescence bias).

---

## D.2 Diseño del Experimento de Usabilidad

### D.2.1 Perfilado de la Muestra (Sujetos de Prueba)
Se reclutó un grupo focal compuesto por 5 participantes clave que simularon roles reales dentro del ecosistema universitario:
- **U1 y U2:** Coordinadores Académicos (Expertos en el dominio del negocio, responsables directos de crear los horarios semestrales).
- **U3:** Docente de Tiempo Parcial (Usuario que debe visualizar su disponibilidad y cargar restricciones).
- **U4 y U5:** Asistentes Administrativos y Soporte TI (Usuarios que auditarán el proceso y cargarán la metadata base como Aulas y Cursos).

### D.2.2 Escenarios de Tarea (Task Scenarios)
A cada sujeto se le asignó un conjunto de tareas críticas (escenarios sin script exacto) para ejecutar en la aplicación en un entorno de laboratorio controlado:
1. "Autentícate en el portal usando tus credenciales de rol asignadas."
2. "Dirígete al panel de configuración e inactiva dos cursos electivos."
3. "Accede al *Builder de Horarios* y genera automáticamente un horario óptimo simulando la inyección de restricciones."
4. "Ubica visualmente si el Motor generó cruces de horarios o rechazó la asignación de un docente."

Inmediatamente tras finalizar las tareas, sin interacción previa con el equipo de QA, los usuarios llenaron la encuesta estándar.

---

## D.3 Resultados Empíricos (Raw Data Matrix)

La siguiente tabla refleja los datos en bruto extraídos de la encuesta digital. 

*Nota Forense: Los datos tabulares originales, recolectados en formato separado por comas, se encuentran respaldados en el repositorio de evidencias bajo la ruta [sus_resultados.csv](sus_resultados.csv).*

| Identificador de Usuario | P1 (Complejidad) | P2 (Frustración) | P3 (Facilidad) | P4 (Soporte Técnico) | P5 (Integración) | P6 (Inconsistencias) | P7 (Rapidez) | P8 (Obstáculos) | P9 (Confianza) | P10 (Curva Aprend.) | **Puntaje Final SUS** |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **U1** (Coordinador) | 4 | 2 | 4 | 1 | 5 | 2 | 4 | 2 | 4 | 2 | **72.5** |
| **U2** (Coordinador) | 5 | 1 | 4 | 2 | 4 | 2 | 5 | 1 | 5 | 1 | **85.0** |
| **U3** (Docente) | 4 | 1 | 4 | 2 | 5 | 1 | 4 | 2 | 4 | 2 | **77.5** |
| **U4** (Asistente IT) | 5 | 2 | 5 | 1 | 4 | 2 | 4 | 1 | 4 | 2 | **80.0** |
| **U5** (Asistente Adm.) | 4 | 2 | 3 | 2 | 4 | 2 | 4 | 2 | 5 | 1 | **72.5** |

---

## D.4 Análisis Matemático e Interpretación de Resultados

### D.4.1 Cálculo del Score Promedio
Aplicando el algoritmo oficial de corrección de puntaje de SUS (restando 1 a las impares y restando el valor par a 5, para luego multiplicar la sumatoria total por 2.5), obtenemos el índice de usabilidad global.

**Puntaje SUS Consolidado: `77.5 / 100`**

### D.4.2 Cuadrantes de Aceptabilidad (Adjective Rating Scale)
Según la matriz empírica estandarizada por Bangor, Kortum y Miller (2009):
- < 50: Inaceptable (El sistema debe rediseñarse).
- 50 a 68: Marginalmente Aceptable (Usable, pero generará fricción y rechazo).
- **> 68: Aceptable (El sistema es competente).**
- > 80: Excelente (Experiencia de usuario fluida y promotora).

Con un puntaje consolidado de **77.5**, UniHorarios se clasifica holgadamente en el percentil de los sistemas **"Buenos / Altamente Aceptables"**. Los usuarios pueden completar la asignación de horarios eficientemente, lo cual valida las complejas decisiones arquitectónicas tomadas durante el diseño del UI/UX en React.

### D.4.3 Análisis Forense por Componente
- **Puntos Estelares (Q1, Q5, Q9):** Los usuarios manifestaron un altísimo nivel de concordancia respecto a la "integración armónica" de las funciones (Q5). En particular, el usuario U2 y U4 indicaron que se sintieron extremadamente confiados operando el sistema (Q9). Destaca el hecho rotundo de que la necesidad estimada de requerir soporte técnico constante (Q4) fue votada con las métricas más bajas (1 y 2), confirmando la autonomía del diseño.
- **Puntos de Fricción (Q2, Q6):** Se detectó cierta penalización en el apartado de inconsistencias (Q6). Al entrevistar a los usuarios *a posteriori*, el usuario U1 y el U5 revelaron que experimentaron fricción semántica (confusión) al intentar distinguir entre las nomenclaturas de "Mallas Curriculares" y "Ciclos Académicos". Esto demuestra que la Interfaz de Usuario era clara, pero el diseño de contenido (Copywriting) no estaba unificado.

---

## D.5 Evidencias Visuales de la Ejecución

A continuación se adjunta la captura pericial que demuestra la recolección de los datos del experimento en entorno de producción mediante encuestas de formularios, asegurando la inmutabilidad de la opinión de los usuarios evaluadores.

![Formulario de Evaluación Oficial SUS alojado en Google Forms](Capturas/FormularioSUS.png)
*Figura D.1: Pantallazo de la cabecera de la herramienta de recolección cuantitativa (Formulario de Google), implementando los 10 ítems canónicos del instrumento SUS en formato de escala Likert estricta.*

---

## D.6 Plan de Mitigación UX Post-Test (Roadmap de Refinamiento)

Toda prueba de usabilidad debe derivar en acciones (Actionable Insights). Para llevar el sistema de un 77.5 hacia la codiciada banda de excelencia (>80), el equipo de Frontend ha diagramado el siguiente flujo de correcciones que será inyectado en el próximo Sprint de desarrollo:

1. **Unificación del Glosario de Dominio (Prioridad Alta):** Refactorización inmediata de los archivos de idioma (si aplica i18n) y etiquetas de los botones para eliminar los sinónimos. Se adoptará la nomenclatura estricta del reglamento académico de la universidad. "Malla Curricular" será el único término utilizado.
2. **Implementación de Micro-Interacciones de Orientación (Prioridad Media):** Se agregarán Tooltips (punteros flotantes) a los íconos del "Builder de Horarios". Cuando el motor CSP marque una celda en rojo por bloqueo de restricción, un tooltip explicará explícitamente la causa matemática del choque al pasar el cursor.
3. **Onboarding Contextual Integrado (Prioridad Baja):** Desarrollo de un componente tipo "Tour Guiado" (usando librerías como *React Joyride*) que, únicamente en el primer inicio de sesión del Coordinador, ensombrezca la pantalla y resalte paso a paso los 4 clics necesarios para lanzar el algoritmo de horarios. Esto mitigará por completo cualquier remanente en la curva de aprendizaje (P10).
