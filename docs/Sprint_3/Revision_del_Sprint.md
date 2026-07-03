# Acta de Revisión del Sprint 3 (Sprint Review)

**Fecha:** Viernes de la Semana 2 del Sprint 3  
**Lugar:** Sala de Juntas Principal (Presencial, con aplausos).  
**Asistentes Core:** Equipo Scrum, Decano de Ingeniería (Sponsor), 3 Coordinadores Académicos y Representante del Gremio Docente.

---

## 1. Meta de la Revisión (Objetivo de la Ceremonia)

Demostrar en vivo que el sistema puede ingerir parámetros caóticos e incompletos y generar un Horario Universitario válido libre de colisiones, logrando en 5 segundos lo que al humano le costaba un mes.

---

## 2. Demostración en Vivo (La Prueba de Fuego)

El ambiente estaba tenso. Alexander (Scrum Master y desarrollador del algoritmo) conectó el portátil y cedió el ratón al propio Coordinador Académico para que él operara la interfaz, demostrando la usabilidad real.

### Prueba Demostrativa 1: Declaración Docente (Drag and Drop)
- **Acción del Coordinador (Impersonando a un Docente):** Inició sesión. Navegó a "Mi Disponibilidad". En la grilla táctil, "pintó" de verde solo los días Lunes por la mañana y Jueves por la noche. Pulsó Guardar.
- **Feedback del Representante Docente:** *"Magnífico. Ni un solo formulario largo. Es como pintar en Excel con el mouse. Mis colegas mayores de 60 años podrán usar esto sin llamarnos a pedir auxilio."*

### Prueba Demostrativa 2: El Choque Computacional (Ejecutar el Solver)
- **Acción del Coordinador:** Ingresó al Orquestador. Seleccionó el "Semestre de Prueba". Presionó el imponente botón Azul: **"Ejecutar Motor CSP"**.
- **Comportamiento del Sistema:** 
  1. Apareció un Spinner de carga con el texto *"Delegando hilos matemáticos... No recargue la página"*.
  2. Todos miraron la pantalla. Pasaron **1.8 segundos**.
  3. El sistema sonó (Beep) y soltó una alerta verde: *"Cálculo Exitoso: 120 Asignaciones. Colisiones: 0."*
  4. La pantalla cargó el JSON crudo (La grilla visual bonita se programará en el Sprint 4). El coordinador auditó los datos. Comprobó que el docente (que solo pintó Lunes y Jueves) fue acomodado perfectamente en el Jueves por la noche en un laboratorio que coincidía con su aforo exacto.
- **Feedback del Decano (Sponsor):** *(El Decano se puso de pie).* *"Increíble. Acaban de desaparecer mi mayor problema logístico de los últimos 5 años de la facultad. Procedan de inmediato al pulido y exportación."*

---

## 3. Discusión de Feedback Final (Últimos Retoques)

Como el núcleo funcional estaba resuelto, los comentarios mutaron hacia la estética del producto (User Experience):

| Solicitud del Stakeholder (Feedback) | Decisión del Equipo / Acción Tomada | Clasificación |
|:---|:---|:---:|
| **Coordinador:** "El JSON en crudo asusta. Necesitamos el calendario de colorcitos y que podamos pasarlo a PDF para enviarlo por WhatsApp." | **Agendado al Sprint 4:** Esa es exactamente la Meta (Sprint Goal) del Sprint final. Se implementará `React-Big-Calendar` y `jspdf`. | Continuidad Lógica |
| **Decano:** "Los colores del calendario final deberían diferenciar si un curso es Teoría (Celeste) o Práctica (Naranja)." | **Ticket de UI Aceptado.** Se inyectará una regla CSS en el mapeo de colores de React dependiendo de la propiedad del objeto devuelto por el Solver. | Pulido Visual (Feature) |

---

## 4. Firma Final y Aceptación de Incremento (Sign-Off)

El Decano, como Sponsor principal, declaró formalmente: **"Incremento Aprobado con Felicitaciones. El riesgo matemático del proyecto ha quedado saldado. Autorizo el paso hacia el Sprint Final de Estética y Publicación (Sprint 4)."**

*La reunión duró 60 minutos.* El equipo procedió a celebrar el hito tecnológico al cierre de la sesión.
