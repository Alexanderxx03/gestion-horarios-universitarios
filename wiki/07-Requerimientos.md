# 07 · Requerimientos Funcionales y No Funcionales

## Requerimientos Funcionales (RF)

Los requerimientos funcionales definen las capacidades concretas que el sistema debe proporcionar.

---

### RF01 – Autenticación y Gestión de Sesiones

**Historia de Usuario:** Como usuario del sistema, quiero poder iniciar sesión de forma segura con mi cuenta de Google o email/contraseña para acceder a las funcionalidades correspondientes a mi rol.

**Criterios de Aceptación:**
- [ ] Login con Google OAuth2 funcional y redirige al dashboard según rol
- [ ] Login con email + contraseña funcional
- [ ] El usuario puede cerrar sesión
- [ ] Los tokens se renuevan automáticamente sin forzar re-login
- [ ] Las rutas protegidas redirigen al login si no hay sesión activa

---

### RF02 – Administración del Catálogo

**Historia de Usuario:** Como coordinador, quiero gestionar el catálogo de cursos, docentes y aulas para tener una fuente de datos precisa para la generación de horarios.

**Criterios de Aceptación:**
- [ ] CRUD completo de Cursos: nombre, código, créditos, prereqs, si necesita lab
- [ ] CRUD completo de Docentes: datos personales, disponibilidad horaria por día
- [ ] CRUD completo de Aulas: nombre, edificio, capacidad, tipo (normal/lab)
- [ ] Validación de campos requeridos en formularios
- [ ] Confirmación de eliminación con impacto (si el curso tiene matrículas asociadas)

---

### RF03 – Gestión de Períodos Académicos

**Historia de Usuario:** Como administrador, quiero crear y activar períodos académicos para que el sistema asocie matrículas y horarios al semestre correcto.

**Criterios de Aceptación:**
- [ ] Solo un período puede estar activo a la vez
- [ ] El período activo puede ser consultado por todos los roles
- [ ] Al crear un período, se define el rango de fechas y el límite de créditos

---

### RF04 – Matrícula de Cursos por Estudiante

**Historia de Usuario:** Como estudiante, quiero seleccionar mis materias para el período activo con validación automática de prerrequisitos y créditos.

**Criterios de Aceptación:**
- [ ] El sistema verifica que el estudiante tiene aprobados todos los prerrequisitos
- [ ] El sistema acumula créditos y alerta si se supera el máximo (22)
- [ ] El sistema alerta si se está por debajo del mínimo recomendado (12)
- [ ] El estudiante puede agregar/quitar materias antes de confirmar
- [ ] Una vez confirmada, la matrícula queda en estado PENDING hasta validación del coordinador

---

### RF05 – Generación Automática de Horarios (Motor CSP)

**Historia de Usuario:** Como coordinador, quiero activar la generación automática del horario del período para obtener una asignación sin conflictos en el menor tiempo posible.

**Criterios de Aceptación:**
- [ ] El coordinador puede disparar la generación desde la interfaz
- [ ] El sistema muestra el progreso en tiempo real (PENDING → IN_PROGRESS → GENERATED)
- [ ] El horario generado no tiene solapamientos de docente, aula ni estudiante
- [ ] Si no se encuentra solución, el sistema reporta el estado FAILED con mensaje explicativo
- [ ] El tiempo de generación no supera 30 segundos para el escenario base

---

### RF06 – Visualización de Horarios en Grilla Semanal

**Historia de Usuario:** Como usuario del sistema, quiero ver el horario generado en una grilla semanal clara para entender la distribución de las clases.

**Criterios de Aceptación:**
- [ ] Grilla con días de la semana en columnas y franjas horarias en filas
- [ ] Cada celda muestra: nombre del curso, docente, aula
- [ ] El coordinador ve el horario institucional completo
- [ ] El docente ve solo sus asignaciones
- [ ] El estudiante ve solo sus materias matriculadas

---

### RF07 – Exportación de Horarios

**Historia de Usuario:** Como usuario, quiero exportar mi horario en PDF o Excel para tenerlo en un formato portable.

**Criterios de Aceptación:**
- [ ] Exportar a PDF con formato de grilla imprimible (A4 horizontal)
- [ ] Coordinador puede exportar a Excel el horario institucional completo
- [ ] El PDF generado incluye: nombre del estudiante/docente, período, fecha de generación

---

## Requerimientos No Funcionales (RNF)

### RNF01 – Usabilidad e Inclusión (WCAG 2.1 + ISO 25010)

- La interfaz debe ser **responsiva** (desktop, tablet, móvil)
- Contraste de texto mínimo de **4.5:1** (WCAG AA)
- Todos los elementos interactivos accesibles por teclado (atributos ARIA)
- Tipografía de al menos **16px** para texto de cuerpo
- Feedback visual inmediato en todas las acciones (loaders, toasts, errores)

### RNF02 – Rendimiento

| Métrica | Objetivo |
|---|---|
| Tiempo carga inicial SPA | < 3 segundos en 4G |
| Tiempo respuesta Firestore (CRUD) | < 500ms |
| Tiempo generación CSP básico | ≤ 30 segundos |
| Lighthouse Performance Score | ≥ 85 |

### RNF03 – Seguridad (OWASP Top 10)

| Amenaza OWASP | Mitigación implementada |
|---|---|
| A01: Broken Access Control | Custom Claims + Firestore Security Rules por rol |
| A02: Cryptographic Failures | HTTPS forzado por Firebase Hosting, tokens JWT seguros |
| A03: Injection | Firestore no tiene SQL → no hay SQL injection; validación de inputs en Functions |
| A07: Auth Failures | Firebase Auth gestiona tokens, rotación automática |
| A10: SSRF | Cloud Functions en entorno controlado, sin llamadas externas innecesarias |

### RNF04 – Disponibilidad y Portabilidad

- El sistema debe estar disponible **24/7** (SLA de Firebase: 99.95%)
- Funcionar en **Chrome, Firefox, Edge** (versiones actuales)
- **Sin instalación de software** por parte del usuario final

### RNF05 – Sostenibilidad (Green Software)

- **Arquitectura serverless**: solo se consumen recursos cuando hay peticiones
- **Tree-shaking con Vite**: bundle mínimo, sin código muerto
- **SDK modular de Firebase**: solo se importa lo que se usa
- **Lazy loading de rutas**: las páginas se cargan bajo demanda

---

## Backlog Resumido (Product Backlog)

| ID | Historia de Usuario | Prioridad | Sprint |
|---|---|---|---|
| HU-01 | Autenticación con Google | 🔴 Alta | Sprint 1 |
| HU-02 | CRUD Cursos | 🔴 Alta | Sprint 1 |
| HU-03 | CRUD Docentes + Disponibilidad | 🔴 Alta | Sprint 1 |
| HU-04 | CRUD Aulas | 🔴 Alta | Sprint 1 |
| HU-05 | Gestión de Períodos | 🟡 Media | Sprint 1 |
| HU-06 | Matrícula de Estudiantes | 🔴 Alta | Sprint 2 |
| HU-07 | Validación Prerrequisitos | 🔴 Alta | Sprint 2 |
| HU-08 | Motor CSP – Generación | 🔴 Alta | Sprint 2 |
| HU-09 | Grilla de visualización | 🟡 Media | Sprint 2 |
| HU-10 | Exportación PDF | 🟡 Media | Sprint 3 |
| HU-11 | Exportación Excel | 🟢 Baja | Sprint 3 |
| HU-12 | UI Premium completa | 🟡 Media | Sprint 3 |

---

> 🔗 Anterior: [← Roles y Funcionalidades](06-Roles-y-Funcionalidades) | Siguiente: [Instalación →](08-Instalacion-y-Configuracion)
