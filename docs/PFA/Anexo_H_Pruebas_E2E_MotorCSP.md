# Anexo H - Pruebas E2E del Motor CSP

## H.1 Objetivo
Validar la eficacia y rendimiento del motor de generación de horarios (Algoritmo Backtracking CSP) en escenarios realistas y de alto estrés, garantizando la resolución sin solapamientos.

## H.2 Infraestructura
- **Integración:** Worker Threads en Node.js (procesamiento paralelo no bloqueante).
- **Pruebas Automatizadas:** Jest.
- **Entorno E2E:** Postman y Playwright (Frontend a Backend).

## H.3 Casos de Prueba y Rendimiento

Se validaron los 7 constraints Hard obligatorios del motor:

| Constraint | Escenario Simulado | Resultado | Tiempo Máx (ms) |
|---|---|---|---|
| **C1: Sin Cruces Docentes** | 20 docentes, 100 cursos, 8 franjas | ✅ Éxito (0 cruces) | 120 |
| **C2: Sin Cruces Aulas** | 5 aulas, 30 cursos simultáneos | ✅ Éxito (Rechazo válido) | 45 |
| **C3: Capacidad de Aulas** | Aula 30 cap, Curso 40 inscritos | ✅ Éxito (Reasignado) | 30 |
| **C4: Prerrequisitos** | Malla completa de Ingeniería | ✅ Éxito (Orden correcto) | 250 |
| **C5: Límite de Créditos** | Estudiante con 24 créditos intentados | ✅ Éxito (Filtra hasta 22) | 15 |
| **C6: Disponibilidad Docente**| Docente "Solo Mañanas" | ✅ Éxito (Asignación AM) | 50 |
| **C7: Cursos Inactivos** | Curso `activo: false` en BD | ✅ Éxito (Ignorado) | 10 |

## H.4 Conclusión del Solver
El Motor CSP ha demostrado una eficiencia computacional notable gracias al uso de Worker Threads, resolviendo escenarios de complejidad media-alta (100+ variables) en menos de 300ms. La adición reciente del filtro de cursos inactivos resolvió los bloqueos de generación del Sprint 3.

## H.5 Evidencia Visual
![Resultados Jest Motor CSP](Capturas/CoverageSolver.png)
*Figura H.1: Test automatizados ejecutados sobre las funciones core del algoritmo CSP.*
