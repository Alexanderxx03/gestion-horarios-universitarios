# Selección del Enfoque del Proyecto

## 1. Contexto y Naturaleza del Problema
El sistema de generación de horarios académicos nos sitúa frente a un **Problema de Satisfacción de Restricciones (CSP)** y de optimización combinatoria. Debido a las múltiples variables involucradas (estudiantes, docentes, aulas, franjas horarias) y a una serie de restricciones duras (no solapamiento, topes de créditos) y blandas (preferencias), el problema califica inherentemente como un problema de ingeniería complejo. No existe una solución analítica trivial, por lo que requiere estrategias de búsqueda heurística.

## 2. Enfoque Metodológico: Ágil (Scrum)
Se ha seleccionado **Scrum** como marco de trabajo ágil para el desarrollo del software.

**Justificación:**
- **Incertidumbre y adaptabilidad:** Al lidiar con variables parcialmente definidas o cambiantes en los planes de estudio y currículos flexibles, Scrum permite reaccionar e iterar sprint tras sprint.
- **Entregas incrementales:** Generar resultados tempranos del algoritmo (ej. probar primero un modelo con restricciones básicas, e ir sumando heurísticas complejas) minimiza los riesgos técnicos.
- **Iteración y validación:** Permite incorporar el feedback constante de directores y estudiantes con impacto inmediato.

## 3. Enfoque Tecnológico
Se desarrollará bajo una arquitectura de software moderna **SPA + API REST**.

**Justificación del Stack:**
- **Frontend (Interfaz de Usuario):** React (arquitectura SPA). Garantiza interactividad inmediata, lo que es vital para la manipulación y visualización de grillas de horarios que contienen gran densidad de datos. Se usará Vanilla CSS estructurado estéticamente para construir una interfaz moderna e inclusiva y cumplir los criterios WCAG.
- **Backend (API REST):** Node.js proporcionando una API sólida, consumiendo menos recursos mediante la ejecución asíncrona no bloqueante (favoreciendo el enfoque Green Software).
- **Procesamiento CSP:** Implementación nativa de algoritmos de _Backtracking Search_ con variables de satisfacción de restricciones optimizadas en memoria.
- **Persistencia de Datos:** Uso de bases relacionales de integración rápida (como SQLite/PostgreSQL) dadas las uniones directas requeridas entre entidades (Asignatura -> Aula -> Profesor).
