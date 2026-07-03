# Matriz Histórica y Registro de Riesgos (Risk Register)

## 1. Definición Teórica (Gestión Ágil de Riesgos)

La gestión de riesgos de UniHorarios se basó en una premisa proactiva: anticiparse a la catástrofe antes de tener que pagar por ella. Según los lineamientos de la Guía PMBOK, un "Riesgo" es cualquier evento incierto (con una probabilidad `P` entre 1% y 99%) que, de ocurrir, generaría un impacto (`I`) positivo (Oportunidad) o negativo (Amenaza) sobre el Cronograma, el Presupuesto o la Calidad del Código del proyecto.

Este documento cataloga los riesgos previstos al inicio del Sprint 0 y documenta, en retrospectiva durante el Cierre del Proyecto, si las estrategias de mitigación ideadas funcionaron en la práctica, sirviendo como insumo invaluable (Base de Conocimiento) para el portafolio de proyectos informáticos de la universidad.

---

## 2. Metodología de Clasificación (PI Matrix)

Para evitar el pánico generalizado ante cualquier contratiempo, el equipo de desarrollo tabuló matemáticamente cada riesgo empleando la Ecuación de Exposición: `Exposición = Probabilidad (1-5) × Impacto (1-5)`.

- **Nivel Crítico (15 - 25):** Escenario de interrupción total. (Ej. Fallo estructural del motor algorítmico).
- **Nivel Alto (10 - 14):** Retrasos severos en la canalización del código.
- **Nivel Medio (5 - 9):** Problemas de interfaz (UX) solucionables en el siguiente ciclo ágil.
- **Nivel Bajo (1 - 4):** Riesgos residuales aceptados por la gerencia.

---

## 3. Matriz de Riesgos Identificados y Su Resolución Histórica

A continuación, se tabulan las amenazas estructurales enfrentadas durante la construcción del stack MERN de UniHorarios y la efectividad forense de las estrategias desplegadas.

| ID | Riesgo / Amenaza Descrita | Causa Raíz (Root Cause) | Exposición Calculada (P × I) | Estrategia de Respuesta (Mitigación) | ¿Ocurrió en la Realidad? | Análisis de la Efectividad del Plan / Lección Aprendida |
|:---|:---|:---|:---:|:---|:---:|:---|
| **R-001** | **Explosión Combinatoria Algorítmica (Colapso del Solver CSP)** | Las heurísticas de asignación carecen de podas matemáticas. El árbol de decisión de Node.js entra en *Stack Overflow* al calcular 200 cursos. | **Crítico (20)** | **Mitigar:** Implementar restricciones MRV (*Minimum Remaining Values*). Dividir la matriz matemática separando a los docentes con mayor restricción horaria para ser calculados de primero. | **SÍ** | La mitigación fue extremadamente exitosa. Sin la heurística MRV, los servidores colapsaban. Con ella, el cálculo bajó de 2 minutos a 1.5 segundos. El riesgo fue eliminado. |
| **R-002** | **Fuga de Credenciales e Inyección en Base de Datos (Data Breach)** | Desarrollo relajado del backend; uso de consultas concatenadas sin sanitizar. Variables de entorno `.env` expuestas accidentalmente en GitHub. | **Alto (16)** | **Evitar:** Implementar `.gitignore` hermético desde el *Commit Initial*. Utilizar `Mongoose` (cuyas abstracciones protegen contra inyecciones estilo SQL/NoSQL por diseño) y `bcryptjs` para salar las contraseñas. | **NO** | No hubo exposición. Las auditorías del *Anexo_B_OWASP* y SonarQube confirmaron 0 fugas. La barrera de seguridad diseñada funcionó según el manual. |
| **R-003** | **Retraso Masivo en Adopción de Usuarios (Mala UX/UI)** | Los docentes y coordinadores, habituados a usar grandes Macros de Excel, rechazan el nuevo sistema y lo boicotean alegando "exceso de clics". | **Alto (12)** | **Mitigar:** Diseñar una SPA puramente reactiva. Implementar un calendario de Arrastrar y Soltar (Drag & Drop) visualmente atractivo. Realizar pruebas de usabilidad tempranas (Sprint 2). | **PARCIAL** | Algunos coordinadores presentaron quejas de navegación inicial. Gracias a las métricas del test de usabilidad (SUS) recolectadas a tiempo, se refactorizó el menú lateral y la adopción subió rápidamente. |
| **R-004** | **Sobrecostos Ocultos en Facturación Nube (Bill Shock de AWS/Atlas)** | Arquitectura defectuosa del API que provoca un loop infinito de llamadas *fetch* en `useEffect` de React, inundando a MongoDB con miles de peticiones inútiles por segundo. | **Crítico (20)** | **Transferir/Mitigar:** Configurar límites y alarmas duras de cobro (Billing Alarms) en Atlas a 10 USD. Implementar *Rate Limiting* en el servidor de Node (Máximo 100 peticiones por minuto por IP). | **NO** | La precaución fue justificada. Aunque un becario creó accidentalmente un bucle asíncrono en React durante desarrollo, los interceptores detuvieron el tráfico excesivo antes de que generara costos en la nube. |
| **R-005** | **Baja Calidad Estructural / Deuda Técnica Galopante** | Ausencia de cultura de pruebas (Testing) en el equipo, programando únicamente "El camino feliz" y entregando código espagueti con tal de cumplir las fechas. | **Alto (15)** | **Aceptar y Mitigar:** Aceptar que el código inicial será imperfecto (MVP), pero mitigarlo con una puerta de calidad: Prohibir hacer `git merge` a master sin alcanzar el 70% de Test Coverage (Vitest/Jest). | **SÍ** | El código tendía naturalmente a degradarse (aumentaba la Complejidad Cognitiva). Pero el bot de CI de GitHub Actions abortaba implacablemente las subidas defectuosas, obligando a los programadores a mantener la disciplina. |
| **R-006** | **Fallo del Motor Render.com (Dependencia de Plataforma PaaS)** | El servidor gratuito de aplicaciones web Render, donde se hospeda el Node.js, decide reiniciar sus instancias o sufrir una caída general de sus redes. | **Medio (9)** | **Aceptar:** Siendo un proyecto sin un inmenso músculo financiero, se acepta el riesgo de caer por horas aisladas. El backend está contenedorizado en Docker, listo para migrar en minutos a Google Cloud si fuera urgente. | **SÍ** | El proveedor gratuito "adormece" el backend tras 15 minutos sin peticiones, generando que el primer login del día tarde hasta 40 segundos en contestar (Cold Start). Se planeó documentarlo en el Manual. |

---

## 4. Estado de Transición del Riesgo a Operaciones

Todos los riesgos enmarcados en la fase de "Desarrollo y Construcción Algorítmica" han prescrito (ya no tienen probabilidad de ocurrir porque el código fue entregado congelado y estable). 

El único riesgo remanente heredado por la Fase de Operaciones y Mantenimiento es el **R-006 (Uptime de PaaS Free-Tier)**. Dicho riesgo ha sido aceptado formalmente por la gerencia y se firmó la política en la *Declaración de Trabajo SOW* de cierre. No se identifican nuevos riesgos catastróficos u ocultos (Black Swans).
