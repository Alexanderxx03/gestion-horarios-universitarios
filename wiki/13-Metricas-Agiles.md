# 13 · Métricas Ágiles del Proyecto

## Introducción

El seguimiento de métricas ágiles permite evaluar la salud del proyecto, detectar desviaciones tempranas y fundamentar decisiones de planificación. Este documento presenta las cuatro métricas obligatorias del PFA con datos del equipo, interpretación crítica y propuestas de mejora basadas en evidencia.

---

## 1. Datos Base: Velocidad por Sprint

| Sprint    | Período              | SP Planificados | SP Completados |    Diferencia     |
| --------- | -------------------- | :-------------: | :------------: | :---------------: |
| Sprint 0  | 07 Abr – 18 Abr 2026 |        —        |       —        |   Documentación   |
| Sprint 1  | 21 Abr – 02 May 2026 |       22        |       19       |       -3 SP       |
| Sprint 2  | 05 May – 16 May 2026 |       29        |       26       |       -3 SP       |
| Sprint 3  | 19 May – 30 May 2026 |       21        |       21       |       0 SP        |
| Sprint 4  | 02 Jun – 13 Jun 2026 |       12        |       12       |       0 SP        |
| **TOTAL** |                      |     **84**      |     **78**     | **-6 SP (-7.1%)** |

> **Velocidad promedio:** 19.5 SP/Sprint | **Desviación total:** -7.1% (umbral aceptable ±15%)

---

## 2. Gráfico de Velocidad (Velocity Chart)

```
Story Points
│
30 ┤  ░░░░
28 ┤  ░░░░  ░░░░
26 ┤  ░░░░  ▓▓▓▓
24 ┤  ░░░░  ▓▓▓▓
22 ┤  ░░░░  ▓▓▓▓
20 ┤  ░░░░  ▓▓▓▓  ░░░░  ░░░░
19 ┤  ▓▓▓▓  ▓▓▓▓  ░░░░  ░░░░
17 ┤  ▓▓▓▓  ▓▓▓▓  ░░░░  ░░░░
15 ┤  ▓▓▓▓  ▓▓▓▓  ▓▓▓▓  ░░░░
12 ┤  ▓▓▓▓  ▓▓▓▓  ▓▓▓▓  ▓▓▓▓
 0 └──────────────────────────►
      S1      S2      S3      S4

 ░ = Planificado    ▓ = Completado
```

### Análisis del Gráfico de Velocidad

**Patrones identificados:**

1. **Sprints 1 y 2 — Déficit de 3 SP:** El equipo subestimó la complejidad de la configuración inicial de Firebase (Auth + Firestore Rules) y el scaffold del motor CSP. Ítems técnicos sin referentes históricos generan estimaciones conservadoras imprecisas.

2. **Sprint 3 — Estabilización perfecta:** El equipo completó exactamente los 21 SP planificados. El aprendizaje de sprints anteriores mejoró la calibración de estimaciones (efecto de aprendizaje Scrum).

3. **Sprint 4 — Velocidad reducida (12 SP):** Sprint de hardening: se priorizó calidad (testing, Lighthouse, auditoría OWASP) sobre nuevas funcionalidades. Una velocidad baja aquí es señal positiva de madurez.

**Estabilidad:** Excluyendo el Sprint 4 de hardening, la variación real es 19–26 SP (±16% respecto al promedio) — aceptable para un equipo universitario en su primera experiencia con Scrum.

**Propuesta de mejora:** Aplicar **Planning Poker con sub-tareas técnicas** explícitas para historias que involucren integración de servicios externos (Firebase, APIs), históricamente subestimadas.

---

## 3. Gráfico Burndown — Sprint 2 (Motor CSP)

El Sprint 2 se usa como referencia por ser el más complejo (Motor CSP + Matrícula = 29 SP).

```
Story Points Pendientes
│
29 ┤ × (Real)
26 ┤   ×
24 ┤─ ─ ─ ─ ─ (Ideal)
22 ┤     ×─×
20 ┤
18 ┤         ×            Bug HC3
16 ┤─ ─ ─ ─ ─ ─ ─ ─ ─ ─
14 ┤             ×
12 ┤               ×
 8 ┤                 ×
 4 ┤                   ×
 3 ┤                     × (Cierre: 3 SP deuda)
 0 └──────────────────────────►
   D1 D2 D3 D4 D5 D6 D7 D8 D9 D10
```

| Día    | SP Real | SP Ideal | Evento                             |
| ------ | :-----: | :------: | ---------------------------------- |
| Día 1  |   29    |   29.0   | Inicio Sprint                      |
| Día 2  |   26    |   26.1   | CRUD Docentes completado           |
| Día 3  |   26    |   23.2   | Sin avance (reunión institucional) |
| Día 4  |   22    |   20.3   | Validación prerrequisitos lista    |
| Día 5  |   22    |   17.4   | 🔴 Bug HC3 en forward checking     |
| Día 6  |   18    |   14.5   | Bug resuelto, CSP avanzando        |
| Día 7  |   12    |   11.6   | Motor CSP core completado          |
| Día 8  |    8    |   8.7    | Tests unitarios del motor          |
| Día 9  |    4    |   5.8    | Integración Frontend-Backend       |
| Día 10 |    3    |   0.0    | Sprint cierra con 3 SP en deuda    |

### Análisis del Burndown

**Cuello de botella (Días 4-5):** Bug en `forwardCheck()` donde la restricción HC3 (no solapamiento de estudiantes) no filtraba correctamente slots cuando múltiples estudiantes compartían más de 2 cursos simultáneos. El motor retornaba `null` prematuramente para instancias con ≥15 cursos.

**Resolución:** Rediseño de `conflictsWith()` para comparar conjuntos de `studentIds` (intersección de sets) en lugar de comparar `courseIds` directamente. Commit: `fix(csp): corregir forward checking restricción HC3`.

**Impacto:** Los 3 SP de deuda del Sprint 2 fueron absorbidos al inicio del Sprint 3 sin afectar el roadmap global.

---

## 4. Gráfico Burnup (Trabajo Acumulado)

```
Story Points Acumulados
│
90 ┤──────────────────────────── Alcance Total (84 SP)
80 ┤                        ●──●
70 ┤
66 ┤                  ●
60 ┤
50 ┤
45 ┤          ●
30 ┤
19 ┤    ●
 0 ┤●
   └───────────────────────────►
    S0   S1    S2    S3    S4
```

| Checkpoint |    SP Acumulados     | % del Total |
| ---------- | :------------------: | :---------: |
| Sprint 0   | 0 SP (documentación) |     0%      |
| Sprint 1   |        19 SP         |    22.6%    |
| Sprint 2   |        45 SP         |    53.6%    |
| Sprint 3   |        66 SP         |    78.6%    |
| Sprint 4   |        78 SP         |    92.9%    |
| Cierre     |        84 SP         |    100%     |

### Análisis del Burnup

**Progresión uniforme:** La curva muestra una tendencia ascendente constante sin estancamientos prolongados, indicando un ritmo de entrega sostenible.

**Alcance estable (0% scope creep):** La línea de alcance total (84 SP) no varió durante todo el proyecto. Esto es especialmente significativo dado que el Motor CSP es un componente NP-hard donde los requerimientos pueden escalar inesperadamente.

**Proyección:** Con 78/84 SP completados al cierre del Sprint 4, los 6 SP restantes corresponden a mejoras de UI Premium (HU-11 parcial) y exportación Excel (HU-10), programados como mejoras post-entrega.

---

## 5. Gráfico de Control (Cycle Time)

| HU / Ítem             | Sprint | Días de Ciclo | Estado         |
| --------------------- | ------ | :-----------: | -------------- |
| HU-01: Login Google   | S1     |    3 días     | ✅ Normal      |
| HU-02: CRUD Cursos    | S1     |    4 días     | ✅ Normal      |
| HU-04: CRUD Aulas     | S1     |    2 días     | ✅ Normal      |
| HU-05: Períodos       | S1     |    3 días     | ✅ Normal      |
| Firestore Rules       | S1     |    3 días     | ✅ Normal      |
| HU-03: CRUD Docentes  | S2     |    3 días     | ✅ Normal      |
| HU-06: Matrícula      | S2     |    5 días     | ⚠️ Elevado     |
| **HU-07: Motor CSP**  | **S2** |  **8 días**   | **🔴 Outlier** |
| HU-08: Grilla visual  | S3     |    3 días     | ✅ Normal      |
| HU-09: Export PDF     | S3     |    4 días     | ✅ Normal      |
| **HU-11: UI Premium** | **S3** |  **9 días**   | **🔴 Outlier** |

```
Días de Ciclo
│
 9 ┤                               ● HU-11
 8 ┤                ● HU-07
 7 ┤
 6 ┤─ ─ ─ ─ ─ ─ ─ ─ ─ ─ Límite Control Superior (6.1 días)
 5 ┤           ● HU-06
 4 ┤    ● HU-02                ● HU-09
 3 ┤ ●  ●   ●   ●  ●   ●   ●          Media: 4.1 días
 2 ┤ HU-04
 0 └────────────────────────────────────►
       S1          S2             S3
```

**Media:** 4.1 días | **σ:** 2.0 días | **LCS:** 6.1 días | **Outliers:** 2 de 11 ítems (18%)

### Análisis del Gráfico de Control

**HU-07 Motor CSP (8 días — outlier):** Primera implementación del equipo de un algoritmo CSP en TypeScript + bug bloqueante en HC3. La ausencia de referentes históricos impidió una estimación precisa.

**HU-11 UI Premium (9 días — outlier):** Historia sin precedente técnico en el equipo (glassmorphism, CSS Variables, animaciones). Fue refinada iterativamente con feedback del coordinador durante el sprint.

**Propuesta de mejora:**

1. Descomponer HUs con >5 SP en sub-tareas de ≤3 días antes del Sprint Planning
2. Definir un **spike de investigación** en Sprint 1 para tecnologías no conocidas por el equipo
3. Agregar una columna "En revisión" al tablero Scrum para detectar ítems bloqueados más rápido

---

## 6. Síntesis: Estabilidad del Equipo

| Métrica                  | Valor                 | Evaluación            |
| ------------------------ | --------------------- | --------------------- |
| Velocidad promedio       | 19.5 SP/Sprint        | ✅ Consistente        |
| Coeficiente de variación | 16% (excl. Sprint 4)  | ✅ Aceptable          |
| % ítems dentro del LCS   | 82% (9/11)            | ✅ Estable            |
| Scope creep              | 0%                    | ✅ Excelente          |
| Deuda técnica acumulada  | 6 SP (7.1% del total) | ✅ Controlada         |
| Impedimentos bloqueantes | 1 (bug HC3, 1.5 días) | ✅ Resuelto en sprint |

**Conclusión:** El equipo demostró estabilidad progresiva. Comenzó con estimaciones que generaron pequeños déficits (S1-S2) y logró calibrar su velocidad real (S3-S4). El único impedimento técnico serio fue identificado y resuelto dentro del mismo sprint sin impacto en el roadmap global. La ausencia de scope creep evidencia una gestión del backlog rigurosa, especialmente valiosa en un sistema con restricciones CSP que pueden generar requerimientos emergentes.

---

> 🔗 Anterior: [← Historial de Sprints](12-Historial-Sprints) | Siguiente: [Presupuesto →](14-Presupuesto-del-Proyecto)
