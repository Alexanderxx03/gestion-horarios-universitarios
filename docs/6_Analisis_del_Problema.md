# Documento Inicial del Problema (Borrador)

## 1. Identificación del Problema Central
La planificación y construcción manual de cuadrículas de horarios académicos bajo modalidades de un currículo universitario híbrido o flexible ha evolucionado hasta convertirse en una tarea de inmensas proporciones que fácilmente excede la capacidad analítica humana frente al factor tiempo y coste. 

Tratar de compatibilizar libremente la intención de selección de un estudiante frente a los tiempos limitados de los catedráticos deriva inevitablemente en problemas clásicos: ocupación múltiple de un aula u hora de un profesor que no detentan el don de la ubicuidad, y retrasos prolongados en publicación académica, frenando a la universidad en su escalabilidad.

## 2. Naturaleza y Caracterización de "Problema Complejo"
El PFA asume la envergadura y características propias de la ingeniería de sistemas compleja por:
* **Falta de solución evidente trivial:** No es calculable de inmediato y a veces la demanda es mayor que los huecos físicos; exige modelar abstraídamente una situación real y decidir "quién cede" si las restricciones llegan a límites duros.
* **Ambigüedades naturales:** Existen normativas académicas implícitas, prerrequisitos en constante discusión que agregan un nivel de inestabilidad que obliga a plantear flexibilidad parametrizable en el diseño del software.
* **Componentes altamente interdependientes:** Cualquier alteración minúscula en cualquier lugar del entramado del horario (mudar un profesor a un día diferente) crea una disrupción colateral en toda la malla, causando colisiones sucesivas.

## 3. Mapeo Inicial hacia Formulación Lógica
El diseño propuesto aborda el desafío convirtiéndolo en su pilar axiomático en un **Problema de Satisfacción de Restricciones (CSP)** de combinatoria analizando:
1. **Variables ($V$):** Un curso específico junto al sub-grupo prematriculado requerido.
2. **Dominio ($D$):** Las combinatorias finitas de _Espacio (Aula)_ interrelacionado al vector _Tiempo (Franja horaria)_.
3. **Restricciones ($C$):** 
  - Restricciones Duras inquebrantables (ej., no cruce, límite de 20 a 22  créditos, secuenciación aprobada, docente único disponible y espacio material limitante del salón).
  - Restricciones Blandas de bienestar (ej., minimizar "huecos" u horas vacías prolongadas o inmensa carga continua de dictado).

## 4. Actores Identificados (Stakeholders)
1. **Estudiantes:** Beneficiarios principales, restringidos y exigentes sobre tiempos vacíos.
2. **Docentes:** Actores condicionales limitados por el abanico fraccional de horas.
3. **Coordinadores Académicos y Administradores:** Usuarios controladores del catálogo y de la métrica operativa para viabilización de semestre.
