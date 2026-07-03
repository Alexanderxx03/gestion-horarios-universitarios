# Informe de Estado del Proyecto - Cierre Sprint 2

**Fecha de Corte (Status Date):** Viernes de la Semana 2 del Sprint 2  
**Preparado por:** Alexander (Scrum Master / Lead Dev)  
**Audiencia (To):** Patrocinadores y Equipo de Desarrollo

## 1. Resumen Ejecutivo de Avance (Executive Summary)

El Sprint 2 logró su objetivo principal: otorgarle un "Cuerpo Visible" (Interfaz de Usuario) a la base de datos desnuda construida en el Sprint 1. El Coordinador ahora puede interactuar con el sistema sin tocar una sola línea de código, marcando el nacimiento de una herramienta operativa.

**El Proyecto se encuentra en estado VERDE (Saludable).**

- **Velocidad Lograda (Burned Points):** 27/27 Story Points.
- **Salud del Equipo:** Excelente. Las tensiones de tipado entre Backend y Frontend fueron erradicadas gracias a la implementación conjunta de interfaces compartidas en TypeScript (Decisión tomada en la Retrospectiva pasada).

---

## 2. Logros Técnicos y Bloqueadores Vencidos

Este Sprint exigió alta velocidad en programación Front-end. Se han desplegado a la rama de Staging los siguientes hitos:

1. **Arquitectura UI (Shell):** Se construyó el Menú Lateral (Sidebar) de navegación basado en Tailwind. Es *Mobile-First*, colapsándose elegantemente en teléfonos móviles.
2. **Tablas Reactivas de Catálogos:** Se instaló y configuró `@tanstack/react-table` para manejar la visualización masiva de los 80 docentes y 30 aulas. Soporta ordenamiento y paginación en memoria.
3. **Escudo de Zod (Zod Firewall):** Tal como se planificó, el formulario de creación de "Aulas" fue protegido por un esquema de Zod. Si un coordinador intenta registrar un Aula con aforo "-5", la caja de texto se pinta de rojo y bloquea el botón "Guardar" antes de que la petición siquiera viaje por la red, salvando recursos del servidor.

### Impedimento Destrabado (Incident-002)
- *Bloqueador:* Los puertos de MongoDB Atlas fueron bloqueados misteriosamente por el Firewall de la Universidad el día martes. 
- *Resolución:* Alexander (Scrum Master) ejecutó un reclamo inmediato con Jefatura TI, logrando abrir una VLAN para el equipo en 48 horas (Ver Registro de Impedimentos). El equipo no paró de trabajar porque levantaron contenedores Docker locales (`mongo:latest`) durante la caída.

---

## 3. Pruebas de Calidad Iniciales (UAT)

El día Jueves enviamos el enlace de Staging a los Coordinadores Académicos para que ingresaran datos reales de aulas (Prueba de Estrés Humano).
- **Resultado:** Ingresaron 25 aulas exitosamente. 
- **Bug Detectado:** Reportaron que al intentar borrar un docente, el sistema daba un error feo en lugar de avisar que "El docente está siendo usado en una Malla". 
- **Plan de Acción:** Este bug (Defecto Leve) fue ingresado al Backlog como Deuda Técnica para el Sprint 3, donde implementaremos advertencias amigables (Soft Deletes).

---

## 4. Proyección Crítica hacia el Sprint 3 (Alerta Amarilla)

El Sprint 3 será el más peligroso de todo el proyecto. Abordaremos el "Drag and Drop" para que el docente marque su horario, y lo más aterrador: **El Motor CSP (Constraint Satisfaction Problem)**. Si la algoritmia matemática fracasa en Node.js, el proyecto podría desestabilizarse. El equipo técnico entra en estado de alta concentración (Focus Mode).
