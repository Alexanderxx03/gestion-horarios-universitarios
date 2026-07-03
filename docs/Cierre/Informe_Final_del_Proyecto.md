# Informe Final del Proyecto de Desarrollo (UniHorarios)

## 1. Resumen Ejecutivo (Executive Summary)

El proyecto **UniHorarios** nació como respuesta a un déficit operativo crítico dentro de la Dirección Académica de la Escuela de Sistemas: la asignación de horarios semestrales. Históricamente, este proceso se realizaba empleando inmensas hojas de cálculo de Microsoft Excel (Shadow IT), tomando a 2 Coordinadores Académicos más de 30 días laborables para encajar las piezas sin colisiones, generando estrés, cruces de aulas invisibles y descontento en el gremio docente.

La propuesta de valor fue construir, en un lapso de 6 meses (divididos en 4 Sprints bajo metodología Scrum), un sistema web integral (SPA React) impulsado por un poderoso algoritmo heurístico (Constraint Satisfaction Problem). Hoy, el proceso de cruce de horarios que antes tomaba un mes, se resuelve computacionalmente en **menos de 5 segundos**. El retorno de inversión (ROI) en horas-hombre liberadas para tareas de mayor valor estratégico justificó la inversión íntegra del proyecto durante su primer trimestre de uso.

---

## 2. Evaluación de Objetivos Fundacionales (Scope Assessment)

Los objetivos de negocio declarados en la Visión del Proyecto (Sprint 0) fueron sometidos a evaluación frente al producto final en producción:

| Meta Estratégica (Visión) | Resultado Técnico Obtenido | Estado | Comentario Forense |
|:---|:---|:---:|:---|
| **Digitalizar Catálogos:** Migrar la malla física y aulas a una base de datos centralizada. | Se diseñó un esquema relacional anidado en MongoDB Atlas. Módulo CRUD 100% operativo y protegido con JWT. | ✅ CUMPLE | La interfaz de React es lo suficientemente intuitiva para no requerir IT en la actualización del catálogo. |
| **Automatizar Asignación (El Motor):** Reducir a 0 los cruces de horario. | Algoritmo CSP implementado en Node.js (Worker Threads). Sortea 7 tipos de restricciones (Aforo, Exclusividad, Prioridad). | ✅ CUMPLE | El hito tecnológico más grande del equipo. Resuelve matrices de alta densidad en milisegundos. |
| **UX Intuitivo para Docentes:** Permitir que los profesores declaren sus horas disponibles online. | Autenticación basada en roles. El docente cuenta con un calendario *Drag & Drop* para pintar sus celdas verdes (disponibles). | ✅ CUMPLE | Elimina el flujo burocrático de enviar correos con disponibilidades, centralizando el input. |
| **Despliegue Cero Fricción (Cloud):** No depender de servidores físicos locales sujetos a apagones. | Arquitectura Serverless / PaaS. Base de datos en MongoDB Atlas, Backend en Render, Frontend en Vercel. | ✅ CUMPLE | Tolerancia a fallos de zona garantizada con 99.9% Uptime SLA. |

---

## 3. Desempeño Financiero (Financial Report)

El proyecto se enmarcó dentro de un modelo de "Costo Predecible" (Time & Materials con Techo). A continuación, se presenta la balanza financiera auditable:

### 3.1 Presupuesto Estimado vs Gasto Real (CAPEX y OPEX)

| Rubro Contable (WBS) | Estimación Original (BAC) | Gasto Consolidado (AC) | Desviación de Costo (CV) |
|:---|---:|---:|---:|
| **Horas-Hombre Desarrollo (Frontend & Backend)** | $ 9,500.00 | $ 9,200.00 | + $ 300.00 (Eficiencia) |
| **Control de Calidad (QA / Testing Jest+Vitest)** | $ 1,500.00 | $ 1,800.00 | - $ 300.00 (Sobrecosto) |
| **Infraestructura Cloud (MongoDB, Dominios, SSL)**| $ 500.00 | $ 150.00 | + $ 350.00 (Ahorro PaaS) |
| **Capacitación, UI/UX (Figma) y Otros** | $ 1,000.00 | $ 700.00 | + $ 300.00 (Reutilización) |
| **TOTAL GENERAL** | **$ 12,500.00** | **$ 11,850.00** | **+ $ 650.00 (Saldo Positivo)** |

### 3.2 Justificación de Varianzas
- **Sobrecosto en QA:** El descubrimiento temprano de que el Algoritmo CSP entraba en un bucle infinito (Deadlock) obligó a invertir horas adicionales de ingeniería para orquestar los *Worker Threads*, encareciendo la fase de pruebas.
- **Ahorro Masivo en Infraestructura:** En lugar de aprovisionar un servidor dedicado EC2 de AWS que costaría 40$ mensuales, el equipo optimizó el *bundle* de Vite para desplegar los estáticos globalmente mediante Vercel (Costo cero en el *Free Tier* institucional).

---

## 4. Desempeño del Cronograma (Schedule Performance)

El ciclo de desarrollo iterativo (Scrum) demostró su flexibilidad adaptativa frente a los requisitos descubiertos tardíamente.

- **Días Laborables Planificados:** 120 días (6 meses).
- **Desviación de Tiempo Real:** + 3 Días laborables.
- **Punto de Quiebre (Bottleneck):** El cierre del Sprint 3 sufrió fricción cuando las bibliotecas de generación de PDF estallaron debido a un conflicto de tipos en Typescript estricto. Esto aplazó la integración continua por un fin de semana completo. Sin embargo, el colchón de holgura (Buffer) del Sprint 4 absorbió casi todo el impacto.

---

## 5. Criterios de Éxito de Software (Métricas Ágiles)

La calidad final no es subjetiva. El informe arroja los siguientes KPIs técnicos capturados durante el despliegue del Release Candidate (RC-1):
- **Deuda Técnica (Technical Debt Ratio):** 1.2% (Muy por debajo del umbral tóxico del 5%).
- **Velocidad de Carga Inicial (First Contentful Paint):** 0.8 Segundos (Cumple estándares Core Web Vitals de Google).
- **Densidad de Defectos (Defect Density):** 0.15 Bugs críticos por cada 1000 líneas de código (KLOC). Excelente para un MVP de esta envergadura.
- **Satisfacción del Usuario (SUS):** 77.5 / 100.

---

## 6. Recomendaciones Estratégicas para la Fase 2 (Next Steps)

El proyecto UniHorarios se despide del laboratorio de desarrollo como un producto maduro, robusto y económicamente viable. Sin embargo, el diseño del software fue concebido para ser escalable (Open-Closed Principle). 

Como sugerencia oficial del Líder Técnico, se recomienda a la gerencia aprobar un presupuesto menor para una **Fase 2 (Sprints 5 y 6)** enfocada en la expansión de capacidades:
1. **Módulo de Inteligencia de Aulas:** Integración con sensores IoT o APIs de cerraduras electrónicas para monitorear la ocupación real vs ocupación teórica.
2. **Aplicación Móvil Híbrida (React Native):** Notificaciones Push automáticas a los estudiantes si un docente reporta incapacidad y la clase se cancela de improviso, consumiendo la API actual.
