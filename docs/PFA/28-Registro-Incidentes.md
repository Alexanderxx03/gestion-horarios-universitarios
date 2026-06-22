# 28. Registro de Incidentes o Problemas (Issue Log)

Registro formal de problemas técnicos y administrativos reales (materializados) ocurridos durante la ejecución del proyecto, detallando los responsables y las acciones correctivas validadas.

| ID | Descripción del Incidente Real | Fecha Reporte | Responsable | Prioridad | Acciones Correctivas Validadas | Estado Final |
|:---:|---|:---:|---|:---:|---|:---:|
| **ISS-01** | Colapso de memoria RAM del servidor de Node.js al ejecutar el algoritmo para >100 cursos. | Sprint 2 | Backend Engineer | **Alta** | Refactorización de la gestión de memoria (Garbage Collection explícita, eliminación de recursividad profunda por bucles iterativos optimizados). | **Cerrado** |
| **ISS-02** | Token JWT expiraba a la mitad de la configuración masiva de un horario. | Sprint 3 | Full-Stack | **Media** | Implementación de mecanismo de *Refresh Token* transparente para el usuario coordinador. | **Cerrado** |
| **ISS-03** | Renderizados infinitos (Infinite Loop) en React al filtrar aulas disponibles. | Sprint 3 | Frontend Engineer| **Alta** | Memorización de selectores con `useMemo` y refactor de la store de Zustand. Validación de arreglos mediante Profiler de React. | **Cerrado** |
| **ISS-04** | Choque de dependencias entre versiones de `mongoose` y `typescript`. | Sprint 1 | Arquitecto | **Baja** | Fijación rígida (Pinning) de versiones en `package.json` y regeneración de `package-lock.json`. | **Cerrado** |

*La trazabilidad de la resolución de estos incidentes se encuentra evidenciada en el repositorio remoto a través de los commits y Pull Requests vinculados a estos issues.*
