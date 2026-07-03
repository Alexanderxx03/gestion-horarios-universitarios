# Lista Preliminar de Requerimientos y Restricciones (Initial Product Backlog)

## 1. Naturaleza de este Documento

En el marco metodológico Scrum, el "Product Backlog" es un ente vivo. Nace crudo, ambiguo y caótico, y se va refinando (Grooming) a lo largo del tiempo a medida que el Product Owner prioriza el valor.

Este documento representa la **Captura Primigenia (Raw Capture)** de requerimientos levantada durante las entrevistas con la Decanatura y los Coordinadores Académicos en la fase de iniciación (Sprint 0). Contiene los "Deseos" puros del cliente, antes de que el equipo técnico los despedazara y tradujera en Historias de Usuario técnicas (Ver documento `Especificacion-de-Requisitos.md` para el resultado refinado).

Se preserva este documento por motivos históricos y legales, demostrando qué pidió originalmente el usuario.

---

## 2. Pila de Producto Cruda (Raw Product Backlog)

La siguiente lista documenta textualmente las solicitudes de los Interesados (Stakeholders) durante el *Kick-off* del proyecto. 

| ID Ref | Fuente / Interesado | Cita / Solicitud Cruda del Negocio (Business Wish) | Traducción Ágil Preliminar (Feature Epic) | Prioridad Inicial |
|:---:|:---|:---|:---|:---:|
| **REQ-01** | *Coordinador Sede Principal* | "Necesito dejar de usar Excel. Quiero una pantalla donde pueda meter los cursos que se van a dictar este ciclo, cuántos créditos tienen y a qué ciclo pertenecen." | **Módulo CRUD Académico:** Crear interfaz para gestión de Mallas Curriculares. | **ALTA** |
| **REQ-02** | *Decano de Ingeniería* | "El sistema tiene que ser inteligente. Si yo meto a 50 alumnos en un salón, el sistema debe saber que no caben en el Aula 102 que solo tiene 30 sillas, y debe avisarme o buscar otra aula." | **Restricción Dura (Hard Constraint):** El algoritmo CSP debe evaluar `curso.alumnos_esperados <= aula.aforo_maximo`. | **CRÍTICA** |
| **REQ-03** | *Docente Nombrado (Focus Group)* | "A mi no me gusta mandar correos. Quiero entrar con mi clave, ver un horario vacío, y hacerle clic a las horas donde yo puedo enseñar. Y que el coordinador no me asigne fuera de eso." | **UI Drag & Drop:** Portal de disponibilidad docente (Mask array 2D). | **ALTA** |
| **REQ-04** | *Soporte TI de la Universidad* | "No podemos alojar esto en nuestros servidores físicos, están colapsados. Además, tiene que ser seguro porque si hackean esto, se roban las contraseñas de los profesores." | **Arquitectura y Seguridad:** Cloud-Native deployment (Render/Vercel). Autenticación forzosa con JWT y Bcrypt para las claves. | **CRÍTICA** |
| **REQ-05** | *Secretaria Administrativa* | "Cuando el horario esté listo, necesito poder imprimirlo grande para pegarlo en la vitrina de la facultad. Que salga con colorcitos bonitos." | **Exportación Visual:** Implementar librería de Front-End tipo `html2pdf` o `jspdf` para exportar el React-Big-Calendar. | Media |
| **REQ-06** | *Decano de Ingeniería* | "Me gustaría que el sistema también calcule cuánto se le va a pagar a los profesores contratados a fin de mes, basándose en las horas del horario generado." | **Módulo de Planillas y Finanzas.** | ❌ RECHAZADO |

---

## 3. Resolución Inmediata de Requerimientos (Triage)

Durante la misma sesión del Sprint 0, el *Scrum Master* ejecutó una poda agresiva para definir las barreras protectoras del alcance (Scope Boundaries):

1. **Requerimientos Críticos y Altos (REQ 01 al 04):** Fueron formalmente aceptados y conforman el núcleo duro del MVP (Minimum Viable Product). Absorberán el 85% del presupuesto en horas-hombre.
2. **Requerimientos Medios (REQ 05):** Fue aceptado como funcionalidad estética y de UX (User Experience). Será desarrollado en el Sprint final (Sprint 4) solo si el Motor Algorítmico ya funciona sin defectos. Se catalogó como prioridad secundaria.
3. **Requerimientos Fuera de Alcance (REQ 06):** El REQ-06 fue rechazado rotundamente (*Out-of-Scope*). El Líder Técnico explicó ejecutivamente a la Decanatura que construir un sistema financiero y conectarlo a pasarelas de pago de nóminas multiplicaría por diez el presupuesto ($100k+) y la exposición a riesgos legales. Se acordó que UniHorarios exportará datos planos, y Finanzas usará su propio ERP.

---

## 4. Supuestos Preliminares Derivados de las Entrevistas

Para construir este Backlog, se asumen (de forma preliminar) las siguientes verdades sobre el dominio del negocio universitario:
- **Supuesto 1 (Bloques Mínimos):** Asumimos que la universidad opera en bloques granulares de 1 Hora Académica (Equivalente a 50 minutos físicos más 10 de receso). El sistema no calculará medias horas o minutos sueltos. Todo debe encajar en la grilla.
- **Supuesto 2 (Jornada Continua):** Asumimos que el campus está abierto ininterrumpidamente desde las 07:00 AM hasta las 10:00 PM de Lunes a Sábado. El Domingo es inexistente computacionalmente para la universidad (No hay dictado).

*Nota: Con este documento firmado y triageado, el equipo tiene luz verde para iniciar el **Sprint 1**, partiendo la Pila de Producto en piezas pequeñas (Tickets) a programarse en las próximas 2 semanas.*
