# 14 · Presupuesto del Proyecto

## Introducción

Este documento presenta el análisis económico integral del proyecto **Gestión de Horarios Universitarios**, considerando recursos humanos, infraestructura tecnológica y costos indirectos. Se incluye la evolución temporal de costos y un análisis de sostenibilidad bajo el enfoque **Green Software Foundation**. Todos los montos están expresados en **Soles Peruanos (PEN / S/)**.

---

## 1. Fuentes de Costo

### 1.1 Recursos Humanos (RRHH)

El equipo está compuesto por 2 integrantes con dedicación parcial (académica), asumiendo roles cruzados. La tarifa referencial se basa en el mercado de desarrollo de software junior/semi-senior en Perú (2026), proyectada a horas efectivas de trabajo académico.

| Integrante               | Roles Asumidos                  | Tarifa Promedio | Horas/Sprint | Sprints Activos |  Costo Total  |
| :----------------------- | :------------------------------ | :-------------: | :----------: | :-------------: | :-----------: |
| **Jheyson Paul Paytan**  | Scrum Master, Product Owner     |   S/ 49.70/h    |     38h      |        4        | **S/ 7,560**  |
| **Jack Alexander Rojas** | Full-Stack Dev, Algorithms Eng. |   S/ 54.70/h    |     47h      |        4        | **S/ 10,280** |
| **TOTAL RRHH**           |                                 |                 |   **85h**    |                 | **S/ 17,840** |

> **Nota:** Las horas incluyen ceremonias Scrum (Planning, Daily, Review, Retro), desarrollo, testing y documentación. No incluyen horas del Sprint 0 (documentación inicial sin desarrollo).

**Sprint 0 adicional (documentación):**

| Actividad                                      | Horas Totales | Costo Promedio |
| :--------------------------------------------- | :-----------: | :------------: |
| Documentación técnica y arquitectura (Jheyson) |      20h      |    S/ 1,000    |
| Configuración de repositorio y entorno (Jack)  |      20h      |    S/ 1,000    |
| **Subtotal Sprint 0**                          |    **40h**    |  **S/ 2,000**  |

**Total RRHH del proyecto:** S/ 17,840 + S/ 2,000 = **S/ 19,840**

---

### 1.2 Infraestructura Tecnológica (Arquitectura MERN)

El proyecto utiliza el stack **MERN (MongoDB, Express, React, Node.js)** desplegado en plataformas con planes gratuitos (Free Tier), ideal para el período académico (5 meses).

| Servicio MERN                  | Plataforma / Plan               | Uso Estimado/mes         |  Costo/mes  | Costo 5 meses |
| ------------------------------ | ------------------------------- | ------------------------ | :---------: | :-----------: |
| **Base de Datos (MongoDB)**    | MongoDB Atlas (M0 Free Cluster) | ~0.1 GB, bajas lecturas  |   S/ 0.00   |  **S/ 0.00**  |
| **Backend API (Node/Express)** | Render / Heroku (Free Tier)     | ~5,000 peticiones/mes    |   S/ 0.00   |  **S/ 0.00**  |
| **Frontend SPA (React)**       | Vercel / Netlify (Free Tier)    | ~2 GB ancho de banda/mes |   S/ 0.00   |  **S/ 0.00**  |
| **Subtotal Infraestructura**   |                                 |                          | **S/ 0.00** |  **S/ 0.00**  |

> ✅ **El proyecto opera completamente dentro de los planes gratuitos** durante el período académico. Los proveedores solo cobran cuando se superan las cuotas base — no aplicable a este contexto universitario de prueba.

#### Herramientas de Desarrollo (SaaS)

| Herramienta                        | Plan           |  Costo/mes  | Costo 5 meses |
| ---------------------------------- | -------------- | :---------: | :-----------: |
| **GitHub** (repositorio + Actions) | Free (público) |   S/ 0.00   |  **S/ 0.00**  |
| **GitHub Projects** (board ágil)   | Free           |   S/ 0.00   |  **S/ 0.00**  |
| **VS Code** (IDE)                  | Free           |   S/ 0.00   |  **S/ 0.00**  |
| **Node.js + npm**                  | Open Source    |   S/ 0.00   |  **S/ 0.00**  |
| **Subtotal Herramientas**          |                | **S/ 0.00** |  **S/ 0.00**  |

**Total Infraestructura:** **S/ 0.00** ← ventaja estratégica del stack MERN con servicios cloud gratuitos.

---

### 1.3 Costos Indirectos

| Concepto                     | Detalle                                        | Costo Estimado  |
| ---------------------------- | ---------------------------------------------- | :-------------: |
| **Conectividad a Internet**  | 2 integrantes × S/ 100/mes × 5 meses           |    S/ 1,000     |
| **Amortización de hardware** | 2 laptops × valor amortizado por 5 meses       |     S/ 400      |
| **Electricidad**             | Costo estimado por uso de equipos (2 PCs)      |     S/ 100      |
| **Espacio de trabajo**       | Uso de instalaciones universitarias (valorado) | S/ 0 (incluido) |
| **Total Costos Indirectos**  |                                                |  **S/ 1,500**   |

---

## 2. Resumen de Costos Totales

| Categoría                   |  Monto (PEN)  | % del Total |
| --------------------------- | :-----------: | :---------: |
| Recursos Humanos (RRHH)     |   S/ 19,840   |  **88.8%**  |
| Infraestructura Tecnológica |     S/ 0      |  **0.0%**   |
| Costos Indirectos           |   S/ 1,500    |  **6.7%**   |
| Imprevistos (5% de RRHH)    |    S/ 992     |  **4.5%**   |
| **TOTAL PROYECTO**          | **S/ 22,332** |  **100%**   |

---

## 3. Evolución de Costos

### 3.1 Costo por Sprint

| Sprint        | Período       |     RRHH      |  Infra   |  Indirecto   | Total Sprint  |
| ------------- | ------------- | :-----------: | :------: | :----------: | :-----------: |
| Sprint 0      | Abr 07–18     |   S/ 2,000    |   S/ 0   |    S/ 300    | **S/ 2,300**  |
| Sprint 1      | Abr 21–May 02 |   S/ 4,460    |   S/ 0   |    S/ 300    | **S/ 4,760**  |
| Sprint 2      | May 05–16     |   S/ 4,460    |   S/ 0   |    S/ 300    | **S/ 4,760**  |
| Sprint 3      | May 19–30     |   S/ 4,460    |   S/ 0   |    S/ 300    | **S/ 4,760**  |
| Sprint 4      | Jun 02–13     |   S/ 4,460    |   S/ 0   |    S/ 300    | **S/ 4,760**  |
| Cierre/Buffer | Jun 14–20     |    S/ 992     |   S/ 0   |     S/ 0     |  **S/ 992**   |
| **TOTAL**     |               | **S/ 19,832** | **S/ 0** | **S/ 1,500** | **S/ 22,332** |

### 3.2 Costo Acumulado del Proyecto

```
Costo Acumulado (PEN)
│
S/ 23,000 ┤
S/ 22,332 ┤─────────────────────────────────────────●
S/ 20,000 ┤
S/ 16,580 ┤                                  ●
S/ 15,000 ┤
S/ 11,820 ┤                          ●
S/ 10,000 ┤
S/ 7,060  ┤                    ●
S/ 5,000  ┤
S/ 2,300  ┤             ●
S/ 0      └──────────────────────────────────────────►
           S0    S1    S2    S3    S4   Cierre
```

| Hito     | Costo Acumulado | Valor Entregado                                   |
| -------- | :-------------: | ------------------------------------------------- |
| Sprint 0 |    S/ 2,300     | Documentación completa, repositorio, arquitectura |
| Sprint 1 |    S/ 7,060     | Backend Node.js funcional, CRUD base en React     |
| Sprint 2 |    S/ 11,820    | Motor CSP operativo, módulo de matrícula          |
| Sprint 3 |    S/ 16,580    | UI completa, exportación PDF/Excel, grilla visual |
| Sprint 4 |    S/ 21,340    | Sistema auditado, testado, listo para producción  |
| Cierre   |    S/ 22,332    | Documentación final, video presentación           |

---

## 4. Análisis: Relación Complejidad CSP y Costo

### ¿Por qué el Motor CSP justifica el mayor costo de desarrollo?

El Motor CSP (HU-07) fue el ítem con **mayor costo de desarrollo individual** del proyecto:

| Componente       | Story Points | Días de Ciclo | Horas Estimadas | Costo Estimado |
| ---------------- | :----------: | :-----------: | :-------------: | :------------: |
| HU-07: Motor CSP |    13 SP     |    8 días     |    ~40 horas    |  **S/ 2,400**  |
| HU-01: Login     |     3 SP     |    3 días     |    ~10 horas    |     S/ 500     |
| HU-06: Matrícula |     8 SP     |    5 días     |    ~22 horas    |    S/ 1,100    |

**Factores de incremento de costo en el Motor CSP:**

1. **Complejidad NP-hard:** El problema de asignación de horarios tiene complejidad exponencial en el peor caso. Con n cursos y d valores de dominio, el espacio de búsqueda es O(d^n). Las heurísticas MRV y Forward Checking reducen esto dramáticamente, pero diseñarlas correctamente requiere investigación previa.

2. **Bug inesperado (HC3):** El bug en la restricción de solapamiento consumió horas adicionales no planificadas, elevando el costo real sobre lo estimado.

3. **Testing especializado:** Las pruebas del motor requieren fixtures con múltiples cursos, docentes y aulas interconectados.

4. **Conocimiento no transferible:** El dominio del algoritmo CSP es especializado y requirió estudio previo por parte del Algorithms Engineer.

### Drivers principales de costo del proyecto

| Driver                              | Impacto en Costo               | Estrategia de Mitigación                 |
| ----------------------------------- | ------------------------------ | ---------------------------------------- |
| Complejidad del algoritmo CSP       | Alto (+S/ 1,500 vs. media)     | Spike de investigación previo al sprint  |
| Primer uso del stack MERN en equipo | Medio (+3 SP deuda en S1)      | Tutorial de onboarding en Sprint 0       |
| UI Premium (glassmorphism)          | Medio (+S/ 1,000 vs. estimado) | Template base reutilizable entre equipos |

---

## 5. Análisis de Sostenibilidad — Enfoque Green Software

El proyecto adopta los principios de la **Green Software Foundation** desde la decisión arquitectónica inicial.

### 5.1 Impacto Ambiental de Arquitecturas MERN Modernas

| Arquitectura Alternativa               | Consumo Energético                                | CO₂ Estimado/mes |
| -------------------------------------- | ------------------------------------------------- | ---------------- |
| Servidor VPS dedicado (siempre activo) | ~200W constantes × 720h = 144 kWh/mes             | ~64 kg CO₂       |
| **Servicios Cloud Serverless MERN**    | **Solo activo durante requests (<1% del tiempo)** | **~0.3 kg CO₂**  |

> **Reducción de huella de carbono:** Alojar el Backend y Frontend en servicios administrados eficientes y con suspensión de actividad (scale-to-zero en free tiers) consume notablemente menos energía que un VPS encendido permanentemente.

### 5.2 Prácticas Green Software Implementadas

| Práctica                  | Implementación                                          | Impacto                                      |
| ------------------------- | ------------------------------------------------------- | -------------------------------------------- |
| **Pausado de BD (Idle)**  | MongoDB Atlas Free Tier optimiza el estado inactivo     | Sin recursos de base de datos desperdiciados |
| **Tree-shaking con Vite** | Bundle elimina código muerto automáticamente            | Bundle ~40% más pequeño                      |
| **Lazy loading de rutas** | Las páginas se cargan bajo demanda (React.lazy)         | Menos datos transferidos en carga inicial    |
| **CDN para Frontend**     | El contenido React se sirve desde Edge Servers (Vercel) | Menor latencia + menor consumo de red        |

### 5.3 Costo vs. Sostenibilidad: Doble Beneficio

El enfoque cloud free-tier no solo reduce el impacto ambiental, sino que también **reduce el costo de infraestructura a S/ 0.00** durante el período académico. Esto demuestra que sostenibilidad y economía son complementarios cuando se elige la arquitectura correcta.

**Proyección de costo para escala real (1,000 usuarios activos/mes):**

| Servicio MERN                                  |     Costo mensual estimado     |
| ---------------------------------------------- | :----------------------------: |
| Frontend Hosting (CDN Vercel/Netlify)          | S/ 0.00 (dentro del free tier) |
| Backend Node.js (Render)                       | S/ 0.00 (dentro del free tier) |
| MongoDB Atlas (Lecturas y transferencias base) |            ~S/ 1.50            |
| **Total infraestructura para 1,000 usuarios**  |        **~S/ 1.50/mes**        |

Este costo marginal extremadamente bajo confirma la **alta sostenibilidad económica** del sistema MERN para su despliegue en contextos universitarios reales.

---

> 🔗 Anterior: [← Métricas Ágiles](13-Metricas-Agiles.md) | Siguiente: [Riesgos →](15-Gestion-Riesgos-Oportunidades.md)
