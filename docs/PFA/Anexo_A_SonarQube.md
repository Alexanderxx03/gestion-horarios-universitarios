# Anexo A - Evaluación de Calidad de Código con SonarQube

## A.1 Configuración del entorno

### Infraestructura
- **Herramienta:** SonarQube Community Build 26.6
- **Scanner:** `sonarsource/sonar-scanner-cli:latest`
- **Integración Continua:** GitHub Actions
- **URL local (desarrollo):** http://localhost:9000

### Proyectos configurados

| Proyecto | Clave | Tecnología | Cobertura |
|---|---|---|---|
| Frontend | `unihorarios-frontend` | React + Vite + TypeScript | Vitest |
| Backend | `unihorarios-backend` | Node.js + Express | Jest + Supertest |
| Motor CSP | `unihorarios-solver` | Node.js Worker Threads | Jest |

### Automatización
El análisis se ejecuta mediante un script automatizado `npm run test:sonar` en el nivel raíz que:
1. Ejecuta todas las pruebas unitarias y de integración.
2. Genera los reportes `lcov.info`.
3. Inicia el análisis estático de SonarScanner.

## A.2 Métricas consolidadas

*Fuente: API de SonarQube. Datos exportables en [metricas_sonarqube.csv](metricas_sonarqube.csv)*

| Métrica | Frontend | Backend | Motor CSP |
|---|---|---|---|
| **Bugs** | 4 (-6) | 0 | 2 |
| **Vulnerabilities** | 0 (-1) | 0 (-1) | 0 |
| **Code Smells** | 316 | 77 | 38 |
| **Security Hotspots** | 2 | 1 | 2 |
| **Duplicated Lines (%)** | 19.2 | 1.6 | 0.5 |
| **Coverage (%)** | 45.6 (+33.3) | 61.7 (+26.7) | 69.8 |
| **Technical Debt (min)** | 1 611 | 2 843 | 690 |
| **Maintainability Rating** | A | A | A |
| **Reliability Rating** | B | A | C |
| **Security Rating** | A | A | A |
| **Alert Status** | OK | OK | OK |

## A.3 Distribución de issues por severidad

| Severidad | Frontend | Backend | Motor CSP |
|---|---|---|---|
| BLOCKER | 0 | 0 | 0 |
| CRITICAL | 14 (-6) | 11 | 23 |
| MAJOR | 122 (-1) | 7 (+1) | 11 |
| MINOR | 180 | 31 (+8) | 6 |
| INFO | 4 | 48 (+11) | 0 |

## A.4 Vulnerabilidades detectadas y mitigadas

### Backend
- ~~**[BLOCKER]** `backend/src/index.ts` - Remove this hard-coded password.~~
  - **Estado:** Mitigado.
  - **Riesgo original:** Cadena de conexión `MONGO_URI` expuesta con credenciales en texto plano.
  - **Mitigación:** Se eliminó la URI y se forzó el uso de `dotenv` para inyectarla desde el entorno.

### Frontend
- ~~**[MAJOR]** `frontend/src/pages/Login.tsx` - Review this potentially hard-coded password.~~
  - **Estado:** Mitigado.
  - **Riesgo original:** Falso positivo por etiquetas genéricas (`Contraseña:`) que Sonar detectó como credencial.
  - **Mitigación:** Se agregó el comentario de supresión `// NOSONAR` justificando que es una etiqueta de interfaz de usuario.

## A.5 Interpretación técnica por capa

### Frontend
- **Puntos fuertes:** Security Rating A tras descartar falsos positivos. Incremento radical en la cobertura gracias a la incorporación de Vitest.
- **Puntos críticos:** Alta tasa de código duplicado (19.2%) que sugiere la necesidad urgente de refactorizar y abstraer componentes de UI y lógica de Hooks.

### Backend
- **Puntos fuertes:** Cero bugs y cero vulnerabilidades reales. Código excepcionalmente mantenible gracias a la separación por casos de uso.
- **Recomendación:** Continuar agregando pruebas de endpoints (`Supertest`) para alcanzar el 70% de cobertura.

### Motor CSP
- **Puntos fuertes:** Baja duplicación y cobertura cercana al umbral óptimo (69.8%).
- **Puntos críticos:** Dos bugs lógicos de tipado estricto que lo penalizan con un Reliability Rating C.

## A.6 Dashboards y Capturas de Evidencia

### Dashboard Frontend
![Dashboard Frontend - SonarQube](Capturas/DashboardFrontend.png)
*Figura A.1: Panel de control de SonarQube para el Frontend.*

### Dashboard Backend
![Dashboard Backend - SonarQube](Capturas/DashboardBackend.png)
*Figura A.2: Panel de control del Backend evidenciando ausencia de bugs.*

### Dashboard Motor CSP
![Dashboard Motor - SonarQube](Capturas/DashboardMotor.png)
*Figura A.3: Resultados del Motor CSP y su cobertura de código.*

## A.7 Plan de mejoras post-análisis

| # | Mejora | Capa | Estado | Evidencia |
|---|---|---|---|---|
| 1 | Externalizar credenciales (`index.ts`) | Backend | ✅ Completado | `.env.example`, `index.ts` |
| 2 | Revisar hard-coded password en Login | Frontend | ✅ Completado | `Login.tsx` |
| 3 | Aumentar cobertura general > 70% | Frontend/Backend | 🔄 En progreso | `lcov.info` |
| 4 | Reducir duplicación abstraendo componentes | Frontend | ⏳ Pendiente | TBD |
