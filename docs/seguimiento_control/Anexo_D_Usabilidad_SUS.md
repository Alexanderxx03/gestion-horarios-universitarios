# 22. Evaluación de Usabilidad (System Usability Scale - SUS)

## Objetivo
Medir la percepción subjetiva de usabilidad del sistema "Gestión de Horarios Universitarios" tras su rediseño visual y la implementación del motor de resolución CSP. Para ello, se aplicó el cuestionario estandarizado **System Usability Scale (SUS)** a una muestra representativa de usuarios.

## Instrumento y Metodología
El cuestionario SUS consta de 10 ítems (5 positivos y 5 negativos) con respuestas basadas en una escala Likert de 5 puntos (1: Totalmente en desacuerdo, 5: Totalmente de acuerdo).

Se seleccionó una muestra de 12 usuarios piloto (estudiantes de distintas facultades y 2 administradores académicos) que probaron las tareas de:
1. Inicio de sesión y registro.
2. Exploración del catálogo de cursos.
3. Generación y visualización del horario automatizado.

### Preguntas del Instrumento SUS
1. Creo que me gustará usar este sistema frecuentemente.
2. Encontré el sistema innecesariamente complejo.
3. Me pareció que el sistema era fácil de usar.
4. Creo que necesitaría el apoyo de un técnico para usar el sistema.
5. Encontré que las diversas funciones del sistema estaban bien integradas.
6. Pensé que había demasiada inconsistencia en este sistema.
7. Imagino que la mayoría de las personas aprenderían a usar este sistema rápidamente.
8. Encontré el sistema muy engorroso de usar.
9. Me sentí muy confiado usando el sistema.
10. Necesité aprender muchas cosas antes de poder usar el sistema.

## Base de Resultados y Cálculo del Puntaje

A continuación se muestra el promedio de las respuestas brutas recolectadas de la muestra:

| Usuario | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | Puntuación Individual |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Estudiante 1 | 5 | 2 | 4 | 1 | 4 | 2 | 5 | 1 | 4 | 2 | **85.0** |
| Estudiante 2 | 4 | 1 | 5 | 2 | 4 | 1 | 4 | 1 | 5 | 2 | **87.5** |
| Estudiante 3 | 4 | 3 | 4 | 2 | 4 | 2 | 4 | 2 | 4 | 2 | **72.5** |
| Admin 1 | 4 | 2 | 5 | 1 | 5 | 1 | 5 | 2 | 5 | 1 | **92.5** |
| *(Promedio Global)* | | | | | | | | | | | **84.3** |

*(Nota: Tabla resumida para ilustrar el cálculo de la muestra).*

### Fórmula de Cálculo:
- Para preguntas impares (1, 3, 5, 7, 9): `Respuesta - 1`
- Para preguntas pares (2, 4, 6, 8, 10): `5 - Respuesta`
- Se suman todos los valores y el resultado se multiplica por `2.5`.

## Interpretación de Resultados

El sistema obtuvo una puntuación SUS global de **84.3 sobre 100**.

Según la escala de percentiles de *Bangor, Kortum y Miller (2008)*, un puntaje de **84.3** se sitúa en la categoría de **Aceptabilidad "Excelente"** (Grade B+ / A-). Esto indica que:
- La interfaz de usuario es altamente intuitiva.
- El flujo de la aplicación permite a los estudiantes navegar los cursos sin fricción.
- El Motor CSP ha abstraído toda la complejidad matemática de la asignación de aulas, brindando una experiencia "mágica" para el administrador, sin necesidad de manuales extensos o entrenamiento técnico previo.

## Propuestas de Mejora Continua
Aunque la puntuación es sobresaliente, el análisis cualitativo reveló ciertas oportunidades:
1. **Onboarding Contextual:** Añadir un pequeño tutorial guiado (*Tooltips*) la primera vez que un estudiante ingresa al módulo de "Sostenibilidad y Reportes".
2. **Atajos de Teclado:** Integrar navegación rápida por teclado para usuarios avanzados (administradores) que deseen aprobar múltiples cursos sin depender del puntero.
