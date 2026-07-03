# Registro de Supuestos y Restricciones (Assumptions & Constraints Log)

## 1. Definición Teórica de los Supuestos del Proyecto

En la gestión de proyectos (PMBOK), un **Supuesto (Assumption)** es cualquier factor que el equipo de proyecto, para propósitos de planeamiento inicial, asume como verdadero, real o cierto sin exigir pruebas contundentes en el momento (Ej. *Asumimos que el servidor en la nube no se apagará nunca*).

Por otro lado, una **Restricción (Constraint)** es una limitante ineludible impuesta externamente sobre las opciones del equipo de proyecto (Ej. *El presupuesto no puede superar los $12,500 bajo ninguna circunstancia, y la fecha de entrega máxima es el 30 de Junio*).

Este registro tiene valor contractual. Demuestra legalmente bajo qué "Reglas de la Realidad" se diseñó la arquitectura del código de UniHorarios. Si en el futuro uno de estos Supuestos se revela como falso, o si una Restricción fue violentada por la institución, el equipo de desarrollo se exime de responsabilidad por el fallo de la plataforma.

---

## 2. Matriz de Supuestos Arquitectónicos (Assumptions)

Estos son los cimientos lógicos sobre los que se construyó el sistema. Durante el Cierre del proyecto, todos fueron confirmados. Si en un futuro la realidad operativa contradice a esta lista, el software deberá ser rediseñado.

| ID Supuesto | Descripción del Factor Asumido como Cierto | Impacto si el Supuesto Resulta ser Falso | Estado de Validación al Cierre |
|:---:|:---|:---|:---:|
| **SUP-01** | **Infraestructura Cloud Fiable:** Asumimos que los proveedores Platform-as-a-Service elegidos (`Vercel` para el Frontend y `Render.com` para el Backend) garantizarán un tiempo de actividad del 99.5% y no darán de baja repentina sus capas gratuitas/educativas durante los próximos 12 meses de garantía. | El despliegue colapsaría (Caída de servidores). Se requeriría un mes extra de ingeniería DevOps para reescribir la plataforma en contenedores crudos de AWS o DigitalOcean y migrar DNS. | Confirmado Válido |
| **SUP-02** | **Uniformidad Tecnológica Cliente:** Asumimos que todos los profesores, coordinadores y personal administrativo accederán al portal "UniHorarios" utilizando navegadores modernos compatibles con JavaScript ES6 (Google Chrome, Mozilla Firefox, Microsoft Edge o Safari de versiones 2021 en adelante). | Si la universidad exige que la aplicación corra sobre *Internet Explorer 11* en equipos Windows 7 obsoletos del campus, React y Vite estallarán porque no transpilamos código heredado (Legacy Polyfills) por eficiencia. | Confirmado Válido |
| **SUP-03** | **Aislamiento Semestral de Datos:** Asumimos que la lógica universitaria nunca requerirá generar o mezclar matemáticamente dos horarios de semestres diferentes (Ej. Mezclar ciclo 2026-I con 2026-II) en la misma ejecución del Algoritmo CSP. Cada "Periodo Académico" es un universo cerrado. | El esquema de Mongoose no soporta relaciones multi-semestre para el solver. Si el requerimiento de negocio cambia, la arquitectura NP-Hard debe re-hacerse desde cero. | Confirmado Válido |
| **SUP-04** | **Límites de Carga Fija:** Asumimos que el límite máximo de Cursos a insertar a procesar por el Motor CSP no excederá los 800 registros por Semestre por Sede. | Superar los 1500 cursos exponenciaría el problema matemático forzando a los Worker Threads de Node.js a tardar minutos en resolver en lugar de segundos. | Confirmado Válido |

---

## 3. Matriz de Restricciones Obligatorias (Constraints)

Estas fueron las barreras que el cliente o el entorno impusieron al equipo de diseño de UniHorarios, moldeando forzosamente el resultado final del producto (Technical Trade-offs).

| ID Restricción | Tipo de Restricción | Descripción de la Barrera Ineludible | Impacto que generó en la Arquitectura de Software |
|:---:|:---:|:---|:---|
| **RES-01** | **Presupuestaria (Cost)** | Prohibición absoluta de gastar más de 20$ USD mensuales en servidores y bases de datos recurrentes, ya que el proyecto piloto de Taller no cuenta con presupuesto operativo asignado por el rectorado. | Impidió utilizar AWS EC2 o bases SQL robustas como Amazon RDS. Forzó al equipo a optimizar agresivamente el código para sobrevivir usando instancias compartidas (Shared RAM) de Render.com y clústeres `M0` de MongoDB Atlas. |
| **RES-02** | **Legislación (Data Privacy)** | Todo dato procesado de los usuarios está sujeto a la ley local de protección de datos personales. Las contraseñas de los docentes no pueden ser legibles por los administradores TI de la universidad (Cifrado asimétrico forzoso). | Descartó esquemas rápidos de prototipado sin seguridad. Obligó a invertir horas en el Sprint 2 para configurar Bcrypt.js (Hashing de 10 rondas de Salting) y JsonWebTokens sellados criptográficamente. |
| **RES-03** | **Dependencia Humana (Time)** | El equipo consistió de escasos recursos desarrolladores de medio tiempo (Dedicación Parcial) con una fecha límite inamovible para la sustentación del Curso (Hito Académico Inflexible). | Se acortó el alcance (Scope). Se sacrificó el módulo visual estadístico interactivo a favor de PDFs estáticos simples, aplicando la teoría del "Triángulo de Hierro": Al congelarse Presupuesto y Tiempo, debimos recortar el Alcance para salvar la Calidad (Motor CSP). |

## 4. Cierre del Documento
Este registro fue auditado por el equipo Técnico y Gerencial, confirmando que la aplicación entregada baila armónicamente dentro del espectro delimitado por los supuestos aquí citados. Cualquier desviación futura obligará a iniciar un proceso formal de "Control de Cambios".
