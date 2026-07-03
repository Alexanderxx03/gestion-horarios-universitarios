# Documento Inicial de Factibilidad y Arquitectura (Concept Document)

## 1. Naturaleza de este Documento

Antes de invertir el presupuesto autorizado (Project Charter) o escribir la primera línea de código de un Sprint, el equipo técnico debe responder a una pregunta existencial: **¿Es este proyecto tecnológicamente y financieramente factible?**

El *Documento Inicial* condensa las sesiones exploratorias del Sprint 0, traduciendo el caos y los "deseos" de la alta dirección en un boceto crudo (Blue-print) de arquitectura de software y validación de viabilidad. Si este documento concluye que no existen servidores en el mundo capaces de resolver el algoritmo a un costo accesible, el proyecto debe ser abortado preventivamente.

---

## 2. Estudio de Factibilidad (Feasibility Analysis)

### 2.1 Factibilidad Técnica (Technical Viability)
- **Reto:** El "Timetabling Problem" es un problema de categoría *NP-Hard* en la teoría de la complejidad computacional. Explorar todas las permutaciones en un árbol de decisión de 100 profesores y 50 aulas tomaría siglos en una computadora tradicional si se hace por fuerza bruta.
- **Solución Propuesta:** No usaremos fuerza bruta. Implementaremos un "Constraint Satisfaction Problem (CSP)" en Node.js, apoyado en heurísticas de Poda y Backtracking (Específicamente el algoritmo *Minimum Remaining Values* - MRV). Esto recortará ramas inútiles del árbol casi al instante.
- **Conclusión Técnica:** Es altamente viable si y solo si se aísla el cálculo matemático del Event Loop de Node (Evitando el bloqueo del servidor web) mediante la API nativa de `worker_threads`.

### 2.2 Factibilidad Económica (Financial Viability)
- **Reto:** El presupuesto es limitado. Comprar licencias de software comercial de gestión horaria como *Untis* o *ASC Timetables* costaría miles de dólares en subscripciones anuales eternas, estrangulando las arcas de la facultad. Adicionalmente, hospedar algoritmos de CPU intensivo en AWS EC2 elevaría la factura mensual (OPEX).
- **Solución Propuesta:** Software "Hecho a la Medida" (In-house) utilizando un stack MERN de código abierto (0$ en licencias). Despliegue en PaaS educativos/gratuitos: MongoDB Atlas (Tier M0) para datos, Vercel Edge para estáticos y Render.com Web Services para el Backend Node.
- **Conclusión Económica:** Proyecto ultra-rentable. La inversión se amortiza (ROI) en 1 semestre de horas-hombre administrativas ahorradas.

---

## 3. Topología de Arquitectura Propuesta (High-Level Architecture)

El sistema nacerá desacoplado desde el primer commit. Monolitos tradicionales están prohibidos. La solución operará bajo un modelo Cliente-Servidor (API RESTful sin estado).

### Capa de Presentación (Frontend SPA)
- **Librería Core:** React 18+.
- **Herramienta de Construcción:** Vite (Reemplazo moderno y ultrarrápido de Webpack/CRA).
- **Estilos y UX:** Tailwind CSS V3 para asegurar accesibilidad WCAG y *Dark Mode* nativo con coste de performance casi nulo.
- **Gestión de Estado (State Management):** Zustand (Librería minimalista sin el Boilerplate de Redux).
- **Validación Zod:** Para parsear y tipar fuertemente todo JSON antes de enviarlo por Axios.

### Capa Lógica y API (Backend)
- **Entorno:** Node.js v20 (LTS).
- **Framework REST:** Express.js (Con inyección estricta de CORS y Helmet para mitigación OWASP).
- **El Cerebro (El Worker):** Un sub-proceso escrito en TypeScript puro que recibirá la matriz de clases, la calculará en el background utilizando CPU al 100%, y enviará la matriz resuelta de vuelta al hilo de Express mediante IPC (Inter-Process Communication).

### Capa de Persistencia de Datos (Database)
- **Motor:** MongoDB (NoSQL).
- **ODM:** Mongoose v7+. Proveerá esquemas rígidos (Schemas) y validaciones pre-guardado para asegurar que nadie intente meter un curso de 0 créditos en la base de datos.
- **Razón del NoSQL:** Los "Horarios Resueltos" son matrices extremadamente anidadas (Días > Horas > Cursos > Aulas). Mapear esto en una base SQL tradicional requeriría 5 tablas intermedias y lentísimos *JOINs*. En Mongo, un horario es simplemente un Documento BSON profundo leído en 10 milisegundos.

---

## 4. Estructura Crítica del Modelo de Dominio (Domain Driven Design)

Para que el Motor CSP comprenda el universo, debe alimentarse de estos "Agregados de Datos" que formarán nuestras colecciones en MongoDB:

1. **`User` (Usuario/Docente):** Posee correo, hash de password bcrypt, un Rol Enum `['ADMIN', 'DOCENTE']`, y una matriz 2D booleana incrustada `disponibilidad[][]` que actúa como máscara de bits.
2. **`Room` (Aula):** Posee nombre, tipo y una restricción dura numérica `capacidad_maxima`.
3. **`Subject` (Asignatura):** Posee créditos, nivel (semestre en la malla) y un array de ObjectIds referenciando a sus `prerequisitos`.
4. **`SolverResult` (Horario Final):** Un gran documento contenedor que alberga el Snapshot final calculado por la IA para su persistencia histórica.

---

## 5. Aprobación Arquitectónica

La presente Arquitectura de Alto Nivel y Stack Tecnológico ha sido revisada, debatida y APROBADA por la mesa técnica del Sprint 0. Queda congelada la decisión de usar React + Node + Mongo. Cualquier intención de pivotar (Ej. Cambiarse a Python Django) requerirá detener el proyecto, reescribir este documento y convocar una junta excepcional.
