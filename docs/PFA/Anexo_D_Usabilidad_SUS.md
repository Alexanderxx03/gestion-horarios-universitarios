# Anexo D - Usabilidad y Experiencia de Usuario (SUS)

## D.1 Metodología System Usability Scale (SUS)
Se aplicó el cuestionario estandarizado SUS a una muestra de 5 usuarios finales (Coordinadores Académicos y Estudiantes) tras solicitarles que interactuaran con el Builder de Horarios y el Módulo de Matrículas.

## D.2 Resultados Brutos

| Usuario | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Score SUS |
|---|---|---|---|---|---|---|---|---|---|---|---|
| U1 | 4 | 2 | 4 | 1 | 5 | 2 | 4 | 2 | 4 | 2 | 72.5 |
| U2 | 5 | 1 | 4 | 2 | 4 | 2 | 5 | 1 | 5 | 1 | 85.0 |
| U3 | 4 | 1 | 4 | 2 | 5 | 1 | 4 | 2 | 4 | 2 | 77.5 |
| U4 | 5 | 2 | 5 | 1 | 4 | 2 | 4 | 1 | 4 | 2 | 80.0 |
| U5 | 4 | 2 | 3 | 2 | 4 | 2 | 4 | 2 | 5 | 1 | 72.5 |

*El archivo en bruto se encuentra en [sus_resultados.csv](sus_resultados.csv).*

## D.3 Análisis de Resultados
- **Puntaje Promedio:** **77.5 / 100**
- **Interpretación:** Según la escala SUS, un puntaje mayor a 68 se considera por encima del promedio. Un 77.5 clasifica el sistema como "Bueno" con alta aceptabilidad en entornos de producción.
- **Puntos Fuertes (Q1, Q3, Q9):** Los usuarios encontraron el sistema intuitivo y afirmaron que les gustaría usarlo frecuentemente. No sintieron necesidad de soporte técnico (Q4=Bajo).
- **Puntos de Fricción (Q2, Q6):** Un usuario (U1) encontró ligeras inconsistencias en la terminología entre "Mallas" y "Ciclos".

## D.4 Plan de Acción y Mejoras UX
1. Estandarizar la glosario de términos en toda la aplicación.
2. Incorporar tooltips informativos (ej. al pasar el mouse por encima de una "franja ocupada").
3. Implementar un "Tour Guiado" para la primera vez que un coordinador intenta generar un horario.

## D.5 Evidencias

![Cuestionario SUS Google Forms](Capturas/FormularioSUS.png)
*Figura D.1: Pantallazo de la recolección de encuestas mediante Google Forms.*
