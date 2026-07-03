# Especificación de Requisitos y Casos de Uso

La arquitectura de este sistema está fuertemente basada en el **Spec-Driven Development**. Las reglas del negocio se modelan como un Problema de Satisfacción de Restricciones (CSP).

## 1. Reglas de Negocio (Constraints CSP)

El problema de generación de horarios consiste en asignar un conjunto de Variables (Cursos/Secciones) a un conjunto de Valores (Bloques de Tiempo + Aula) sin violar las reglas del sistema.

### Hard Constraints (Restricciones Duras)

Si una de estas reglas se rompe, el horario es matemáticamente inválido:

1. **Unicidad de Tiempo-Espacio:** Dos clases diferentes no pueden ocupar la misma aula física en el mismo bloque de tiempo.
2. **Disponibilidad del Docente:** Un docente no puede dictar dos cursos diferentes simultáneamente.
3. **Capacidad del Aula:** La cantidad de estudiantes inscritos en una sección no debe superar la capacidad máxima del aula asignada.
4. **Horario Hábil:** Todas las clases deben ocurrir dentro de los bloques de tiempo permitidos por la universidad (ej. 8:00 AM - 10:00 PM).

### Soft Constraints (Restricciones Blandas)

El motor intenta maximizar el cumplimiento de estas reglas para generar horarios _óptimos_, pero puede ignorarlas si no existe otra solución posible:

1. **Minimización de "Huecos" (Ventanas):** Minimizar el tiempo de espera inactivo de los estudiantes y docentes entre clases consecutivas.
2. **Preferencia de Turno:** Priorizar la asignación de horarios en el turno mañana, tarde o noche según la preferencia de la mayoría de estudiantes.
3. **Desplazamiento:** Minimizar la distancia física (si se mapean pabellones) entre clases consecutivas.

---

## 2. Especificación de Casos de Uso Principales

### CU-01: Autenticación Segura y Autorización

**Actor Principal:** Estudiante / Docente / Coordinador (Admin)
**Descripción:** El sistema debe verificar la identidad del usuario y redirigirlo a la interfaz correspondiente a su rol.

- **Flujo Principal:**
  1. El usuario accede a la plataforma web.
  2. Inicia sesión usando credenciales de Google o Correo/Contraseña.
  3. El sistema Firebase Auth verifica las credenciales.
  4. Una Cloud Function valida los **Custom Claims** (Rol de usuario) contra Firestore.
  5. El usuario accede al Dashboard dinámico.
- **Criterios de Aceptación:**
  - Las contraseñas se manejan encriptadas mediante Firebase Auth.
  - Accesos denegados si la cuenta está inhabilitada.

### CU-02: Generación del Horario Óptimo

**Actor Principal:** Coordinador Académico (Admin)
**Descripción:** El coordinador dispara el motor CSP para un semestre particular.

- **Flujo Principal:**
  1. El coordinador define el período académico.
  2. Presiona "Generar Horarios".
  3. La interfaz hace un HTTP Call a la Cloud Function `generateSchedule`.
  4. El motor corre el algoritmo _Backtracking_ con _MRV_.
  5. Se emite el resultado (éxito o las variables en conflicto).
- **Criterios de Aceptación:**
  - El tiempo de ejecución no debe sobrepasar el TimeOut de Cloud Functions.
  - El resultado debe cumplir el 100% de las Hard Constraints.

### CU-03: Validación de Pre-requisitos (Matrícula)

**Actor Principal:** Estudiante
**Descripción:** Un estudiante intenta matricularse en un curso y el sistema valida su progreso.

- **Reglas:** El motor verifica el historial académico en Firestore. Si el curso A es prerrequisito de B, y A no está aprobado, la transacción atómica es denegada.
