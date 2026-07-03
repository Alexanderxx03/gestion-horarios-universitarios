# Matriz de Roles y Estructura del Equipo del Proyecto

## 1. Topología del Equipo Ágil (Scrum Team Topology)

La construcción de una herramienta algorítmica compleja como UniHorarios requiere una estructura organizacional ágil, plana y altamente cohesionada. A diferencia de los enfoques tradicionales en cascada (Waterfall) donde abundan los gerentes burocráticos, este proyecto se rige por la guía oficial de Scrum. 

El núcleo duro del proyecto está conformado por un "Scrum Team" de tamaño óptimo (3-9 personas), donde cada integrante posee habilidades en forma de "T" (T-Shaped Skills): Un área de extrema profundidad técnica, pero con capacidad de ayudar en otras áreas si ocurre un cuello de botella.

---

## 2. Mapa de Roles Core (El Equipo Scrum)

Estos roles son los responsables directos de la escritura de código, la gestión de la calidad y la toma de decisiones diaria.

### 2.1 Product Owner (Dueño del Producto)
**Nombre Asignado:** Dra. Carmen López (Delegada de la Decanatura)
- **Responsabilidad Principal:** Representar la voz del usuario final (La universidad). Es la única persona autorizada para modificar o re-priorizar las historias de usuario en el *Product Backlog*.
- **Criterio de Éxito:** Maximizar el valor del negocio (ROI). Si el equipo programa una funcionalidad perfecta que nadie necesita, el Product Owner ha fallado.
- **Autoridad:** Tiene el poder de vetar o aprobar (Sign-off) cada entrega al final de un Sprint durante la ceremonia de *Sprint Review*.

### 2.2 Scrum Master / Líder Técnico (Servant Leader)
**Nombre Asignado:** Paul Paytan (Lead Developer)
- **Responsabilidad Principal:** Garantizar que el marco de trabajo Scrum se respete. Actuar como un "Escudo" (Bulldozer) para proteger a los programadores de distracciones externas, reuniones inútiles y bloqueos técnicos (Impedimentos).
- **Rol Técnico Dual:** Dado el tamaño del equipo, asume también el rol de Arquitecto Principal. Diseña los flujos de las bases de datos y orquesta los despliegues en la nube.
- **Criterio de Éxito:** Mantener una velocidad (*Velocity*) constante del equipo de desarrollo, sin *Burnout* (Agotamiento).

### 2.3 Development Team (Constructores del Software)
Grupo autogestionado de ingenieros y especialistas de QA que convierten las ideas del Product Owner en incrementos de software funcionales.
- **Ingeniero Backend & Algoritmia (1):** Especialista en Node.js, Mongoose y Matemáticas Discretas. Su responsabilidad crítica es el Motor CSP y la API REST.
- **Ingeniero Frontend & UX (1):** Especialista en React, Tailwind y Vite. Su responsabilidad es consumir la API y renderizar el complejo calendario (Grid) en el navegador del usuario.
- **Ingeniero de Calidad (QA Automator) (1):** Escribe el código que evalúa el código de sus compañeros (Jest, Vitest, Cypress). Diseña trampas matemáticas para intentar "romper" el Motor CSP en entornos de *Staging*.

---

## 3. Matriz de Interesados (Stakeholders / Roles Periféricos)

El software no se construye en un vacío. El equipo Scrum interactúa constantemente con actores externos que, si bien no programan, tienen un poder de influencia masivo sobre el proyecto.

| Rol del Interesado | Nivel de Poder | Nivel de Interés | Estrategia de Comunicación (Engagement) |
|:---|:---:|:---:|:---|
| **Decano de la Facultad (Sponsor)** | **ALTO** | **ALTO** | **Gestión Cercana.** Es el patrocinador financiero del proyecto. Se le debe invitar a las revisiones de Sprint mensuales para demostrarle mediante prototipos funcionales que su inversión está rindiendo frutos. |
| **Coordinadores Académicos** | Medio | **ALTO** | **Mantener Informados y Consultados.** Son los verdaderos usuarios finales que sufrirán o amarán el sistema. Se les incluyó en el Sprint 0 para levantar los requerimientos crudos (Pain Points). |
| **Docentes Universitarios** | Bajo | **ALTO** | **Mantener Satisfechos.** Solo usarán la interfaz un par de veces al semestre para marcar su disponibilidad. Deben recibir un Manual de Usuario claro (Video 3 min) en la fase de Cierre. |
| **Dirección de TI Universitaria (DevOps)** | **ALTO** | Bajo | **Monitorear Mínimamente.** Son los dueños de los firewalls y dominios de la universidad. El Scrum Master debe negociar con ellos para abrir los puertos de MongoDB y asegurar el subdominio `horarios.universidad.edu.pe`. |

---

## 4. Reglas de Contratación y Colaboración (Working Agreements)

Para garantizar la armonía en un entorno de alto estrés tecnológico, el equipo central suscribió un "Manifiesto de Convivencia":

1. **Daily Standup Sagrado:** Todo el equipo de desarrollo, sin excepción, se reunirá a las 09:00 AM (Duración máxima: 15 minutos) para sincronizar esfuerzos. El que llegue tarde financia las pizzas del viernes.
2. **Ego-less Programming (Programación sin ego):** El código subido a Git no le pertenece a su autor, pertenece al equipo. Cualquier miembro puede y debe criticar el código de otro durante los *Code Reviews* (Pull Requests) si esto eleva la calidad técnica general (SonarQube).
3. **Cero Correos Electrónicos Internos:** La comunicación oficial de desarrollo se realiza exclusivamente por los canales segmentados de Slack (Ej. `#backend-devs`, `#frontend-ui`, `#alerts-ci-cd`).
4. **Respeto al Context-Switching:** Si un programador activa el estado "Focus Mode" en Slack, está prohibido interrumpirlo (a menos que los servidores de producción estén ardiendo). El desarrollo de algoritmos NP-Hard requiere concentración ininterrumpida profunda.
