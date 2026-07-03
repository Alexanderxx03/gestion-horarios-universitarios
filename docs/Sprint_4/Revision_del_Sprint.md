# Acta de Revisión del Sprint 4 (Sprint Review Final / Demo Day)

**Fecha:** Viernes de la Semana 2 del Sprint 4  
**Lugar:** Auditorio de la Facultad de Sistemas (Sustentación Pública).  
**Asistentes Core:** Equipo Scrum, Decano de Ingeniería (Sponsor Ejecutivo), Cuerpo de Coordinadores, Docentes invitados.

---

## 1. Meta de la Revisión (Objetivo de la Ceremonia)

Esta no es una reunión privada típica; es el **Demo Day**. El objetivo es presentar el Software UniHorarios corriendo en vivo, alojado en servidores reales (Producción), a las más altas autoridades de la facultad, demostrando que la inversión de 6 meses (4 Sprints) fue un éxito total.

---

## 2. Demostración en Vivo (El Gran Show)

Paul Paytan (Líder del Proyecto) proyectó el sistema en la pantalla gigante del auditorio. Jack Rojas (Líder Frontend) operó la máquina.

### Hito 1: La Magia de la Nube y el Drag & Drop (Inicio rápido)
- **Acción:** Se pidió a un profesor del público que entrara a una URL corta desde su celular. El profesor dibujó rápidamente su disponibilidad en su pantalla táctil (Martes todo el día). 
- **Reacción:** El público aplaudió la fluidez.

### Hito 2: El Cerebro en Acción y la Belleza Visual (La Meta)
- **Acción:** Jack Rojas (Como Coordinador) fue al panel "Generador Algorítmico". Cargó un set gigante pre-programado (150 asignaturas, 40 docentes, 20 aulas). Presionó **EJECUTAR**.
- **Comportamiento del Sistema:** El spinner giró por 2.5 segundos. ¡Boom! La pantalla no lanzó un JSON crudo como en el Sprint 3, sino que renderizó instantáneamente un gigantesco y hermoso **Calendario de Colores (React-Big-Calendar)** semanal. Bloques azules (Teoría) y bloques naranjas (Laboratorio) tapizaban la pantalla.
- **Acción Adicional:** Jack Rojas pulsó el botón **[Exportar PDF]**. El navegador descargó un archivo instantáneo con la tabla formateada y el logo de la universidad.
- **Reacción del Decano:** *(Levantando la mano)* *"Esto es brujería matemática. Lo que acaban de hacer solía darnos gastritis durante un mes. El formato en PDF es idéntico al que la secretaria hacía a mano, pero automático."*

---

## 3. Últimos Comentarios y Resolución

No hubo "Peticiones de Cambio" (Change Requests) para inyectar al código. Los comentarios de la plana gerencial fueron orientados a la implementación operativa (Go-to-Market).

| Comentario de la Directiva | Respuesta del Scrum Master |
|:---|:---|
| **Soporte TI:** "¿Nos pueden capacitar para reiniciar la base de datos si algo se cae?" | **Paul Paytan:** "Sí. Durante la próxima semana elaboraremos la *Fase de Cierre* (Actas y Manuales del Software) y daremos la capacitación técnica (Hand-over)." |
| **Decano:** "¿Cuándo podemos usarlo oficialmente?" | **Paul Paytan:** "El código está en Producción (v1.0). Inmediatamente cerremos la parte legal (Firma de Acta de Aceptación), ustedes tienen las llaves maestras." |

---

## 4. Firma Final, Aceptación y Fin del Proyecto (Sign-Off)

El Decano, como Sponsor principal, se acercó al atril y firmó digitalmente el acta de la ceremonia:
**"El MVP ha superado mis más altas expectativas. El producto UniHorarios es formalmente ACEPTADO por la Dirección Académica. Felicidades al Equipo de Desarrollo."**

*La ceremonia estalló en aplausos y concluyó en 45 minutos. El equipo de desarrollo se abrazó, celebrando el final exitoso del ciclo ágil.*
