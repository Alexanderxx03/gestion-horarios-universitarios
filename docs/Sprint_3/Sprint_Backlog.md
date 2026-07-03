# Sprint Backlog - Sprint 3 (El Motor Heurístico CSP)

**Duración:** 14 Días (2 Semanas)
**Meta del Sprint (Sprint Goal):** Construir, optimizar y aislar el Cerebro Matemático (Algoritmo CSP) capaz de ingerir miles de variables y devolver un horario libre de colisiones (0.0% cruces), manteniéndose por debajo de los 15 segundos de procesamiento.

## 1. User Stories Seleccionadas (Compromiso del Equipo)

El equipo de desarrollo asume una velocidad de puntos MENOR, dado que el riesgo técnico y la complejidad cognitiva de este Sprint es monumental.

| ID Ticket | Épica (Categoría) | Título de la Historia de Usuario | Story Points (Esfuerzo) | Desarrollador | Estado de Cierre |
|:---:|:---|:---|:---:|:---:|:---:|
| **US-301** | Algoritmia Core | Diseñar la estructura de datos en memoria (Matriz 3D: Días x Horas x Aulas) para el Solver. | 5 | Alexander (Back) | ✅ Completado |
| **US-302** | Algoritmia Core | Implementar algoritmo Backtracking (DFS) puro para asignar cursos probando huecos vacíos. | 8 | Alexander (Back) | ✅ Completado |
| **US-303** | Algoritmia Optimización | (Spike Result) Implementar Heurística MRV (Minimum Remaining Values). Asignar primero a los docentes con menor disponibilidad para podar el árbol matemático rápido y evitar Deadlocks. | 8 | Alexander (Back) | ✅ Completado |
| **US-304** | Arquitectura Asíncrona | Envolver la ejecución del algoritmo en la API nativa `worker_threads` de Node.js, para asegurar que el Event Loop principal no se congele durante el cálculo. | 5 | Alexander (Back) | ✅ Completado |
| **US-305** | Interfaz Docentes | Construir componente `Drag and Drop` interactivo (Grilla Semanal) para que el Docente dibuje/pinte de verde las horas que tiene disponibles (Insumo del motor). | 8 | Roberto (Front) | ✅ Completado |

## 2. Refactorización Crítica (Deuda Técnica Sprint 2)
- **TICKET-REFACT:** Separar el Modelo `Course` para soportar las sub-divisiones "Teoría" (Aulas T) y "Práctica" (Laboratorios P) solicitado urgente por la Decanatura en el Review anterior. (3 Puntos adicionales asimilados).

## 3. Métricas de Velocidad Planificada
- **Velocidad Estimada para el Sprint 3:** 34 Story Points. (Aumento masivo de riesgo. Alexander asume casi toda la carga de programación compleja, mientras Roberto levanta la grilla de arrastre del frontend).

*Firma de Inicio de Sprint: Equipo de Desarrollo UniHorarios*
