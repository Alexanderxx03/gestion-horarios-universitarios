# Retrospectiva Final del Equipo - Sprint 4 (Post-Mortem)

**Fecha de Ejecución:** Viernes en la tarde de la Semana 2 del Sprint 4 (Tras el Demo Day).  
**Asistentes Habilitados:** Exclusivamente el Equipo de Desarrollo (Backend, Frontend, QA) y el Scrum Master.  
*Tono de la Sesión:* Celebratorio y nostálgico. Es la última ceremonia Scrum oficial del equipo antes de ser disuelto (o reasignado a mantenimiento).

---

## 1. Naturaleza del Post-Mortem Ágil

A diferencia de las retrospectivas anteriores (que buscaban optimizar el próximo Sprint), esta sesión funciona como un *Post-Mortem*. Es un análisis profundo y honesto de la salud metodológica y técnica de todo el ciclo de vida de los 4 Sprints, buscando extraer el máximo "Conocimiento Organizacional" para que el próximo equipo ágil de la facultad no cometa nuestros mismos errores.

---

## 2. Análisis del Desempeño Operativo y Arquitectónico (The Good, The Bad & The Ugly)

### 🟢 THE GOOD: ¿Qué fue el pilar de nuestro éxito? (Keep forever)
- **Scrum Protegido por el Scrum Master:** Paul Paytan ejerció como un verdadero escudo. Nunca permitió que la burocracia de la universidad añadiera nuevos requerimientos (*Scope Creep*) a mitad de un Sprint. Si el Decano pedía algo el Miércoles de la Semana 1, Paul Paytan le decía "Perfecto, va al Backlog del próximo Sprint". Esto protegió la moral del equipo y evitó el colapso.
- **Node.js Worker Threads:** La decisión de aislar la algoritmia matemática pesada de la Web API (Express) fue una genialidad arquitectónica que salvó el proyecto en el Sprint 3.
- **Tipado Duro en Fronteras (Zod + TypeScript):** Obligar al Frontend a validar con esquemas estrictos de Zod antes de mandar llamadas de red fue un cambio doloroso en el Sprint 1, pero produjo un Frontend casi indestructible en el Sprint 4.

### 🔴 THE BAD: ¿Qué nos causó dolor gratuito? (Drop immediately)
- **Documentación de UI muy pobre al inicio:** En los primeros Sprints subestimamos la labor del diseñador UI/UX. Empezamos a programar los calendarios en React "a lo que salga" usando clases de Tailwind al azar. Esto generó código espagueti. 
  - *Lección:* Para proyectos futuros, se exigirá tener los prototipos (Mockups) en Figma listos antes del Sprint Planning.
- **Las Fechas Feas (Timezones de JavaScript):** Gran parte de los bugs del motor de horarios (Horas que se cruzaban por minutos de diferencia) nacieron por no entender cómo el objeto `Date()` de JS maneja las zonas horarias locales frente a UTC de MongoDB. Se perdió tiempo valioso peleando con esto. 
  - *Lección:* Usar librerías robustas como `date-fns` o `dayjs` desde el día cero. Prohibido usar `new Date()`.

### 🟡 THE UGLY: ¿Qué nos sorprendió negativamente y debemos mitigar en el futuro? (Start doing)
- **La Dependencia Extrema del "Free Tier" Cloud:** Desplegar en bases de datos y servidores gratuitos (Vercel, Render, Atlas M0) es fantástico para prototipar, pero los "Cold Starts" (El servidor se apaga si nadie lo usa en 15 minutos) le daban mala imagen al software en las mañanas cuando el Coordinador era el primero en entrar.
  - *Lección (Para la Jefatura):* Si la universidad quiere software de calidad, debe destinar una partida presupuestal de al menos $10 dólares mensuales para servidores encendidos 24/7. No se puede construir infraestructura institucional encima de PaaS educativos crónicos.

---

## 3. Disolución Formal del Equipo Scrum

El Scrum Master dio unas palabras de agradecimiento por el esfuerzo titánico del equipo, especialmente recordando las noches sin dormir durante el "Spike" matemático del Sprint 3. 

El equipo de desarrollo (Development Team) es oficialmente liberado de sus tareas de programación activa (Code Freeze absoluto). Sus credenciales de administrador en GitHub y bases de datos transitan a estado de "Solo Lectura", entregando las llaves maestras a la Dirección de TI para su pase oficial a Operaciones (Cierre de Proyecto).

**Fin de los Ciclos Ágiles. Proyecto Exitoso.**
