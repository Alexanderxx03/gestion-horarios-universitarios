# 26. Informe Final de Lecciones Aprendidas

Este documento consolida y analiza de manera crítica el aprendizaje organizacional generado a lo largo del ciclo de vida del proyecto. Extraído directamente de las sesiones de Retrospectiva de Sprints.

## 1. Buenas Prácticas Identificadas (Qué funcionó bien)

| Práctica / Estrategia | Impacto en el Proyecto | Recomendación para Futuros Equipos |
|---|---|---|
| **Spec-Driven Development (SDD)** | Evitó ambigüedades en las reglas del negocio de los horarios universitarios. | Documentar matemáticamente los Constraints antes de programar reduce el re-trabajo en un 40%. |
| **Principios de Green Software** | Disminuyó el payload del frontend en un 60%, logrando tiempos de carga sub-segundo. | Implementar desde el Sprint 0 métricas de consumo energético y peso de dependencias (Vite + Tree Shaking). |
| **Arquitectura Hexagonal (Puertos y Adaptadores)** | Permitió migrar de Firebase a MongoDB sin reescribir la lógica del motor CSP. | Desacoplar siempre el dominio core de la base de datos para proyectos con lógica matemática profunda. |

## 2. Errores y Lecciones (Qué NO funcionó)

| Problema Identificado | Consecuencia | Acción Correctiva Implementada | Aprendizaje / Recomendación |
|---|---|---|---|
| **Subestimación de NP-Hard** | En el Sprint 2, el algoritmo inicial (Fuerza Bruta) tomaba horas en converger para matrices de 50x50. | Refactorización completa del algoritmo utilizando **MRV** (Minimum Remaining Values) y Poda *Forward Checking*. | No intentar resolver problemas de asignación combinatoria sin heurísticas de poda de árboles de búsqueda. |
| **Interfaces fuertemente acopladas** | Dificultad para hacer Testing Unitario del Frontend en fases tempranas. | Implementación de **Zustand** para aislar el estado global y mockeo nativo con Vitest. | Separar el estado de los componentes de React desde el día 1. |

## 3. Oportunidades de Mejora Continua

1. **Integración Continua Completa (CI/CD):** En futuros proyectos, automatizar la ejecución de *SonarQube* en cada Pull Request mediante GitHub Actions, en lugar de hacerlo de manera local/semi-automatizada.
2. **Test E2E Automatizados con Cypress:** Aunque el motor CSP fue testeado rigurosamente, los flujos completos de interfaz podrían beneficiarse de herramientas de prueba de regresión visual automatizada.
