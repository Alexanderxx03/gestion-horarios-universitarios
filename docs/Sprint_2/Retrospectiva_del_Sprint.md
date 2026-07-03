# Retrospectiva del Equipo - Sprint 2 (Scrum Retrospective)

**Fecha de Ejecución:** Viernes en la tarde de la Semana 2 del Sprint 2.  
**Asistentes Habilitados:** Exclusivamente el Equipo de Desarrollo y el Scrum Master.  
*Tono de la Sesión:* Constructivo, con enfoque en la agilidad de respuesta ante el cambio inesperado de requerimientos (El caso de los cursos teóricos vs prácticos).

---

## 1. Análisis del Desempeño Operativo del Equipo

### 🟢 ¿Qué hicimos muy bien y debemos MANTENER (Keep)?
- **Reacción Rápida al Cambio (Agile Mindset):** Cuando el Decano destruyó nuestra arquitectura de cursos pidiendo división de "Teoría/Práctica" a mitad de la Review, el equipo no entró en pánico defensivo. Entendimos que era un error de negocio genuino. Adoptar Scrum nos permitió abrazar este cambio en lugar de pelear contratos, lo cual se celebra.
- **Validación Zod Centralizada:** El "Firewall de Zod" implementado por Jack Rojas en el Frontend funcionó de maravilla. Evitó que subieran datos basura a la API unas 400 veces durante la semana de pruebas manuales.

### 🔴 ¿En qué fracasamos y debemos DESCARTAR (Drop)?
- **Componentes React Monstruosos:** El componente `<MallaCurricularForm />` creció de forma descontrolada llegando a tener más de 800 líneas de código en un solo archivo. Jack Rojas confesó que hacer scroll para depurar se volvió un martirio cognitivo.
  - *Medida de Mitigación:* Se descarta la filosofía de "Construir rápido y refactorizar después" para vistas complejas.
  - *Nueva Regla:* Ningún componente React debe exceder las 200 líneas. Si lo hace, debe romperse obligatoriamente en sub-componentes más pequeños (Ej. `<CourseListItem />`).

### 🟡 ¿Qué nueva práctica técnica debemos INICIAR (Start) en el Sprint 3?
- **El Reto del Motor Matemático:** El Sprint 3 alberga el "Demonio" del proyecto: el Algoritmo CSP. Paul Paytan (Lead Dev) pidió aislamiento total.
  - *Acuerdo del Equipo (Focus Mode Activo):* Durante la primera semana del Sprint 3, Paul Paytan no asistirá a reuniones secundarias, ignorará mensajes de Slack no urgentes y se dedicará a programar el Worker Thread del algoritmo algorítmico. Jack Rojas encargará de ser el "Escudo Humano" contestando dudas del cliente.

---

## 2. Preparación Psicológica para el Sprint 3

El Scrum Master recordó que el Sprint 3 es el "Punto de No Retorno". Si logramos vencer la complejidad matemática del Algoritmo CSP de horarios sin que los servidores colapsen, el 90% del riesgo del proyecto quedará neutralizado.

El equipo acuerda arrancar el Lunes con un "Spike" (Incursión) teórico de 48 horas exclusivamente leyendo papers sobre heurísticas (Minimum Remaining Values - MRV) antes de tocar el teclado. 

La sesión concluyó con optimismo a los 35 minutos.
