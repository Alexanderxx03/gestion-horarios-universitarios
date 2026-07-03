# Acta de Revisión del Sprint 2 (Sprint Review)

**Fecha:** Viernes de la Semana 2 del Sprint 2  
**Lugar:** Sala de Juntas Híbrida (Google Meet + Presencial)  
**Asistentes Core:** Equipo Scrum, Decano de Ingeniería (Sponsor Ejecutivo), Coordinadores Académicos (Usuarios Clave).

---

## 1. Meta de la Revisión (Objetivo de la Ceremonia)

Validar operativamente que la interfaz de usuario (UI) construida para gestionar Maestros (Aulas, Docentes y Cursos) es intuitiva, rápida y cumple con el Flujo de Valor exigido por los Coordinadores Académicos para abandonar definitivamente las Hojas de Excel.

---

## 2. Demostración en Vivo (Live Demo)

El desarrollador Frontend (Roberto) tomó el control del proyector para guiar a los stakeholders por el *Happy Path* (Camino Feliz) del sistema, demostrando software 100% funcional y conectado a la base de datos en la nube.

### Prueba Demostrativa 1: Gestión Intuitiva de Aulas
- **Acción del Dev:** Ingresó al Menú `[Infraestructura]`. Pulsó "Nueva Aula". Ingresó el nombre "Laboratorio Mac" y un Aforo de `30`.
- **Comportamiento del Sistema:** La tabla se actualizó casi al instante (Sin parpadeos) gracias al manejo optimista del caché con React Query. Se demostró también qué pasa al poner letras en la casilla de aforo (El botón de Guardar se bloqueó en rojo protegiendo la base de datos).
- **Feedback del Coordinador:** *"Es ridículamente rápido. En el sistema antiguo del ERP de la universidad, guardar un aula demoraba como 5 segundos y recargaba toda la página. Me encanta."*

### Prueba Demostrativa 2: Creación de Mallas y Cursos (El Reto Visual)
- **Acción del Dev:** Ingresó al panel `[Académico]`. Agregó el curso "Ingeniería de Software" y le asignó 4 créditos, y luego lo ató como pre-requisito de "Proyecto de Tesis".
- **Comportamiento del Sistema:** La UI mostró una estructura arbórea simple demostrando la dependencia.
- **Feedback del Decano:** *"Se ve bien, pero falta información. ¿Dónde indico si el curso es Teórico o Práctico? Porque un curso de teoría de 50 alumnos puede ir a un pabellón normal, pero la práctica exige partirlos en dos grupos de 25 en un laboratorio."*

---

## 3. Discusión de Feedback y Pivot (Adaptación Inmediata)

El comentario del Decano fue una revelación crítica (Insight) sobre una regla de negocio que los coordinadores habían omitido en el Sprint 0. El Product Owner actuó de inmediato en la reunión:

| Solicitud del Stakeholder (Feedback Crudo) | Decisión del Equipo (Scrum Master) | Acción / Ticket a Generar |
|:---|:---|:---:|
| **Decano:** "Debemos poder separar teoría de práctica en un mismo curso." | **Es Mandatorio:** Si no separamos esto, el algoritmo (Sprint 3) asignará 50 personas a un laboratorio pequeño y fallará el Criterio de Éxito de colisiones cero. | *Añadido al Backlog (Prioridad Alta):* Refactorizar el Schema `Course` para soportar horas particionadas (Teoría vs Lab). |
| **Coordinador:** "A veces los profesores se equivocan de apellido al crear docentes, ¿Hay un botón de editar rápido?" | Roberto demuestra que sí existe el botón del 'Lápiz' en la tabla. El problema era que el icono de Tailwind era muy sutil. | *Ticket de UI Menor:* Aumentar contraste y color azul al icono de edición de tablas. |

---

## 4. Firma Final y Aceptación de Incremento (Sign-Off)

Los Coordinadores Académicos y el Decano declararon formalmente: **"Aceptamos el Incremento Visual del Sprint 2. El sistema está tomando una forma muy profesional. Procedan con los cambios de cursos teóricos/prácticos"**.

*Cierre de Ceremonia: 55 Minutos.* El equipo demostró resiliencia adaptándose inmediatamente a los cambios sin quejas (Agile Mindset).
