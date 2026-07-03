# Manual de Usuario y Operador del Sistema (UniHorarios)

## 1. Introducción y Arquitectura del Manual

Bienvenido al sistema **UniHorarios**. Este manual está diseñado como la guía oficial de referencia (Single Source of Truth) para interactuar con la plataforma gráfica de gestión de horarios universitarios. 

La herramienta no es una simple hoja de cálculo en la nube; opera sobre un potente motor de Inteligencia Artificial (CSP Heurístico) que automatiza las decisiones complejas, previniendo colisiones lógicas. En consecuencia, la plataforma es exigente respecto a la **calidad de los datos de entrada** (Garbage In, Garbage Out). Si la infraestructura base (aulas y reglas) es cargada incorrectamente, el motor matemático arrojará resultados inservibles.

Este manual está estratificado según los perfiles de usuario estipulados en el modelo de dominio.

---

## 2. Perfil Administrador de Sistemas (SysAdmin)

Este rol no gestiona la lógica del negocio universitario, sino el cascarón que lo contiene. Es el responsable de crear los perfiles raíz y garantizar que la instancia (Node.js/React) esté operando correctamente.

### 2.1 Mantenimiento de Maestros Base
- **Creación de Coordinadores:** 
  - *Navegación:* Menú Lateral Izquierdo > `[Panel de Seguridad]` > `[Gestión de Usuarios]`.
  - *Acción:* Pulsar el botón azul `(+ Nuevo Usuario)`. Asignar el Email Institucional del nuevo director, una contraseña temporal y seleccionar rígidamente el Rol `COORDINADOR`.
  - *Precaución:* Nunca asigne permisos globales de administrador a usuarios del negocio para prevenir borrados accidentales de colecciones enteras.

### 2.2 Gestión de Instalaciones (Infraestructura de Aulas)
El motor de horarios no puede crear salones mágicamente. Depende del catálogo que usted alimente.
- *Navegación:* Menú Lateral > `[Catálogos Maestros]` > `[Infraestructura]`.
- *Campos Críticos:* 
  - **Identificador Físico:** Ej. "Pabellón A - Aula 301".
  - **Aforo Máximo (Hard Constraint):** Este campo es de vida o muerte. Si se establece un aforo de 30 y un curso posee 35 inscritos, el algoritmo descartará esta aula para siempre, garantizando el cumplimiento de normas de Defensa Civil. Sea preciso.
  - **Tipología Especializada:** Indique si es "Laboratorio Computacional", "Laboratorio de Química" o "Aula Teórica Estándar".

---

## 3. Perfil Coordinador Académico (Core Business User)

El Coordinador es el director de la orquesta. Su misión es construir las Mallas (El *Qué* se enseña) y lanzar el Motor (El *Cuándo* y *Dónde* se enseña).

### 3.1 Construcción del Árbol de Conocimiento (Malla Curricular)
- *Navegación:* `[Académico]` > `[Gestión de Mallas Curriculares]`.
- *Procedimiento:*
  1. Pulse `[Añadir Asignatura]`.
  2. Defina la carga de "Créditos" (Que el sistema traduce automáticamente a horas físicas en bloque).
  3. Establezca las cadenas de Pre-requisitos. El Motor CSP requiere saber esto para garantizar que "Matemática I" se oferte antes que "Matemática II" en el modelo semestral, evitando que las horas choquen para los alumnos repitentes.

### 3.2 El Panel de Comando (Solver Dashboard)
Esta es el alma de UniHorarios. Es la interfaz que despierta a los Worker Threads de Node.js.
- *Navegación:* `[Orquestador]` > `[Generador Algorítmico]`.
- *Procedimiento y Estados de Interfaz:*
  1. Seleccione el Periodo Académico (Ej. Semestre 2026-II).
  2. Pulse el botón principal **"EJECUTAR MOTOR DE SATISFACCIÓN (CSP)"**.
  3. **¡Atención!** El sistema activará una rueda de carga (Spinner) y bloqueará la pantalla parcialemente (Modal Overlay). El algoritmo evaluará millones de estados. Este proceso dura típicamente entre 1.5 a 4 segundos. NO PRESIONE F5 NI RECARGUE LA PÁGINA.
  4. Si el motor falla, arrojará un Toast (Mensaje Rojo): *"Solución Imposible: Faltan aulas de alta capacidad para la escuela de medicina"*. Deberá relajar las reglas, crear más aulas virtuales, y volver a intentar.
  5. Si el motor triunfa, se renderizará el *Calendario Global (React Big Calendar)*, totalmente colorido.

### 3.3 Visualización y Exportación de Horarios
Una vez generado, usted puede navegar por el calendario semanal. Al hacer doble clic sobre un bloque (Ej. Sistemas Operativos), aparecerá una ventana detallando el Docente a cargo y el Edificio asignado. 
Puede pulsar en `[Exportar a PDF]` para enviar inmediatamente un reporte formateado y presentable a todos los correos registrados.

---

## 4. Perfil Docente (End-User Secundario)

El Docente utiliza el sistema en una modalidad limitada (Solo Lectura y Declaración Parcial).

### 4.1 Declaración de Disponibilidad (El Insumo del Motor)
- *Navegación:* `[Mi Espacio]` > `[Disponibilidad Semestral]`.
- *Acción:* 
  1. Se presentará una grilla vacía (Lunes a Sábado, 07:00 a 22:00).
  2. Con el ratón, el docente debe "Pintar" o arrastrar sobre las celdas en las que está dispuesto y físicamente habilitado a enseñar en el campus. Las celdas se teñirán de color verde (Soft-Select).
  3. Las celdas en blanco son consideradas por el sistema informático como "Celdas Muertas" (Hard Constraints). El Algoritmo de la Coordinación JAMÁS le asignará un curso en dichos horarios, incluso si eso significa que el curso se quede sin profesor titular. Por favor, sea responsable y flexible con sus declaraciones de tiempo.
  4. Pulse `[Guardar Disponibilidad]`. Este formulario se bloquea y se vuelve de solo lectura (Read Only) 15 días antes del inicio del semestre.
