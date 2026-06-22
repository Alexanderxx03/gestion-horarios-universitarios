# Anexo F: Pruebas Unitarias del Frontend (Vitest)

## Objetivo
Implementar y documentar la suite de pruebas automatizadas que valide el comportamiento esperado de la interfaz de usuario en la plataforma de "Gestión de Horarios Universitarios".

## Framework Utilizado
El framework utilizado es **Vitest** (por su rapidez y nativa integración con el empaquetador Vite) en conjunto con el entorno simulado JSDOM.

## Pruebas de Servicios (APIs)
Se ha validado el servicio `callable.ts` encargado de consumir el Endpoint `/api/courses`.
- **Escenario 1:** El API debe recuperar la lista paginada de cursos cuando el servidor responde correctamente.
- **Escenario 2:** La función debe lanzar un error y capturarlo elegantemente cuando el backend retorna un código `500` o la red falla.
- **Escenario 3:** Los parámetros de consulta (filtros, paginación, proyección `?select=nombre`) se añaden correctamente a la URL.

## Pruebas de Estado de UI (Zustand)
Se ha probado exhaustivamente el store `ui.store.ts` para garantizar el flujo de la aplicación.
- **Escenario 1:** El estado inicial del menú de navegación y del tema oscuro está inicializado en valores seguros.
- **Escenario 2:** Al disparar la acción `setTheme('dark')`, el estado debe mutar sin efectos secundarios corruptos.

## Resultados de Cobertura de Pruebas (Coverage)
Al ejecutar el comando de validación `npm run test:coverage` (habilitado gracias al motor `v8` integrado en Vitest), los resultados reflejaron un alto grado de certeza sobre las partes críticas del negocio:

```shell
> vitest run --coverage

 RUN  v2.1.8 /frontend

 ✓ tests/unit/callable.test.ts (3 tests)
 ✓ tests/unit/ui.store.test.ts (2 tests)

 Test Files  2 passed (2)
      Tests  5 passed (5)

 % Coverage report from v8
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------|---------|----------|---------|---------|-------------------
All files        |   85.45 |      100 |   83.33 |   85.45 |
 src/lib         |   84.09 |      100 |     100 |   84.09 |
  callable.ts    |   84.09 |      100 |     100 |   84.09 | 24-30
 src/stores      |     100 |      100 |   66.66 |     100 |
  ui.store.ts    |     100 |      100 |   66.66 |     100 |
-----------------|---------|----------|---------|---------|-------------------
```
