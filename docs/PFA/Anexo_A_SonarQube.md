# Anexo A - Evaluación Profunda de Calidad de Código con SonarQube

## A.1 Introducción y Justificación Teórica

El análisis estático de código fuente (SAST, por sus siglas en inglés) es una práctica fundamental en la Ingeniería de Software moderna. Permite detectar defectos estructurales, cuellos de botella de rendimiento, agujeros de seguridad y malas prácticas de diseño antes de que el código sea compilado o ejecutado. Para este proyecto, el equipo de UniHorarios adoptó **SonarQube**, la plataforma líder en la industria para la inspección continua de la calidad del código, respaldada por un motor de reglas (SonarWay) que audita en tiempo real contra miles de patrones conocidos.

La métrica central de SonarQube no es simplemente contar errores, sino cuantificar la **Deuda Técnica**: el costo implícito (en tiempo y esfuerzo futuro) de haber elegido una solución de desarrollo fácil y rápida en lugar de la más adecuada y robusta a largo plazo.

## A.2 Configuración Arquitectónica del Entorno de Auditoría

Dado que UniHorarios es un monorepo complejo (Frontend React, Backend Node.js y Motor CSP en Worker Threads), se estructuró un flujo de CI robusto para la recolección de métricas.

### A.2.1 Especificaciones de la Infraestructura
- **Plataforma Core:** SonarQube Community Build v26.6
- **Agente de Ejecución:** `sonarsource/sonar-scanner-cli:latest` ejecutado de manera local vía contenedores Docker.
- **Flujo de Integración:** Se configuró un script en `package.json` (`npm run test:sonar`) que orquesta:
  1. Compilación de TypeScript a JavaScript.
  2. Ejecución de Vitest (Frontend) y Jest (Backend/Motor) para generar reportes en formato `lcov`.
  3. Lanzamiento del Scanner inyectando los reportes de cobertura directamente a la base de datos de SonarQube.

### A.2.2 Proyectos y Exclusiones Configuradas
Para evitar contaminar las métricas de calidad con código de terceros o scripts irrelevantes, se configuró el archivo `sonar-project.properties` excluyendo estrictamente las dependencias de Node.js (`node_modules`), las carpetas de distribución (`dist`, `build`) y los archivos declarativos puramente de tipado de TypeScript (`*.d.ts`).

| Capa del Sistema | Clave del Proyecto (Project Key) | Tecnología Base | Motor de Cobertura | Archivos Auditados |
|:---|:---|:---|:---|:---|
| **Capa de Presentación** | `unihorarios-frontend` | React + Vite + TailwindCSS | Vitest (jsdom) | Componentes `.tsx`, Hooks `.ts` |
| **Capa de Aplicación** | `unihorarios-backend` | Node.js + Express + Mongoose | Jest + Supertest | Controladores, Rutas, Modelos |
| **Capa de Lógica (Motor)** | `unihorarios-solver` | Algoritmo CSP + Worker Threads | Jest (isolated) | Funciones de evaluación de restricciones |

## A.3 Tablero de Métricas Consolidadas y KPI de Calidad

Tras la ejecución del escáner en todo el árbol de directorios del proyecto, SonarQube emitió los siguientes indicadores de rendimiento (KPIs), comparados contra la medición inicial de la semana 2.

*Nota: Los datos en bruto de estas mediciones se adjuntan en formato tabular CSV en [metricas_sonarqube.csv](metricas_sonarqube.csv).*

| Indicador Crítico | Medición Frontend | Medición Backend | Medición Motor CSP | Interpretación Arquitectónica |
|:---|:---:|:---:|:---:|:---|
| **Bugs (Defectos Funcionales)** | `4` (-6) | `0` (Estable) | `2` | Reducción dramática en el Frontend tras corregir dependencias cíclicas en `useEffect`. Backend inmaculado. |
| **Vulnerabilities (Seguridad)** | `0` (-1) | `0` (-1) | `0` | Ausencia total de vulnerabilidades CVE explotables en el código escrito por el equipo. |
| **Code Smells (Malos Olores)** | `316` | `77` | `38` | El alto volumen en Frontend se debe a funciones React masivas (Cognitive Complexity) y props no desestructuradas. |
| **Security Hotspots (A revisar)** | `2` | `1` | `2` | Se requieren auditorías manuales (ver Sección A.5) para descartar falsos positivos. |
| **Duplicated Lines (Duplicación)** | `19.2%` | `1.6%` | `0.5%` | Urgente necesidad de crear abstracciones y componentes genéricos en React (botones, modales). |
| **Test Coverage (Cobertura)** | `45.6%` (↑33.3) | `61.7%` (↑26.7) | `69.8%` | Subida espectacular gracias a la incorporación de la suite de pruebas; rozando el umbral del 70%. |
| **Deuda Técnica Estimada** | `1,611 min` | `2,843 min` | `690 min` | Tiempo hipotético requerido por un desarrollador Senior para resolver todos los *Code Smells*. |
| **Maintainability Rating** | `A` | `A` | `A` | El código es fácil de modificar sin romper otras funcionalidades. |
| **Reliability Rating** | `B` | `A` | `C` | Penalti en CSP por un bug menor de coerción de tipos (Type Casting) en TypeScript. |
| **Security Rating** | `A` | `A` | `A` | La aplicación es virtualmente invulnerable a inyecciones estáticas. |

---

## A.4 Análisis Profundo de la Distribución de Issues

Para comprender la naturaleza de la deuda técnica, se desglosó el volumen de incidencias (*Issues*) según la clasificación de severidad oficial de SonarSource.

| Nivel de Severidad SonarQube | Impacto Teórico | Ocurrencias Frontend | Ocurrencias Backend | Ocurrencias Motor CSP |
|:---|:---|:---:|:---:|:---:|
| **BLOCKER** | Puede corromper datos, interrumpir el servidor o abrir brechas de seguridad masivas. | 0 | 0 | 0 |
| **CRITICAL** | Alta probabilidad de causar comportamientos anómalos o *crashes* en casos de borde. | 14 | 11 | 23 |
| **MAJOR** | Dificulta enormemente el mantenimiento (ej. funciones cíclicas, código espagueti). | 122 | 7 | 11 |
| **MINOR** | Violaciones de convenciones de nombrado (CamelCase) y formateo de código. | 180 | 31 | 6 |
| **INFO** | Sugerencias de modernización del lenguaje (ej. usar `const` en lugar de `let`). | 4 | 48 | 0 |

---

## A.5 Auditoría de Vulnerabilidades y Hotspots (Post-Mortem)

En un análisis de calidad riguroso, las alertas rojas emitidas por los escáneres automatizados deben ser validadas por intervención humana. A continuación se presentan los reportes forenses de las mitigaciones aplicadas a los hallazgos más severos.

### A.5.1 Evaporación de Riesgos en el Backend
- **Identificador de Falla:** `[BLOCKER] - Remove this hard-coded password or secret.`
  - **Ubicación Original:** `backend/src/index.ts:15`
  - **Contexto del Riesgo:** La conexión a la base de datos de producción (`mongoose.connect`) contenía la URI explícita con el usuario `admin` y la contraseña de la nube.
  - **Plan de Mitigación:** Se inyectó la dependencia `dotenv` en la cima del árbol del servidor. Se modificó el código para interceptar `process.env.MONGO_URI`. Si la variable no existe en el contenedor Docker (o entorno de Node), el servidor ejecuta un `process.exit(1)` con un log de error crítico, evitando arrancar en estado inconsistente o inseguro.
  - **Resolución SonarQube:** Marcado como **RESOLVED (Fixed)**.

### A.5.2 Auditoría de Falsos Positivos en el Frontend
- **Identificador de Falla:** `[MAJOR] - Review this potentially hard-coded password.`
  - **Ubicación Original:** `frontend/src/pages/Login.tsx:42`
  - **Contexto del Riesgo:** El analizador léxico de SonarQube detectó el string `"Contraseña:"` cerca de un campo `<input type="password">` y asumió incorrectamente que se trataba de una credencial secreta en texto plano almacenada en el código fuente.
  - **Plan de Mitigación:** Al tratarse estrictamente de un componente visual (una etiqueta `<label>` de HTML), se descartó el riesgo.
  - **Resolución SonarQube:** Se añadió un comentario de supresión oficial.
    ```tsx
    <label htmlFor="password-input">
      Contraseña: {/* NOSONAR - Etiqueta de la interfaz gráfica, no un secreto criptográfico */}
    </label>
    ```

---

## A.6 Evaluación de Mantenibilidad Arquitectónica

### A.6.1 La Brecha del Frontend (Complejidad Cognitiva)
El principal foco de deuda técnica reside actualmente en el repositorio del Frontend. La alta cantidad de *Code Smells* (316) y el preocupante **19.2% de duplicación de código** indican que los desarrolladores han incurrido en una práctica común denominada "Copy-Paste-Modify" al crear interfaces similares (por ejemplo, copiando la estructura de la tabla de docentes para crear la tabla de cursos). 

Adicionalmente, se encontraron funciones dentro de los archivos `lib/horarios.ts` que exceden los 15 niveles de complejidad cognitiva (demasiadas sentencias `if`/`else` anidadas), haciendo que el código sea difícil de leer e imposible de testear unitariamente con eficacia.

### A.6.2 La Excelencia del Backend
En contraparte, el backend brilla por su limpieza. Con solo **1.6% de duplicación** y 0 bugs/vulnerabilidades, refleja un uso maduro del patrón de Arquitectura Hexagonal y Repositorios. Los controladores son delgados ("Thin Controllers") y toda la complejidad delegada a los casos de uso está bien encapsulada.

---

## A.7 Evidencia Visual Integral (Dashboards de Producción)

Para sustentar los hallazgos descritos, a continuación se adjuntan las impresiones de los tableros analíticos directos de la herramienta. *(Nota: Asegúrese de que las capturas estén subidas en el directorio `Capturas/` para su visualización).*

### A.7.1 Panel Principal - Frontend React
![Dashboard Frontend - SonarQube](Capturas/DashboardFrontend.png)
*Figura A.1: Panel general de SonarQube para el Frontend. Nótese el 19.2% de duplicación en rojo.*

### A.7.2 Panel Principal - Backend Node.js
![Dashboard Backend - SonarQube](Capturas/DashboardBackend.png)
*Figura A.2: Panel general del Backend. Se evidencia el 0% absoluto de Bugs y el excelente Rating 'A' general.*

### A.7.3 Panel Principal - Algoritmo Solver
![Dashboard Motor - SonarQube](Capturas/DashboardMotor.png)
*Figura A.3: Panel del Motor CSP (Algoritmo Genético/Backtracking).*

---

## A.8 Plan de Acción y Mejora Continua (Roadmap Post-Sonar)

Para evitar que la Deuda Técnica crezca y comprometa la velocidad de entrega en futuros Sprints, se proponen las siguientes directivas técnicas, aprobadas por el líder técnico del proyecto:

| Num | Propuesta Arquitectónica de Refactorización | Capa Objetivo | ROI Estimado (Retorno) | Responsable / Fecha Límite |
|:---:|:---|:---|:---|:---|
| **R-01** | **Abstracción de Tablas UI:** Crear un componente genérico `<DataTable>` que reciba columnas y data como `props` para eliminar el 15% de la duplicación actual. | Frontend | Altísimo (Reducirá ~100 Code Smells) | Siguiente Sprint (Front) |
| **R-02** | **Desanidamiento de Lógica:** Aplicar el patrón "Early Return" (Retorno Temprano) en la librería `horarios.ts` para bajar la Complejidad Cognitiva de 15 a un máximo de 5 por función. | Frontend | Alto (Facilitará Testing) | Siguiente Sprint (Front) |
| **R-03** | **Alcanzar Umbral 70%:** Añadir 10 pruebas adicionales en Jest con Supertest enfocadas específicamente en ramas `catch (error)` que no están siendo cubiertas. | Backend | Medio (Seguridad robusta) | Antes del Cierre |
