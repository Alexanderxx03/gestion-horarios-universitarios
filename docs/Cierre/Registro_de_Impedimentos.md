# Registro y Gestión de Impedimentos (Blocker Log)

## 1. Definición Teórica (El Rol del Scrum Master)

En el marco metodológico ágil (Scrum), un **Impedimento** no es lo mismo que un riesgo o un defecto informático. Un Impedimento es cualquier obstáculo externo (técnico, burocrático o de infraestructura) que *ralentiza o detiene en seco la capacidad del equipo de desarrollo para entregar código y valor.* 

La función primordial del *Scrum Master* (o del Líder de Desarrollo en su defecto) no es programar, sino ejercer la labor de "Quitanieve" (Bulldozer), erradicando estos bloqueadores rápidamente para proteger la velocidad (*Velocity*) de los programadores. Este registro forense documenta qué bloqueos existieron durante el desarrollo de UniHorarios y cómo el liderazgo facilitó su destrabe.

---

## 2. Matriz Histórica de Impedimentos Destrabados

Esta bitácora evidencia la resiliencia del equipo de UniHorarios ante las turbulencias burocráticas y técnicas que amenazaron con romper la entrega de Sprints.

| ID Impedimento | Descripción del Obstáculo Paralizante | Equipo Afectado | Fecha de Reporte Inicial | Días Congelado (Lead Time) | Acción de Destrabe Efectuada por el Liderazgo (Scrum Master) |
|:---:|:---|:---:|:---:|:---:|:---|
| **IMP-01** | **Indefinición de Reglas de Dominio Académico:** El desarrollador del Motor CSP no podía avanzar porque la Universidad no tenía un documento claro definiendo qué era más prioritario: Si respetar las horas de los profesores nombrados o respetar la disponibilidad del Aula de Laboratorio Principal. | Backend / Algoritmos | Sprint 1 (Día 3) | 4 Días | **Sesión de Refinamiento de Emergencia:** El líder convocó a una reunión presencial obligatoria con el Decano y los Coordinadores para forzar una matriz de decisiones. Se determinó legalmente que la "Prioridad de Aulas Restringidas" supera al "Estatus del Docente" en el código. El desarrollo continuó. |
| **IMP-02** | **Bloqueo Administrativo de Puertos IT (Firewall Universitario):** Los desarrolladores no podían conectarse a los clústeres remotos de base de datos (`MongoDB Atlas`) desde las redes del campus porque la universidad bloqueaba todos los puertos de salida no estándares (Ej. Puerto 27017 de Mongo). | Todo el equipo de Desarrollo | Sprint 2 (Día 1) | 2 Días | **Escalada con Jefatura TI:** Se tramitó una solicitud formal (Ticket de Mesa de Ayuda) adjuntando el Acta de Constitución del proyecto. Se negoció una VLAN de pruebas temporal con el equipo de ciberseguridad para que las laptops de desarrollo tuvieran salida limpia. |
| **IMP-03** | **Fricción por Ausencia de Mockups de UI:** El equipo Frontend paralizó el avance de la pantalla de "Gestión de Mallas" porque esperaban que el equipo de UX/UI proveyera archivos de Figma altamente detallados, los cuales estaban retrasados por baja capacidad de diseño gráfico. | Frontend / React Devs | Sprint 3 (Día 5) | 1.5 Días | **Decisión Arquitectónica Ejecutiva:** El líder del proyecto ordenó abolir la dependencia del diseñador externo para esta vista secundaria y utilizar los componentes ensamblados de `Tailwind UI` con patrones prefabricados. El Frontend volvió a ser productivo al instante. |
| **IMP-04** | **Límites Financieros Nube (Tarjeta Denegada):** El proveedor `Render.com` y `Vercel` exigían la validación de una tarjeta de crédito corporativa para expandir la cuota de minutos de compilación que el sistema CI/CD había agotado (Rate Limit Error). No había plástico asignado al equipo. | DevOps / CI Pipelines | Sprint 4 (Día 8) | 1 Día | **Micro-Inversión por Caja Chica:** Ante la demora de la burocracia financiera de la escuela, el Líder de Proyecto insertó su propia tarjeta de desarrollo, y gestionó el rembolso interno a posteriori. La integración continua (Deployments) volvió a activarse en 20 minutos. |

---

## 3. Conclusión de la Gestión de Apoyo (Servant Leadership)

El registro refleja una métrica de resolución de impedimentos excelente (Tiempos de estancamiento inferiores a 48 horas promedio). La enseñanza organizacional extraída de este documento resalta que **el 80% de los impedimentos en un proyecto de software no se resuelven tirando más líneas de código o implementando mejores bases de datos, sino con reuniones gerenciales asertivas y decisiones administrativas rápidas**.

El equipo Frontend y Backend fueron escudados con éxito, lo que garantizó la entrega a tiempo de los hitos técnicos. Todos los impedimentos de este proyecto se declaran RESUELTOS y cerrados.
