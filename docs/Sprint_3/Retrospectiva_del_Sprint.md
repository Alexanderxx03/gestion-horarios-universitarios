# Retrospectiva del Equipo - Sprint 3 (Scrum Retrospective)

**Fecha de Ejecución:** Viernes en la tarde de la Semana 2 del Sprint 3.  
**Asistentes Habilitados:** Exclusivamente el Equipo de Desarrollo (Backend y Frontend) y el Scrum Master.  
*Tono de la Sesión:* Alivio catártico. La victoria sobre el Algoritmo CSP ha disipado casi todo el estrés acumulado del proyecto.

---

## 1. Análisis del Desempeño Operativo del Equipo

### 🟢 ¿Qué hicimos muy bien y debemos MANTENER (Keep)?
- **El "Focus Mode" de Programación Extrema:** La decisión acordada en el Sprint 2 de blindar a Alexander (Líder Backend) aislándolo de reuniones y correos funcionó magistralmente. Pudo sostener todo el contexto del algoritmo CSP en su memoria de trabajo sin sufrir disrupción por cambios de contexto. Se mantiene esta práctica para tareas de clasificación NP-Hard.
- **Tolerancia a Fallos Controlada (Graceful Degradation):** En lugar de que la pantalla blanca "estalle" cuando el Motor Matemático descubre una imposibilidad, el equipo programó manejadores de excepciones que lanzan alertas rojas súper descriptivas en la interfaz. Eso impresionó al cliente.

### 🔴 ¿En qué fracasamos y debemos DESCARTAR (Drop)?
- **Subestimación de Entornos Locales:** Durante el pico de cálculo del motor, la computadora de Roberto (Core i3, 8GB RAM) literalmente se congeló intentando correr el contenedor Docker y la DB local. Se perdieron 4 horas de desarrollo esperando reinicios.
  - *Medida de Mitigación:* Se descarta correr el Backend entero en laptops débiles durante el desarrollo Frontend pesado. 
  - *Nueva Práctica:* Roberto se conectará a la API de Staging desplegada en la nube para probar su interfaz React, apagando sus contenedores locales.

### 🟡 ¿Qué nueva práctica técnica debemos INICIAR (Start) en el Sprint Final (S4)?
- **Code Freeze Temprano:** Como el Sprint 4 es el último y conlleva el pase a Producción de la Universidad, no podemos darnos el lujo de arreglar bugs el Jueves por la noche.
  - *Acuerdo Sagrado:* Se declara "Code Freeze" (Congelamiento de Código) el Martes de la Semana 2. A partir del Miércoles, está estrictamente prohibido añadir nuevas funcionalidades. Solo se aceptan parches de seguridad o de estilos CSS críticos.
- **Preparación de Auditoría PFA:** El equipo designará a un especialista (QA) para que empiece a correr SonarQube y OWASP ZAP contra la plataforma en las madrugadas, redactando los anexos técnicos para el informe final de sustentación.

---

## 2. Palabras de Cierre del Scrum Master

"Ingenieros, lo más duro ya pasó. Han logrado automatizar un problema que tomaba un mes entero usando heurísticas matemáticas elegantes y librerías modernas, todo bajo un estricto presupuesto computacional cero (Tier M0). El Sprint 4 es para disfrutar, pulir la pintura y preparar los discursos. Tómense el fin de semana sin tocar el teclado. Nos vemos el lunes para el sprint final." 

*Cierre de la Sesión: 30 minutos.*
