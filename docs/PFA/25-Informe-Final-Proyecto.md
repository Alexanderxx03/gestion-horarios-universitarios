# 25. Informe Final del Proyecto (Final Project Report)

## 1. Resumen Ejecutivo
El proyecto **Gestión de Horarios Universitarios (UniHorarios)** ha concluido formalmente su ciclo de desarrollo y despliegue. El sistema implementa un Motor de Satisfacción de Restricciones (CSP) para erradicar las colisiones de horarios académicos, logrando automatizar un proceso que tomaba semanas en menos de **30 segundos**. 
Este documento presenta el desempeño integral del proyecto, garantizando la **trazabilidad total**, análisis cuantitativo, y evaluación del cumplimiento de los criterios de éxito del *Project Charter*.

---

## 2. Análisis Comparativo: Plan vs Ejecución

### 2.1 Desempeño del Alcance (Scope)
| Métrica / Componente | Planificado (Baseline) | Ejecutado (Real) | Varianza | Justificación |
|---|---|---|---|---|
| **Historias de Usuario (Épicas)** | 42 | 42 | 0 | Alcance Must-Have completado al 100%. |
| **Arquitectura de Base de Datos** | Firebase (NoSQL) | MongoDB (NoSQL) | Cambio Controlado | Se migró a MERN para soportar la complejidad computacional del algoritmo CSP en Node.js de manera óptima. |
| **Tiempo de Generación (CSP)** | < 2 minutos | < 30 segundos | **+300% Mejor** | Implementación exitosa de heurísticas MRV y Forward Checking. |

### 2.2 Desempeño del Cronograma (Schedule)
- **Duración Estimada:** 10 Semanas (Sprints 0 al 4).
- **Duración Real:** 10 Semanas.
- **Velocidad Promedio (Agile Velocity):** Planeada: 18 SP/Sprint. Real: **19.5 SP/Sprint**.
- **Desviaciones:** Retraso del 15% en Sprint 2 (Lógica CSP), recuperado en el Sprint 3 mediante técnicas de *Pair Programming* y reasignación de recursos.

### 2.3 Desempeño de Costos (Cost)
| Rubro | Presupuesto Estimado (USD) | Costo Real (USD) | Índice de Desempeño (CPI) |
|---|---|---|---|
| Recursos Humanos (Mano de obra) | $5,500.00 | $5,500.00 | 1.0 (Óptimo) |
| Infraestructura (Cloud / SaaS) | $450.00 | $0.00 | Infinito |
| Licencias y Herramientas | $500.00 | $150.00 | 3.3 (Ahorro masivo) |
| **TOTAL** | **$6,450.00** | **$5,650.00** | **Ahorro del 12.4%** |

*Nota:* El ahorro en infraestructura se logró aplicando principios de **Green Software**, manteniendo la eficiencia en despliegues gratuitos de Vercel/Render.

---

## 3. Desempeño de Calidad y Métricas Cuantitativas

El proyecto ha superado los estándares internacionales de ingeniería de software exigidos en el plan de calidad:

| Dimensión de Calidad | Métrica Cuantitativa | Resultado vs Meta | Evidencia Verificable |
|---|---|---|---|
| **Calidad de Código Estático** | Deuda Técnica y Vulnerabilidades | **0 Bugs, 0 Vulnerabilities** (Rating A) | [Anexo A: SonarQube](../Pruebas/Anexo_A_SonarQube.md) |
| **Cobertura de Pruebas (TDD)** | Code Coverage Backend (Jest) | **88.5%** (Meta: >80%) | [Anexo G: Backend Jest](../Pruebas/Anexo_G_Pruebas_Backend_Jest.md) |
| **Usabilidad (UI/UX)** | Escala System Usability Scale (SUS) | **86.4 / 100** (Excelente) | [Anexo D: Escala SUS](../Pruebas/Anexo_D_Usabilidad_SUS.md) |
| **Accesibilidad** | Nivel de Conformidad WCAG 2.2 | **100% Nivel AA** | [Anexo C: WCAG](../Pruebas/Anexo_C_WCAG.md) |

---

## 4. Conclusiones Estratégicas y Trazabilidad

1. **Resolución de Problemas Complejos:** El uso de matemáticas discretas e Inteligencia Artificial Simbólica (CSP) ha transformado un problema NP-difícil en una solución de valor comercial y académico en tiempo real.
2. **Sostenibilidad y Ciudadanía:** El proyecto fomenta la "Ciudadanía Glocal" al construir herramientas universitarias inclusivas (WCAG) y respetar principios de eco-eficiencia energética (Green IT), reduciendo el ciclo de vida del carbono del software.
3. **Trazabilidad Total:** Todo requisito definido en la Especificación Formal ha sido implementado, probado y versionado mediante Git Flow, asegurando un control estricto de la configuración.
