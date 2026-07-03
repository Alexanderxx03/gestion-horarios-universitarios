# Anexo G - Pruebas Automatizadas Backend (Jest)

## G.1 Objetivo
Asegurar la integridad de la API REST, la seguridad de las rutas protegidas y la validez de los repositorios de acceso a la base de datos MongoDB.

## G.2 Infraestructura
- **Framework:** Jest
- **Librerías auxiliares:** Supertest (para HTTP)
- **Base de Datos:** MongoDB In-Memory Server (para pruebas aisladas)

## G.3 Resultados de Cobertura
Al ejecutar `npm run test:coverage` en el directorio `backend/`:

| Métrica | Porcentaje (%) | Archivos Evaluados |
|---|---|---|
| **Statements** | 61.7% | 35 |
| **Branches** | 45.2% | 35 |
| **Functions** | 68.9% | 35 |
| **Lines** | 61.7% | 35 |

## G.4 Casos de Prueba Críticos
Se desarrollaron **364 tests** distribuidos en 53 suites, logrando un 100% de tasa de éxito:
- Pruebas E2E de inicio de sesión y emisión de JWT.
- Controladores HTTP (manejo de códigos 200, 400, 401, 404, 500).
- Pruebas de integración sobre los repositorios de MongoDB.

## G.5 Evidencia Visual
![Resultados Jest](Capturas/CoverageJest.png)
*Figura G.1: Reporte de cobertura generado por Jest para el backend Node.js.*
