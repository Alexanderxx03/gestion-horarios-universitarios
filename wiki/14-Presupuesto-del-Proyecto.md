# 14 · Presupuesto del Proyecto

## Introducción

Este documento presenta el análisis económico integral del proyecto **Gestión de Horarios Universitarios**, considerando recursos humanos, infraestructura tecnológica y costos indirectos. Se incluye la evolución temporal de costos y un análisis de sostenibilidad bajo el enfoque **Green Software Foundation**.

---

## 1. Fuentes de Costo

### 1.1 Recursos Humanos (RRHH)

El equipo está compuesto por 4 roles con dedicación parcial (académica). La tarifa referencial se basa en el mercado de desarrollo de software junior/semi-senior en Latinoamérica (2026), proyectada a horas efectivas de trabajo académico.

| Rol                        | Integrantes | Tarifa/hora (USD) | Horas/Sprint | Sprints Activos | Costo Total |
| -------------------------- | :---------: | :---------------: | :----------: | :-------------: | :---------: |
| Scrum Master / Analista    |      1      |       $12/h       |     20h      |        4        |  **$960**   |
| Product Owner / Arquitecto |      1      |       $15/h       |     18h      |        4        | **$1,080**  |
| Full-Stack Developer       |      1      |       $14/h       |     25h      |        4        | **$1,400**  |
| Algorithms Engineer (CSP)  |      1      |       $16/h       |     22h      |        4        | **$1,408**  |
| **TOTAL RRHH**             |    **4**    |                   |              |                 | **$4,848**  |

> **Nota:** Las horas incluyen ceremonias Scrum (Planning, Daily, Review, Retro), desarrollo, testing y documentación. No incluyen horas del Sprint 0 (documentación inicial sin desarrollo).

**Sprint 0 adicional (documentación):**

| Actividad                                     | Horas Totales |  Costo   |
| --------------------------------------------- | :-----------: | :------: |
| Documentación técnica (7 docs + Wiki inicial) |      32h      |   $384   |
| Configuración repositorio y herramientas      |      8h       |   $96    |
| **Subtotal Sprint 0**                         |    **40h**    | **$480** |

**Total RRHH del proyecto:** $4,848 + $480 = **$5,328**

---

### 1.2 Infraestructura Tecnológica

#### Firebase (Google Cloud)

El proyecto utiliza Firebase en plan **Blaze (pay-as-you-go)**, que incluye un generoso free tier mensual. La estimación se basa en el uso proyectado para el período académico (5 meses).

| Servicio Firebase           | Free Tier/mes                         | Uso Estimado/mes          | Costo/mes | Costo 5 meses |
| --------------------------- | ------------------------------------- | ------------------------- | :-------: | :-----------: |
| **Firebase Authentication** | 10,000 verificaciones                 | ~200 usuarios activos     |   $0.00   |   **$0.00**   |
| **Cloud Firestore**         | 1 GB almacenamiento, 50K lecturas/día | ~0.1 GB, ~5K lecturas/día |   $0.00   |   **$0.00**   |
| **Cloud Functions**         | 2M invocaciones/mes                   | ~5,000 invocaciones/mes   |   $0.00   |   **$0.00**   |
| **Firebase Hosting**        | 10 GB ancho de banda/mes              | ~2 GB/mes                 |   $0.00   |   **$0.00**   |
| **Subtotal Firebase**       |                                       |                           | **$0.00** |   **$0.00**   |

> ✅ **El proyecto opera completamente dentro del free tier de Firebase** durante el período académico. El plan Blaze solo cobra cuando se supera el free tier — no aplicable a este contexto universitario.

#### Herramientas de Desarrollo (SaaS)

| Herramienta                        | Plan           | Costo/mes | Costo 5 meses |
| ---------------------------------- | -------------- | :-------: | :-----------: |
| **GitHub** (repositorio + Actions) | Free (público) |   $0.00   |   **$0.00**   |
| **GitHub Projects** (board ágil)   | Free           |   $0.00   |   **$0.00**   |
| **VS Code** (IDE)                  | Free           |   $0.00   |   **$0.00**   |
| **Node.js + npm**                  | Open Source    |   $0.00   |   **$0.00**   |
| **Firebase CLI**                   | Free           |   $0.00   |   **$0.00**   |
| **Subtotal Herramientas**          |                | **$0.00** |   **$0.00**   |

**Total Infraestructura:** **$0.00** ← ventaja estratégica del stack serverless

---

### 1.3 Costos Indirectos

| Concepto                     | Detalle                                            |       Costo Estimado       |
| ---------------------------- | -------------------------------------------------- | :------------------------: |
| **Conectividad a Internet**  | 4 integrantes × $30/mes × 5 meses                  |            $600            |
| **Amortización de hardware** | 4 laptops × valor amortizado por 5 meses           |            $200            |
| **Electricidad**             | Costo estimado por uso de equipos (promedio Latam) |            $60             |
| **Espacio de trabajo**       | Uso de instalaciones universitarias (valorado)     | $0 (incluido en matrícula) |
| **Total Costos Indirectos**  |                                                    |          **$860**          |

---

## 2. Resumen de Costos Totales

| Categoría                   | Monto (USD) | % del Total |
| --------------------------- | :---------: | :---------: |
| Recursos Humanos (RRHH)     |   $5,328    |  **85.6%**  |
| Infraestructura Tecnológica |     $0      |  **0.0%**   |
| Costos Indirectos           |    $860     |  **13.8%**  |
| Imprevistos (5% de RRHH)    |    $266     |  **4.3%**   |
| **TOTAL PROYECTO**          | **$6,454**  |  **100%**   |

---

## 3. Evolución de Costos

### 3.1 Costo por Sprint

| Sprint        | Período       |    RRHH    | Infra  | Indirecto | Total Sprint |
| ------------- | ------------- | :--------: | :----: | :-------: | :----------: |
| Sprint 0      | Abr 07–18     |    $480    |   $0   |   $172    |   **$652**   |
| Sprint 1      | Abr 21–May 02 |   $1,212   |   $0   |   $172    |  **$1,384**  |
| Sprint 2      | May 05–16     |   $1,212   |   $0   |   $172    |  **$1,384**  |
| Sprint 3      | May 19–30     |   $1,212   |   $0   |   $172    |  **$1,384**  |
| Sprint 4      | Jun 02–13     |   $1,212   |   $0   |   $172    |  **$1,384**  |
| Cierre/Buffer | Jun 14–20     |    $266    |   $0   |    $0     |   **$266**   |
| **TOTAL**     |               | **$5,594** | **$0** | **$860**  |  **$6,454**  |

### 3.2 Costo Acumulado del Proyecto

```
Costo Acumulado (USD)
│
$7,000 ┤
$6,454 ┤─────────────────────────────────────────●
$6,000 ┤                                  ●
$5,500 ┤
$5,000 ┤                          ●
$4,500 ┤
$4,070 ┤                    ●
$3,500 ┤
$3,000 ┤
$2,686 ┤             ●
$2,000 ┤
$1,500 ┤
$1,302 ┤      ●
$1,000 ┤
  $652 ┤ ●
    $0 └──────────────────────────────────────────►
       S0    S1    S2    S3    S4   Cierre
```

| Hito     | Costo Acumulado | Valor Entregado                                   |
| -------- | :-------------: | ------------------------------------------------- |
| Sprint 0 |      $652       | Documentación completa, repositorio, arquitectura |
| Sprint 1 |     $2,036      | Auth funcional, CRUD base, Firestore Rules        |
| Sprint 2 |     $3,420      | Motor CSP operativo, módulo de matrícula          |
| Sprint 3 |     $4,804      | UI completa, exportación PDF/Excel, grilla visual |
| Sprint 4 |     $6,188      | Sistema auditado, testado, listo para producción  |
| Cierre   |     $6,454      | Documentación final, video presentación           |

---

## 4. Análisis: Relación Complejidad CSP y Costo

### ¿Por qué el Motor CSP justifica el mayor costo de desarrollo?

El Motor CSP (HU-07) fue el ítem con **mayor costo de desarrollo individual** del proyecto:

| Componente          | Story Points | Días de Ciclo | Horas Estimadas | Costo Estimado |
| ------------------- | :----------: | :-----------: | :-------------: | :------------: |
| HU-07: Motor CSP    |    13 SP     |    8 días     |    ~40 horas    |    **$580**    |
| HU-01: Login Google |     3 SP     |    3 días     |    ~10 horas    |      $145      |
| HU-06: Matrícula    |     8 SP     |    5 días     |    ~22 horas    |      $319      |

**Factores de incremento de costo en el Motor CSP:**

1. **Complejidad NP-hard:** El problema de asignación de horarios tiene complejidad exponencial en el peor caso. Con n cursos y d valores de dominio, el espacio de búsqueda es O(d^n). Para 30 cursos con 10 posibles slots cada uno: 10^30 combinaciones. Las heurísticas MRV y Forward Checking reducen esto dramáticamente, pero diseñarlas correctamente requiere investigación previa.

2. **Bug inesperado (HC3):** El bug en la restricción de solapamiento de estudiantes consumió ~8 horas adicionales no planificadas, elevando el costo real ~$120 sobre lo estimado.

3. **Testing especializado:** Las pruebas del motor requieren fixtures con múltiples cursos, docentes y aulas interconectados — más complejos que los tests unitarios CRUD estándar.

4. **Conocimiento no transferible:** El dominio del algoritmo CSP (variables, dominios, propagación de restricciones) es especializado y requirió estudio previo por parte del Algorithms Engineer.

### Drivers principales de costo del proyecto

| Driver                              | Impacto en Costo              | Estrategia de Mitigación                 |
| ----------------------------------- | ----------------------------- | ---------------------------------------- |
| Complejidad del algoritmo CSP       | Alto (+$580 vs. media por SP) | Spike de investigación previo al sprint  |
| Primer uso de Firebase en el equipo | Medio (+3 SP deuda en S1)     | Tutorial de onboarding en Sprint 0       |
| UI Premium (glassmorphism)          | Medio (+$280 vs. estimado)    | Template base reutilizable entre equipos |
| Testing de Firestore Rules          | Bajo (dentro del estimado)    | Documentación de patrones de test        |

---

## 5. Análisis de Sostenibilidad — Enfoque Green Software

El proyecto adopta los principios de la **Green Software Foundation** desde la decisión arquitectónica inicial.

### 5.1 Impacto Ambiental del Stack Serverless

| Arquitectura Alternativa                | Consumo Energético                                | CO₂ Estimado/mes |
| --------------------------------------- | ------------------------------------------------- | ---------------- |
| Servidor VPS dedicado (siempre activo)  | ~200W constantes × 720h = 144 kWh/mes             | ~64 kg CO₂       |
| Contenedor Docker en cloud (idle)       | ~50W × 720h = 36 kWh/mes                          | ~16 kg CO₂       |
| **Firebase Serverless (este proyecto)** | **Solo activo durante requests (<1% del tiempo)** | **~0.3 kg CO₂**  |

> **Reducción de huella de carbono:** El stack serverless consume **~98% menos energía** que un servidor VPS dedicado equivalente.

### 5.2 Prácticas Green Software Implementadas

| Práctica                    | Implementación                                             | Impacto                                   |
| --------------------------- | ---------------------------------------------------------- | ----------------------------------------- |
| **Serverless Computing**    | Firebase Cloud Functions solo ejecutan al ser invocadas    | Sin recursos idle                         |
| **Tree-shaking con Vite**   | Bundle elimina código muerto automáticamente               | Bundle ~40% más pequeño                   |
| **SDK modular de Firebase** | Solo se importan los módulos usados                        | Menos JS cargado por el navegador         |
| **Lazy loading de rutas**   | Las páginas se cargan bajo demanda (React.lazy)            | Menos datos transferidos en carga inicial |
| **CDN Firebase Hosting**    | El contenido se sirve desde el edge más cercano al usuario | Menor latencia + menor consumo de red     |
| **Firestore offline cache** | Los datos frecuentes se cachean en el cliente              | Menos peticiones al servidor              |

### 5.3 Costo vs. Sostenibilidad: Doble Beneficio

El enfoque serverless no solo reduce el impacto ambiental, sino que también **reduce el costo de infraestructura a $0** durante el período académico, al operar dentro del free tier de Firebase. Esto demuestra que sostenibilidad y economía son complementarios cuando se elige la arquitectura correcta.

**Proyección de costo para escala real (1,000 usuarios activos/mes):**

| Servicio                                         |    Costo mensual estimado    |
| ------------------------------------------------ | :--------------------------: |
| Firebase Auth (1,000 verificaciones)             | $0.00 (dentro del free tier) |
| Firestore (estimado: 500K lecturas/mes)          |            ~$0.30            |
| Cloud Functions (estimado: 50K invocaciones/mes) |            ~$0.04            |
| Firebase Hosting (estimado: 5 GB/mes)            | $0.00 (dentro del free tier) |
| **Total infraestructura para 1,000 usuarios**    |        **~$0.34/mes**        |

Este costo marginal extremadamente bajo confirma la **alta sostenibilidad económica** del sistema para su despliegue en contextos universitarios reales.

---

> 🔗 Anterior: [← Métricas Ágiles](13-Metricas-Agiles) | Siguiente: [Riesgos →](15-Gestion-Riesgos-Oportunidades)
