# Sprint Backlog - Sprint 2 (Frontend Base y UI Catálogos)

**Duración:** 14 Días (2 Semanas)
**Meta del Sprint (Sprint Goal):** Construir la capa visual y de persistencia de las tres grandes entidades del negocio (Docentes, Aulas y Mallas Curriculares), habilitando la entrada de datos (Data Entry) esencial que alimentará al Motor CSP en el futuro.

## 1. User Stories Seleccionadas (Compromiso del Equipo)

Basados en el éxito del Sprint 1, el equipo asume una velocidad similar, pero enfocada fuertemente en React y componentes de interfaz (UI).

| ID Ticket | Épica (Categoría) | Título de la Historia de Usuario | Story Points (Esfuerzo) | Desarrollador | Estado de Cierre |
|:---:|:---|:---|:---:|:---:|:---:|
| **US-201** | Catálogos Core | Crear Endpoints CRUD en Express para `Docentes` y su respectiva tabla gráfica en React. | 5 | Paul Paytan (Back) / Jack Rojas (Front) | ✅ Completado |
| **US-202** | Catálogos Core | Crear Endpoints CRUD para `Aulas`, asegurando validar obligatoriamente la regla dura del Aforo Máximo numérico. | 5 | Paul Paytan / Jack Rojas | ✅ Completado |
| **US-203** | Mallas Académicas | Crear el componente `Malla Curricular`. Permitir asociar `Cursos` a ciclos (I al X) con una interfaz limpia. | 8 | Jack Rojas (Front) | ✅ Completado |
| **US-204** | Validaciones | Implementar Zod Schemas en el Frontend (Acuerdo de la Retrospectiva S1) para validar todos los formularios antes del `fetch`. | 3 | Jack Rojas (Front) | ✅ Completado |
| **US-205** | UI Base (Layout) | Diseñar un "Layout Shell" con Menú Lateral (Sidebar) responsivo usando Tailwind, para que el usuario pueda navegar entre Aulas, Docentes y Mallas. | 5 | Jack Rojas (Front) | ✅ Completado |
| **US-206** | UI UX (Deuda Técnica) | Mejorar el padding (tamaño) del botón de Login para móviles (Feedback recibido en el Sprint Review 1 por el Coordinador). | 1 | Jack Rojas (Front) | ✅ Completado |

## 2. Puntos de Atención (Riesgos Identificados en Planning)

- **Complejidad en Mallas (US-203):** La interfaz de las Mallas Curriculares es profunda. Un Curso pertenece a una Malla, y tiene dependencias de pre-requisitos (Arreglo de IDs). Esto podría atascar al programador Frontend si no diseña el árbol de componentes (Component Tree) de forma inteligente en React.

## 3. Métricas de Velocidad Planificada
- **Velocidad Estimada para el Sprint 2:** 27 Story Points. (Ligeramente menor al Sprint 1, dando margen de maniobra para refactorizar interfaces compartidas en TypeScript).

*Firma de Inicio de Sprint: Equipo de Desarrollo UniHorarios*
