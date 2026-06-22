# 29. Registro de Impedimentos (Impediment Log)

Este registro consolida los obstáculos que frenaron el avance del equipo (*Blockers*) durante los Sprints. El enfoque de este documento es evidenciar la capacidad del Scrum Master (o líder técnico) para destrabar el trabajo del Development Team.

| ID | Impedimento Identificado | Fecha / Sprint | Impacto en el Avance | Acciones de Mitigación (Resolución) |
| :-- | :-- | :--: | :-- | :-- |
| **IMP-01** | **Indefinición Matemática del Motor:** El equipo de desarrollo se bloqueó intentando programar el CSP porque no existía un consenso formal en papel sobre las "restricciones duras" (Hard Constraints). | Sprint 1 | El desarrollo del backend quedó paralizado por 2 días. | El Scrum Master organizó una sesión de Pizarra Blanca (Whiteboarding) obligando a transcribir al esquema formal "SDD" las variables, el dominio, y las restricciones. Esto destrabó el desarrollo del algoritmo. |
| **IMP-02** | **Entorno de Firebase Local Lento:** Los emuladores nativos de Firebase consumían demasiada memoria RAM, bloqueando las computadoras de los desarrolladores. | Sprint 2 | El frontend no podía comunicarse fluidamente con la Base de Datos local. | Se tomó la decisión arquitectónica de migrar los servicios Serverless a un backend Node.js estándar (Arquitectura MERN) eliminando la necesidad de los emuladores pesados. |
| **IMP-03** | **Falta de datos de prueba (Mock Data):** Era imposible probar la eficiencia del Motor CSP y la interfaz del administrador porque no había un volumen suficiente de cursos/docentes cargados manualmente en la Base de Datos. | Sprint 3 | Imposibilidad de ejecutar pruebas de carga e interfaz (UI). | Se desarrolló un *Seed Script* automatizado en el backend capaz de inyectar 50 cursos y 30 docentes aleatorios en la base de datos MongoDB con un solo comando. |

---
**Responsable de Mantenimiento:** Scrum Master  
**Última Actualización:** Fase de Cierre del Proyecto.
