# Registro Abierto de Incidentes o Problemas (Issue Log)

## 1. Naturaleza del Registro

Este documento (Issue Log) se utiliza a lo largo de todo el ciclo de vida de desarrollo ágil (Scrum Sprints) para rastrear los "Incidentes" (Issues). Un incidente, en el lenguaje del PMI (Project Management Institute), se diferencia de un *Riesgo* en el sentido estricto del tiempo: **El Riesgo es una probabilidad futura; el Incidente es una certeza presente.** Un incidente es un evento que ya sucedió, ya impactó el cronograma o el código, y requirió intervención de emergencia (Mitigación o Parche en caliente).

Este registro histórico garantiza que, si problemas arquitectónicos similares resurgen en el futuro (Ej. Phase 2 del proyecto), los ingenieros cuenten con la bitácora exacta de cómo el equipo fundacional solucionó el impasse.

---

## 2. Matriz Histórica de Incidentes del Proyecto

La tabla a continuación muestra el historial consolidado de problemas críticos detectados en producción o ramas de staging de alta prioridad, resueltos a lo largo de los 4 Sprints principales.

| Código ID | Descripción del Incidente (Issue) | Propietario / Responsable Asignado | Fecha Identificación | Fecha de Cierre Oficial | Acción Correctiva / Parche Implementado (Resolution) | Estado |
|:---:|:---|:---:|:---:|:---:|:---|:---:|
| **INC-001** | **Colapso del Event Loop (Timeouts de API):** Al ejecutar el solver (CSP) para la facultad de Ingeniería (1200 alumnos, 50 aulas), la pestaña del navegador quedaba congelada durante 60 segundos y la API de Node.js dejaba de contestar el puerto 3000 a otros usuarios. | Alexander (Backend Lead) | 12/03/2026 | 15/03/2026 | **Refactorización de Hilos:** Se sustrajo el algoritmo heurístico de la cadena de Middlewares de Express. Se implementó la librería nativa `worker_threads` para enviar la carga matemática intensa a un hilo hijo (Child Thread) independiente, liberando el hilo principal HTTP. | Cerrado ✅ |
| **INC-002** | **Desincronización de Tipos Frontend-Backend:** El formulario de creación de "Aulas" enviaba la carga útil `capacidad` como un `String` ("30"), pero el Schema de Mongoose esperaba estrictamente un `Number`. Esto arrojaba errores 400 Bad Request en producción. | Jack Rojas (Frontend Dev) | 02/04/2026 | 02/04/2026 | **Fronteras Zod:** Se implementó `Zod` en el cliente para coercionar los tipos antes de la solicitud Axios. En React: `z.coerce.number().min(1)`. Además, se instó al equipo a usar inputs de tipo `type="number"`. | Cerrado ✅ |
| **INC-003** | **CORS Policy Blockage en Vercel:** Al desplegar el frontend de React en los servidores Edge de Vercel, el navegador del cliente bloqueaba por seguridad todas las solicitudes `fetch` dirigidas al backend alojado en Render.com. | SysAdmin DevOps | 21/04/2026 | 21/04/2026 | **Cabeceras HTTP Seguras:** Se configuró el paquete `cors` en Express (Node.js) con una *White-List* (Lista Blanca) estricta, autorizando únicamente a los dominios `.vercel.app` de producción a realizar peticiones *Cross-Origin*. | Cerrado ✅ |
| **INC-004** | **Sobre-Escritura de Colecciones en MongoDB (Race Condition):** Dos coordinadores académicos, operando desde distintas sedes físicas, editaron los metadatos del mismo curso (Física I) en el mismo segundo exacto. La base de datos persistió el último `save()`, borrando el trabajo del primer usuario (Lost Update). | Alexander (Lead Dev) | 10/05/2026 | 14/05/2026 | **Bloqueo Optimista (Optimistic Concurrency Control):** Se habilitó y testeó el campo oculto `__v` nativo de Mongoose (Version Key). Si un usuario intenta actualizar un documento basándose en un estado viejo del que carece la última versión `__v`, la DB aborta la transacción y obliga a refrescar la página. | Cerrado ✅ |
| **INC-005** | **Alerta Crítica de Vulnerabilidad JWT (CVE Detectado):** El escáner estático de SonarQube / npm audit alertó que la versión de `jsonwebtoken` (v8.5.1) instalada era vulnerable a la omisión de verificación de firmas criptográficas bajo ciertas cabeceras manipuladas (Header Tampering). | Especialista de Ciberseguridad | 03/06/2026 | 03/06/2026 | **Upgrade Masivo y Refactor:** Se procedió a actualizar inmediatamente el paquete a la versión parcheada `v9.0.0` y se reemplazó la validación estática de algoritmos, forzando a rechazar algoritmos simétricos 'none' en el middleware de Express. | Cerrado ✅ |
| **INC-006** | **Rendimiento Visual (Lag en Calendario UI):** La librería `react-big-calendar` presentaba tartamudeo visual (Jank / Caída de FPS) al intentar renderizar en pantalla un semestre entero con más de 600 bloques de colores en simultáneo. | Jack Rojas (Frontend Dev) | 15/06/2026 | 18/06/2026 | **Memoización y Virtualización:** Se encapsularon los componentes de los Eventos en React utilizando `React.memo` para evitar re-renderizados inútiles. Se implementó una lógica de paginación que solo dibuja en el DOM la semana actual visible por el usuario, destruyendo los nodos ocultos. | Cerrado ✅ |

---

## 3. Tasa de Resolución de Incidentes (Métrica de Cierre)

El proyecto alcanzó el cierre técnico (Release de Producción v1.0.0) garantizando que la columna "Estado" (Arriba documentada) se encuentra en **100% Cerrado ✅** para incidentes Nivel 1 y Nivel 2. 

Cualquier "incidente" detectado a partir del 03 de Julio de 2026 (Firma del Acta de Constitución de Cierre) será manejado exclusivamente a través del Contrato de Soporte (SLA/Hipercare), y se registrará en un nuevo documento gestionado por la Mesa de Ayuda (Helpdesk/Jira de Operaciones), cerrando este *Issue Log* de la etapa de desarrollo.
