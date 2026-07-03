# Acta de Constitución del Proyecto (Project Charter)

**Nombre del Proyecto:** UniHorarios (Motor CSP Algorítmico)  
**Patrocinador (Sponsor Ejecutivo):** Decanatura de la Facultad de Ingeniería  
**Líder del Proyecto (Scrum Master):** Alexander  
**Fecha de Emisión:** 10 de Enero de 2026 (Sprint 0)  
**Versión del Documento:** 1.0 (Aprobado)

---

## 1. Propósito y Autorización Ejecutiva

El presente **Project Charter** es el documento fundacional (El Certificado de Nacimiento) del proyecto UniHorarios. Su firma autoriza formalmente la existencia del proyecto dentro del portafolio de la Universidad y faculta legal y administrativamente al Líder del Proyecto (Alexander) para aplicar los recursos organizacionales y el presupuesto asignado en la consecución de las actividades de desarrollo de software aquí descritas.

Cualquier trabajo de código, arquitectura o diseño UI realizado sin la firma de esta Acta se considera un esfuerzo no autorizado (*Bootlegging*).

---

## 2. Justificación del Negocio (Business Case)

### El Problema Operativo Actual
Actualmente, el proceso de estructurar la carga académica semestral depende de "Conocimiento Tribal" (Información que solo reside en la cabeza de dos personas) y procesos manuales análogos (Pizarras y Hojas de Excel). Cuando los parámetros cambian a última hora (Ej. Un docente titular se enferma o un laboratorio se inunda), re-cuadrar el Excel toma días, generando un Efecto Dominó de cruces de horarios y alumnos desmatriculados.

### La Solución Tecnológica (Valor del Negocio)
El proyecto UniHorarios implementará un paradigma de **Inteligencia Artificial Heurística**. Sustituiremos el "Conocimiento Tribal" por un Motor Matemático de Satisfacción de Restricciones (CSP). El sistema ingerirá todas las leyes físicas (Solo hay 30 sillas) y leyes temporales (Un humano no puede estar en dos lugares) para calcular, en milisegundos, una matriz de horarios óptima. Esto impactará directamente en:
- **Reducción drástica de quejas estudiantiles** por cruce de asignaturas troncales.
- **Liberación del tiempo de la Jefatura**, transformando trabajo operativo en trabajo estratégico.

---

## 3. Objetivos de Alto Nivel y Criterios de Éxito (KPIs)

El éxito del proyecto al momento del cierre será medido contra estos 3 pilares:

1. **Objetivo de Eficiencia (Time-to-Market):** Entregar el MVP (Producto Mínimo Viable) en ambiente de Producción en un plazo improrrogable de **6 meses** (Alineado con el inicio del próximo semestre académico 2026-II).
2. **Objetivo de Calidad Estructural:** El sistema debe compilar con un **0% de vulnerabilidades de severidad Alta/Crítica** en SonarQube/OWASP, garantizando que las bases de datos de los docentes son impenetrables.
3. **Objetivo de Tolerancia Matemática:** El núcleo algorítmico debe garantizar colisiones nulas (0.00%) bajo cualquier escenario de estrés volumétrico (Tests End-to-End).

---

## 4. Requisitos de Alto Nivel del Producto (Scope Boundaries)

- Interfaz de Autenticación Basada en Roles (JWT Security).
- Paneles Administrativos de CRUD (Create, Read, Update, Delete) para Aulas, Cursos y Profesores.
- Sistema de captura de disponibilidad horaria mediante arrastre (Drag & Drop UI).
- El núcleo algorítmico "Solver" basado en Node.js (Aislado en Worker Threads para prevenir bloqueos).
- Generador de visuales en grilla tipo calendario (Calendario Semanal).
- *Exclusión Formal:* Módulos de Matrícula Financiera o ERP. El sistema no toca dinero ni calificaciones.

---

## 5. Cronograma de Hitos Principales (Milestones Schedule)

El enfoque Ágil (Scrum) prohíbe los diagramas de Gantt ultra-detallados a futuro, pero exige Hitos de Macro-gestión para dar certidumbre financiera a la junta directiva.

| Hito (Milestone) | Descripción del Logro Técnico | Fecha Estimada |
|:---|:---|:---:|
| **H-01 (Kickoff y Setup)** | Firma del Project Charter. Aprovisionamiento de repositorios Git, entornos de CI/CD (GitHub Actions) y clústeres MongoDB. | Enero 2026 |
| **H-02 (Arquitectura Base)** | Sprint 1 completado. APIs de seguridad operando, y modelos de Mongoose (Esquemas de Base de Datos) aprobados e instanciados. | Febrero 2026 |
| **H-03 (Interfaz Visual)** | Sprint 2 completado. React SPA renderizando paneles, catálogos y formularios de disponibilidad docente. | Marzo 2026 |
| **H-04 (Algoritmo Funcional)** | Sprint 3 completado. El Motor CSP cruza los datos con éxito en un entorno local de Node.js, venciendo el problema NP-Hard. | Abril 2026 |
| **H-05 (Pruebas E2E y QA)** | Sprint 4 completado. Baterías de pruebas unitarias en Jest/Vitest alcanzan el 70% de cobertura. Corrección de Bugs. | Mayo 2026 |
| **H-06 (Go-Live / Despliegue)** | Paso a Producción. Vercel (Front) y Render (Back) conectados con SSL (HTTPS). Capacitaciones completadas. | Junio 2026 |

---

## 6. Presupuesto Base Autorizado (BAC)

El financiamiento del proyecto proviene de una partida presupuestal extraordinaria asignada al Laboratorio de Innovación.
- **Fondo Aprobado:** $ 12,500.00 USD.
- **Destinación del Gasto:** Principalmente "Horas-Hombre" de desarrollo de software (Talento Core), suscripciones PaaS (Plataformas Cloud) y auditorías externas de usabilidad.
- **Regla Fiscal:** El Scrum Master no está autorizado a exceder este presupuesto sin una enmienda firmada y sustentada por un Comité de Control de Cambios.

---

## 7. Firmas de Constitución y Empoderamiento

Mediante las siguientes rúbricas digitales, se da vida oficial al Proyecto UniHorarios y se empodera a sus líderes para ejecutar la toma de decisiones técnicas.

- **Patrocinador Ejecutivo (Sponsor):** ________________________ (Firma Digital Aprobada)
- **Scrum Master / Gerente:** ________________________ (Firma Digital Aprobada)
- **Representante Cliente (Product Owner):** ________________________ (Firma Digital Aprobada)
