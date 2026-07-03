# Acta de Constitución de Revisión de Cierre de Proyecto

**Nombre del Proyecto:** UniHorarios - Sistema Inteligente de Gestión de Horarios Universitarios  
**Patrocinador del Proyecto (Sponsor):** Dirección de Escuela de Ingeniería de Sistemas  
**Gerente de Proyecto / Scrum Master:** Alexander (Lead Developer)  
**Fecha de Aprobación del Cierre:** 03 de Julio de 2026  
**Fase Correspondiente:** Cierre del Ciclo de Vida del Proyecto (Project Closure)

---

## 1. Propósito y Justificación del Acta de Cierre

El presente documento formaliza administrativamente el fin de la etapa de desarrollo y estabilización (Fase de Ejecución y Pruebas) del software **UniHorarios**. La emisión y firma de esta Acta de Cierre transfiere legal y operativamente la responsabilidad del producto desde el "Equipo de Proyecto" (Desarrolladores y QA) hacia el "Equipo de Operaciones y Mantenimiento" (Soporte TI de la Universidad).

Su objetivo principal es certificar que todos los Criterios de Aceptación (DoD - Definition of Done) declarados en la Especificación de Requisitos Inicial, han sido completados, validados por pruebas automatizadas y aceptados formalmente por los *Stakeholders* (Coordinadores Académicos).

---

## 2. Resumen de Desempeño y Entregables Finales

### 2.1 Módulos Entregados al Cliente
El sistema se despliega en producción contemplando el 100% del alcance inicial planificado, encapsulado en los siguientes entregables:
1. **Módulo de Mallas Curriculares:** Panel CRUD reactivo para la gestión de asignaturas, prerequisitos y cadenas de dependencia.
2. **Módulo de Control de Recursos:** Registro y control de Aforo de Aulas Físicas y padrón de Docentes.
3. **Módulo de Restricciones (Soft & Hard):** Interfaz para delimitar disponibilidades docentes y capacidades máximas.
4. **Motor CSP (El Núcleo):** Algoritmo aislado en *Worker Threads* capaz de procesar miles de permutaciones matemáticas para escupir un horario libre de superposiciones (Colisiones Cero).
5. **Dashboard Visual (Exportador):** Grilla interactiva basada en React-Big-Calendar, con capacidades de exportación a reportes y notificaciones.

### 2.2 Desempeño del Presupuesto (Performance Cost)
- **Presupuesto Base Autorizado (BAC):** $ 12,500.00 USD
- **Costo Real Acumulado (AC):** $ 11,850.00 USD
- **Variación de Costo (CV = EV - AC):** + $ 650.00 USD (Ahorro / Superávit)
- *Nota Financiera:* El ahorro se debió principalmente a la migración temprana del algoritmo CSP desde un servicio Cloud Function costoso, hacia un Worker Thread en el contenedor Node.js principal, reduciendo los costos mensuales de computación por 6 meses.

### 2.3 Desempeño del Cronograma (Schedule Performance)
- **Fecha de Inicio Oficial:** 15 de Enero de 2026
- **Fecha de Fin Planificada (Línea Base):** 30 de Junio de 2026
- **Fecha de Fin Real (Entrega E2E):** 03 de Julio de 2026
- **Variación de Cronograma (SV):** -3 Días Laborables
- *Nota de Cronograma:* El ligero retraso de 72 horas fue causado por la implementación de mitigaciones de Seguridad OWASP (Tokens CSRF y Rate Limiting) durante el Sprint 4, una adición no contemplada originalmente pero obligatoria para el paso a Producción. Fue aprobado por el comité de cambios.

---

## 3. Criterios de Aceptación y Certificación de Calidad

Para declarar el cierre definitivo, se auditaron los siguientes indicadores clave de rendimiento (KPIs de Calidad). Todos superaron los umbrales mínimos aceptables:

| Métrica de Calidad Evaluada | Umbral Mínimo Requerido | Resultado Obtenido en Auditoría Final | Estado de Aceptación |
|:---|:---:|:---:|:---:|
| **Cobertura de Pruebas Backend (Jest)** | > 70% | **82.4%** | ✅ Aceptado |
| **Puntaje de Accesibilidad (Lighthouse)** | Nivel AA (>90/100) | **98/100** | ✅ Aceptado |
| **Tiempo Resolución Algoritmo CSP** | < 10,000 ms | **< 300 ms** (Promedio) | ✅ Aceptado |
| **Nivel de Deuda Técnica (SonarQube)** | Rating A o B | **Rating A** (Menos de 2h de deuda) | ✅ Aceptado |
| **Vulnerabilidades Críticas (OWASP)** | 0 Fallos Abiertos | **0 Fallos Abiertos** | ✅ Aceptado |
| **Usabilidad Final (Escala SUS)** | > 68 (Aceptable) | **77.5 (Bueno/Excelente)** | ✅ Aceptado |

---

## 4. Liberación de Recursos del Proyecto

Con la firma de la presente Acta:
1. **Infraestructura de Pruebas:** Se ordena la destrucción (Teardown) de los clústeres de bases de datos de Staging y Testing alojados en MongoDB Atlas.
2. **Talento Humano:** El equipo de desarrollo Frontend, Backend y QA, compuesto por 4 ingenieros bajo la modalidad de dedicación exclusiva, son oficialmente desafectados del proyecto UniHorarios para ser reasignados a nuevos portafolios de la organización.
3. **Hardware:** Las máquinas virtuales locales empleadas para pruebas de carga son devueltas al pool de recursos de TI.

---

## 5. Firmas de Aprobación Formal

Los abajo firmantes declaran haber revisado las métricas, haber ejecutado el software en entorno de producción simulado (UAT - User Acceptance Testing) y certifican formalmente el CIERRE del Proyecto UniHorarios, autorizando la transición a la fase operativa.

| Rol en el Proyecto | Nombre Legal Representante | Firma Digital / Sello de Aceptación | Fecha de Firma |
|:---|:---|:---:|:---:|
| **Sponsor (Patrocinador)** | Dr. Hernán Cortéz (Decano) | *(Firmado Electrónicamente)* | 03/07/2026 |
| **Scrum Master / Lead Dev** | Alexander | *(Firmado Electrónicamente)* | 03/07/2026 |
| **Líder de Operaciones IT** | Ing. Roberto Sánchez | *(Firmado Electrónicamente)* | 03/07/2026 |
| **Cliente (Usuario Final)** | Lic. Marta Ruiz (Coordinadora) | *(Firmado Electrónicamente)* | 03/07/2026 |

---
**FIN DEL DOCUMENTO DE CIERRE**
