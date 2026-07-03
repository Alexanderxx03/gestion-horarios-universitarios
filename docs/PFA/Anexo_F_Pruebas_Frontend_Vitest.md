# Anexo F - Pruebas Automatizadas Frontend (Vitest)

## F.1 Objetivo
Garantizar el correcto funcionamiento de la interfaz de usuario, la lógica de estado de React y las validaciones de clientes mediante pruebas unitarias y de integración.

## F.2 Infraestructura
- **Framework:** Vitest + React Testing Library
- **Entorno:** jsdom
- **Mocking:** MSW (Mock Service Worker) para simular la API REST.

## F.3 Resultados de Cobertura
Al ejecutar `npm run test:coverage` en el directorio `frontend/`:

| Métrica | Porcentaje (%) | Archivos Evaluados |
|---|---|---|
| **Statements** | 47.18% | 48 |
| **Branches** | 68.20% | 48 |
| **Functions** | 51.66% | 48 |
| **Lines** | 47.18% | 48 |

## F.4 Casos de Prueba Críticos
Se desarrollaron **415 tests** distribuidos en 48 suites, priorizando:
- Componentes de interacción compleja (`ScheduleBuilder`, `MatriculasFilter`).
- Hooks personalizados de fetch y manipulación de estado (`useSchedule`, `useAuth`).
- Funciones puras de validación (`lib/horarios.ts`).

## F.5 Evidencia Visual
![Resultados Vitest](Capturas/CoverageVitest.png)
*Figura F.1: Reporte de cobertura generado por Vitest (lcov).*
