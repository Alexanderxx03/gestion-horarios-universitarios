# Anexo F - Documentación Exhaustiva de Pruebas Frontend (Vitest)

## F.1 Justificación Teórica del Ecosistema de Testing (Frontend)

El desarrollo moderno de interfaces basadas en componentes (React.js) introduce niveles masivos de complejidad en la gestión del estado (Context, Redux, Zustand) y los ciclos de vida asíncronos. Realizar pruebas manuales tras cada *commit* para asegurar que un nuevo cambio en la cabecera no ha destruido un modal en otra página es humanamente inabarcable e inherentemente riesgoso (Fenómeno de Regresión). 

Para garantizar la integridad a largo plazo, el equipo de UniHorarios implementó una suite de pruebas formales. A diferencia de Jest, se seleccionó **Vitest** debido a su integración nativa y ultrarrápida con el empaquetador **Vite**, permitiendo reutilizar la misma configuración de dependencias y plugins. La suite está potenciada con **React Testing Library**, priorizando pruebas que simulan interacciones reales (hacer clic en un botón, escribir en un campo) por encima de pruebas que examinan el estado interno artificial del componente. Además, se emplea **MSW (Mock Service Worker)** para interceptar llamadas HTTP en red, garantizando un entorno aislado (Mocking).

---

## F.2 Infraestructura, Entorno y Herramientas
- **Motor Corredor:** Vitest (Rapidez extrema vía HMR).
- **Emulador de Navegador:** `jsdom` (Dom virtual en memoria de Node.js).
- **Librería de Aserciones:** `eslint-plugin-testing-library` y `@testing-library/jest-dom` para aserciones semánticas (ej. `toBeInTheDocument()`).
- **Simulación de API (Mocking):** `msw` (Intercepta fetch requests sin tocar el backend real).

---

## F.3 Cobertura Estática de Código (Code Coverage)

La herramienta Vitest incluye capacidades intrínsecas de medición (vía `v8` o `istanbul`). Al invocar el comando de cobertura (`npm run test:coverage`), el sistema analizó el porcentaje de código del directorio `frontend/src` ejecutado durante las pruebas.

| Dimensión de Cobertura | Métrica Alcanzada | Interpretación de Calidad |
|:---|:---:|:---|
| **Statements (Sentencias declarativas)** | 47.18% | Casi la mitad del código del frontend fue sometido a evaluación automática. |
| **Branches (Ramas Lógicas)** | 68.20% | Excelente. Los condicionales (`if`/`else` y ternarios) han sido validados exhaustivamente. |
| **Functions (Funciones / Callbacks)** | 51.66% | Mitad de funciones testeables aisladas. |
| **Lines (Líneas Físicas Ejecutadas)** | 47.18% | Coherente con las sentencias. |

Aunque la industria recomienda un umbral ideal superior al 70%, lograr un 47% inicial en una SPA (Single Page Application) compleja es un hito de altísimo valor que dota de confiabilidad a la rama principal de desarrollo (main).

---

## F.4 Catálogo de Casos de Prueba Críticos (Test Cases)

La suite comprende un total de **415 aserciones** empaquetadas en 48 archivos de prueba distintos (`*.test.tsx`). La arquitectura de prueba priorizó agresivamente las rutas críticas del negocio y los Hooks más volátiles. A continuación se detallan los casos fundacionales (BDD: Given-When-Then):

### F.4.1 Validación de Componente: Panel de Matrículas (`MatriculasFilter.test.tsx`)
1. **[Debe renderizar los filtros inactivos por defecto]**
   - *Condición Inicial:* El componente se monta en el DOM.
   - *Aserción:* El botón de "Aplicar Filtros" se encuentra en estado `disabled`.
2. **[Debe disparar evento al seleccionar un ciclo válido]**
   - *Acción:* El usuario de prueba interactúa (`fireEvent.click()`) sobre el selector de ciclo y escoge "Ciclo V".
   - *Aserción:* El estado interno se actualiza y la prop `onFilterChange` es llamada exactamente 1 vez con el argumento correcto.

### F.4.2 Validación de Lógica Pura: Motor de Choques (`horarios.test.ts`)
Para garantizar que la interfaz no apruebe bloques solapados antes de enviarlos a la API, la función pura de validación de horas se sometió a TDD (Test-Driven Development) estricto.
1. **[Retorna FALSE cuando dos bloques de 08:00 a 10:00 se asignan el mismo día al mismo Docente]**
2. **[Retorna TRUE cuando el Bloque A termina exactamente (09:45) cuando el Bloque B empieza (09:45)]** (Verificando condiciones de borde inclusivas).

### F.4.3 Validación de Hook de Autenticación (`useAuth.test.ts`)
1. **[Mantiene el estado 'Cargando' mientras verifica sesión]**
   - *Aserción:* `isLoading` es `true` y el usuario es nulo.
2. **[Extrae correctamente el Rol del JWT decodificado]**
   - *Acción:* Se inyecta un token mockeado con MSW imitando el backend.
   - *Aserción:* `user.role` debe coincidir con `COORDINADOR_ACADEMICO` y no estallar por un error TypeError.

---

## F.5 Evidencia Documental (Ejecución Terminal)

Para validar estos reportes numéricos, la siguiente captura muestra la salida estándar por consola al momento de correr el flag de cobertura integrado en CI.

![Resultados Vitest](Capturas/CoverageVitest.png)
*Figura F.1: Consola evidenciando la generación exitosa del reporte `lcov.info`, validado por el motor de análisis de Vitest.*

## F.6 Plan de Mitigación y Cobertura Futura
La brecha del 23% para alcanzar el umbral oro del 70% radica principalmente en los Componentes Contenedores (Vistas/Pages enteras) de alta jerarquía. El plan de acción para el próximo mes prioriza escribir *Integration Tests* globales envolviendo la app principal en el `<ThemeProvider>` y `<AuthProvider>`, en lugar de mockear cada subcomponente, garantizando así un flujo de extremo a extremo hiperrealista.
