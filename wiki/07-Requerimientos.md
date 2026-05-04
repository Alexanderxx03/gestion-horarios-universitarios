# 07 · Requerimientos Funcionales y No Funcionales

## Metodología de Requerimientos

Los requerimientos se formulan siguiendo el estándar de **Historias de Usuario** con criterios de aceptación medibles. La priorización usa el modelo **MoSCoW** (Must, Should, Could, Won't) complementado con Story Points para estimación de esfuerzo.

---

## Requerimientos Funcionales (RF)

### RF01 – Autenticación y Gestión de Sesiones

**Historia de Usuario:**

> Como **usuario del sistema** (estudiante, docente, coordinador o admin), quiero poder **iniciar y cerrar sesión de forma segura** con mi cuenta de Google o email/contraseña, para que **solo yo pueda acceder a mis datos y las funcionalidades de mi rol**.

**Prioridad MoSCoW:** Must Have | **Story Points:** 3 SP | **Sprint:** 1

**Criterios de Aceptación:**

- [ ] Login con Google OAuth2 funcional; redirige al dashboard según el rol del Custom Claim
- [ ] Login con email + contraseña funcional con manejo de error descriptivo
- [ ] El usuario puede cerrar sesión; el token es revocado en Firebase Auth
- [ ] Los tokens se renuevan automáticamente (Firebase SDK) sin forzar re-login
- [ ] Las rutas protegidas redirigen a `/login` si no hay sesión activa
- [ ] Un usuario sin rol asignado ve una pantalla de "acceso pendiente" (no dashboard)

**Dependencias:** Ninguna (RF base del sistema)

---

### RF02 – Administración del Catálogo Académico

**Historia de Usuario:**

> Como **coordinador académico**, quiero **gestionar el catálogo de cursos, docentes y aulas** del sistema, para que el motor CSP tenga datos precisos y actualizados para generar horarios sin conflictos.

**Prioridad MoSCoW:** Must Have | **Story Points:** 11 SP (HU-02+HU-03+HU-04) | **Sprint:** 1–2

**Criterios de Aceptación:**

- [ ] CRUD completo de Cursos: código único, nombre, créditos, horas semanales, si necesita laboratorio, prerrequisitos (referencia a otros cursos)
- [ ] CRUD completo de Docentes: datos personales, disponibilidad horaria por día (franjas `HH:MM – HH:MM`)
- [ ] CRUD completo de Aulas: nombre, edificio, capacidad máxima, tipo (normal / laboratorio)
- [ ] Validación de campos requeridos con mensajes de error en español junto al campo
- [ ] Al eliminar un curso, el sistema advierte si tiene matrículas activas asociadas
- [ ] Al agregar un prerrequisito, el sistema detecta dependencias circulares (EL-06) y las rechaza

**Dependencias:** RF01 (autenticación), rol COORDINATOR verificado en Firestore Rules

---

### RF03 – Gestión de Períodos Académicos

**Historia de Usuario:**

> Como **administrador**, quiero **crear y activar períodos académicos** con fechas y configuración de créditos, para que el sistema asocie correctamente las matrículas y horarios al semestre vigente.

**Prioridad MoSCoW:** Must Have | **Story Points:** 3 SP | **Sprint:** 1

**Criterios de Aceptación:**

- [ ] Solo un período puede estar en estado `active = true` a la vez (verificado en Firestore Rules)
- [ ] El período activo puede ser consultado por todos los roles autenticados
- [ ] Al crear un período, se definen: nombre (ej. "2026-I"), fechas de inicio/fin, `minCredits` y `maxCredits`
- [ ] Al cerrar un período, los horarios generados se archivan con estado `ARCHIVED`

**Dependencias:** RF01 + RF02, rol ADMIN verificado

---

### RF04 – Matrícula de Cursos por Estudiante

**Historia de Usuario:**

> Como **estudiante**, quiero **seleccionar y confirmar mis materias** para el período activo con validación automática en tiempo real, para que pueda matricularme solo en cursos que cumplen mis prerrequisitos y no excedan mis créditos permitidos.

**Prioridad MoSCoW:** Must Have | **Story Points:** 8 SP | **Sprint:** 2

**Criterios de Aceptación:**

- [ ] El sistema verifica en tiempo real que el estudiante tiene aprobados todos los prerrequisitos (HC8)
- [ ] El sistema acumula créditos y alerta si se supera el máximo del período (`maxCredits`, típico 22)
- [ ] El sistema alerta si los créditos están por debajo del mínimo (`minCredits`, típico 12)
- [ ] El estudiante puede agregar/quitar materias del carrito antes de confirmar
- [ ] La matrícula confirmada queda en estado `PENDING` hasta validación del coordinador
- [ ] La operación de matrícula es atómica: todos los cursos se graban o ninguno (sin matrículas parciales)
- [ ] Un estudiante no puede matricularse dos veces en el mismo curso en el mismo período (EL)

**Dependencias:** RF01, RF02 (catálogo), RF03 (período activo)

---

### RF05 – Generación Automática de Horarios (Motor CSP)

**Historia de Usuario:**

> Como **coordinador académico**, quiero **activar la generación automática del horario del período** desde la interfaz, para que el sistema calcule una asignación sin conflictos de docentes, aulas y estudiantes en el menor tiempo posible.

**Prioridad MoSCoW:** Must Have | **Story Points:** 13 SP | **Sprint:** 2

**Criterios de Aceptación:**

- [ ] El coordinador puede disparar la generación con un botón en la interfaz
- [ ] El sistema verifica pre-condiciones antes de ejecutar: ≥1 matrícula validada, ≥1 docente con disponibilidad, ≥1 aula disponible
- [ ] El estado del horario se muestra en tiempo real: `PENDING → IN_PROGRESS → GENERATED | FAILED`
- [ ] El horario generado no tiene solapamientos de docente (HC1), aula (HC2) ni estudiante (HC3)
- [ ] Si no se encuentra solución en ≤30 segundos, el sistema reporta `FAILED` con los cursos en conflicto
- [ ] Solo puede haber una generación activa por período (`IN_PROGRESS` como mutex)

**Dependencias:** RF02, RF04, RF03 (período con matrículas validadas)

---

### RF06 – Visualización de Horarios en Grilla Semanal

**Historia de Usuario:**

> Como **usuario del sistema**, quiero **ver el horario generado en una grilla semanal clara** con días y franjas horarias, para que pueda entender fácilmente la distribución de mis clases.

**Prioridad MoSCoW:** Should Have | **Story Points:** 5 SP | **Sprint:** 3

**Criterios de Aceptación:**

- [ ] Grilla con días de la semana en columnas (Lun–Sáb) y franjas horarias en filas (08:00–22:00)
- [ ] Cada celda muestra: nombre del curso, docente asignado, aula
- [ ] El coordinador y admin ven el horario institucional completo (todos los cursos)
- [ ] El docente ve exclusivamente sus asignaciones de la semana
- [ ] El estudiante ve exclusivamente los cursos en los que está matriculado
- [ ] La grilla es responsiva: funciona correctamente en desktop, tablet y móvil

**Dependencias:** RF05 (horario generado exitosamente)

---

### RF07 – Exportación de Horarios

**Historia de Usuario:**

> Como **usuario del sistema**, quiero **exportar mi horario en PDF o Excel**, para que tenga una copia portable e imprimible del horario generado.

**Prioridad MoSCoW:** Should Have (PDF) / Could Have (Excel) | **Story Points:** 8 SP | **Sprint:** 3

**Criterios de Aceptación:**

- [ ] Exportar a PDF con formato de grilla imprimible (A4 horizontal)
- [ ] El PDF incluye: nombre del usuario/rol, período académico, fecha de generación
- [ ] Coordinador puede exportar a Excel el horario institucional completo con todas las asignaciones
- [ ] Los botones de exportación solo se muestran cuando existe un horario `GENERATED`

**Dependencias:** RF06 (grilla funcional)

---

## Requerimientos No Funcionales (RNF)

### RNF01 – Usabilidad e Inclusión (WCAG 2.1 + ISO 25010)

**Prioridad MoSCoW:** Must Have

- Interfaz **responsiva** (desktop ≥1024px, tablet 768–1023px, móvil <768px)
- Contraste de texto mínimo de **4.5:1** (WCAG AA) para texto normal
- Todos los elementos interactivos accesibles por teclado (atributos ARIA en componentes custom)
- Tipografía de al menos **16px** para texto de cuerpo
- Feedback visual inmediato en todas las acciones (loaders, toasts de éxito/error)

### RNF02 – Rendimiento

**Prioridad MoSCoW:** Must Have

| Métrica                                | Objetivo              | Cómo se mide                 |
| -------------------------------------- | --------------------- | ---------------------------- |
| Tiempo carga inicial SPA               | < 3 segundos en 4G    | Lighthouse Performance Score |
| Tiempo respuesta Firestore CRUD        | < 500ms por operación | Network tab Chrome DevTools  |
| Tiempo generación CSP (escenario base) | ≤ 30 segundos         | Log de Cloud Functions       |
| Lighthouse Performance Score           | ≥ 85                  | Lighthouse CLI en CI         |

### RNF03 – Seguridad (OWASP Top 10)

**Prioridad MoSCoW:** Must Have

| Amenaza OWASP               | Mitigación Implementada                                             |
| --------------------------- | ------------------------------------------------------------------- |
| A01: Broken Access Control  | Custom Claims + Firestore Security Rules por rol                    |
| A02: Cryptographic Failures | HTTPS forzado por Firebase Hosting; tokens JWT RS256                |
| A03: Injection              | Firestore NoSQL (no SQL injection); validación con Zod en Functions |
| A07: Auth Failures          | Firebase Auth gestiona tokens; rotación automática; rate limiting   |
| A10: SSRF                   | Cloud Functions no realizan requests a URLs del usuario             |

### RNF04 – Disponibilidad y Portabilidad

**Prioridad MoSCoW:** Should Have

- Disponible **24/7** (SLA Firebase: 99.95%)
- Funcionar en **Chrome, Firefox, Edge** (versiones actuales)
- **Sin instalación** de software por parte del usuario final

### RNF05 – Sostenibilidad (Green Software)

**Prioridad MoSCoW:** Could Have

- **Serverless**: recursos solo consumidos durante requests activos
- **Tree-shaking con Vite**: bundle sin código muerto (~40% más pequeño)
- **SDK modular de Firebase**: solo se importa lo que se usa
- **Lazy loading de rutas**: páginas cargadas bajo demanda (`React.lazy`)

---

## Backlog del Producto (Product Backlog)

| ID    | Historia de Usuario            | Prioridad | MoSCoW | SP  | Sprint   | Dependencias               |
| ----- | ------------------------------ | --------- | ------ | :-: | -------- | -------------------------- |
| HU-01 | Autenticación con Google       | 🔴 Alta   | Must   |  3  | Sprint 1 | —                          |
| HU-02 | CRUD Cursos                    | 🔴 Alta   | Must   |  5  | Sprint 1 | HU-01                      |
| HU-04 | CRUD Aulas                     | 🔴 Alta   | Must   |  3  | Sprint 1 | HU-01                      |
| HU-05 | Gestión de Períodos            | 🟡 Media  | Must   |  3  | Sprint 1 | HU-01                      |
| HU-03 | CRUD Docentes + Disponibilidad | 🔴 Alta   | Must   |  8  | Sprint 2 | HU-01                      |
| HU-06 | Matrícula de Estudiantes       | 🔴 Alta   | Must   |  8  | Sprint 2 | HU-02, HU-05               |
| HU-07 | Motor CSP – Generación         | 🔴 Alta   | Must   | 13  | Sprint 2 | HU-02, HU-03, HU-04, HU-06 |
| HU-08 | Grilla de visualización        | 🟡 Media  | Should |  5  | Sprint 3 | HU-07                      |
| HU-09 | Exportación PDF                | 🟡 Media  | Should |  5  | Sprint 3 | HU-08                      |
| HU-10 | Exportación Excel              | 🟢 Baja   | Could  |  3  | Sprint 3 | HU-08                      |
| HU-11 | UI Premium completa            | 🟡 Media  | Should |  8  | Sprint 3 | HU-08                      |

**Total Backlog:** 64 SP funcionales + 20 SP tareas técnicas = **84 SP**

---

> 🔗 Anterior: [← Roles y Funcionalidades](06-Roles-y-Funcionalidades) | Siguiente: [Instalación →](08-Instalacion-y-Configuracion)
