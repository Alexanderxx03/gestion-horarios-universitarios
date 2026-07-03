# Visión, Misión y Descripción General del Proyecto (UniHorarios)

## 1. El Problema de Negocio (Business Case)

Las instituciones de educación superior enfrentan un problema combinatorio de alta complejidad conocido en el estado del arte computacional como *Timetabling Problem* (Problema de Generación de Horarios). Actualmente, en la Escuela de Ingeniería de Sistemas, la asignación de horarios se realiza de forma empírica y manual. Dos coordinadores académicos se encierran durante un mes completo con macros de Microsoft Excel para intentar encajar cientos de variables:

1. **Variables Humanas:** Disponibilidad cambiante de más de 80 docentes (Nombrados, Contratados, Medio Tiempo).
2. **Variables Físicas:** Capacidad y disponibilidad de más de 30 aulas (Laboratorios de cómputo, anfiteatros, aulas teóricas).
3. **Variables Académicas:** Mallas curriculares con cruces de pre-requisitos (Ej. Un alumno debe poder cursar "Programación I" en la mañana sin que cruce con "Matemática Discreta").

El proceso manual es altamente susceptible al error humano (Shadow IT). Frecuentemente se generan colisiones fantasma (Dos profesores asignados a la misma aula a la misma hora), originando fricciones administrativas en la primera semana de clases, y provocando que los estudiantes no puedan matricularse en los cursos que requieren para egresar a tiempo.

---

## 2. Declaración de la Visión (Vision Statement)

> **"Transformar la pesadilla administrativa de la generación de horarios en un proceso computacional invisible, fluido y matemáticamente perfecto."**

Para el **Cuerpo Directivo**, UniHorarios será un motor de inteligencia artificial heurística que procesará restricciones complejas en milisegundos, liberando 30 días-hombre de esfuerzo administrativo cada semestre.
Para el **Plana Docente**, UniHorarios será un portal web intuitivo y amigable donde podrán declarar sus disponibilidades horarias desde su teléfono móvil sin intercambiar cadenas interminables de correos electrónicos.
Para el **Estudiante**, UniHorarios será la garantía invisible de que sus cursos ofertados jamás sufrirán solapamientos ilógicos, asegurando una trayectoria académica limpia hacia su graduación.

---

## 3. Descripción y Alcance del Producto (Product Scope)

El proyecto consistirá en el desarrollo, despliegue y puesta en marcha de una plataforma web (Single Page Application) basada en la nube. 

### 3.1 Dentro del Alcance (In-Scope)
El MVP (Minimum Viable Product) que se entregará al final de los Sprints incluirá estrictamente:
- **Módulo de Ingreso de Datos (Data Entry):** Panel CRUD (Create, Read, Update, Delete) para gestionar Aulas, Cursos y Profesores.
- **Módulo de Disponibilidad Docente:** Interfaz gráfica de calendario (*Drag and Drop*) para que los profesores declaren sus horas hábiles.
- **Módulo Central de Resolución (El Motor CSP):** Algoritmo matemático implementado en Node.js capaz de ingerir las restricciones (Hard & Soft Constraints) y escupir un horario óptimo sin colisiones.
- **Módulo de Visualización y Exportación:** Grilla visual codificada por colores que permita al coordinador auditar el resultado y exportarlo a formato PDF para su publicación en las carteleras de la facultad.

### 3.2 Fuera del Alcance (Out-of-Scope)
Para proteger el cronograma (Time-boxing) y evitar el temido *Scope Creep* (Inflación del alcance), queda estrictamente prohibido incluir en este proyecto:
- **Módulo de Matrícula Estudiantil:** Los alumnos no usarán esta plataforma para inscribirse a sus clases (Eso lo maneja el ERP de la universidad). Esta plataforma es solo para *Crear la Oferta Horaria*.
- **Control de Asistencia:** No se medirá si el profesor llegó a dictar su clase.
- **Pagos y Planillas:** El sistema no calculará cuánto se le debe pagar al profesor por sus horas dictadas.

---

## 4. Criterios de Éxito y OKRs (Objectives and Key Results)

¿Cómo sabremos que el proyecto fue un éxito cuando lleguemos al final del Sprint 4?
1. **OKR de Velocidad Operativa:** El tiempo que le toma a Coordinación Académica generar un horario semestral válido debe reducirse de 30 días laborables a un máximo de **3 días laborables** (Incluyendo recolección de disponibilidades y revisión).
2. **OKR de Fiabilidad Matemática:** El algoritmo (Motor CSP) debe garantizar una tasa de **0.0% colisiones (Cero Cruces)** en las asignaciones de aulas y docentes.
3. **OKR de Rendimiento Web:** El cálculo masivo del algoritmo no debe paralizar el servidor por más de **15 segundos** (Threshold de Timeout).
4. **OKR de Adopción (Usabilidad):** El 90% de los docentes registrados deberán poder ingresar sus disponibilidades horarias en el sistema sin solicitar ayuda técnica (Mesa de Ayuda).

---

## 5. El Contexto Tecnológico (Tech Stack Vision)
El sistema nacerá como una solución nativa de la nube (Cloud-Native).
Se abandonarán tecnologías heredadas (PHP, Java JSP) en favor de un Stack MERN moderno (MongoDB, Express, React, Node.js) potenciado con TypeScript para garantizar el tipado estricto del complejo modelo de datos.
Esta decisión estratégica asegura que el código resultante podrá ser mantenido por las futuras generaciones de estudiantes de Ingeniería de Sistemas de la propia facultad, cerrando un círculo virtuoso de transferencia tecnológica.
