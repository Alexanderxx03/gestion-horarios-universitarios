# Registro Forense de Lecciones Aprendidas (Retrospectiva del Proyecto)

## 1. Contexto Metodológico (Scrum Retrospective)

Las lecciones aprendidas constituyen el capital intelectual más valioso extraído de un proyecto informático. A diferencia de un producto que puede volverse obsoleto en cinco años, el conocimiento sobre cómo el equipo fracasó, pivotó y triunfó, permea hacia el ADN de la organización para futuras iteraciones.

En el marco de trabajo Scrum aplicado a UniHorarios, este documento condensa las actas de las 4 Retrospectivas de Sprint y cataloga sistemáticamente los aciertos a preservar (Best Practices) y los descarrilamientos a evitar (Anti-patterns).

---

## 2. Matriz de Éxitos Estratégicos (Lo que salió excepcionalmente bien)

| Categoría Arquitectónica | Descripción de la Práctica (Best Practice) | Impacto Cuantitativo en el Proyecto | Recomendación Organizacional Continua |
|:---|:---|:---|:---|
| **Tecnología Frontend** | **Migración Temprana de Create-React-App (CRA) hacia Vite.** CRA fue deprecado y era inmensamente lento. | Redujo los tiempos de inicio del servidor de desarrollo de 25s a 0.5s. Habilitó Hot Module Replacement (HMR) instantáneo. | Estándar Obligatorio: Todo nuevo proyecto web de la universidad debe inicializarse con `npm create vite@latest`. |
| **Ingeniería de Calidad** | **Adopción de Zod para Esquemas en Ejecución.** Validar la metadata de entrada antes de golpear a Mongoose. | Erradicó el 100% de los errores 500 causados por inyecciones de datos corruptos o tipos no coincidentes en la API. | Fuerte Sugerencia: Eliminar los validadores de express-validator que ensucian los controladores, usar Zod Middlewares. |
| **Arquitectura Asíncrona** | **Desacoplamiento del Motor CSP (Worker Threads).** Separar la lógica NP-Hard del Event Loop principal de Node.js. | El servidor web se mantuvo 100% receptivo para miles de usuarios simultáneamente mientras procesaba horarios en el fondo. | Regla de Arquitectura: Cualquier tarea de cómputo mayor a 50ms (Encriptación pesada, PDFs, IA) debe enviarse a un hilo hijo o cola de mensajes (RabbitMQ). |
| **Control de Versiones** | **Enforce de "Conventional Commits" y Trunk-Based Development.** Evitar Ramas "Fantasma" que duren semanas. | Facilitó la creación del Changelog y redujo los conflictos de fusión (Merge Conflicts) del Sprint 3 al mínimo. | Política Obligatoria: Configurar `Husky` y `commitlint` en cada nuevo repositorio. |

---

## 3. Matriz de Fracasos y Desviaciones (Lo que salió mal y cómo se curó)

| Categoría del Desafío | Descripción del Problema / Fricción (Anti-Pattern) | Causa Raíz (Root Cause Analysis - 5 Whys) | Medida Correctiva Implementada |
|:---|:---|:---|:---|
| **Estimación de Software** | El desarrollo del Algoritmo CSP retrasó el cierre del Sprint 2 por una semana completa. | Exceso de optimismo. El equipo subestimó la complejidad combinatoria de integrar aforos vs cantidad matriculados. | Se redujo la carga de historias de usuario visuales (Frontend) en un 30% en el Sprint 3 para compensar las horas requeridas de algoritmos. |
| **Experiencia de Desarrollador (DX)** | Fricción constante entre el Frontend y el Backend por desajustes en el formato del JSON de respuesta. | Tipado Suelto. El frontend definía interfaces `Interface Course` diferentes a los Esquemas reales de Mongoose en Backend. | Adopción de *MonoRepo* parcial o *Shared Types* para forzar una única fuente de verdad en TypeScript, sincronizando contratos. |
| **Despliegue y Operaciones (DevOps)** | El primer despliegue falló catastróficamente al intentar ejecutar la base de datos localmente. | Dependencia del "Funciona en mi máquina". Falta de variables de entorno (ENV) dinámicas. | Contenedorización temprana. Se creó una política para que todos los desarrollos arranquen usando `docker-compose up` desde el día 1, unificando versiones de Node/Mongo. |

---

## 4. Recomendaciones Finales del Líder Técnico

Tras diseccionar 6 meses de desarrollo intensivo, el Líder Técnico (Alexander) emite las siguientes directrices formales:

1. **Evitar las Bases de Datos NoSQL Puras para Data Estrictamente Relacional:** MongoDB demostró ser excepcionalmente flexible al inicio (Schema-less), pero para entidades fuertemente acopladas (Un estudiante pertenece a un Curso, que pertenece a un Aula, que pertenece a una Sede), el encadenamiento de `.populate()` ralentiza consultas masivas. En futuros proyectos del mismo índole, se recomienda evaluar **PostgreSQL** apoyado por Prisma ORM.
2. **Priorizar Tailwind CSS sobre librerías de UI pre-ensambladas:** El uso de Tailwind CSS nos permitió implementar Dark Mode y directivas WCAG de alto contraste con extrema facilidad, sin pelearnos con las directivas `!important` que librerías como Material-UI o Bootstrap a menudo imponen en componentes sellados.
3. **Mantener una cultura "Security-First":** La introducción tardía de pruebas OWASP (Sprint 4) generó ansiedad en el despliegue. Las canalizaciones de GitHub Actions deben tener escáneres SAST (Static Application Security Testing) habilitados desde el Sprint 1.

*Firma Digital del Documento:* Equipo Core de UniHorarios - **Final de Retrospectiva.**
